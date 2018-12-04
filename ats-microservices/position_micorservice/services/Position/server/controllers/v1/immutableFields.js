
export const immutableFields = [
    "createdAt",
    "deleted",
    "__v",
    "_id"
];

export const removeImmutableValues =  (obj)=>{

    immutableFields.forEach((immutableField)=>{
        delete obj[immutableField];
    });
    return obj;    
};