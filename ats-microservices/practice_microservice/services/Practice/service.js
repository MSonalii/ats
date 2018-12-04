
import Server from "../../base-server/index";
import "./server/models/practice.model";
import { routes } from "./server/routes/practice.routes";
import { config } from "./config/practice.config";
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