import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import moment from 'moment';

import HistoryIcon from '@material-ui/icons/History';
import LoginIcon from '@material-ui/icons/FingerprintOutlined';

import "./History.css";

import * as bank_api from "/js/bank-api.min.js";
import BootstrapTable from 'react-bootstrap-table-next';

const History = (props) => {
  const isAuthenticated = props.isAuthenticated
  const location = useLocation();
  const account = location.state ? location.state : {accountId: 0}
  const accountId = account.accountId;

  const [history, setHistory] = useState([]);
  const [info, setInfo] = useState({});

  const columns = [{
    dataField: 'date',
    text: 'Date'
  }, {
    dataField: 'time',
    text: 'Time'
  }, {
    dataField: 'ticker',
    text: 'Ticker'
  }, {
    dataField: 'amount',
    text: 'Amount'
  }, {
    dataField: 'balance',
    text: 'Balance'
  }];

  const defaultSorted = [{
    dataField: 'id',
    order: 'desc'
  }];

  useEffect(() => {
    if (history.length == 0) {     
      // fetch account history
      const last = moment(account.timestamp);
      const to = last.valueOf();
      const from = last.subtract(1, 'day').valueOf();
      bank_api.accountHistory({accountId, from, to}, (err, result) => {
        if (err) {
          console.error("accountHistory failed", err)
          return
        }

        var from = moment(result.from);
        var to = moment(result.to);
        setInfo({
          from: from.format("LLL"),
          to: to.format("LLL"),
          displayName: result.displayName
        })
        
        // construct table data source
        var id = 0;
        var entries = [];
        result.operations.forEach(entry => {
          var m = moment(entry.timestamp);
          entry["id"] = id++;
          entry["ticker"] = result.ticker;
          entry["date"] = m.format("LL");
          entry["time"] = m.format("LTS");
          entries.push(entry);
        });
        
        setHistory(entries)
      });
    }
  }, [history]);

  return (
    <div className="History">
      <div className="lander">
      {isAuthenticated
        ? <>
            <a className="Link back" onClick={props.history.goBack}>Back</a>

            <h1><HistoryIcon className="Icon" />History</h1>
            <div>
              <div>{info.from}</div>
              <div>{info.to}</div>
              <div>&nbsp;</div>
              <div><h3>{info.displayName}</h3></div>
            </div>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={history}
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

History.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

History.defaultProps = {
  history: [],
  isAuthenticated: false
};

export default History;
