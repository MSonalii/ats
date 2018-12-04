
import Server from "../../base-server/index";
import "./server/models/position.model";
import "./server/models/technology.model";
import "./server/models/user.model";
import { routes } from "./server/routes/position.routes";
import { config } from "./config/positions.config";
import Logger from "../../base-server/lib/logger";




const configureAndStartBaseServer = async() =>{

    try {

        let baseServer = new Server(config);
        
        //let [db, app] = await baseServer.start(routes);
        // use db to make changes to database connection
        // use app to make any further changes to application
		
        await baseServer.start(routes);
        
    } catch (error) {
        Logger.info(error);    
    }


};
configureAndStartBaseServer();
export default configureAndStartBaseServer;