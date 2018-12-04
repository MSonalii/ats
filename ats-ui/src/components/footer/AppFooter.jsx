import React, {Component} from "react";
//import "./AppFooter.css";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
    return {
        footerDiv: {
            backgroundColor: "#34485d",
            height: "1.5rem"
        },
        footer: {
            textAlign: "center",
            padding: "1.2rem",
            backgroundColor: "#273a4d",
            color: "#fff",
        },
        footerWrapper: {
            marginTop: "3rem",
        }
    };
};

class AppFooter extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.footerWrapper}>
                <div className={classes.footerDiv}>
                </div>
                <div className={classes.footer}>
                    &copy; GSPANN Technologies, Inc., 2018
                </div> 
            </div>
        );
    }   
}

export default withStyles(styles)(AppFooter);