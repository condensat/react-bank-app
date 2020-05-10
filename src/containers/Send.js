import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import "./Send.css";

const Send = (props) => {
  const isAuthenticated = props.isAuthenticated


  return (
    <div className="Send">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1>Send funds</h1>
            <p>Account</p>
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
