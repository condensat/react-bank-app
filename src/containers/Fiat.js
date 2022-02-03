import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import PropTypes from "prop-types";

import { Alert } from "react-bootstrap";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import "./Fiat.css";

import settings from "/settings.js";

const Fiat = (props) => {
  const [cookies] = useCookies(['account']);

  const isAuthenticated = props.isAuthenticated

  const location = useLocation();
  const deposit = location.state ? location.state : {accountId: "", ticker: "CHF", displayName: "Swiss Franc", icon: null};

  const { ticker, displayName } = deposit;

  const { bank } = settings.mock;
  const { IBANs } = settings.mock.sepa;
  const fiatSepa = IBANs[ticker]
  const accountNumber = cookies.account;

  return (
    <div className="Fiat">
      <div className="lander">
      {isAuthenticated
        ? <>
            <a className="Link back" onClick={props.history.goBack}>Back</a>
            <h1>Fiat Withdrawal {displayName}</h1>
            <p>For Fiat deposit use this following IBAN.</p>
            <Alert key="beta-id" variant="danger">Please fill in your account number ({accountNumber}) in the purpose field</Alert>
            <hr />
            <p>
              <span className="bold">BIC:</span>&nbsp;
              <span className="code">{fiatSepa.BIC}</span>
            </p>
            <p>
              <span className="bold">IBAN:</span>&nbsp;
              <span className="code">{fiatSepa.IBAN}</span>
            </p>
            <p>
              <span className="bold">Name: </span>{fiatSepa.Contact.Name}
              </p>
            <p>
              <span className="bold">Address:</span><br />{fiatSepa.Contact.Address1}<br />{fiatSepa.Contact.Address2}<br />{fiatSepa.Contact.Address3}
            </p>
            <hr />
              <p>
                {bank.Contact.Name}
              </p>
            <p>
              {bank.Contact.Address1}<br />{bank.Contact.Address2}<br />{bank.Contact.Address3}
            </p>
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

Fiat.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Fiat.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default Fiat;
