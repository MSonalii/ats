"use strict";

/**
 * Module dependencies
 */
import  { isAllowed }from "../policies/position.policy";
import { list, create, read, update, remove} from "../controllers/v1/position.controller";
import { createTech, getTech, listTech } from "../controllers/v1/technology.controller";
import { loginUser } from "../controllers/v1/login.controller";

export const routes = (app)  => {
 
    app.route("/api/v1/positions").all(isAllowed)
        .get(list)
        .post(create);

    app.route("/api/v1/positions/:positionId").all(isAllowed)
        .get(read)
        .put(update)
        .delete(remove);

    app.route("/api/v1/technology").all(isAllowed)
        .get(listTech)
        .post(createTech);
	
    app.route("/api/v1/login").all(isAllowed)
        .post(loginUser);
  
    app.route("/api/v1/technology/:technology").all(isAllowed)
        .get(getTech);
};
