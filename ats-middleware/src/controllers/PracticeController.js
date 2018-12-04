
import superagent from "superagent";
const PRACTICE_MICRO_SERVICE_HOST = "http://0.0.0.0:3013";
const NAME_SPACE = "api";
const PRACTICE_API_VERSION = "v1";
const PRACTICE_API_NAME = "practice";

const getAddressOfPracticeAPI = () =>{
	return `${PRACTICE_MICRO_SERVICE_HOST}/${NAME_SPACE}/${PRACTICE_API_VERSION}/${PRACTICE_API_NAME}`;
};

const getPracticeNames = async(req,res) =>{
	try {
		let result =  await _getPracticeNames(req.query);
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

const _getPracticeNames = (query = {}) =>{
	let address = getAddressOfPracticeAPI();
	return superagent.get(address)
		.query(query);
    
};

export {getPracticeNames};