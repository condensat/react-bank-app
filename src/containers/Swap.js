import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import "./Swap.css";

const Swap = (props) => {
  const isAuthenticated = props.isAuthenticated

  return (
    <div className="Swap">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1>Swap</h1>
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

Swap.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Swap.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default Swap;
