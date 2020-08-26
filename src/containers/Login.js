import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";

import { useCookies } from 'react-cookie';
import PropTypes from "prop-types";

import * as bank_api from "/js/bank-api.min.js";

import "./Login.css";
import GoogleLogo from "/img/auth/google.png";
import FacebookLogo from "/img/auth/facebook.png";
import GithubLogo from "/img/auth/github.png";
import TwitterLogo from "/img/auth/twitter.png";
import OpenIdLogo from "/img/auth/openid_connect.png";

function Login(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['account', 'remember', 'sessionId']);

  const [account, setAccount] = useState(cookies.account ? cookies.account : "");
  const [password, setPassword] = useState("");
  const [invalidLoginOrPassword, setInvalidLoginOrPassword] = useState(false);
  const [remember, setRemember] = useState(cookies.remember ? cookies.remember : "");

  function validateForm() {
    return account.length > 0 && password.length > 0;
  }

  function storeCookie() {
    if (!remember) {
      removeCookie('account', null, {})
      removeCookie('remember', null, {})
    }
    if (remember && account) {
      setCookie('account', account, { path: '/' })
      setCookie('remember', remember, { path: '/' })
    }
  }  

  function handleSubmit(event) {
    event.preventDefault();

    storeCookie();

    bank_api.openSession({ login: account, password}, (err) => {
      if (err != null) {
        props.userHasAuthenticated(false);
        setInvalidLoginOrPassword(true);
        props.history.push("/login");
        return
      }
      props.userHasAuthenticated(true);
      props.history.push("/");
    })
  }

  return (
    <div className="Login">
      <Container fluid>
        <Row md={4}>
          <Col className="oauth">
            <h3>Login With</h3>
            <div className="provider">
              <a href="https://bank.condensat.space/api/v1/auth/google">
                <Image src={GoogleLogo} /><span className="provider">Google</span>
              </a>
            </div>
            <div className="provider">
              <a href="https://bank.condensat.space/api/v1/auth/facebook">
                <Image src={FacebookLogo} /><span className="provider">Facebook</span>
              </a>
            </div>
            <div className="provider">
              <a href="https://bank.condensat.space/api/v1/auth/github">
                <Image src={GithubLogo} /><span className="provider">GitHub</span>
              </a>
            </div>
            <div className="provider">
              <a href="https://bank.condensat.space/api/v1/auth/twitter">
                <Image src={TwitterLogo} /><span className="provider">Twitter</span>
              </a>
            </div>
            <div className="provider">
              <a className="not-active" href="https://bank.condensat.space/api/v1/auth/openid">
                <Image src={OpenIdLogo} /><span className="provider"></span>
              </a>
            </div>
          </Col>
          <Col className="sep" md="auto"></Col>
          <Col className="basic">
            <h3>Credentials</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formLoginAccount" bssize="large">
                <Form.Label>Account</Form.Label>
                <Form.Control type="text" placeholder="Enter account" isInvalid={invalidLoginOrPassword} defaultValue={account} autoFocus="1" onChange={e => setAccount(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formLoginPassword" bssize="large">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" id="password" isInvalid={invalidLoginOrPassword} onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formLoginRemember">
                <Form.Check type="checkbox" label="Remember me" defaultChecked={remember} onChange={e => setRemember(e.target.checked)} />
              </Form.Group>
              <Button block bssize="large" disabled={!validateForm()} type="submit">
                Login
            </Button>
            </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
  userHasAuthenticated: PropTypes.func
};

Login.defaultProps = {
  history: [],
  userHasAuthenticated: () => {}
};


export default Login;