import React, { useState } from "react";
import { Button, Form, InputGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useCookies } from 'react-cookie';

import * as bank_api from "/js/bank-api.min.js";
import "./Login.css";

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
          <Form.Check type="checkbox" label="Remember me" defaultChecked={remember} onChange={e => setRemember(e.target.checked)}  />
        </Form.Group>
        <Button block bssize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;