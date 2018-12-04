import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    loader: {
        margin: "0.75rem 1rem",
        textAlign: "center"
    }
};

class Loader extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.loader}>
                <CircularProgress className={classes.progress} size={50} />
            </div>
        );
    }
}

export default withStyles(styles)(Loader);
