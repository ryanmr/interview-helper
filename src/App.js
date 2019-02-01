import React, { Component } from "react";
import { AppNavigation } from "./components/AppNavigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { LandingScreen } from "./screens/landing/LandingScreen";
import { TechnicalResponseScreen } from "./screens/tech-response/TechnicalResponseScreen";
import { AboutScreen } from "./screens/static/AboutScreen";

function App() {
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/app">
          <>
            <AppNavigation />
            <Switch>
              <Route
                path="/app/technical-response"
                component={TechnicalResponseScreen}
              />
            </Switch>
          </>
        </Route>

        <Route path="/static">
          <>
            <AppNavigation />
            <Switch>
              <Route path="/static/about" component={AboutScreen} />
            </Switch>
          </>
        </Route>

        <Route path="/" exact component={LandingScreen} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
