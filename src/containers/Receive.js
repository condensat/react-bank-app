import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import DepositIcon from '@material-ui/icons/CenterFocusWeak';
import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import "./Receive.css";

import * as bank_api from "/js/bank-api.min.js";

import BootstrapTable from 'react-bootstrap-table-next';

const CellAssetIcon = (base64) => {
  if (base64) {
    const data = 'data:image/png;base64,'+base64;
    return (
      <img className="TickerIcon" src={data} />
    )
  }
  return ""
}

const CellDeposit = (cell, row) => {
  const isCrypto = row.isCrypto;

  return (
    <>
    {isCrypto
      ? 
      <Link to={{
        pathname: '/qr',
        state: row
      }}>
        <DepositIcon className="IconSmall" />
      </Link>
      : <></>
    }
    </>
  )
}

const Receive = (props) => {
  const isAuthenticated = props.isAuthenticated
  const [accounts, setAccounts] = useState([]);

  const columns = [{
    dataField: 'icon',
    formatter: CellAssetIcon
  }, {
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'ticker',
    text: 'Ticker'
  }, {
    dataField: 'balance',
    text: 'Balance'
  }, {
    dataField: 'deposit',
    formatter: CellDeposit
  }];

  const defaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];

  useEffect(() => {
    if (accounts.length == 0) {   
      // fetch accounts info
      bank_api.accountList({ rateBase: "CHF" }, (err, result) => {
        if (err) {
          console.error("accountList failed", err)
          return
        }

        // construct table data source
        var id = 0;
        var entries = [];
        result.accounts.forEach(account => {
          // flatten nested data
          account["id"] = id++;
          account["name"] = account.curency.displayName;
          account["icon"] = account.curency.icon
          account["ticker"] = account.curency.ticker;
          account["isCrypto"] = account.curency.isCrypto;
          entries.push(account);
        });
        
        setAccounts(entries)
      });
    }
  }, [accounts]);

  return (
    <div className="Receive">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1>Receive funds</h1>
            <p>Account</p>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={accounts}
              columns={columns}
              defaultSorted={defaultSorted}
            />
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

Receive.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Receive.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default Receive;
