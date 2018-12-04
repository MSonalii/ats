import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = {
    logo: {
        width: 200,
        height: 50,
        margin: "0.75rem 1rem"
    },
    logout: {
        float:"right",
        margin: "0.75rem 1rem",
        color:"#adb5be",
        textDecoration: "none",
    },
    logoutContainer:{
        position: "absolute",
        top: 0,
        right: 0
    }
};

class Logout extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.logoutContainer}>
                <Button onClick={this.props.keycloak.logout} className={classes.logout}>Logout</Button>
            </div>
        );
    }
}

export default withStyles(styles)(Logout);
