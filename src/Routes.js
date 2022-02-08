import React from "react";
import { Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Settings from "./containers/Settings";

import Balance from "./containers/Balance";
import History from "./containers/History";
import Receive from "./containers/Receive";
import Fiat from "./containers/Fiat";
import FiatWithdraw from "./containers/FiatWithdraw";
import QR from "./containers/QR";
import Send from "./containers/Send";
import Swap from "./containers/Swap";
import SwapMake from "./containers/SwapMake";
import SwapInfo from "./containers/SwapInfo";
import SwapTake from "./containers/SwapTake";
import OTC from "./containers/OTC";

import TooOld from "./containers/TooOld";
import NotFound from "./containers/NotFound";

import settings from "/settings.js";

function Routes({ appProps }) {
  const authProp = {...appProps, ...{withOAuth: true, withMail: true, withOTP: false}}
  const otpProp = {...appProps, ...{withOAuth: false, withMail: false, withOTP: true}}
  return (
    <Switch>
      <AppliedRoute appProps={appProps} path="/" exact component={Balance} />
      <AppliedRoute appProps={otpProp} path="/login" exact component={Login} />
      <AppliedRoute appProps={authProp} path="/oauth" exact component={Login} />
      <AppliedRoute appProps={appProps} path="/signup" exact component={Signup} />
      <AppliedRoute appProps={appProps} path="/settings" exact component={Settings} />

      {/* Operations */}
      <AppliedRoute appProps={appProps} path="/balance" exact component={Balance} />
      <AppliedRoute appProps={appProps} path="/history" exact component={History} />
      <AppliedRoute appProps={appProps} path="/receive" exact component={Receive} />
      <AppliedRoute appProps={appProps} path="/fiat" exact component={Fiat} />
      <AppliedRoute appProps={appProps} path="/fiatwithdraw" exact component={FiatWithdraw} />
      <AppliedRoute appProps={appProps} path="/qr" exact component={QR} />
      <AppliedRoute appProps={appProps} path="/send" exact component={Send} />
      { settings.options.Swap && (
        <>
          <AppliedRoute appProps={appProps} path="/swap" exact component={Swap} />
          <AppliedRoute appProps={appProps} path="/swap/make" exact component={SwapMake} />
          <AppliedRoute appProps={appProps} path="/swap/info" exact component={SwapInfo} />
          <AppliedRoute appProps={appProps} path="/swap/take" exact component={SwapTake} />
        </>
        )}
      { settings.options.OTC && (
        <AppliedRoute appProps={appProps} path="/otc" exact component={OTC} />
      )}

      {/* fallback */}
      <AppliedRoute appProps={appProps} path="/tooold" exact component={TooOld} />

      { /* catch all unmatched routes */ }
      <AppliedRoute component={NotFound} />
    </Switch>
  );
}

export default Routes;
