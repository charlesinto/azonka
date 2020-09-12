import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="">
        <div className="container">
          <div className="row">
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
