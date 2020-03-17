import React, {useEffect} from "react";
import { useCookies } from 'react-cookie';

import "./Home.css";

function Home(props) {
  const [cookies] = useCookies(['account', 'sessionId']);

  useEffect(() => {
    if (cookies.sessionId) {
      props.history.push("/tooold");
    }
  }, []);

  return (
    <div className="Home">
      <div className="lander">
        <h1>Welcome {cookies.account}</h1>
        <h3>Your Account:</h3>
        <p>Balance</p>
        <p>Receive funds</p>
        <p>Send funds</p>
      </div>
    </div>
  );
}

export default Home;
