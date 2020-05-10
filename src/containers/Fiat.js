import React from 'react';
import { Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import SWIFTLogo from "/img/SWIFT.png";
import SEPALogo from "/img/SEPA.png";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import "./Fiat.css";

const Fiat = (props) => {
  const isAuthenticated = props.isAuthenticated

  const location = useLocation();
  const deposit = location.state ? location.state : {accountId: "", displayName: "", icon: null};

  const displayName = deposit.displayName;

  return (
    <div className="Fiat">
      <div className="lander">
      {isAuthenticated
        ? <>
            <a className="Link back" onClick={props.history.goBack}>Back</a>
            <h1>Fiat Withdrawal {displayName}</h1>
            <div className="rows">
              <div className="row method"><Image src={SEPALogo} /></div>
              <div className="row method"><Image src={SWIFTLogo} /></div>
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

Fiat.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Fiat.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default Fiat;
