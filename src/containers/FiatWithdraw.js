import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import * as bank_api from "/js/bank-api.min.js";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import "./Fiat.css";

const FiatWithdraw = (props) => {
  const [cookies] = useCookies(['account']);

  const isAuthenticated = props.isAuthenticated

  const location = useLocation();
  const account = location.state ? location.state : {accountId: "", ticker: "CHF", displayName: "Swiss Franc", icon: null};

  const { ticker, displayName, accountId } = account;

  const accountNumber = cookies.account;

  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [currency, setCurrency] = useState(ticker);
  const [label, setLabel] = useState("");

  const [invalidIban, setInvalidIban] = useState(false);
  const [invalidBic, setInvalidBic] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [invalidLabel, setInvalidLabel] = useState(false);

  function validateForm() {
    return iban.length > 0 
      && bic.length > 0 
      && amount > 20
      && currency.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    bank_api.fiatWithdraw({ amount, currency, iban, bic, label, accountId }, (err) => {
      if (err != null) {
        alert("An error occurred: " + err.error)
        return
      }
      props.history.push("/");
    })

  }

  return (
    <div className="FiatWithdraw">
      <div className="lander">
      {isAuthenticated
        ? <>
            <a className="Link back" onClick={props.history.goBack}>Back</a>
              <h1>Withdraw {displayName}</h1>
              <p>Please fill this form to request a withdraw.</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFiatWithdrawIban" bssize="large">
                  <Form.Label>IBAN</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter recipient's IBAN" 
                    isInvalid={invalidIban} 
                    autoFocus="1" 
                    onChange={e => setIban(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formFiatWithdrawBic" bssize="large">
                  <Form.Label>BIC</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Enter recipient's BIC" 
                  isInvalid={invalidBic} 
                  onChange={e => setBic(e.target.value)} />  
                </Form.Group>
                <Form.Group controlId="formFiatWithdrawAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control 
                  type="number"
                  placeholder="Amount to send to the recipient"
                  min="20.0"
                  step="0.01"
                  isInvalid={invalidAmount}
                  onChange={e => setAmount(parseFloat(e.target.value))} />  
                </Form.Group>
                <Form.Group controlId="formFiatWithdrawLabel" bssize="large">
                  <Form.Label>Label</Form.Label>
                  <Form.Control 
                  type="text" 
                  isInvalid={invalidLabel} 
                  onChange={e => setLabel(e.target.value)} />
                </Form.Group>
                <Button block bssize="large" disabled={!validateForm()} type="submit">
                  Send
              </Button>
              </Form>
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

FiatWithdraw.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

FiatWithdraw.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default FiatWithdraw;
