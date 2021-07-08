import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./pages/Home/Home";

function App() {
  return (
    <React.Fragment>
      <Router>
        <h1>This is my time balancing app</h1>
        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Redirect to="/home"></Redirect>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
