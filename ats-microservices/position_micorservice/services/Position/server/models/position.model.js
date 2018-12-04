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
var PositionSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
        required: "Created Date Cannot Be Blank"
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: "",
        trim: true,
        required: "title cannot be blank"
    },
    account_name: {
        type: String,
        default: "",
        trim: true,
        required: "Account Name cannot be blank"
    },
    description: {
        type: String,
        default: "",
        trim: true,
        required: "Description cannot be blank "
    },
    required_min_exp:{
        type: Number,
        integer: "Experience must be an integer.",
        min: 0
    },
    total_position:{
        type: Number,
        required: "Total Positions is required",
        min: 0
    },
    location:{
        type: String,
        required: "Location is required"
    },
    technology:[{ type: Schema.Types.ObjectId, ref: "Technology" }],
    project_name:{
        type: String
    },
    start_date:{
        type: Date
    },
    owner_name:{
        type: String,
        required: "Owner name is requried"
    },
    candidate_level:{
        type: String,
        required: "Candidate Level is required"
    },
    comments:{
        type: String,
        required: "Comments is required"
    },
    client:{
        type: String,
        required: "Client name is required"
    },
    employment_type:{
        type: String,
        required: "Employment Type is required"
    },
    shift_timing:{
        type: String,
        required: "Shift Timings is required"
    },
    billing_status:{
        type: String,
        required: "Billing status is required"
    },
    notice_period:{
        type: String,
        required: "Notice Period is required"
    },
    level_1_tech_panel:{
        type: String,
        required: "Level 1 Tech Panel is required"
    },
    level_2_tech_panel:{
        type: String,
        required: "Level 2 Tech Panel is required"
    },
    practice_name:{
        type: String,
        required: "Practice Name is required"
    }

});

PositionSchema.plugin(integerValidator);
PositionSchema.plugin(mongoose_delete, { deletedAt: true,  overrideMethods: true});
mongoose.model("Position", PositionSchema);
export default PositionSchema;








