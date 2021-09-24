import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Account from "../Account";
import Calendar from "../Calendar";
import Contact from "../Contact/index";
import NewContact from "../Contact/NewContact"
import ContactInfo from "../Contact/ContactInfo"
import Dashboard from "../Dashboard";
import Login from "../Auth";
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
        <Route path="/contact/add-contact" exact component={NewContact}/>
        <Route path="/contact/info" exact component={ContactInfo}/>

        <Route path="/calendar" exact>
          <Calendar />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Redirect to="/dashboard"></Redirect>
      </Switch>
    </React.Fragment>
  );
}

export default Content;
