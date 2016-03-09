/**
* Room.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'rooms',
    attributes: {
        name: {
            type: 'string'
        },
        floorNo: {
            type: 'integer',
            columnName: 'floor_no'
        },
        pg: {
            model: 'pg',
            columnName: 'pg_id'
        },
        beds: {
            collection: 'bed',
            via: 'room'
        },
        curBedCount: {
            type: 'integer',
            columnName: 'cur_bed_count'
        },
        maxBedCount: {
            type: 'integer',
            columnName: 'max_bed_count'
        },
        amenities: {
            type: 'string'
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

