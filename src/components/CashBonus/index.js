import React from "react";
import Footer from "../HeaderFooter/Footer";
import "../../css/update.css";
import cashBack from "../../assets/cashback.png";
import { FaQRow } from "../../common/FaQRow";
import deliver from "../../assets/deliver.png";
import refer from "../../assets/refer.png";
import refer2 from "../../assets/refer2.png";
import fill from "../../assets/fill.svg";
import HelpMenu from "../../common/HelpMenu";

const CashBonusReward = () => {
  return (
    <React.Fragment>
      <div className="body">
        <HelpMenu page="AZONKA CASH BONUS" />
        <div className="container px-4 mt-4">
          <div className="row section">
            <div className="col-md-8">
              <div>
                <h1 className="heavy-title">AZONKA CASH BONUS </h1>
                <h1 className="heavy-title">REWARDS</h1>
              </div>
              <h4 className="sub-heavy-title">
                The First Multi-flexible Cash Bonus Rewards
              </h4>
              <h4 className="sub-heavy-title">in the e-commerce industry</h4>
            </div>
            <div className="col-md-4">
              <div
                style={{
                  backgroundImage: `url(${deliver})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                className="  h-300 rounded-box"
              ></div>
            </div>
          </div>
          <div className="row spacing">
            <div className="col-md-12">
              <div className="box-shadow border-left-blue white-box py-5 px-4 rounded-box ">
                <div className="row">
                  <div className="col-md-4">
                    <div
                      className="h-100"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        alt="coins"
                        src={fill}
                        style={{ width: 100, height: 100 }}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <h4 className="article">
                      Our strong belief in mutual success achieved through
                      community-focused support structure inspired the
                      introduction of the innovative Multi-Channel{" "}
                      <span className="black-higlight">
                        Multi-flexible Cash Bonus Reward
                      </span>{" "}
                      system. Our cash bonus reward brings the optimum online
                      shopping experience to the customer, and true benefits to
                      their pockets as well. Interesting right?
                    </h4>
                    <h4 className="article">
                      <span className="black-higlight">
                        Here is how it works:
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row spacing">
            <div className="col-md-4">
              <img
                src={cashBack}
                className="w-100"
                alt="Cash Back Bonus"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div className="col-md-8">
              <h1 className="heavy-title">Cash Back Bonus</h1>
              <h4 className="article" style={{ lineHeight: "3rem" }}>
                Azonka cashback bonus, unlike any other, has NO restrictions on
                its use. You can shop with it, transfer to another user, or
                withdraw it in CASH and into your pocket. The more items you buy
                the more Cashback bonus you receive.
              </h4>
            </div>
          </div>
          <div className="row spacing">
            <div className="col-md-8">
              <h1 className="heavy-title">Referral Cash Bonus</h1>
              <h4 className="article" style={{ marginBottom: 10 }}>
                - Invite friends, family, and associates to shop on azonka.com
                using your Referral Code
              </h4>
              <h4 className="article" style={{ marginBottom: 10 }}>
                - Earn Referral Cash Reward Bonus on EVERY purchase made on
                azonka.com by your referrals.
              </h4>
              <h4 className="article">
                <span className="black-higlight">
                  The more referrals you have, the more referral cash bonus you
                  stand to earn
                </span>
              </h4>
            </div>
            <div className="col-md-4">
              <img
                src={refer}
                className="w-100"
                alt="Cash Back Bonus"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
          <div className="row spacing">
            <div className="col-md-4">
              <img
                src={refer2}
                className="w-100"
                alt="Cash Back Bonus"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div className="col-md-8">
              <h1 className="heavy-title">Agent Referral Cash Bonus</h1>
              <h4 className="article sub-article">Create Azonka account</h4>
              <h4 className="article sub-article">Upgrade to Agent account</h4>
              <h4 className="article sub-article">
                Invite friends, family, or associates to register and Sell their
                products on azonka.com using your Agent Referral Code
              </h4>
              <h4 className="article sub-article">
                Earn Referral Cash Reward Bonus on EVERY item sold on azonka.com
                by your referral The more sellers/vendors you sign-up to sell on
                azonka.com, the more money you earn.
              </h4>
              <h4 className="article sub-article">
                These are truly limitless earning opportunities.
              </h4>
            </div>
          </div>
        </div>
        <div className="spacing customer-suppport-section">
          <h1
            children="heavy-title"
            style={{
              color: "#fff",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Frequently asked Questions
          </h1>
        </div>
        <div className="container spacing">
          <div className="row">
            <div className="col-md-6">
              <FaQRow title="Can I withdraw my Cash bonus?" content="" />
              <FaQRow
                title="Can I receive cash bonus rewards as a seller and buyer on Azonka?"
                content=""
              />
              <FaQRow
                title="How do I refer another User/Buyer?"
                content="A seller account can only be referred by an Agent Referral Code. So ensure that you upgrade your account to an agent status, before using your referral code to register a seller on the site. You earn referral cash bonus on every sale completed by your seller referral on the azonka.com platform."
              />
              <FaQRow
                title="Will I receive a different referral code when I upgrade my account to..."
                content=""
              />
              <FaQRow
                title="Do I need an Agent referral code to Sell my products on azonka.com?"
                content=""
              />
              <FaQRow
                title="Can I refer others if I was referred also?"
                content=""
              />
              <FaQRow
                title="Does the Azonka Referral System support Multi-Level Marketing?"
                content=""
              />
              <FaQRow
                title="Do I still receive referral cash bonus from a referral with an..."
                content=""
              />
              <FaQRow
                title="Is there a limit to the number of referrals I can register?"
                content=""
              />
              <FaQRow
                title="Are there other benefits of selling my products on Azonka?"
                content=""
              />
              <FaQRow
                title="When do I receive my cash bonus rewards?"
                content=""
              />
            </div>
            <div className="col-md-6">
              <div
                className="yellow-bg py-5 px-3 rounded-box"
                style={{ position: "relative", top: "-10rem" }}
              >
                <h2
                  className="heavy-title"
                  style={{ color: "#fff", textAlign: "left", fontSize: 26 }}
                >
                  CONTACT US
                </h2>
                <h4
                  className="heavy-title"
                  style={{
                    color: "#fff",
                    textAlign: "left",
                    fontSize: 18,
                    paddingBottom: 16,
                    borderBottom: "1px solid #fff",
                  }}
                >
                  {" "}
                  For other questions and concerns, kindly use the button below.
                </h4>
                <h4
                  className="heavy-title"
                  style={{ color: "#fff", textAlign: "center", fontSize: 18 }}
                >
                  Note* Terms and conditions apply
                </h4>
                <div className="py-4 px-4 floated-container blue-bg ">
                  <div
                    className="h-100 w-100"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <h4
                      className="article text-white"
                      style={{ textAlign: "center", marginBottom: 0 }}
                    >
                      Contact Us
                    </h4>
                  </div>
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

export default CashBonusReward;
