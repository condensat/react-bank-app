import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DepositIcon from '@material-ui/icons/CenterFocusWeak';
import HistoryIcon from '@material-ui/icons/History';
import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import "./Balance.css";

import * as bank_api from "/js/bank-api.min.js";

import BootstrapTable from 'react-bootstrap-table-next';

const CellAssetIcon = (base64) => {
  if (base64) {
    return (
      <img className="TickerIcon" src={'data:image/png;base64,'+base64} />
    )
  }
  return ""
}

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

const Balance = (props) => {
  const isAuthenticated = props.isAuthenticated
  const [accounts, setAccounts] = useState([]);

  const columns = [{
    dataField: 'icon',
    formatter: CellAssetIcon
  }, {
    dataField: 'displayName',
    text: 'Name'
  }, {
    dataField: 'ticker',
    text: 'Ticker'
  }, {
    dataField: 'balance',
    text: 'Balance'
  }, {
    dataField: 'history',
    formatter: CellHistory
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
        var entriesAsset = [];
        var entriesAssetWithoutIcon = [];
        var entriesCrypto = [];
        var entriesFiat = [];
        var entriesOther = [];
        result.accounts.forEach(account => {
          // flatten nested data
          account["id"] = id++;
          account["history"] = account.accountId;
          account["ticker"] = account.curency.ticker;
          account["isCrypto"] = account.curency.isCrypto;
          account["displayName"] = account.curency.displayName;
          if (!account.curency.displayName) {
            account["displayName"] = "No Name"
          }
          account["icon"] = account.curency.icon
          account["notionalTicker"] = ""
          account["notionalBalance"] = null
          if (account.notional) {
            account["notionalTicker"] = account.notional.rateBase;
            account["notionalBalance"] = account.notional.balance;
          }

          if (account.curency.isAsset && account.curency.ticker != "TBTC") {
            if (account.curency.displayName || account.curency.icon) {
              if (account.curency.icon) {
                entriesAsset.push(account);
              } else {
                entriesAssetWithoutIcon.push(account);
              }
            } else {
              entriesOther.push(account);
            }
          } else if (account.curency.isCrypto) {
            entriesCrypto.push(account);
          } else {
            entriesFiat.push(account);
          }
        });

        var entries = [];
        entries = entries.concat(entriesFiat);
        entries = entries.concat(entriesCrypto);
        entries = entries.concat(entriesAsset);
        entries = entries.concat(entriesAssetWithoutIcon);
        entries = entries.concat(entriesOther);
        
        setAccounts(entries);
      });
    }
  }, [accounts]);

  return (
    <div className="Balance">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1><AccountBalanceWalletIcon className="Icon" />Accounts</h1>
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

Balance.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

Balance.defaultProps = {
  history: [],
  isAuthenticated: false
};


export default Balance;
