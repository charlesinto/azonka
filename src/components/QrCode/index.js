import React, { Component } from "react";
import { Link } from "react-router-dom";

class QrCode extends Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    window.$("#qr").ClassyQR({
      size: 400,
      create: true, // signals the library to create the image tag inside the container div.

      type: "text", // text/url/sms/email/call/locatithe text to encode in the QR. on/wifi/contact, default is TEXT

      text: `${this.props.match.params.id}`, // the text to encode in the QR.
    });
  }
  download = (e) => {
    e.preventDefault();
    window.print();
  };
  render() {
    return (
      <div
        className="app-wrapper-container container-fluid"
        style={{ paddingTop: "14.3rem" }}
      >
        <div className="row">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="icon-home"></i> Home
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link to="#">Generate QR Code</Link>
            </li>
          </ol>
        </div>
        <div className="row">
          <div className="col-md-12 col-xs-12">
            <div className="row d-flex justify-content-center mt-5 mb-2 w-100">
              <div class="qrcode border shadow-sm" id="qr" download></div>
            </div>
            <div className="row d-flex justify-content-center">
              <button
                onClick={this.download}
                className="btn btn-lg btn-secondary"
              >
                Download
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

export default QrCode;
