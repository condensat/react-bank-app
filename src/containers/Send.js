import React, { useState, useEffect } from 'react';
import { Image, Button, Form, FormControl, InputGroup, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';
import SWIFTLogo from "/img/SWIFT.png";
import SEPALogo from "/img/SEPA.png";
import swapLogo from "/img/swap.png";
import p2epLogo from "/img/p2ep.png";
import LedgerIcon from "/img/LedgerIcon.png";

import * as bank_api from "/js/bank-api.min.js";

import "./Send.css";

const assetIcon = (base64) => {
  if (base64) {
    const data = 'data:image/png;base64,'+base64;
    return (
      <img className="TickerIcon" src={data} />
    )
  }
  return ""
}

const Send = (props) => {
  const isAuthenticated = props.isAuthenticated

  const [amount, setAmount] = useState(0.0)
  const [publicAddress, setAddress] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [withdrawId, setWithdrawId] = useState("")

  const location = useLocation();
  const account = location.state ? location.state : {accountId: "", displayName: "", icon: null};

  const {accountId, displayName, } = account;

  const validateForm = () => {
    return parseFloat(amount) > 0.0 > 0 && publicAddress.length > 0 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (parseFloat(amount) <= 0.0) {
      setErrorMessage("Invalid amount")
      return
    }
    if (publicAddress.length == 0) {
      setErrorMessage("Invalid publicAddress")
      return
    }

    // reset error message
    setErrorMessage("")

    // call bank wallet api
    bank_api.walletSendFunds({accountId, publicAddress, "amount": parseFloat(amount)}, (err, result) => {
      if (err) {
        console.error("walletSendFunds failed", err);

        setErrorMessage(err.error)
        return;
      }
      const withdrawId = result.withdrawId ? result.withdrawId : "no withdrawId";
      console.log("withdrawId:", withdrawId);

      setAmount(0.0)
      setAddress("")
      setWithdrawId(withdrawId)
    })
  };


  useEffect(() => {
  }, [publicAddress, amount, errorMessage, withdrawId]);

  return (
    <div className="Send">
      <div className="lander">
      {isAuthenticated
        ? <>
            {!accountId
              ? <>
                <h1>Fiat Withdrawal</h1>
                <div className="rows">
                  <div className="row method"><Image src={SEPALogo} /></div>
                  <div className="row method"><Image src={SWIFTLogo} /></div>
                </div>
                <h1>Crypto</h1>
                <div className="rows">
                  <div className="row method"><Image src={LedgerIcon} rounded /><p>Ledger</p></div>
                  <div className="row method"><Image src={swapLogo} rounded /><p>Liquid Swap</p></div>
                  <div className="row method"><Image src={p2epLogo} rounded /><p>Pay to EndPoint</p></div>
                </div>
                </>
              : <>
                <a className="Link back" onClick={props.history.goBack}>Back</a>
                <h1>{assetIcon(account.icon)} Withdraw {displayName}</h1>
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <InputGroup className="mb-3" onChange={e => setAmount(e.target.value)} >
                      <InputGroup.Prepend>
                        <InputGroup.Text id="send-amount" >Amount</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        placeholder="0.00000000"
                        aria-label="0.00000000"
                        aria-describedby="send-amount"
                        value={ amount }
                      />
                    </InputGroup>
                    <InputGroup className="mb-3" onChange={e => setAddress(e.target.value)} >
                      <InputGroup.Prepend>
                        <InputGroup.Text id="send-publicaddress" >Address</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        placeholder="public address"
                        aria-label="public address"
                        aria-describedby="send-publicaddress"
                        value={ publicAddress }
                      />
                    </InputGroup>
                  </Form.Row>
                  <Button className="btn btn-light" disabled={!validateForm()} type="submit">Submit</Button>
                  { withdrawId && <Alert key="witdhraw-id" variant="success"> Withdraw order sent! </Alert> }
                  { errorMessage && <Alert key="send-error" variant="danger"> { errorMessage } </Alert> }
                </Form>

                <Alert key="beta-id" variant="danger">We are still in <Alert.Link href="#">Beta</Alert.Link>, please use with care</Alert>
                </>
            }
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

Send.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Send.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default Send;
