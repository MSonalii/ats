"use strict";

/**
 * Module dependencies
 */
import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
import integerValidator from "mongoose-integer";

var Schema = mongoose.Schema;

/**
 *  Schema
 */
var UserSchema = new Schema({
    user_name: {
        type: String,
        default: "",
        trim: true,
        required: "User Name cannot be blank"
    },
    password: {
        type: String,
        default: "",
        trim: true,
        required: "Password cannot be blank"
    }
});

UserSchema.plugin(integerValidator);
UserSchema.plugin(mongoose_delete, { deletedAt: true,  overrideMethods: true});
mongoose.model("User", UserSchema);
export default UserSchema;








