import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./Signup.css";
import SendIcon from '@material-ui/icons/Send';
import GoogleLogo from "/img/auth/google.png";
import FacebookLogo from "/img/auth/facebook.png";
import GithubLogo from "/img/auth/github.png";
import TwitterLogo from "/img/auth/twitter.png";
import OpenIdLogo from "/img/auth/openid_connect.png";

import settings from "/settings.js";

function Signup() {
  const { closedBeta } = settings

  return (
    <div className="Signup">
      <Container fluid>
        <Row md={8}>
          <Col className="oauth">
            {closedBeta && (<>
              <h1>Sorry, we are in Closed Beta</h1>
              <h3>Please contact us for more informations</h3>
                <a href="mailto:contact@condensat.tech"><SendIcon className="Icon" /> Condensat Tech</a>
            </>)}
            {!closedBeta && (<>
              <h3>Signup With</h3>
              <div className="provider">
                <a href="https://bank.condensat.space/api/v1/auth/google">
                  <Image src={GoogleLogo} /><span className="provider">Google</span>
                </a>
                <a href="https://bank.condensat.space/api/v1/auth/facebook">
                  <Image src={FacebookLogo} /><span className="provider">Facebook</span>
                </a>
                <a href="https://bank.condensat.space/api/v1/auth/github">
                  <Image src={GithubLogo} /><span className="provider">GitHub</span>
                </a>
                <a href="https://bank.condensat.space/api/v1/auth/twitter">
                  <Image src={TwitterLogo} /><span className="provider">Twitter</span>
                </a>
              </div>
              <div className="provider">
                <a className="not-active" href="https://bank.condensat.space/api/v1/auth/openid">
                  <Image src={OpenIdLogo} /><span className="provider"></span>
                </a>
              </div>
            </>)}
          </Col>
          <Col className="sep" md="auto"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;