/**
 * TenantController
 *
 * @description :: Server-side logic for managing tenants
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');
var async = require('async');
var moment = require('moment');

module.exports = {
    index: function(req, res) {
        var user = req.user;
        if (!user)
            return res.send({
                error: true,
                statusCode: 404,
                statusMessage: 'Session Expired. Please login again!'
            });

        if (!user.isOwner())
            return res.send({
                error: true,
                statusCode: 403,
                statusMessage: 'Not authorized to view this data'
            });

        var queries = {
            tenants: function(cb) {
                Tenant.find({ pg: user.pg })
                    .populate('bed')
                    .exec(function(err, tenants) {
                        if (err)
                            return res.send({
                                error: true,
                                statusCode: 500,
                                statusMessage: "Something went wrong",
                                err: err
                            });
                        cb(err, tenants);
                    });
            },
            rooms: ['tenants', function(cb, results) {
                var tenants = _.filter(results.tenants, function(tenant) {
                    return tenant.bed && tenant.bed.room;
                });
                var roomIds = _.map(tenants, function(tenant) {
                    return tenant.bed.room;
                });
                Room.find({ id: roomIds })
                    .exec(function(err, rooms) {
                        if (err)
                            return res.send({
                                error: true,
                                statusCode: 500,
                                statusMessage: "Something went wrong while finding rooms",
                                err: err
                            });

                        cb(err, rooms);
                    });
            }],
            map: ['rooms', function(cb, results) {
                var rooms = _.indexBy(results.rooms, 'id');
                var tenants = results.tenants
                _.each(tenants, function(tenant) {
                    if (tenant.bed && tenant.bed.room) {
                        tenant.room = rooms[tenant.bed.room];
                    }
                });
                cb(null, tenants);
            }]
        };

        async.auto(queries, function(err, results) {
            if (err)
                return res.send({
                    error: true,
                    statusCode: 500,
                    statusMessage: 'Something went wrong'
                });

            res.send({
                success: true,
                statusCode: 200,
                statusMessage: 'done successfully',
                data: { tenants: results.map }
            });
        });
    },

    get: function(req, res) {
        var user = req.user;
        if (!user)
            return res.send({
                error: true,
                statusCode: 404,
                statusMessage: 'Session Expired. Please login again!'
            });

        if (!user.isOwner())
            return res.send({
                error: true,
                statusCode: 403,
                statusMessage: 'Not authorized to view this data'
            });

        var tenantId = req.param('tenantId');
        var queries = {
            tenant: function(cb) {
                Tenant.findOne({ id: tenantId, pg: user.pg })
                    .populateAll()
                    .exec(function(err, tenant) {
                        if (err)
                            return res.send({
                                error: true,
                                statusCode: 500,
                                statusMessage: "Something went wrong",
                                err: err
                            });
                        if (!tenant)
                            return res.send({
                                error: true,
                                statusCode: 404,
                                statusMessage: 'Tenant is not found with the specified tenant id ' + tenantId
                            });
                        cb(err, tenant);
                    });
            },
            room: ['tenant', function(cb, results) {
                var tenant = results.tenant;
                if (tenant.bed && tenant.bed.room) {
                    Room.findOne({ id: tenant.bed.room })
                        .exec(function(err, room) {
                            if (err)
                                return res.send({
                                    error: true,
                                    statusCode: 500,
                                    statusMessage: "Something went wrong while finding room with id " + tenant.bed.room,
                                    err: err
                                });
                            if (room) tenant.room = room;
                            cb(null, tenant);
                        });
                } else {
                    cb(null, tenant);
                }
            }]
        };

        async.auto(queries, function(err, results) {
            if (err)
                return res.send({
                    error: true,
                    statusCode: 500,
                    statusMessage: 'Something went wrong'
                });

            res.send({
                success: true,
                statusCode: 200,
                statusMessage: 'done successfully',
                data: { tenant: results.room }
            });
        });
    },

    addPayment: function(req, res) {
        var user = req.user;
        if (!user)
            return res.send({
                error: true,
                statusCode: 404,
                statusMessage: 'Session Expired. Please login again!'
            });

        if (!user.isOwner())
            return res.send({
                error: true,
                statusCode: 403,
                statusMessage: 'Not authorized to view this data'
            });

        var data = req.body;
        if (!data.amount)
            return res.send({
                error: true,
                statusCode: 400,
                statusMessage: 'Amount is missing'
            });

        var paymentData = {
            tenant: req.param('tenantId'),
            amount: data.amount,
            type: data.paymentType || 'monthly_rent',
            monthPaidForDate: data.monthPaidForDate || moment().format('YYYY-MM-01'),
            paidDate: moment().format('YYYY-MM-DD')
        };

        Tenant.findOne({ id: paymentData.tenant, pg: user.pg })
            .populate('payments')
            .exec(function(err, tenant) {
                if (err)
                    return res.send({
                        error: true,
                        statusCode: 500,
                        statusMessage: "Something went wrong",
                        err: err
                    });

                if (!tenant)
                    return res.send({
                        error: true,
                        statusCode: 404,
                        statusMessage: 'Tenant is not found with the specified tenant id ' + tenantId
                    });

                // Tenant found, check whether payment is already done
                var prevPaymentMade;
                if (paymentData.type == 'monthly_rent') {
                    var payableDate = moment(paymentData.monthPaidForDate);
                    prevPaymentMade = _.find(tenant.payments, function(payment) {
                        var paymentDate = moment(payment.monthPaidFor);
                        return payment.type == 'monthly_rent' &&
                            paymentDate.year() == payableDate.year() &&
                            paymentDate.month() == payableDate.month();
                    });
                }else if(paymentData.type == 'deposit') {
                    prevPaymentMade = _.find(tenant.payments, function(payment) {
                        return payment.type == 'deposit';
                    });
                }

                if (prevPaymentMade)
                    return res.send({
                        error: true,
                        statusCode: 400,
                        statusMessage: 'Payment was already paid by tenant to the specified(or current) month'
                    });

                TenantPayment.create(paymentData)
                    .exec(function(err, payment) {
                        if (err || !payment)
                            return res.send({
                                error: true,
                                statusCode: 500,
                                statusMessage: 'Something went wrong'
                            });

                        res.send({
                            success: true,
                            statusCode: 200,
                            statusMessage: 'Payment is added successfully',
                            data: { tenant: _.extend(tenant, { newPayment: payment }) }
                        });
                    });
            });
    }
};
