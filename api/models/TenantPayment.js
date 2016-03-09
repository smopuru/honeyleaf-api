/**
 * TenantPayment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'tenant_payments',
    attributes: {
        tenant: {
            model: 'tenant',
            columnName: 'tenant_id'
        },
        amount: {
            type: 'integer'
        },
        monthPaidForDate: {
            type: 'date',
            columnName: 'month_paid_for'
        },
        paidDate: {
            type: 'date',
            columnName: 'paid_date'
        },
        type: {
            type: 'string',
            enum: ['monthly_rent', 'one_time', 'deposit'],
            defaultsTo: 'monthly_rent'
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
