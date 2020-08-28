import React, { useState, useEffect } from 'react';
import { Image, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import QRCode from "qrcode-react";
import PropTypes from "prop-types";

import CondensatLogo from "/img/condensat.png";
import LoginIcon from '@material-ui/icons/FingerprintOutlined';
import SideShiftLogo from "/img/sideshift.png";

import "./QR.css";

import * as bank_api from "/js/bank-api.min.js";

var apiNexDeposit = (accountId, callback) => {
  bank_api.walletNextDeposit({ accountId }, callback);
}

const assetIcon = (base64) => {
  if (base64) {
    const data = 'data:image/png;base64,'+base64;
    return (
      <img className="TickerIcon" src={data} />
    )
  }
  return ""
}

const QR = (props) => {
  const isAuthenticated = props.isAuthenticated
  const [nextDeposit, setNextDeposit] = useState();
  const [addressNotAvailable, setAddressNotAvailable] = useState("");

  const location = useLocation();
  const deposit = location.state ? location.state : {accountId: "", displayName: "", icon: null};

  const displayName = deposit.displayName;
  const qrIcon = CondensatLogo
  const publicAddress = nextDeposit ? nextDeposit.publicAddress : "";
  const url = nextDeposit ? nextDeposit.url : "";

  useEffect(() => {
    if (!nextDeposit) {   
      // fetch nextDeposit from api
      apiNexDeposit(deposit.accountId, (err, result) => {
        if (err) {
          console.error("apiNexDeposit failed", err)
          setAddressNotAvailable("Address not available")
          return
        }
        setNextDeposit(result)
      });
    }
  }, [nextDeposit, addressNotAvailable]);

  return (
    <div className="QR">
      <div className="lander">
      {isAuthenticated
        ? <>
            <a className="Link back" onClick={props.history.goBack}>Back</a>
            <h1>{assetIcon(deposit.icon)} Deposit {displayName}</h1>
            {publicAddress
              ? <div className="Center">
                <QRCode size="128" renderAs="svg" level="M" logo={qrIcon} logoWidth="24" value={publicAddress} />
                <p />
                <a className="Link" href={url} target="_blank" rel="noopener noreferrer">{publicAddress}</a>
                <p />
                <Alert key="beta-id" variant="danger">We are still in <Alert.Link href="#">Beta</Alert.Link>, please use with care</Alert>
                <div className="sideshift">
                  <a className="Link" href="https://sideshift.ai/a/SpUXYDG9v" target="_blank" rel="noopener noreferrer">
                    Shift some L-BTC<Image src={SideShiftLogo} />
                  </a>
                </div>
              </div>

              : <>{addressNotAvailable}</>
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

QR.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

QR.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default QR;
