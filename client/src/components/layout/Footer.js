import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footerstyle.css";
import logoMain from "../../pages/images/Header-logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <img
        src={logoMain}
        alt="Logo"
        style={{
          width: "60px",
        }}
      />
      <h4
        style={{
          fontFamily: "Times New Roman",
          marginBottom: "20px" /* Added margin bottom for spacing */,
        }}
        className="text-center"
      >
        © 2023 EASY JACKETS DESIGNED BY ARCHETIVE SOLUTIONS. ALL RIGHTS RESERVED
      </h4>
      <div>
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className="me-5 d-none d-lg-block"></div>
          {/* Left */}
          {/* Right */}
          <div>
            <a href className="me-4 text-reset">
              <i className="fab fa-facebook-f" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-twitter" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-google" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-instagram" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-linkedin" />
            </a>
            <a href className="me-4 text-reset">
              <i className="fab fa-github" />
            </a>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section className="container text-center text-md-start mt-5">
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3" />
                Easy Jackets
              </h6>
              <p>
                Customize your jackets
                <br /> in a more beautiful way
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">SHOP</h6>
              <p>
                <a href="#!" className="text-reset">
                  VARSITY JACKETS
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  HOODIES
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  BOMBER JACKETS
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  COACH JACKETS
                </a>
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">INFORMATION</h6>
              <p>
                <a href="#!" className="text-reset">
                  PRIVACY POLICY
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  SHIPPING POLICY
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  GET FREE QUOTE
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  CONTACT US
                </a>
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4">CONTACT INFO</h6>
              <p>
                <i className="fas fa-home me-3" /> FAISAL MUNIR
              </p>
              <p>
                <i className="fas fa-envelope me-3" />
                +92-344-611-3535
              </p>
              <p>
                <i className="fas fa-phone me-3" /> INFO@EASYJACKETS.COM
              </p>
              <p>
                <i className="fas fa-print me-3" /> 5900 BALCONES AUSTIN TX
                78731
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </section>
      </div>
    </div>
  );
};

export default Footer;
