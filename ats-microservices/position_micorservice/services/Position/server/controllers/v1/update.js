/**
 * Module dependencies
 */
import { removeImmutableValues } from "./immutableFields";
import { getErrorMessage } from "./errorHandler";
import _ from "lodash";
import mongoose from "mongoose";
let Position = mongoose.model("Position");

const updatePosition = (id, dataToUpdate = {}) =>{

    let params = {
        _id: id
    };
    let returnUpdatedDoc = {
        new: true
    };    
    return Position.findOneAndUpdate(params, dataToUpdate, returnUpdatedDoc);
	
};

const addLastUpdatedTimeStampToPayLoad = (payload) =>{

    let createdAt = new Date().toISOString();
    payload.lastUpdatedAt = createdAt;
    payload.technology = payload.technology.split(",");
  
    return payload;
};
  

export const update = async(req, res) => {

    const positionId = req.params.positionId;  
    if (!mongoose.Types.ObjectId.isValid(positionId)) {
        return res.status(400).send({
            message: "Id is invalid"
        });
    }
  
    let data = _.cloneDeep(req.body);
    data = addLastUpdatedTimeStampToPayLoad(data);
    data = removeImmutableValues(data);
  
    try {
        let result = await updatePosition(positionId, data);	
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
  
