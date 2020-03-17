import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCookies } from 'react-cookie';

import Routes from "./Routes";

import HomeIcon from '@material-ui/icons/HomeOutlined';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import * as bank_api from "/js/bank-api.min.js";

import "./App.css";

// sessionState renew session with timer
var sessionState = function(props) { }

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  props.isAuthenticated = isAuthenticated;
  props.userHasAuthenticated = userHasAuthenticated;
  sessionState(props)

  // close session
  function closeSession() {
    userHasAuthenticated(false);
    bank_api.closeSession(() => { });
    props.history.push("/login");
  }

  return (
    <div className="App container">
      <Navbar bg="light" collapseOnSelect="true">
        <Navbar.Brand>
          <Link to="/">
            <HomeIcon className="Icon" /> Condensat Bank
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            {isAuthenticated
              ? <NavItem onClick={closeSession}>
                  <LogoutIcon className="Icon Link"></LogoutIcon>
                </NavItem>
              : <>
                <Link className="small" to="/signup">
                  signup
                </Link>
                <LinkContainer to="/login">
                  <LoginIcon className="Icon Link"></LoginIcon>
                </LinkContainer>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
  );
}

sessionState = (props) => {
  const [cookies] = useCookies(['account']);

  const { isAuthenticated, userHasAuthenticated } = props;
  const [renewCount, setRenewCount] = useState(0);

  // call once, setup initial isAuthenticated state
  useEffect(() => {
    bank_api.renewSession((err) => {
      const incr = (err != null) ? 0 : 1;
      userHasAuthenticated(incr > 0);

      // if session is not valid, and account found in cookie, go to login page
      if (incr == 0 && cookies.account) {
        props.history.push("/login");
      }
    })
  }, []);

  // renew session timer
  useEffect(() => {
      // skip if not authenticated
      if (!isAuthenticated) {
        return;
      }
    setTimeout(bank_api.renewSession, 30000, (err) => {
      const incr = (err != null) ? 0 : 1;
      userHasAuthenticated(incr > 0);
      setRenewCount(renewCount + incr);
    });
  }, [isAuthenticated, renewCount]);
}

export default withRouter(App);
