import React from "react";
import { Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Settings from "./containers/Settings";

import Balance from "./containers/Balance";
import History from "./containers/History";
import Receive from "./containers/Receive";
import Fiat from "./containers/Fiat";
import QR from "./containers/QR";
import Send from "./containers/Send";

import TooOld from "./containers/TooOld";
import NotFound from "./containers/NotFound";

function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute appProps={appProps} path="/" exact component={Home} />
      <AppliedRoute appProps={appProps} path="/login" exact component={Login} />
      <AppliedRoute appProps={appProps} path="/signup" exact component={Signup} />
      <AppliedRoute appProps={appProps} path="/settings" exact component={Settings} />

      {/* Operations */}
      <AppliedRoute appProps={appProps} path="/balance" exact component={Balance} />
      <AppliedRoute appProps={appProps} path="/history" exact component={History} />
      <AppliedRoute appProps={appProps} path="/receive" exact component={Receive} />
      <AppliedRoute appProps={appProps} path="/fiat" exact component={Fiat} />
      <AppliedRoute appProps={appProps} path="/qr" exact component={QR} />
      <AppliedRoute appProps={appProps} path="/send" exact component={Send} />

      {/* fallback */}
      <AppliedRoute appProps={appProps} path="/tooold" exact component={TooOld} />

      { /* catch all unmatched routes */ }
      <AppliedRoute component={NotFound} />
    </Switch>
  );
}

export default Routes;
