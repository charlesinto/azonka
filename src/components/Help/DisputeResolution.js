import React from "react";
import Footer from "../HeaderFooter/Footer";
import { Link } from "react-router-dom";

const DisputeResolution = () => {
  return (
    <React.Fragment>
      <div className="router-container">
        <div className="h-100 w-100 py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-10">
                <ol className="breadcrumb py-4">
                  <li className="breadcrumb-item">
                    <Link to="/">
                      <i className="icon-home"></i>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to="/users/self-service">Help</Link>
                  </li>
                  <li
                    className="text-primary breadcrumb-item active"
                    aria-current="page"
                  >
                    Dispute Resolution Policy Guidelines
                  </li>
                </ol>
                <p>
                  <article>
                    Before you choose to initiate an Order Dispute claim’, you
                    must ensure that your transaction is eligible and satisfy
                    all necessary conditions under the <b>Item Not Received</b>{" "}
                    or <b>Significantly Not as Described</b> category. You must
                    also follow our Azonka online order dispute resolution
                    process to pursue your claim.
                    <br />
                    <br />
                    IMPORTANT: You will be automatically refunded for eligible
                    purchases made on azonka.com where the seller is clearly
                    unable to fulfill the order. In such cases, you will be
                    notified of such change(s) in your order. In most cases, you
                    may be automatically refunded for the “Item Not Received”
                    claim, however, you may have to wait till the expiration of
                    the Estimated Delivery Date for your order, unless you are
                    notified otherwise. For other cases under the “Significantly
                    Not as Described”, you will be required to provide necessary
                    proof of Product Description violation such as photos, or
                    other documents to support your claim.
                    <br />
                    <br />
                    Azonka will make a final decision (including automatically
                    closing any dispute or claim), at its sole discretion, based
                    on the coverage and eligibility conditions, any additional
                    information provided during the online dispute resolution
                    process or any other information Azonka deems relevant and
                    appropriate under the circumstances. In the event that
                    Azonka makes a final decision in favour of the buyer or
                    seller, each party must comply with Azonka's decision.
                    <br />
                    <br />
                    If Azonka rules in favour of a buyer, Azonka will reimburse
                    the buyer for the full purchase price of the item and
                    original shipping costs.
                    <br />
                    <br />
                    If you lose the dispute claim, you may incur an order
                    processing and logistics charge amongst other penalties.
                    <br />
                    <br />
                    To register an Order dispute, kindly Proceed to{" "}
                    <Link to="/user/order/disputes">
                      Azonka online order dispute resolution
                    </Link>{" "}
                    , or{" "}
                    <Link className="text-danger" to="/users/self-service">
                      Cancel
                    </Link>
                  </article>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default DisputeResolution;
