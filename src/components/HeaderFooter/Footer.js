import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="">
        <div className="container-fluid">
          <div
            className="row py-4 px-2x"
            style={{ backgroundColor: "#1c1d1f" }}
          >
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="footer-icon">
                      <a
                        href="#!"
                        className="btn btn-neutral btn-icon btn-round btn-lg"
                      >
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                    <div>
                      <h2 className="text-white">EMAIL SUPPORT</h2>
                      <h5 className="text-white">help@azonka.com</h5>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="footer-icon">
                      <a
                        href="#!"
                        className="btn btn-neutral btn-icon btn-round btn-lg"
                      >
                        <i className="fas fa-phone-alt"></i>
                      </a>
                    </div>
                    <div>
                      <h2 className="text-white">PHONE CONVERSATION</h2>
                      <h5 className="text-white">+2349019019019</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row justify-content-end">
                <form class="form-inline my-2 my-lg-0 px-3">
                  <input
                    class="form-control mr-sm-2"
                    type="email"
                    placeholder="Enter Email"
                    aria-label="Search"
                  />
                  <button
                    class="btn btn-primary btn-lg  my-2 my-sm-0"
                    type="submit"
                  >
                    Subscribe to Newsletter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row py-4">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-md-2">
                  <h2 className="text-white">ABOUT AZONKA</h2>
                  <ul>
                    <li className="text-white">About Us</li>
                    <li className="text-white">Contact Us</li>
                  </ul>
                </div>
                <div className="col-md-2">
                  <h2 className="text-white">PAYMENT</h2>
                  <ul>
                    <li className="text-white">Azonka Wallet</li>
                  </ul>
                </div>
                <div className="col-md-2">
                  <h2 className="text-white">BUYING ON AZONKA</h2>
                  <ul>
                    <li className="text-white">Buyer Safety Center</li>
                    <li className="text-white">FAQs</li>
                    <li className="text-white">Delivery</li>
                  </ul>
                </div>
                <div className="col-md-2">
                  <h2 className="text-white">MORE INFO</h2>
                  <ul>
                    <li className="text-white">Privacy Policy</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h2 className="text-white">MAKE MONEY ON AZONKA</h2>
                  <ul>
                    <li className="text-white">Sell on Azonka</li>
                    <li className="text-white">Become an Agent</li>
                  </ul>
                </div>
                {/* <div className="col-md-4"></div> */}
              </div>
            </div>
            <div className="col-lg-2"></div>
          </div>
          <div className="row py-5">
            <div className="text-center footer-icon col-md-12 col-lg-12">
              <a
                href="#!"
                className="btn btn-neutral btn-icon btn-round btn-lg"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#!"
                className="btn btn-neutral btn-icon btn-round btn-lg"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="#!"
                className="btn btn-neutral btn-icon btn-round btn-lg"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="#!"
                className="btn btn-neutral btn-icon btn-round btn-lg"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
