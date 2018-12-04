/**
 * Module dependencies
 */

import {getErrorMessage} from "./errorHandler";
import mongoose from "mongoose";
let Position = mongoose.model("Position");

const removePosition = (id) =>{
    let params = {
        _id: id
    };
    return Position.delete(params);
};

export const remove = async(req, res) =>{

    const positionId = req.params.positionId;  
    if (!mongoose.Types.ObjectId.isValid(positionId)) {
        return res.status(400).send({
            message: "Id is invalid"
        });
    }
  
    try {
        let result = await removePosition(positionId);
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
  
  
