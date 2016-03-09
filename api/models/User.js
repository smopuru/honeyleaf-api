/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: 'users',
    autoUpdatedAt: false,
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
        password: {
            type: 'string'
        },
        type: {
            type: 'string',
            enum: ['tenant', 'owner', 'admin'],
            defaultsTo: 'owner'
        },
        otpVerified: {
            type: 'boolean',
            defaultsTo: false,
            columnName: 'otp_verified'
        },
        otp: {
            type: 'integer'
        },
        otpExpires: {
            type: 'string',
            columnName: 'otp_expires'
        },
        pg: {
            model: 'pg',
            columnName: 'pg_id'
        },
        createdBy: {
            model: 'user',
            columnName: 'created_by'
        },
        createdAt: {
            type: 'datetime',
            columnName: 'created_at'
        },
        updatedAt: {
            type: 'datetime',
            columnName: 'updated_at'
        },
        isAdmin: function() {
            return this.type == 'admin';
        },
        isOwner: function() {
            return this.type == 'owner';
        },
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            delete obj.otp;
            delete obj.otpExpires;
            return obj;
        }
    },

    beforeCreate: function(record, cb) {
        if(record.password){
            var passwordHash = require('password-hash');
            record.password  = passwordHash.generate(record.password);
        }
        cb();
    },

    beforeUpdate: function(record, cb) {
        if(record.password){
            var passwordHash = require('password-hash');
            record.password = passwordHash.generate(record.password);
        }
        cb();
    }
};

