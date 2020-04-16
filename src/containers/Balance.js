import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HistoryIcon from '@material-ui/icons/History';

import "./Balance.css";

import * as bank_api from "/js/bank-api.min.js";

import BootstrapTable from 'react-bootstrap-table-next';

const CellHistory = (cell, row) => {
  return (
    <Link to={{
      pathname: '/history',
      state: row
    }}>
      <HistoryIcon className="IconSmall" />
    </Link>
  )
}

const Balance = (props) => {
  const isAuthenticated = props.isAuthenticated
  const [accounts, setAccounts] = useState([]);

  const columns = [{
    dataField: 'id',
    text: 'Account ID',
  }, {
    dataField: 'notionalCurrency',
    text: 'Notional Currency'
  }, {
    dataField: 'notionalBalance',
    text: 'Notional Balance'
  }, {
    dataField: 'status',
    text: 'Account Status'
  }, {
    dataField: 'currency',
    text: 'Currency'
  }, {
    dataField: 'balance',
    text: 'Balance'
  }, {
    dataField: 'totalLocked',
    text: 'Locked'
  }, {
    dataField: 'history',
    text: 'History',
    formatter: CellHistory
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
          account["history"] = account.accountId;
          account["currency"] = account.curency.name;
          account["notionalCurrency"] = account.notional.rateBase;
          account["notionalBalance"] = account.notional.balance;
          entries.push(account);
        });
        
        setAccounts(entries)
      });
    }
  }, [accounts]);

  return (
    <div className="Balance">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1><AccountBalanceWalletIcon className="Icon" />Balances</h1>
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

Balance.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Balance.defaultProps = {
  history: [],
  isAuthenticated: false
};


export default Balance;
