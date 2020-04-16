import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

import "./Signup.css";
import GoogleLogo from "/img/auth/google.png";
import FacebookLogo from "/img/auth/facebook.png";
import GithubLogo from "/img/auth/github.png";
import OpenIdLogo from "/img/auth/openid_connect.png";

function Signup() {
  return (
    <div className="Signup">
      <Container fluid>
        <Row md={4}>
          <Col className="oauth">
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
            </div>
            <div className="provider">
              <a className="not-active" href="https://bank.condensat.space/api/v1/auth/openid">
                <Image src={OpenIdLogo} /><span className="provider"></span>
              </a>
            </div>
          </Col>
          <Col className="sep" md="auto"></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;