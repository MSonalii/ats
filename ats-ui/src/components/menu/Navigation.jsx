import React, { Component } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import mapping from "../../RoleMapping.js";

const styles = theme => {
    return  {
        root: {
            flexGrow: 1,
        },
        tab:{
            textTransform:"none",
            color: theme.palette.common.white,
	    fontSize:15
        },
        tabs: {
            backgroundColor: "#34485d",
        }
    };
};

const theme = createMuiTheme({
    palette: {
        primary: { main: "#fff" },
        secondary: { main: "#ff9060" }
    },
});
function isAllowed(component,keycloak) {
    var isAllowedAccess = false;
    keycloak.tokenParsed.resource_access.ATS.roles.forEach(function (roles, index) {
        if (mapping[component] && mapping[component].indexOf(roles) !== -1) {
            isAllowedAccess = true;
        }
    });
    return isAllowedAccess;
}
class Navigation extends Component {
    state = {
    	value: 1
    };

    handleChange = (event, value) => {
    	this.setState({ value });
    };
    render() {
        const { classes } = this.props;
	
        const Root = props => {return <Link to="/home" {...props} />;};
        const List = props => {return <Link to="/positions" {...props} />;};
        const Candidate = props => {return <Link to="/candidate" {...props} />;};
        
        return (
            <MuiThemeProvider theme={theme}>
                <Paper>
                    <Tabs
                        value={this.props.value}
                        onChange={this.handleChange}
                        className={classes.tabs}
                        indicatorColor="secondary"
                    >
                        {isAllowed("Home",this.props.keycloak) ?
                    	    <Tab component={Root} label={<span className={classes.tab}>Home</span>}/>
                            : null}
                        {isAllowed("Position",this.props.keycloak) ?
                    	    <Tab component={List} label={<span className={classes.tab}>Positions</span>}/>
                            : null}
                        {isAllowed("Candidate",this.props.keycloak) ?
                            <Tab component={Candidate} label={<span className={classes.tab}>Candidate</span>}/>
                            : null}
                    </Tabs>
                </Paper>
            </MuiThemeProvider>
    	);
    }
}
export default withStyles(styles)(Navigation);