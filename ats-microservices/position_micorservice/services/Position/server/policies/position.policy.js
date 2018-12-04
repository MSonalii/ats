"use strict";

/**
 * Module dependencies
 */
import acl from "acl";

// Using the memory backend
const aclPolicy = new acl(new acl.memoryBackend());

/**
 * Invoke Articles Permissions
 */
export const invokeRolesPolicies = () => {
    aclPolicy.allow([{
        roles: ["admin"],
        allows: [{
            resources: "/api/articles",
            permissions: "*"
        }, {
            resources: "/api/articles/:articleId",
            permissions: "*"
        }]
    }, {
        roles: ["user"],
        allows: [{
            resources: "/api/articles",
            permissions: ["get"]
        }, {
            resources: "/api/articles/:articleId",
            permissions: ["get"]
        }]
    }, {
        roles: ["guest"],
        allows: [{
            resources: "/api/articles",
            permissions: ["get"]
        }, {
            resources: "/api/articles/:articleId",
            permissions: ["get"]
        }]
    }]);
};

/**
 * Check If Articles Policy Allows
 */
export const isAllowed = (req, res, next) => {

    next();
    // var roles = (req.user) ? req.user.roles : ['guest'];

    // // Check for user roles
    // aclPolicy.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    
    //   next();
    
    //   if (err) {
    //     // An authorization error occurred
    //     return res.status(500).send('Unexpected authorization error');
    //   } else {
    //     if (isAllowed) {
    //       // Access granted! Invoke next middleware
    //       return next();
    //     } else {
    //       return res.status(403).json({
    //         message: 'User is not authorized'
    //       });
    //     }
    //   }
    
    // });
};
