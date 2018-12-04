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
var PracticeSchema = new Schema({
    Name: {
        type: String,
        default: "",
        trim: true,
        required: "Practice Name can not be blank"
    }
});

PracticeSchema.plugin(integerValidator);
PracticeSchema.plugin(mongoose_delete, { deletedAt: true,  overrideMethods: true});
mongoose.model("practice", PracticeSchema);
export default PracticeSchema;