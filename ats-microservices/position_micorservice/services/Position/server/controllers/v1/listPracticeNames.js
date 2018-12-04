/**
 * Module dependencies
 */

import mongoose from "mongoose";

let Practice = mongoose.model("practice");
export const listPracticeNames = async (req,res) =>{
    try {
        const result = await Practice.find({}).select("Name");
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
  
