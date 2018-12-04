import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import "./AppHeader.css";

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
    }
};

class AppHeader extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <img
                    src="../../images/GSPANN_Logo_White.png"
                    className={classes.logo}
                    alt="Gspann Logo"
                />
            </div>
        );
    }
}

export default withStyles(styles)(AppHeader);
