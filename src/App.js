import React, { useState, useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, Container, Row, Col, InputGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useCookies } from 'react-cookie';

import Routes from "./Routes";

import HomeIcon from '@material-ui/icons/HomeOutlined';
import LogoutIcon from '@material-ui/icons/ExitToAppOutlined';
import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import * as bank_api from "/js/bank-api.min.js";

import "./App.css";
import "./Beta.css";

import settings from "/settings.js";

// sessionState renew session with timer
var sessionState = function(props) { }

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(true);

  sessionState({ history: props.history, isAuthenticated, userHasAuthenticated });

  // close session
  function closeSession() {
    userHasAuthenticated(false);
    bank_api.closeSession(() => { });
    props.history.push("/login");
  }

  return (
    <div className="App container">
      <div class="ribbon"><span>Beta</span></div>
      <Navbar bg="light" collapseOnSelect="true">
        <Navbar.Brand>
          <Link to="/">
            <HomeIcon className="Icon" /> Condensat Tech
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isAuthenticated && settings.withMenu
          ? <Navbar.Collapse className="mr-auto" id="basic-navbar-nav">
            <NavDropdown className="menu" title="Menu" id="basic-nav-dropdown">
              <LinkContainer to="/settings">
                <NavDropdown.Item>Settings</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Navbar.Collapse>
          : <></>
        }
        <Nav className="ml-auto">
          <InputGroup>
            {isAuthenticated
              ? <NavItem onClick={closeSession}>
                <LogoutIcon className="Icon Link"></LogoutIcon>
              </NavItem>
              : <>
                <Link className="Link small" to="/signup">
                  signup
                </Link>
                <LinkContainer to="/login">
                  <LoginIcon className="Icon Link"></LoginIcon>
                </LinkContainer>
              </>
            }
          </InputGroup>
        </Nav>
      </Navbar>
      <Container>
          <Row>
          {isAuthenticated && settings.withSidbar
            ? <Col className="menu" xs lg="2">
                <div className="left">
                  <NavDropdown.Divider />
                  <LinkContainer to="/balance">
                    <NavDropdown.Item>Accounts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/receive">
                    <NavDropdown.Item>Deposit</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/send">
                    <NavDropdown.Item>Send</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  { settings.options.Swap && (
                      <LinkContainer to="/swap">
                        <NavDropdown.Item>Swap</NavDropdown.Item>
                      </LinkContainer>
                  )}
                  { settings.options.OTC && (
                    <LinkContainer to="/otc">
                      <NavDropdown.Item>OTC</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  </div>
              </Col>
            : <></>
          }
          <Col className="right">
            <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
          </Col>
        </Row>
      </Container>
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
