import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import Routes from "./Routes";

import HomeIcon from '@material-ui/icons/HomeOutlined';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import LoginIcon from '@material-ui/icons/FingerprintOutlined';
import "./App.css";


function App(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  function onLoad() {
    // Todo - call bank api to check sessionId  
    setIsAuthenticating(false);
  }

  useEffect(() => {
    onLoad();
  }, []);
  
  
  function handleLogout() {
    userHasAuthenticated(false);
    props.history.push("/login");
  }

  return (
    !isAuthenticating &&
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
              ? <NavItem onClick={handleLogout}>
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

export default withRouter(App);
