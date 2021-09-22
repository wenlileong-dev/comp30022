import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Account from "../Account";
import Calendar from "../Calendar.jsx";
import Contact from "../Contact";
import Dashboard from "../Dashboard";
function Content() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/account" exact>
          <Account />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
        <Route path="/calendar" exact>
          <Calendar />
        </Route>
        <Redirect to="/dashboard"></Redirect>
      </Switch>
    </React.Fragment>
  );
}

export default Content;
