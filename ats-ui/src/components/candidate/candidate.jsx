import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import Navigation from "../menu/Navigation";
import Logout from "../logout/logout";
import Loader from "../../components/loader/loader";

const styles = theme => {
    return  {
        candidateMsg:{
            textAlign:"center"
        }
    };
};
class Candidate extends Component {
    render() {
        const { classes } = this.props;
        if(this.props.keycloak) {
	        if(this.props.keycloak.authenticated) return (
                <div>
                    <Logout keycloak={this.props.keycloak} />
                    <Navigation value={2} keycloak={this.props.keycloak}/>
                    <h4 className={classes.candidateMsg}>Candidate page is under progress.</h4>
                </div>
            );else return (<div>Unable to authenticate!</div>);
        } else return (<Loader />);
    }
}

export default withStyles(styles)(Candidate);