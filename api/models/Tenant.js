/**
* Tenant.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'tenants',
    attributes: {
        name: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        mobile: {
            type: 'string',
            size: 10
        },
        altMobile: {
            type: 'string',
            columnName: 'alt_mobile',
            defaultsTo: null
        },
        address: {
            type: 'string'
        },
        type: {
            type: 'string',
            enum: ['regular', 'guest'],
            defaultsTo: 'regular'
        },
        bed: {
            model: 'bed',
            columnName: 'bed_id'
        },
        pg: {
            model: 'pg',
            columnName: 'pg_id'
        },
        payments: {
            collection: 'tenantPayment',
            via: 'tenant'
        },
        photoUrl: {
            type: 'string',
            columnName: 'photo_url'
        },
        fromDate: {
            type: 'datetime',
            columnName: 'from_date'
        },
        toDate: {
            type: 'datetime',
            columnName: 'to_date'
        },
        status: {
            type: 'boolean',
            enum: ['occupied','on_notice','booked', 'left'],
            defaultsTo:  'occupied'
        },
        noticeStartDate: {
            type: 'datetime',
            columnName: 'notice_start_date'
        },
        noticeEndDate: {
            type: 'datetime',
            columnName: 'notice_end_date'
        },
        createdAt: {
            type: 'datetime',
            columnName: 'created_at'
        },
        updatedAt: {
            type: 'datetime',
            columnName: 'updated_at'
        }
    }
};

