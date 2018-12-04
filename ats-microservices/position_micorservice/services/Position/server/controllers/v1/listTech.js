/**
 * Module dependencies
 */

import mongoose from "mongoose";

let Technology = mongoose.model("Technology");

export const listTech = async (req,res) =>{
    try {
        const result = await Technology.find({}).select("technology");

        res.json({
            success: true,
            body: {
                data: result
            },      
        });
        return;
    } catch (error) {
        res.status(422).send({
            success:false,
            reason: error
        });
        return;
        
    }
};
  
