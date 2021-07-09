import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Main from "./pages/Main/Main";

function App() {
  return (
    <React.Fragment>
      <Router>
        <h1>Time Balancing App</h1>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/">
            <Main />
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
