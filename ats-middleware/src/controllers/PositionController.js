
import superagent from "superagent";
const POSITION_MICRO_SERVICE_HOST = "http://0.0.0.0:3012";
const NAME_SPACE = "api";
const POSITION_API_VERSION = "v1";
const POSITION_API_NAME = "positions";
const PRACTICE_API_NAME = "practice";

const getAddressOfPositionAPI = () =>{
	return `${POSITION_MICRO_SERVICE_HOST}/${NAME_SPACE}/${POSITION_API_VERSION}/${POSITION_API_NAME}`;
};

const getAddressOfPracticeAPI = () =>{
	return `${POSITION_MICRO_SERVICE_HOST}/${NAME_SPACE}/${POSITION_API_VERSION}/${PRACTICE_API_NAME}`;
};
const addPosition = async (req, res) => {
  
	try {
     
		let result = await _addPostion(req.body);
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

const _addPostion = (body = {}) => {
	let address = getAddressOfPositionAPI();
	return superagent.post(address)
		.send(body);
};

const getPositions = async(req, res) => {
	try {

		let result =  await _getPositions(req.query);
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

const _getPositions = (query = {}) =>{
	let address = getAddressOfPositionAPI();
	return superagent.get(address)
		.query(query);
    
};

const getPositionById = async (req, res) => {
	let positionId = req.params.positionId; 
	try {
        
		let result =  await _getPositionById(positionId);
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

const _getPositionById = (id) => {
	if( !id){
		return Promise.reject("Id is not provided");
	}
	let address = `${getAddressOfPositionAPI()}/${id}`;
	return superagent.get(address);
};

const updatePosition = async (req, res) => {
	let positionId = req.params.positionId;
	let data = req.body;  
	try {
        
		let result =  await _updatePosition(positionId, data);
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

const _updatePosition = (id, data = {}) => {
	if( !id){
		return Promise.reject("Id is not provided");
	}
	let address = `${getAddressOfPositionAPI()}/${id}`;
	return superagent.put(address).send(data);
};

const deletePosition = async(req, res) => {
	let positionId = req.params.positionId; 
	try {
        
		let result =  await _deletePosition(positionId);
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

const _deletePosition = (id) =>{
	if( !id ){
		return Promise.reject("Id is not Provided");
	}
	let address = `${getAddressOfPositionAPI()}/${id}`;
	return superagent.del(address);
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

export {addPosition, getPositions, getPositionById, updatePosition, deletePosition,getPracticeNames};