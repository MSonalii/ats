import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
    return  {
        notAuthorizedMsg:{
            textAlign:"center"
        }
    };
};
class NotFoundPage extends Component {
    render() {
        const { classes } = this.props;
	        return (
            <div>
                <h4 className={classes.notAuthorizedMsg}>You are not authorized, please contact ATS admin.</h4>
            </div>
        );
    }
}

export default withStyles(styles)(NotFoundPage);