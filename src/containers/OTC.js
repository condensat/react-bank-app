import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import "./OTC.css";

const OTC = (props) => {
  const isAuthenticated = props.isAuthenticated

  return (
    <div className="OTC">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1>OTC</h1>
            <div className="soon">
              <h3>Soon ™️</h3>
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

OTC.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

OTC.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default OTC;
