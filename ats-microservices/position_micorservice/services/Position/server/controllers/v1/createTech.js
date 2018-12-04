/**
 * Module dependencies
 */

import {getErrorMessage} from "./errorHandler";
import _ from "lodash";
import mongoose from "mongoose";
let Technology = mongoose.model("Technology");

const createTechnology = (data) =>{

    return new Technology(data).save();
};

export const createTech= async (req, res) => {
    try{
        let data = _.cloneDeep(req.body);
        
        const result = await createTechnology(data);
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
