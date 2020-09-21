import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import { useLocation } from "react-router-dom";

function Redirector() {
    const loc = useLocation();
    useEffect(() => {
        fetch(`http://localhost:4000/api/url${loc.pathname}`, {
            method: "GET",
        })
            //TODO: check if it's 404
            .then((r) => r.json())
            .then((res) => {
                window.location.href = res.redirectUrl;
            });
    }, []);

    return null;
}
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/*" component={Redirector} />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
