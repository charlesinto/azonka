import React from "react";
import Footer from "../HeaderFooter/Footer";
import { Link } from "react-router-dom";

const YourAccount = () => {
  return (
    <React.Fragment>
      <div className="router-container">
        <div className="h-100 w-100 py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-10">
                <div className="row my-2">
                  <h2>How to Edit Your Account Profile</h2>
                  <p>
                    <article>
                      <ul className="ordered-list">
                        <li>
                          <b>Step 1:</b> Click on the "links" button at the top
                          of the page and go to "My Account".
                        </li>
                        <li>
                          <b>Step 2:</b> On your profile dashboard, you will see
                          "Edit Account Information". You can edit all the
                          accessible fields of the dashboard.
                        </li>
                        <li>
                          <b>Step 3:</b> Click on the <code>Save button</code>{" "}
                          to save the changes made to your account.
                        </li>
                      </ul>
                    </article>
                  </p>
                </div>

                <div className="row my-2">
                  <h2>How to Upgrade Your Account</h2>
                  <p>
                    <article>
                      You can take a step further into our community and expand
                      your capabilities by upgrading your account to a seller or
                      agent account
                      <p>
                        <b>Seller Account:</b> Upgrading to a seller account is
                        easy with these simple steps;
                      </p>
                      <ul className="ordered-list">
                        <li>
                          <b>Step 1:</b> Click on "Become a seller" tab located
                          on your dashboard after you sign in
                        </li>
                        <li>
                          <b>Step 2:</b> Provide the required information, agree
                          to the terms, condition and privacy policy
                        </li>
                        <li>
                          <b>Step 3:</b> Upload any valid government-issued
                          identity document (International passport, driver’s
                          license, voter’s card, National identity card)
                        </li>
                        <li>
                          <b>Step 4:</b> Upload a clear passport photograph of
                          yourself (or authorized representative, for company
                          account)
                        </li>
                        <li>
                          <b>Step 5:</b> Save your changes and begin to use your
                          seller account.
                        </li>
                      </ul>
                      <p>
                        <b>Agent account: </b> Upgrading to an Agent account can
                        be done via these simple steps;
                      </p>
                      <ul className="ordered-list">
                        <li>
                          <b>Step 1:</b> Click on "Become an agent" button
                          located on your dashboard after sign in
                        </li>
                        <li>
                          <b>Step 2:</b> Upload any valid government-issued
                          identity document (International passport, driver’s
                          license, voter’s card, National identity card)
                        </li>
                        <li>
                          <b>Step 3:</b> Agree to the terms and conditions, and
                          privacy policy
                        </li>
                        <li>
                          <b>Step 4:</b> Save all changes and begin to use your
                          account as an agent.
                        </li>
                      </ul>
                    </article>
                  </p>
                </div>
                <div className="row my-2">
                  <span>
                    <b>Note: </b> Azonka.com allows for a single account upgrade
                    integration. This stipulates that you may upgrade your
                    account to either a seller or agent account, but not both.
                  </span>
                  <p>
                    <article>
                      To sign in to your account,{" "}
                      <Link to="/login">Click Here</Link>
                    </article>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default YourAccount;
