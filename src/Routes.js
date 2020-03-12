import React from "react";
import { Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import TooOld from "./containers/TooOld";

function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute appProps={appProps} path="/" exact component={Home} />
      <AppliedRoute appProps={appProps} path="/login" exact component={Login} />
      <AppliedRoute appProps={appProps} path="/tooold" exact component={TooOld} />

      { /* catch all unmatched routes */ }
      <AppliedRoute component={NotFound} />
    </Switch>
  );
}

export default Routes;
