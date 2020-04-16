import React, { useEffect } from 'react';
import PropTypes from "prop-types";

import "./Receive.css";

const Receive = (props) => {
  const isAuthenticated = props.isAuthenticated

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
  })

  return (
    <div className="Receive">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1>Receive funds</h1>
            <p>Account</p>
        </>
        : <></>
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
