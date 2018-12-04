/**
 * Module dependencies
 */

import {getErrorMessage} from "./errorHandler";
import mongoose from "mongoose";
let Technology = mongoose.model("Technology");


const findTecnology =  (technology) => {
    var regex = new RegExp(technology, "i");
    let params = {
        $or: [
            { "technology": regex },
        ]
    };
    return Technology.find(params).select("technology");
};
export const getTech = async (req, res) => {
  

    const technology = req.params.technology;  
    try {
        let result = await findTecnology(technology);
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
  
