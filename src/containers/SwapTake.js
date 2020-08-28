import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';
import SwapTakeIcon from '@material-ui/icons/GetApp';
import SwapInfoIcon from '@material-ui/icons/SwapHoriz';

// import * as bank_api from "/js/bank-api.min.js";

import "./SwapTake.css";

const DisplaySwapLeg = (side, leg) => {
  return (
    <div className="SwapDetailsLeg">
      <h3>{side}</h3>
      <ul>
        <li>Incoming: {leg.incoming ? "yes" : "no"}</li>
        <li>Funded: {leg.funded ? "yes" : "no"}</li>
        <li>Asset: {leg.asset}</li>
        <li>Amount: {leg.amount}</li>
        <li>Fee: {leg.fee}</li>
      </ul>
    </div>
  )
}

const SwapTake = (props) => {
  const isAuthenticated = props.isAuthenticated
  // const {pathname} = props.location

  const location = useLocation();
  const swap = location.state ? location.state : {swapId: "", swapInfo: {}};

  const [swapId] = useState(swap.swapId);
  const [swapInfo] = useState(swap.swapInfo);
  const valid = swapInfo && swapInfo.legs && swapInfo.legs.length==2;

  const [hasSwapInfo] = useState(valid);

  const DisplaySwapInfo = () => {
    return (
      <div className="SwapDetails">
        {hasSwapInfo
          ?
          <div>
             <h2>SwapId: {swapId}</h2>
             <h3>status: {swapInfo.status}</h3>
             {DisplaySwapLeg("Receive", swapInfo.legs[0])}
             {DisplaySwapLeg("Send", swapInfo.legs[1])}
          </div>
          : <></>
        }
      </div>
    )
  }

  return (
    <div className="SwapTake">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1><SwapTakeIcon className="Icon" /> Accept Proposal</h1>
            {hasSwapInfo
              ? DisplaySwapInfo()
              : 
              <>
                <h2>Proposal not Found</h2>
                <Link to={{
                  pathname: '/swap/info',
                  state: ""
                  }}>
                  <SwapInfoIcon className="SwapIcon" /> Import Proposal
                </Link>
              </>
            }
          </>
        : <>
            <div className="Login">
              <Link to="/login">
                <h2><LoginIcon className="Icon Link" />Login</h2>
              </Link>
            </div>
          </>
      }
      </div>
    </div>
  );
}

SwapTake.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.bool.isRequired
};

SwapTake.defaultProps = {
  history: [],
  isAuthenticated: false,
  location: "localtion_not_found"
};

export default SwapTake;
