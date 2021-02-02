import React, { Component } from "react";
import { Link } from "react-router-dom";

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
              {/* <div className="row">
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
              </div> */}
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
            <div className="col-lg-12 col-md-6 col-sm-12">
              <div className="row">
                <div className="col-md-2">
                  <h2 className="text-white">About Azonka</h2>
                  <ul>
                    <li className="text-white">About Us</li>
                    <li className="text-white">
                      <Link to="/careers" className="text-white">
                        Careers
                      </Link>
                    </li>
                    <li className="text-white">Contact Us</li>
                    <li className="text-white">Terms and Condition of Use</li>
                    <li className="text-white">Privacy Notice</li>
                  </ul>
                </div>
                <div className="col-md-2">
                  <h2 className="text-white">Azonka Payment Products</h2>
                  <ul>
                    <li className="text-white">Azonka Wallet</li>
                    <li className="text-white">Azonka Payment for Business</li>
                    <li className="text-white">Azonka Mobile App</li>
                  </ul>
                </div>
                {/* <div className="col-md-2">
                  <h2 className="text-white">Buying on Azonka</h2>
                  <ul>
                    <li className="text-white">Buyer Safety Center</li>
                    <li className="text-white">FAQs</li>
                    <li className="text-white">Delivery</li>
                  </ul>
                </div> */}
                <div className="col-md-2">
                  <h2 className="text-white">MORE INFO</h2>
                  <ul>
                    <li className="text-white">
                      <Link to="/cashbonus-reward" className="text-white">
                        Cash Bonus Rewards
                      </Link>
                    </li>
                    <li className="text-white">Azonka Credit Points</li>
                  </ul>
                </div>
                <div className="col-md-2">
                  <h2 className="text-white">MAKE MONEY ON AZONKA</h2>
                  <ul>
                    <li className="text-white">Sell on Azonka</li>
                    <li className="text-white">
                      <Link to="/cashbonus-reward" className="text-white">
                        Cash Bonus Rewards
                      </Link>
                    </li>
                    <li className="text-white">Become an Agent</li>
                    <li className="text-white">
                      Become a Logistics Service Partner
                    </li>
                    <li className="text-white">Advertise your products</li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h2 className="text-white">Let Us Help You</h2>
                  <ul>
                    <li className="text-white">
                      <Link to="/help/account" className="text-white">
                        Your Account
                      </Link>
                    </li>
                    <li className="text-white">
                      <Link to="/help/order" className="text-white">
                        Your Orders
                      </Link>
                    </li>
                    <li className="text-white">How to shop on Azonka.com</li>
                    <li className="text-white">Shipping and Delivery</li>
                    <li className="text-white">
                      <Link to="/refund-policy" className="text-white">
                        Returns, Refunds and Order Dispute
                      </Link>
                    </li>
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
                href="https://twitter.com/azonkanigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-neutral btn-icon btn-round btn-lg"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.facebook.com/Azonka-Nigeria-104680851334025"
                rel="noopener noreferrer"
                target="_blank"
                className="btn btn-neutral btn-icon btn-round btn-lg"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/azonkanigeria/"
                rel="noopener noreferrer"
                target="_blank"
                className="btn btn-neutral btn-icon btn-round btn-lg"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UC_dY-8IGqIwNobj_qrpJmPQ"
                target="_blank"
                rel="noopener noreferrer"
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
