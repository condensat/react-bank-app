import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import DepositIcon from '@material-ui/icons/CenterFocusWeak';

import "./Receive.css";

import * as bank_api from "/js/bank-api.min.js";

import BootstrapTable from 'react-bootstrap-table-next';

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
    dataField: 'id',
    text: 'Account ID',
  }, {
    dataField: 'currency',
    text: 'Currency'
  }, {
    dataField: 'balance',
    text: 'Balance'
  }, {
    dataField: 'deposit',
    text: 'Deposit',
    formatter: CellDeposit
  }];

  const defaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
  })

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
          account["currency"] = account.curency.name;
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
        : <></>
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
