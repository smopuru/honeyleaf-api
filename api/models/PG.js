/**
* PG.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'paying_guests',
    autoUpdatedAt: false,
    attributes: {
        name: {
            type: 'string'
        },
        area: {
            type: 'string'
        },
        city: {
            type: 'string'
        },
        address: {
            type: 'string'
        },
        mobile: {
            type: 'string'
        },
        altMobile: {
            type: 'string',
            columnName: 'alt_mobile'
        },
        lat: {
            type: 'string',
        },
        lng: {
            type: 'string',
        },
        rooms: {
            collection: 'room',
            via: 'pg'
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

