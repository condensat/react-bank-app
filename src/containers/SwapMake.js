import React, { useState, useEffect } from 'react';
import { Button, Popover, OverlayTrigger, ListGroup, FormControl, InputGroup } from "react-bootstrap";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import LoginIcon from '@material-ui/icons/FingerprintOutlined';
import SwapMakeIcon from '@material-ui/icons/Publish';
import SwapInfoIcon from '@material-ui/icons/SwapHoriz';

import * as bank_api from "/js/bank-api.min.js";

import "./SwapMake.css";

const ListAsset = (id, assets, icons, onSelect) => {
  return (
    <ListGroup onSelect={onSelect}>
        {assets.map(asset => {
          const key = id+asset;
          const base64 = icons[asset]
          return (
            <ListGroup.Item key={key} eventKey={asset} action>
              <img className="assetIcon" src={'data:image/png;base64,'+base64} />{asset}
            </ListGroup.Item>
          )
        })}
    </ListGroup>
  )
}

const DisplayIcon = (base64) => {
  return (
    <>
    {base64
      ? <img className="assetIcon" src={'data:image/png;base64,'+base64} />
      : <></>
    }
    </>
  )
};

const SwapMake = (props) => {
  const isAuthenticated = props.isAuthenticated
  // const {pathname} = props.location

  // const [swapId, setSwapId] = useState("");
  // const [swapInfo, setSwapInfo] = useState(null);
  // const valid = swapInfo && swapInfo.legs && swapInfo.legs.length==2;

  // const [hasSwapInfo] = useState(valid);

  const [accountsAsset, setAccountsAsset] = useState([]);
  const [assetTickers, setAssetTickers] = useState([]);
  const [assetTickerIcons, setAssetTickerIcons] = useState({});
  const [assetTickerHashes, setAssetTickerHashes] = useState({});

  const [tickerP, setTickerP] = useState("select")
  const [tickerR, setTickerR] = useState("select")
  const [iconP, setIconP] = useState()
  const [iconR, setIconR] = useState()
  const [assetHashP, setAssetHashP] = useState("N/A")
  const [assetHashR, setAssetHashR] = useState("N/A")
  const [amountP, setAmountP] = useState(0.0)
  const [amountR, setAmountR] = useState(0.0)

  const selectAssetP = (asset) => {
    setTickerP(asset)
    setIconP(assetTickerIcons[asset])
    setAssetHashP(assetTickerHashes[asset])
  }

  const selectAssetR = (asset) => {
    setTickerR(asset)
    setIconR(assetTickerIcons[asset])
    setAssetHashR(assetTickerHashes[asset])
  }

  const DisplayIconP = () => {
    return DisplayIcon(iconP)
  };
  const DisplayIconR = () => {
    return DisplayIcon(iconR)
  };
    
  const popoverP = (
    <Popover id="popover-assets-p" className="Pop">
      <Popover.Title as="h5">Select your asset</Popover.Title>
      <Popover.Content>
        {ListAsset("P-", assetTickers, assetTickerIcons, selectAssetP)}
      </Popover.Content>
    </Popover>
  );
    
  const popoverR = (
    <Popover id="popover-assets-r" className="Pop">
      <Popover.Title as="h5">Select your asset</Popover.Title>
      <Popover.Content>
        {ListAsset("R-", assetTickers, assetTickerIcons, selectAssetR)}
      </Popover.Content>
    </Popover>
  );

  useEffect(() => {
    if (accountsAsset.length == 0) {   
      // fetch accounts info
      bank_api.accountList({ rateBase: "CHF" }, (err, result) => {
        if (err) {
          console.error("accountList failed", err)
          return
        }

        // construct table data source
        var id = 0;
        var entriesAsset = [];
        var tickers = [];
        var tickerIcons = {};
        var tickerHashes = {};
        
        result.accounts.forEach(account => {
          // flatten nested data
          account["id"] = id++;
          account["isCrypto"] = account.curency.isCrypto;
          account["displayName"] = account.curency.displayName;
          if (!account.curency.displayName) {
            account["displayName"] = "No Name"
          }
          account["icon"] = account.curency.icon

          // skip asset related account
          if (account.curency.isAsset && account.curency.ticker != "TBTC") {
            if (account.curency.displayName || account.curency.icon) {
              if (account.curency.icon) {
                entriesAsset.push(account);
                tickers.push(account.curency.ticker)
                tickerIcons[account.curency.ticker] = account.curency.icon
                tickerHashes[account.curency.ticker] = account.curency.assetHash
                return
              } else {
                return
              }
            } else {
              return
            }
          }

          if (account.curency.isCrypto) {
            return
          } else {
            return
          }
        });

        setAccountsAsset(entriesAsset);
        setAssetTickers(tickers);
        setAssetTickerIcons(tickerIcons);
        setAssetTickerHashes(tickerHashes)
      });
    }
  }, [accountsAsset, assetTickers, assetTickerIcons, assetTickerHashes]);

  return (
    <div className="SwapMake">
      <div className="lander">
      {isAuthenticated
        ? <>
            <h1><SwapMakeIcon className="Icon" /> Liquid Swap Proposal</h1>
            <div className="rows">
              <div className="row">
                <div>
                  <h2>Send</h2>
                  {DisplayIconP()}
                  <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverP}>
                    <Button className="btn btn-light">{tickerP}</Button>
                  </OverlayTrigger>
                  <InputGroup className="mb-3" onChange={e => setAmountP(e.target.value)} >
                    <InputGroup.Prepend>
                      <InputGroup.Text id="send-amount" >Amount</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="0.00000000"
                      aria-label="0.00000000"
                      aria-describedby="send-amount"
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="row sep">
                <SwapInfoIcon className="IconSwap" />
              </div>

              <div className="row">
                <div>
                  <h2>Receive</h2>
                  {DisplayIconR()}
                  <OverlayTrigger trigger="focus" placement="bottom" overlay={popoverR}>
                    <Button className="btn btn-light">{tickerR}</Button>
                  </OverlayTrigger>
                  <InputGroup className="mb-3" onChange={e => setAmountR(e.target.value)} >
                    <InputGroup.Prepend>
                      <InputGroup.Text id="receive-amount">Amount</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="0.00000000"
                      aria-label="0.00000000"
                      aria-describedby="receive-amount"
                    />
                  </InputGroup>
                  </div>
              </div>
            </div>
            <div>
              <h2>Summary</h2>              
              <h3>Send informations</h3>
              <ul>
                <li>Asset: {assetHashP}</li>
                <li>Amount: {amountP}</li>
              </ul>
              <h3>Receive informations</h3>
              <ul>
                <li>Asset: {assetHashR}</li>
                <li>Amount: {amountR}</li>
              </ul>  
              <SwapMakeIcon className="SwapIcon" /> Generate Offer
            </div>
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

SwapMake.propTypes = {
  history: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.bool.isRequired
};

SwapMake.defaultProps = {
  history: [],
  isAuthenticated: false,
  location: "localtion_not_found"
};

export default SwapMake;
