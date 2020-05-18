import React from 'react';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';
import SWIFTLogo from "/img/SWIFT.png";
import SEPALogo from "/img/SEPA.png";
import swapLogo from "/img/swap.png";
import p2epLogo from "/img/p2ep.png";
import LedgerIcon from "/img/LedgerIcon.png";


import "./Send.css";

const Send = (props) => {
  const isAuthenticated = props.isAuthenticated


  return (
    <div className="Send">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1>Fiat Withdrawal</h1>
            <div className="rows">
              <div className="row method"><Image src={SEPALogo} /></div>
              <div className="row method"><Image src={SWIFTLogo} /></div>
            </div>
            <h1>Crypto</h1>
            <div className="rows">
            <div className="row method"><Image src={LedgerIcon} rounded /><p>Ledger</p></div>
            <div className="row method"><Image src={swapLogo} rounded /><p>Liquid Swap</p></div>
            <div className="row method"><Image src={p2epLogo} rounded /><p>Pay to EndPoint</p></div>
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

Send.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Send.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default Send;
