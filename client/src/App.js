import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "./pages/Home/Navigation";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navigation />
      </Router>
    </React.Fragment>
  );
}

export default App;
