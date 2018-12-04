import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = {
    title: {
        padding: "1rem 0rem 0rem 1rem",
    },
    typography: {
        color: "#34485D",
    }
};

function AppTitle (props) {
    const {classes} = props.classes;
    return (
        <div className={props.classes.title}>
            <Typography variant="title" className={props.classes.typography}>
                {props.name} Position
            </Typography>
        </div>
    );
}

export default withStyles(styles)(AppTitle);