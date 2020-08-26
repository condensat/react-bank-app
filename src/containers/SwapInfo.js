import React, { useState } from 'react';
import { Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';
import SwapInfoIcon from '@material-ui/icons/SwapHoriz';
import SwapMakeIcon from '@material-ui/icons/Publish';
import SwapTakeIcon from '@material-ui/icons/GetApp';

import * as bank_api from "/js/bank-api.min.js";

import "./SwapInfo.css";

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

const SwapInfo = (props) => {
  const isAuthenticated = props.isAuthenticated
  // const {pathname} = props.location

  const [payload, setPayload] = useState("");
  const [swapId, setSwapId] = useState("");
  const [swapInfo, setSwapInfo] = useState(null);
  const [hasSwapInfo, setHasSwapInfo] = useState(false);

  const validateForm = () => {
    return payload.length > 0 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (payload.length == 0) {
      console.log("empty payload");
      return
    }
    // call bank swap api
    bank_api.swapInfo({payload}, (err, result) => {
      if (err) {
        console.error("swapInfo failed", err);
        return;
      }
      const sId = result.swapId ? result.swapId : "no swapId";
      const info = result.info ? result.info : result;
      const valid = info && info.legs && info.legs.length==2;

      setSwapId(sId);
      setSwapInfo(info);
      setHasSwapInfo(valid);
    })
  };

  const pathFromStatus = (status) => {
    switch (status) {
      case "proposed":
        return '/swap/take'

      case "accepted":
        return '/swap/make'      
    }
    
    return ""
  }

  const DisplayActions = () => {
    const linkTo = {
      pathname: pathFromStatus(swapInfo.status),
      state: {swapId, swapInfo}
    };

    return (
      <div className="SwapAction">
        {swapInfo.status=="proposed"
          ?
            <Link to={linkTo}>
              <SwapTakeIcon className="SwapIcon" /> Accept Proposal
            </Link>
          : <></>
        }
        {swapInfo.status=="accepted"
          ?
            <Link to={linkTo}>
              <SwapMakeIcon className="SwapIcon" /> Finalize Offer
            </Link>
          : <></>
        }
      </div>
    )
  }

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
             {DisplayActions()}
          </div>
          : <></>
        }
      </div>
    )
  }

  const DisplayFormSwap = () => {
    return (
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="12" controlId="swapPayload">
            <Form.Control as="textarea" rows="8" placeholder="Past your swap payload here" onChange={e => setPayload(e.target.value)} />
          </Form.Group>
        </Form.Row>
        <Button className="btn btn-light" disabled={!validateForm()} type="submit">Submit</Button>
      </Form>
    )
  }

  return (
    <div className="SwapInfo">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1><SwapInfoIcon className="Icon" /> Liquid Swap information</h1>
            {hasSwapInfo
              ? DisplaySwapInfo()
              : DisplayFormSwap()
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

SwapInfo.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.bool.isRequired
};

SwapInfo.defaultProps = {
  history: [],
  isAuthenticated: false,
  location: "localtion_not_found"
};

export default SwapInfo;
