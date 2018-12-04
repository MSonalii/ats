import superagent from "superagent";
const POSITION_MICRO_SERVICE_HOST = "http://0.0.0.0:3012";
const NAME_SPACE = "api";
const POSITION_API_VERSION = "v1";
const POSITION_API_NAME = "technology";

const getAddressOfPositionAPI = () =>{
	return `${POSITION_MICRO_SERVICE_HOST}/${NAME_SPACE}/${POSITION_API_VERSION}/${POSITION_API_NAME}`;
};
const addTechnology = async (req, res) => {
  
	try {
     
		let result = await _addTecnology(req.body);
		let text = result.text || JSON.stringify({});
		return res.json(JSON.parse(text));

	} catch (error) {

		let errorText;
		if(error.response){
			errorText = error.response.text || JSON.stringify({});
		}
		let err = errorText ? JSON.parse(errorText) : error;
		let errorStatus = error.status || 442;
		return res.status(errorStatus).send(err);
        
	}

};

const _addTecnology = (body = {}) => {
	let address = getAddressOfPositionAPI();
	return superagent.post(address)
		.send(body);
};
const getTechnology = async(req, res) => {   
	try {

		let result =  await _getTechnology();
		let text = result.text || JSON.stringify({});
		return res.json(JSON.parse(text));

	} catch (error) {
		let errorText;
		if(error.response){
			errorText = error.response.text || JSON.stringify({});
		}
		let err = errorText ? JSON.parse(errorText) : error;
		let errorStatus = error.status || 442;
		return res.status(errorStatus).send(err);        
	} 
};

const _getTechnology = (query = {}) =>{
	let address = getAddressOfPositionAPI();
	return superagent.get(address)
		.query(query);
    
};
const getTechnologyByName = async (req, res) => {
	let techname = req.params.techname; 
	try {
        
		let result =  await _getTechnologyByName(techname);
		let text = result.text || JSON.stringify({});
		return res.json(JSON.parse(text));

	} catch (error) {
		let errorText;
		if(error.response){
			errorText = error.response.text || JSON.stringify({});
		}
		let err = errorText ? JSON.parse(errorText) : error;
		let errorStatus = error.status || 442;
		return res.status(errorStatus).send(err);        
	} 
};

const _getTechnologyByName = (techname) => {
	if( !techname){
		return Promise.reject("Id is not provided");
	}
	let address = `${getAddressOfPositionAPI()}/${techname}`;
	return superagent.get(address);
};
export {addTechnology, getTechnology,getTechnologyByName};