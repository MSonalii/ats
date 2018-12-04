/**
 * Module dependencies
 */

import {getErrorMessage} from "./errorHandler";
import mongoose from "mongoose";
let Position = mongoose.model("Position");

const findPosition =  (id) => {

    let params = {
        _id: id
    };
    let projection = {
        __v    : false
    };
    return Position.findOne(params, projection).populate("technology","technology");
};
export const read = async (req, res) => {
  

    const positionId = req.params.positionId;  
    if (!mongoose.Types.ObjectId.isValid(positionId)) {
        return res.status(400).send({
            message: "Id is invalid"
        });
    }

    try {
        let result = await findPosition(positionId);
        res.json({
            success: true,
            body: result,
        });
    } catch (error) {
        res.status(422).send({
            success:false,
            message:getErrorMessage(error)
        });    
    }

    return;
};
