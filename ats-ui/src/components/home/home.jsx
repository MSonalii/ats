import React, {Component} from "react";
import { withStyles } from "@material-ui/core/styles";
import Navigation from "../menu/Navigation";
import Logout from "../logout/logout";
import Loader from "../../components/loader/loader";

const styles = theme => {
    return  {
        homeMsg:{
            textAlign:"center"
        }
    };
};
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keycloak: null,
            authenticated: false
        };
    }

    render() {
        const { classes } = this.props;
        if(this.props.keycloak) {
	        if(this.props.keycloak.authenticated) return (
                <div>
                    <Logout keycloak={this.props.keycloak} />
                    <Navigation value={0} keycloak={this.props.keycloak}/>
                    <h4 className={classes.homeMsg}>Home page is under progress.</h4>
                </div>
            );else return (<div>Unable to authenticate!</div>);
        } else return (<Loader />);
    }
}

export default withStyles(styles)(Home);