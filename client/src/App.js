import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Account from "./pages/Account";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/account" exact>
            <Account />
          </Route>
          <Route path="/calendar" exact>
            <Calendar />
          </Route>
          <Route path="/contact" exact>
            <Contact />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Redirect to="/dashboard"></Redirect>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
