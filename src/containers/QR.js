import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import QRCode from "qrcode-react";
import PropTypes from "prop-types";

import CondensatLogo from "/img/condensat.png";
import DepositIcon from '@material-ui/icons/CenterFocusWeak';

import "./QR.css";

import * as bank_api from "/js/bank-api.min.js";

var apiNexDeposit = (accountId, callback) => {
  bank_api.walletNextDeposit({ accountId }, callback);
}

const QR = (props) => {
  const isAuthenticated = props.isAuthenticated
  const [nextDeposit, setNextDeposit] = useState();
  const [addressNotAvailable, setAddressNotAvailable] = useState("");

  const location = useLocation();
  const deposit = location.state ? location.state : {accountId: "", currency: ""};

  const currency = deposit.currency;
  const publicAddress = nextDeposit ? nextDeposit.publicAddress : "";
  const url = nextDeposit ? nextDeposit.url : "";

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
  })

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
            <Link className="Link back" to="/receive"><DepositIcon className="Icon" />Receive</Link>
            <h1>Deposit {currency}</h1>
            {publicAddress
              ? <div className="Center">
                <QRCode size="172" logo={CondensatLogo} logoWidth="30" value={{url}} />
                <p />
                <a className="Link" href={url} target="_blank" rel="noopener noreferrer">{publicAddress}</a>
              </div>
              : <>{addressNotAvailable}</>
            }
        </>
        : <></>
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
