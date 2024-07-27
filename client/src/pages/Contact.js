import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Image from "./images/contactus.jpg";
import "../styles/Homepage.css";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
    console.log({ name, email, message });
  };
  return (
    <Layout title={"Contact us - Ecommerce Jackets"}>
      <div className="row contactus ">
        <div className="col-md-6">
          {/* <img src={Image} alt="contactus" style={{ width: "100%" }} /> */}
        </div>
        <div className="col-md-12">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                width: "40%",
              }}
            >
              <h2
                style={{
                  fontWeight: 650,
                }}
                className="text-justify mt-2"
              >
                OUR VISION
              </h2>
              <p>
                At EASYJACKETS we let our customers design their own varsity
                jackets with premium quality fabric, genuine leather and more.
              </p>
            </div>
            <div
              style={{
                width: "40%",
              }}
            >
              <h2
                style={{
                  fontWeight: 650,
                }}
                className="text-justify mt-2"
              >
                WHAT WE DO
              </h2>
              <p>
                Is to provide high-quality jackets at an affordable price, as
                well as excellent customer service
              </p>
            </div>
            <div
              style={{
                width: "40%",
              }}
            >
              <h2
                style={{
                  fontWeight: 650,
                }}
                className="text-justify mt-2"
              >
                HISTORY
              </h2>
              <p>
                Easy Jackets was thus born in the year 2010. Since then, we have
                been producing extraordinary products, which our clients like
                countrywide
              </p>
            </div>
          </div>
          {/* <div>
            <h2 className="text-justify mt-2">HISTORY</h2>
            <p>
              Easy Jackets was thus born in the year 2010. Since then, we have
              been producing extraordinary products, which our clients like
              countrywide.
            </p>
          </div> */}

          {/* Sozana Faisal

+1-718-255-7191​

+1-307-205-6951

info@test.consolemetaverse.com

5900 Balcones Austin TX 78731

Easy Jackets LLC */}
        </div>
        <div
          style={{
            display: "flex",
            // marginBottom: "10%",
          }}
          className="col-md-12"
        >
          <div>
            <h2>GET IN TOUCH WITH US</h2>
            <p>Sozana Faisal</p>
            <p>+1-718-255-7191​</p>
            <p>+1-307-205-6951</p>
            <p>info@test.consolemetaverse.com</p>
            <p>5900 Balcones Austin TX 78731</p>
            <p>Easy Jackets LLC</p>
          </div>
          <div
            style={{
              display: "flex",
            }}
            className="contact-form-container"
          >
            {" "}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form-field">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message">Message (up to 70 words):</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  cols="20"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength="3000" // Approx 500 words
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
