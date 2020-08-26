import React from 'react';
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';
import SwapMakeIcon from '@material-ui/icons/Publish';
import SwapInfoIcon from '@material-ui/icons/SwapHoriz';
import SwapTakeIcon from '@material-ui/icons/GetApp';

import "./Swap.css";

const Swap = (props) => {
  const isAuthenticated = props.isAuthenticated

  return (
    <div className="Swap">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1>Liquid Swap</h1>
            <div>&nbsp;</div>
            <div className="SwapAction">
              <Link to={{
                pathname: '/swap/make',
                state: ""
                }}>
                <SwapMakeIcon className="SwapIcon" /> Make an offer
              </Link>
            </div>
            <div className="SwapAction">
              <Link to={{
                pathname: '/swap/info',
                state: ""
                }}>
                <SwapInfoIcon className="SwapIcon" /> Offer information
              </Link>
            </div>
            <div className="SwapAction">
              <Link to={{
                pathname: '/swap/take',
                state: ""
                }}>
                <SwapTakeIcon className="SwapIcon" /> Take an offer
              </Link>
            </div>
            <Alert key="beta-id" variant="danger">We are still in <Alert.Link href="#">Beta</Alert.Link>, please use with care</Alert>
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

Swap.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Swap.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default Swap;
