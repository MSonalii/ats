import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AppHeader from "./components/header/AppHeader";
import AppFooter from "./components/footer/AppFooter";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<AppHeader />, document.getElementById("header")  || document.createElement("div"));
ReactDOM.render(<App />, document.getElementById("container")  || document.createElement("div"));
ReactDOM.render(<AppFooter />, document.getElementById("footer")  || document.createElement("div"));
registerServiceWorker();
if(process.env.NODE_ENV == "development"){
    module.hot.accept();
}