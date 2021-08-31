import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Calendar from "./pages/Calendar/Calendar";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/calendar" exact>
            <Calendar />
          </Route>
          <Redirect to="/home"></Redirect>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
