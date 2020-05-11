import React, { useState, useEffect } from 'react';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';
import SideShiftLogo from "/img/sideshift.png";

import "./Receive.css";

import * as bank_api from "/js/bank-api.min.js";

const FiatIcon = (account) => {
  const icon = account.icon;
  const isCrypto = account.isCrypto;
  const displayName = account.displayName;
  const linkTo = {
    pathname: isCrypto ? '/qr' : '/fiat',
    state: account
  };

  return (
    <div className='row'>
      <Link to={linkTo}>
        <img className="TickerIcon" src={'data:image/png;base64,'+icon} />
        <p>{displayName}</p>
      </Link>
    </div>
  )
}

const Receive = (props) => {
  const isAuthenticated = props.isAuthenticated
  const [accountsFiat, setAccountsFiat] = useState([]);
  const [accountsCrypto, setAccountsCrypto] = useState([]);
  const [accountsAsset, setAccountsAsset] = useState([]);

  useEffect(() => {
    if ((accountsFiat.length + accountsCrypto.length) == 0) {   
      // fetch accounts info
      bank_api.accountList({ rateBase: "CHF" }, (err, result) => {
        if (err) {
          console.error("accountList failed", err)
          return
        }

        // construct table data source
        var id = 0;
        var entriesCrypto = [];
        var entriesFiat = [];
        var entriesAsset = [];
        result.accounts.forEach(account => {
          // flatten nested data
          account["id"] = id++;
          account["isCrypto"] = account.curency.isCrypto;
          account["displayName"] = account.curency.displayName;
          if (!account.curency.displayName) {
            account["displayName"] = "No Name"
          }
          account["icon"] = account.curency.icon

          // skip asset related account
          if (account.curency.isAsset && account.curency.ticker != "TBTC") {
            if (account.curency.displayName || account.curency.icon) {
              if (account.curency.icon) {
                entriesAsset.push(account);
                return
              } else {
                return
              }
            } else {
              return
            }
          }

          if (account.curency.isCrypto) {
            entriesCrypto.push(account);
          } else {
            entriesFiat.push(account);
          }
        });

        setAccountsFiat(entriesFiat);
        setAccountsCrypto(entriesCrypto);
        setAccountsAsset(entriesAsset);
      });
    }
  }, [accountsFiat, accountsCrypto, accountsAsset]);

  return (
    <div className="Receive">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1>Receive funds</h1>
            <div>&nbsp;</div>
            <h2>Fiat</h2>
            <div className='rows'>
              {accountsFiat.map(account => {
                return FiatIcon(account);
              })}
            </div>
            <h2>Crypto</h2>
            <div className='rows'>
              {accountsCrypto.map(account => {
                return FiatIcon(account);
              })}
            </div>
            <h2>Asset</h2>
            <div className='rows'>
              {accountsAsset.map(account => {
                return FiatIcon(account);
              })}
            </div>
            <div className="sideshift">
              <a className="Link" href="https://sideshift.ai/a/SpUXYDG9v" target="_blank" rel="noopener noreferrer">
              Shift some L-BTC<Image src={SideShiftLogo} />
              </a>
            </div>
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

Receive.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Receive.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default Receive;
