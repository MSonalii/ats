import {
	addPosition,
	getPositionById,
	getPositions,
	updatePosition,
	deletePosition
} from "../controllers/PositionController";
import {getPracticeNames} from "../controllers/PracticeController";
import {
	addTechnology,
	getTechnology,
	getTechnologyByName
} from "../controllers/TechnologyController";

const routes = (app, keycloak) => {
	app.route("/position")
		.all(keycloak.protect())
		.get(getPositions)
		.post(addPosition);

	app.route("/position/:positionId")
		.all(keycloak.protect())
		.get(getPositionById)
		.put(updatePosition)
		.delete(deletePosition);

	app.route("/technology/:techname")
		.all(keycloak.protect())
		.get(getTechnologyByName);
	app.route("/technology")
		.all(keycloak.protect())
		.get(getTechnology)
		.post(addTechnology);
	app.route("/practice")
		.all(keycloak.protect())
		.get(getPracticeNames);
};

export default routes;