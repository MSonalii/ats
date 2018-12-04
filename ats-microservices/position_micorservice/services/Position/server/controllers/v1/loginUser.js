/**
 * Module dependencies
 */

import {getErrorMessage} from "./errorHandler";
import mongoose from "mongoose";
let User = mongoose.model("User");

export const loginUser = async (req, res) => {
    const user_name = req.body.user_name;
    const password = req.body.password;  
    var data = {
        user_name: user_name,
        password: password
    };
    try {
        User.findOne(data, function(err, user) {
            if (err) {
                res.json({
                    status: 0,
                    message: err
                });
            }
            if (!user) {
                res.json({
                    status: 0,
                    msg: "Invalid Username/password"
                });
            }
            res.json({
                status: 1,
                id: user._id,
                message: " success"
            });
        });
    } catch (error) {
        res.status(422).send({
            success:false,
            message:getErrorMessage(error)
        });    
    }

    return;
};
  
