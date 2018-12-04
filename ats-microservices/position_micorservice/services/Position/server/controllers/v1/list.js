/**
 * Module dependencies
 */

import _ from "lodash";
import mongoose from "mongoose";

let Position = mongoose.model("Position");
const DEFAULT_PAGE_SIZE = 5;
const DEFAULT_OFFSET = 0;
const DEFAULT_PROJECTION = {
    __v    : false
};




const getParameters = (req)=>{
    let query = getQueryParameters(req);
    let [offset, pageSize] = getOffsetAndPageSize(req);
    return [query, offset, pageSize];
};

const filterAndProjectList = (query = {}, projection = {}, offset = DEFAULT_OFFSET, pageSize = DEFAULT_PAGE_SIZE) => {
    let countPromise = Position.count(query);
    let findPromise = Position.find(query, projection).populate("technology","technology").collation({ locale: "en" }).sort({"lastUpdatedAt" : -1}).skip(offset).limit(pageSize);
    return Promise.all([countPromise, findPromise]);
  
};

const getOffsetAndPageSize = (req)=>{
    let params = req.query;
    return [parseInt(params.offset || DEFAULT_OFFSET), parseInt(params.pageSize || DEFAULT_PAGE_SIZE)];

};

const getQueryParameters = (req) =>{

    let params = req.query || {};
    let query = params.query || {};  
    query = _.isString(query) ? JSON.parse(query) : query;
    return query;
};


export const list = async (req, res) => {

    
    let projection = DEFAULT_PROJECTION;


    try {
        let [queryParams, offset, pageSize ] = getParameters(req);
        const result = await filterAndProjectList(queryParams, projection, offset, pageSize);

        res.json({
            success: true,
            body: {
                totalCount: result[0],
                data: result[1]
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
  
