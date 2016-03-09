/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var _ = require('underscore');
var async = require('async');

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

        Room.find({ pg: user.pg })
            .populate('beds')
            .exec(function(err, rooms) {
                if (err)
                    return res.send({
                        error: true,
                        statusCode: 500,
                        statusMessage: "Something went wrong",
                        err: err
                    });

                res.send({
                    success: true,
                    statusCode: 200,
                    statusMessage: 'done successfully',
                    data: { rooms: rooms }
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

        var roomId = req.param('roomId');
        var queries = {
            room: function(cb) {
                Room.findOne({ id: roomId, pg: user.pg })
                    .populate('beds')
                    .exec(function(err, room) {
                        if (err)
                            return res.send({
                                error: true,
                                statusCode: 500,
                                statusMessage: "Something went wrong while finding room",
                                err: err
                            });

                        if (!room)
                            return res.send({
                                error: true,
                                statusCode: 404,
                                statusMessage: 'Room is not found with the specified room id ' + roomId + ' and pg id ' + user.pg
                            });
                        cb(err, room);
                    });
            },
            tenants: ['room', function(cb, results) {
                var room = results.room;
                Tenant.find({ id: _.pluck(room.beds, 'tenant') })
                    .exec(function(err, tenants) {
                        if (err)
                            return res.send({
                                error: true,
                                statusCode: 500,
                                statusMessage: "Something went wrong while finding tenants",
                                err: err
                            });

                        cb(err, tenants);
                    });

            }],
            map: ['tenants', function(cb, results) {
                var tenants = _.indexBy(results.tenants, 'id');
                var room = results.room.toObject();
                _.each(room.beds, function(bed) {
                    bed.tenant = tenants[bed.tenant];
                });
                cb(null, room);
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
                data: { room: results.map }
            });
        });
    }
};
