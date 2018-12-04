/**
 * Module dependencies
 */

import {getErrorMessage} from "./errorHandler";
import _ from "lodash";
import mongoose from "mongoose";
let Position = mongoose.model("Position");

const createPosition = (data) =>{

    data = addTimestampToPayLoad(data);
    return new Position(data).save();
};

const addTimestampToPayLoad = (payload) => {

    let createdAt = new Date().toISOString();
    payload.createdAt = createdAt;
    payload.lastUpdatedAt = createdAt;
    payload.technology = payload.technology.split(",");

    return payload;

};

export const create = async (req, res) => {

    let data = _.cloneDeep(req.body);

    try{
        const result = await createPosition(data);
        res.json({
            success: true,
            body: result,
        });
    }
    catch(error){
        res.status(422).send({
            success:false,
            message:getErrorMessage(error)
        });
    }
    return; 


};
