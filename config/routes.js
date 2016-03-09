/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
    //Routes related to auth
    // 'POST /api/v1/auth/login' : {
    //     controller: 'auth',
    //     action: 'login'
    // },
    // 'POST /api/v1/auth/logout' : {
    //     controller: 'auth',
    //     action: 'login'
    // },
    // 'POST /api/v1/auth/forgot_password' : {
    //     controller: 'auth',
    //     action: 'forgotPassword'
    // },
    // 'POST /api/v1/auth/reset_password' : {
    //     controller: 'auth',
    //     action: 'resetPassword'
    // },

    //Routes related to user profile
    // 'POST /api/v1/users' : {
    //     controller: 'user',
    //     action: 'create'
    // },
    // 'GET /api/v1/users' : {
    //     controller: 'user',
    //     action: 'index'
    // },
    // 'GET /api/v1/users/:userId' : {
    //     controller: 'user',
    //     action: 'get'
    // },
    // 'PUT /api/v1/users/:userId' : {
    //     controller: 'user',
    //     action: 'update'
    // },
    // 'POST /api/v1/users/:userId/change_password' : {
    //     controller: 'user',
    //     action: 'changePassword'
    // },

    //Routes related to paying guests
    // 'POST /api/v1/paying_guests' : {
    //     controller: 'PG',
    //     action: 'create'
    // },
    // 'GET /api/v1/paying_guests' : {
    //     controller: 'PG',
    //     action: 'index'
    // },
    // 'GET /api/v1/paying_guests/:pgId' : {
    //     controller: 'PG',
    //     action: 'get'
    // },
    // 'PUT /api/v1/paying_guests/:pgId' : {
    //     controller: 'PG',
    //     action: 'update'
    // },

    //Routes related to rooms
    // 'POST /api/v1/rooms' : {
    //     controller: 'room',
    //     action: 'create'
    // },
    'GET /api/v1/rooms' : {
        controller: 'room',
        action: 'index'
    },
    'GET /api/v1/rooms/:roomId' : {
        controller: 'room',
        action: 'get'
    },
    // 'PUT /api/v1/rooms/:roomId' : {
    //     controller: 'room',
    //     action: 'update'
    // },
    // 'GET /api/v1/rooms/status' : {
    //     controller: 'room',
    //     action: 'vacancy_status'
    // },
    // 'GET /api/v1/rooms/vacant_beds' : {
    //     controller: 'room',
    //     action: 'vacant_beds'
    // },

    //Routes related to tenants
    // 'POST /api/v1/tenants' : {
    //     controller: 'tenant',
    //     action: 'create'
    // },
    'GET /api/v1/tenants' : {
        controller: 'tenant',
        action: 'index'
    },
    'GET /api/v1/tenants/:tenantId' : {
        controller: 'tenant',
        action: 'get'
    },
    // 'PUT /api/v1/tenants/:tenantId' : {
    //     controller: 'tenant',
    //     action: 'update'
    // },
    'POST /api/v1/tenants/:tenantId/payment' : {
        controller: 'tenant',
        action: 'addPayment'
    },
    // 'PUT /api/v1/tenants/:tenantId/change_bed' : {
    //     controller: 'tenant',
    //     action: 'changeBed'
    // },

    //Routes related to payment transactions
    // 'POST /api/v1/payments' : {
    //     controller: 'payments',
    //     action: 'create'
    // },
    // 'GET /api/v1/payments' : {
    //     controller: 'payments',
    //     action: 'index'
    // },
    // 'GET /api/v1/payments/:paymentId' : {
    //     controller: 'payments',
    //     action: 'get'
    // },
    // 'PUT /api/v1/payments/:paymentId' : {
    //     controller: 'payments',
    //     action: 'update'
    // }
};
