import React, {useEffect} from "react";
import { useCookies } from 'react-cookie';
import PropTypes from "prop-types";

import "./Home.css";

const Home = (props) => {
  const [cookies] = useCookies(['account', 'sessionId']);
  const isAuthenticated = props.isAuthenticated

  useEffect(() => {
    if (cookies.sessionId) {
      props.history.push("/tooold");
    }
  }, []);

  return (
    <div className="Home">
      <div className="lander">
      {isAuthenticated
        ? <>
          <h1>Welcome to your account</h1>
          <h3>Getting Started</h3>
          <div className="welcome">
            <p><a href="/receive">Receive funds</a></p>
            <p><a href="/balance">Accounts</a></p>
            <p><a href="/send">Send funds</a></p>
          </div>
          </>
        : <>
          <h1>Welcome to Condensat</h1>
          <h3>Getting Started</h3>
          <div className="welcome">
            <p><a href="/signup">Create an account</a></p>
            <p><a href="/login">Connect to your account</a></p>
          </div>
        </>
      }
      </div>
    </div>
  );
}

Home.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Home.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default Home;
