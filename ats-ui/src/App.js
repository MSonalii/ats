import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import AddPosition from "./position/createPosition/AddPosition";
import PositionDetails from "./position/positionDetails/PositionDetails";
import PositionList from "./position/positionList/PositionList";
import UpdatePosition from "./position/createPosition/UpdatePosition";
import candidate from "./components/candidate/candidate";
import home from "./components/home/home";
import Navigation from "./components/menu/Navigation";
import Keycloak from "keycloak-js";
import Loader from "./components/loader/loader";
import mapping from "./RoleMapping.js";
import NotFoundPage from "../src/components/NotFoundPage/NotFoundPage";
import CopyPosition from "./position/copyPosition/CopyPosition";
const PrivateRoute = ({ component: Component, ...rest, state: state, data: data }) => (
    <Route {...rest} render={(props) => (
        state.authenticated === true && isAllowed(data, state)
            ? <Component {...props} keycloak={state} />
            : <Redirect to='/access-denied' />
    )} />
);

function isAllowed(component, keycloak) {
    var isAllowedAccess = false;
    keycloak.tokenParsed.resource_access.ATS.roles.forEach(function(roles, index) {
        if (mapping[component] && mapping[component].indexOf(roles) !== -1) {
            isAllowedAccess = true;
        }
    });
    return isAllowedAccess;
}
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keycloak: null,
            authenticated: false
        };
    }
    componentDidMount() {
        const keycloak = Keycloak("/keycloak.json");
        keycloak.init({onLoad: "login-required"}).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated });
        });
    }

    render() {
        if(this.state.keycloak) {
	        if(this.state.authenticated) return (
                <Router>
                    <div>
                        <Route path="/access-denied" exact component={NotFoundPage} />
                        <PrivateRoute path="/" exact component={home} state={this.state.keycloak} data={"Home"}/>
                        <PrivateRoute path="/home" exact component={home} state={this.state.keycloak} data={"Home"}/>
                        <PrivateRoute path="/positions" exact component={PositionList} state={this.state.keycloak} data={"Position"} />
                        <PrivateRoute path="/candidate" exact component={candidate} state={this.state.keycloak} data={"Candidate"}/>
                        <PrivateRoute
                            path="/positions/add"
                            exact
                            component={AddPosition}
                            state={this.state.keycloak} data={"CreatePosition"}
                        />
                        <PrivateRoute
                            path="/positions/:id/edit"
                            exact
                            component={UpdatePosition}
                            state={this.state.keycloak} data={"EditPosition"}
                        />
                        <PrivateRoute
                            path="/positions/:id/details"
                            exact
                            component={PositionDetails}
                            state={this.state.keycloak} data={"ViewPosition"}
                        />
                        <PrivateRoute
                            path="/copyPosition"
                            exact
                            component={CopyPosition}
                            state={this.state.keycloak} data={"CopyPosition"}
                        />
                    </div>
                </Router>
            ); else return (<div>Unable to authenticate!</div>);
        } else return (<Loader />);
    }
}

export default App;
