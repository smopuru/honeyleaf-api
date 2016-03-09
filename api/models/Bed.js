/**
 * Bed.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    tableName: 'beds',
    attributes: {
        room: {
            model: 'room',
            columnName: 'room_id'
        },
        tenant: {
            model: 'tenant',
            columnName: 'tenant_id'
        },
        bookedTenant: {
            model: 'tenant',
            columnName: 'booked_tenant_id'
        },
        isVacant: {
            type: 'boolean',
            columnName: 'is_vacant'
        },
        isBooked: {
            type: 'boolean',
            columnName: 'is_booked'
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
