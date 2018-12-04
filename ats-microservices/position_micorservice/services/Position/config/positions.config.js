
const getConfig = ()=>{

    let env  = process.env.NODE_ENV;
    return require(`./${env}`).config;
};
const config = getConfig();
export {config};