import React, { useEffect } from 'react';
import PropTypes from "prop-types";

import "./Send.css";

const Send = (props) => {
  const isAuthenticated = props.isAuthenticated

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
  })

  return (
    <div className="Send">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1>Send funds</h1>
            <p>Account</p>
          </>
        : <></>
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
