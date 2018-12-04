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
var TechnologySchema = new Schema({
    technology: {
        type: String,
        default: "",
        immutable: true,
        required: "Technology Cannot Be Blank"
    }
});

TechnologySchema.plugin(integerValidator);
TechnologySchema.plugin(mongoose_delete, { deletedAt: true,  overrideMethods: true});
mongoose.model("Technology", TechnologySchema);
export default TechnologySchema;








