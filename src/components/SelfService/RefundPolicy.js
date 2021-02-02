import React from "react";
import Footer from "../HeaderFooter/Footer";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <React.Fragment>
      <div className="router-container">
        <div className="h-100 w-100 py-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-10">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h2>
                        Azonka.com Buyer Protection Program and Azonka Services
                        Additional User Agreement
                      </h2>

                      <p>
                        <article>
                          When you buy something from a seller on azonka.com,
                          you may be eligible for a refund under Buyer
                          Protection program. The issuance of the unique{" "}
                          <Link to="#" className="text-primary mr-1">
                            Payment Confirmation Code (PCC)
                          </Link>
                          offers an adequate preliminary protection to the buyer
                          and qualifies the buyer for refund where there is
                          clear evidence of Product Description violation by the
                          seller under the{" "}
                          <Link to="#" className="text-primary mx-1">
                            Significantly Not as Described
                          </Link>
                          claim; or where a seller in unable to fulfill your
                          order under the{" "}
                          <Link
                            to="#item-received"
                            className="text-primary mx-1"
                          >
                            Item Not Received
                          </Link>
                          claim. When applicable, azonka.com Buyer Protection
                          program entitles you to reimbursement for the full
                          purchase price of the item plus the original shipping
                          costs you paid, if any. Azonka.com determines, in its
                          sole discretion, whether your claim qualifies for the
                          Buyer Protection program. Azonka.com’s original
                          determination is considered final, but you may be able
                          to file an appeal of the decision with azonka.com if
                          you have new or compelling information not available
                          at the time of the original dispute resolution process
                        </article>
                      </p>
                      <p>
                        <article>
                          <b>IMPORTANT:</b> Azonka works to ensure high quality
                          standards for items listed on the azonka.com platform.
                          While the majority of listed items may not be eligible
                          for returns after you handover the Payment
                          Confirmation Code to the seller or delivery personnel,
                          some sellers may offer additional item return service.
                          In such exceptional cases, for item which qualify for
                          return, you may be required to return the item to the
                          seller or other party we specify as part of the
                          settlement of your claim. Items which qualify for such
                          additional seller service is expressly identified as
                          such, at the time of purchase and Azonka's Buyer
                          Protection program does not entitle you to
                          reimbursement for the return shipping costs that you
                          may incur in this case. Therefore, it is assumed that
                          your order is received before handing over your
                          Payment Confirmation Code (PCC) to the seller or order
                          delivery personnel.
                        </article>
                      </p>
                      <p>
                        <article>
                          Azonka.com Buyer Protection program may apply when you
                          encounter these specific problems with a transaction:
                          <ul style={{ listStyle: "disc", marginLeft: 20 }}>
                            <li>
                              You didn't receive your item from a seller
                              (referred to as an{" "}
                              <Link
                                to="#item-received"
                                className="text-primary mx-1"
                              >
                                Item Not Received
                              </Link>{" "}
                              claim), or
                            </li>
                            <li>
                              You received an item, but the item isn't what you
                              ordered (referred to as a{" "}
                              <Link to="#" className="text-primary mx-1">
                                Significantly Not as Described
                              </Link>{" "}
                              claim).
                            </li>
                          </ul>
                        </article>
                      </p>
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">Item Not Received claims</h2>

                      <p>
                        <article>
                          For Item Not Received claim, further action may not be
                          required by the buyer as the Buyer Protection Program
                          ensures full automatic refund to the buyer, where
                          there is no valid{" "}
                          <Link to="#" className="text-primary mx-1">
                            Proof of Delivery
                          </Link>{" "}
                          by the seller. This process is initiated upon the
                          expiration of the
                          <Link to="#" className="text-primary mx-1">
                            Estimated Delivery
                          </Link>{" "}
                          Timeline for the order.
                        </article>
                      </p>
                      <p>
                        <article>
                          <b> Note:</b> Your claim will not qualify for a refund
                          under azonka.com Buyer Protection program for an Item
                          Not Received claim if:
                          <ul style={{ listStyle: "disc", marginLeft: 20 }}>
                            <li>
                              You collect the item in person, or arrange for it
                              to be collected on your behalf, and handover the
                              Payment Confirmation Code to complete the
                              transaction
                            </li>
                            <li>
                              You utilize your
                              <Link to="#" className="text-primary mx-1">
                                Azonka Wallet
                              </Link>
                              ,
                              <Link to="#" className="text-primary mx-1">
                                Azonka Pay
                              </Link>{" "}
                              , or other payment services in a seller's store
                              location, or in other transactions not carried out
                              on azonka.com marketplace
                            </li>
                            <li>
                              The seller has provided valid{" "}
                              <Link to="#" className="text-primary mx-1">
                                Proof of Notification,
                              </Link>
                               
                              <Link to="#" className="text-primary mx-1">
                                Proof of Shipment
                              </Link>
                              , or
                              <Link to="#" className="text-primary mx-1">
                                Proof of Delivery
                              </Link>
                            </li>
                          </ul>
                        </article>
                        <article>
                          You (Buyer) will be contacted upon dispatch of your
                          order and the maximum of two (2) attempts will be made
                          to deliver the order. Afterwards, the order will be
                          cancelled and refunds will be made to you after an
                          appropriate processing and logistics charge. If the
                          seller or delivery personnel present Proof of
                          Notification, or valid evidence that they delivered
                          the goods to your address, azonka may rule in favor of
                          the seller for an Item Not Received claim even if you
                          claim you did not receive the goods.
                        </article>
                      </p>
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="significantly-recieved">
                        Significantly Not as Described claims
                      </h2>

                      <p>
                        <article>
                          The Buyer Protection Program may not cover
                          reimbursements on transactions where the{" "}
                          <Link to="#" className="text-primary mx-1">
                            Payment Confirmation Code (PCC)
                          </Link>
                          issued to you (buyer) has been transferred to the
                          seller or order delivery personnel; however, you may
                          still be eligible for a full refund if there is a
                          compelling case that the product you received is
                          Significantly Not as Described by the seller on the
                          product description page of the listing. Furthermore,
                          you are advised to register such claim within 48 hours
                          of receiving the product. Any order dispute claim
                          later than this provisional period may not be
                          entertained. The Significantly Not as Described claim
                          is usually initiated when you encounter problems
                          whereby you receive an item, but the item is not what
                          you ordered. In this case, you can register a
                          Significantly Not as Described claim. by the seller.
                          This process is initiated upon the expiration of the
                        </article>
                      </p>
                      <p>
                        <article>
                          <b> Note:</b> You are advised to ensure that your
                          Significantly Not as Described claim satisfy the
                          following conditions. You may be liable to certain
                          processing and shipping charges if Azonka rule in
                          favour of the seller.
                          <p>
                            An item may be considered Significantly Not as
                            Described if:
                          </p>
                          <ul style={{ listStyle: "disc", marginLeft: 20 }}>
                            <li>
                              The item is materially different from the seller's
                              description of it. For example, while the item is
                              described red leather, a white cotton item is
                              delivered
                            </li>
                            <li>
                              You received a completely different item. For
                              example, you ordered a book, and a footwear is
                              delivered
                            </li>
                            <li>
                              The condition of the item was misrepresented. For
                              example, the item was described as "new" but the
                              item was used.
                            </li>
                            <li>
                              The item is missing major parts or features and
                              those facts were not disclosed in the description
                              of the item when you bought it.
                            </li>
                            <li>
                              You purchased a certain number of items but didn't
                              receive them all. Kindly note that your order may
                              contain items listed by different sellers. In such
                              cases, the items may be delivered separately.
                            </li>
                            <li>
                              The item was materially damaged during shipment.
                            </li>
                            <li>
                              The item is unusable in its received state and was
                              not disclosed as such.
                            </li>
                          </ul>
                        </article>
                        <article>
                          An item may not be considered Significantly Not as
                          Described if:
                          <ul style={{ listStyle: "disc", marginLeft: 20 }}>
                            <li>
                              The item is materially similar to the seller's
                              description of it.
                            </li>
                            <li>
                              The defect in the item was correctly described by
                              the seller in its description of the item.
                            </li>
                            <li>
                              The item was properly described but you didn't
                              want it after you received it.
                            </li>
                            <li>
                              The item was properly described but did not meet
                              your expectations.
                            </li>
                            <li>
                              The item has minor scratches and was described as
                              "used."
                            </li>
                            <li>
                              The item original seal or tag has been broken or
                              removed by you
                            </li>
                            <li>
                              The item has been worn, washed, or damaged by you
                            </li>
                            <li>
                              The item has non-returnable marks and contains
                              free gifts
                            </li>
                            <li>
                              The original packaging was extensively damaged by
                              you
                            </li>
                          </ul>
                        </article>
                      </p>
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">
                        Ineligible items and transactions under azonka.com Buyer
                        Protection Program
                      </h2>

                      <p>
                        <article>
                          Payments for the following are not eligible for
                          reimbursement under azonka.com Buyer Protection:
                          <ul style={{ marginLeft: 20, listStyle: "disc" }}>
                            <li>
                              Real estate, including residential property.
                            </li>
                            <li>
                              Financial products or investments of any kind.
                            </li>
                            <li>
                              Businesses (when you buy or invest in all or part
                              of a business).
                            </li>
                            <li>
                              Vehicles, including, but not limited to, motor
                              vehicles, motorcycles, recreational vehicles,
                              aircraft and boats.
                            </li>
                            <li>
                              Highly perishable items including, but not limited
                              to food, vegetables, fruits, and other
                              agricultural harvested produce.
                            </li>
                            <li>
                              Significantly Not as Described claims for wholly
                              or partly custom-made items or an item purchased
                              from a classified listing and picked up in person.
                            </li>
                            <li>
                              Donations including payments on crowdfunding
                              platforms.
                            </li>
                            <li>
                              Items prohibited by the azonka.com{" "}
                              <Link to="#" className="text-primary mx-1">
                                Acceptable Use Policy
                              </Link>
                              .
                            </li>
                            <li>
                              For Item Not Received claims, items which you
                              collect in person or arrange to be collected on
                              your behalf, and handover the Payment Confirmation
                              Code to complete the transaction
                            </li>
                            <li>
                              You utilize the Azonka Wallet, Azonka Pay, or
                              other payment services in a seller's store
                              location, or in other transactions not carried out
                              on azonka.com
                            </li>
                            <li>Industrial machinery used in manufacturing.</li>
                            <li>
                              Anything purchased from, or an amount paid to, a
                              government agency.
                            </li>
                            <li>
                              Stored value items such as gift cards and pre-paid
                              cards.
                            </li>
                            <li>
                              Gambling, gaming and/or any other activity with an
                              entry fee and a prize.
                            </li>
                            <li>Personal payments.</li>
                            <li>
                              Payments sent using Azonka Wallet to any bill
                              payment service.
                            </li>
                          </ul>
                        </article>
                      </p>
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">
                        Transaction eligibility for azonka.com Buyer Protection
                        program
                      </h2>

                      <p>
                        <article>
                          To be eligible for azonka.com Buyer Protection you
                          must meet all of the following requirements:
                          <ul>
                            <li>
                              You have an azonka.com account in good standing.
                            </li>
                            <li>You receive payment via your Azonka Wallet</li>
                            <li>
                              You pay for the eligible item from your azonka.com
                              account.
                            </li>
                            <li>
                              You respond to azonka.com request for
                              documentation and other information within the
                              time requested.
                            </li>
                            <li>
                              You follow our online dispute resolution process.
                            </li>
                            <li>
                              You have not received a recovery related to such
                              purchase from another source.
                            </li>
                          </ul>
                        </article>
                      </p>
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">
                        Our online order dispute resolution process
                      </h2>

                      <p>
                        <article>
                          Before you choose to initiate an Order Dispute claim’,
                          you must ensure that your transaction is eligible and
                          satisfy all necessary conditions under the{" "}
                          <Link>Item Not Received</Link> or{" "}
                          <Link to="#">Significantly Not as Described</Link>
                          category. You must follow our{" "}
                          <Link>
                            Azonka online order dispute resolution process
                          </Link>{" "}
                          to pursue your claim; or
                          <Link to="#">Click Here</Link>
                        </article>
                      </p>
                      <p>
                        <article>
                          <b>IMPORTANT:</b> You are advised to register your
                          order dispute claim within 48 hours of receiving the
                          product. Any order dispute claim later than this
                          provisional period may not be entertained. You will be
                          automatically refunded for eligible purchases made on
                          azonka.com where the seller is clearly unable to
                          fulfill the order. In such cases, you will be notified
                          of such change(s) in your order. Furthermore, you will
                          be notified if a seller opens an Order Dispute claim
                          against you. You are required to respond to such
                          notice and provide necessary information in a timely
                          manner for the resolution of such dispute, or we may
                          automatically close the dispute, or rule in favour of
                          the seller. You will be required to provide necessary
                          proof of Product Description violation or
                          Significantly Not As Described such as photos, police
                          reports or other documents to support your claim. In
                          most cases, you may be automatically refunded for the
                          “Item Not Received” claim, however, If you are making
                          an Item Not Received claim, azonka.com may ask you to
                          wait till the expiration of the Estimated Delivery
                          Date for your order, unless you receive prior notice
                          to respond to an order dispute claim.
                        </article>
                      </p>
                      <p>
                        <article>
                          Azonka will make a final decision (including
                          automatically closing any dispute or claim), in its
                          sole discretion, based on the coverage and eligibility
                          requirements set forth above, any additional
                          information provided during the online dispute
                          resolution process or any other information Azonka
                          deems relevant and appropriate under the
                          circumstances. In the event that Azonka makes a final
                          decision in favour of the buyer or seller, each party
                          must comply with Azonka's decision. If Azonka finds in
                          favour of a buyer, Azonka will reimburse the buyer for
                          the full purchase price of the item and original
                          shipping costs. If a buyer loses the Significantly Not
                          as Described, or Item Not Received claim, the buyer
                          will incur a processing and logistics charge amongst
                          other penalties. If a seller loses a claim, the seller
                          will not receive payments associated with the
                          transaction, and will incur a processing and logistics
                          charge amongst other penalties where applicable. To
                          register an Order dispute, kindly follow{" "}
                          <Link to="#">
                            Azonka online order dispute resolution process
                          </Link>
                          , or,
                          <Link to="#">Click Here</Link>
                        </article>
                      </p>
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">
                        Problems encountered using Credit Card or Debit Card on
                        Azonka.com
                      </h2>

                      <p>
                        <article>
                          If you used a credit/debit card as the payment method
                          for a transaction through your Azonka account and you
                          are unable to complete your transaction, you may be
                          entitled to dispute the transaction with your card
                          issuer. However, if you encounter this problem, we
                          advise you allow two (2) working days before
                          contacting Azonka if the problem has not been resolved
                          by your bank or card issuer. Azonka may not be able to
                          process your order if an issue emanates during your
                          payment leading to incomplete transfers, reversals or
                          failed transaction. If this issue has not been
                          resolved by your bank, or card issuer, you can access
                          the <Link to="/users/self-service">Help</Link>{" "}
                          section.
                        </article>
                      </p>
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">
                        Azonka Services Additional User Agreement
                      </h2>

                      <p>
                        <h4>Restricted Activities</h4>
                        <article>
                          In connection with your use of our websites, your
                          Azonka account, the Azonka services, or in the course
                          of your interactions with Azonka, other Azonka
                          customers, or third parties, you will not:
                          <ul>
                            <li>
                              Breach this user agreement, the{" "}
                              <Link to="#">Azonka Acceptable Use Policy</Link>,
                              the Commercial Entity Agreements (if they apply to
                              you), or any other agreement between you and
                              Azonka.
                            </li>
                            <li>
                              Violate any law, statute, ordinance, or regulation
                              (for example, those governing financial services,
                              consumer protections, unfair competition,
                              anti-discrimination or false advertising).
                            </li>
                            <li>
                              Infringe Azonka's or any third party's copyright,
                              patent, trademark, trade secret or other
                              intellectual property rights, or rights of
                              publicity or privacy.
                            </li>
                            <li>Sell counterfeit goods.</li>
                            <li>
                              Act in a manner that is defamatory, trade
                              libelous, threatening or harassing.
                            </li>
                            <li>
                              Provide false, inaccurate or misleading
                              information.
                            </li>
                            <li>
                              Send or receive what we reasonably believe to be
                              potentially fraudulent funds.
                            </li>
                            <li>
                              Refuse to cooperate in an investigation or provide
                              confirmation of your identity or any information
                              you provide to us.
                            </li>
                            <li>
                              Attempt to double dip during the course of a
                              dispute by receiving or attempting to receive
                              funds from both Azonka and the seller, bank or
                              card issuer for the same transaction.
                            </li>
                            <li>
                              Control an account that is linked to another
                              account that has engaged in any of these
                              restricted activities.
                            </li>
                            <li>
                              Conduct your business or use the Azonka services
                              in a manner that results in or may result in:
                              <ul>
                                <li>complaints;</li>
                                <li>
                                  requests by buyers (either filed with us or
                                  card issuers) to invalidate payments made to
                                  you; or;
                                </li>
                                <li>
                                  fees, fines, penalties or other liability or
                                  losses to Azonka, other Azonka customers,
                                  third parties or you.
                                </li>
                              </ul>
                            </li>
                            <li>
                              Use your Azonka account or the Azonka services in
                              a manner that Azonka, Visa, MasterCard, Verve or
                              any other electronic funds transfer network
                              reasonably believes to be an abuse of the card
                              system or a violation of card association or
                              network rules.
                            </li>
                            <li>
                              Allow your Azonka account to have a negative
                              Azonka balance.
                            </li>
                            <li>
                              Take any action that imposes an unreasonable or
                              disproportionately large load on our websites,
                              software, systems (including any networks and
                              servers used to provide any of the Azonka
                              services) operated by us or on our behalf or the
                              Azonka services; facilitate any viruses, trojan
                              horses, malware, worms or other computer
                              programming routines that attempts to or may
                              damage, disrupt, corrupt, misuse, detrimentally
                              interfere with, surreptitiously intercept or
                              expropriate, or gain unauthorized access to any
                              system, data, information or Azonka services; use
                              an anonymizing proxy; use any robot, spider, other
                              automatic device, or manual process to monitor or
                              copy our websites without our prior written
                              permission; use any device, software or routine to
                              bypass our robot exclusion headers; or interfere
                              or disrupt or attempt to interfere with or disrupt
                              our websites, software, systems (including any
                              networks and servers used to provide any of the
                              Azonka services) operated by us or on our behalf,
                              any of the Azonka services or other users' use of
                              any of the Azonka services.
                            </li>
                            <li>
                              Take any action that may cause us to lose any of
                              the services from our Internet service providers,
                              payment processors, or other suppliers or service
                              providers.
                            </li>
                            <li>
                              Use the Azonka services to test credit or debit
                              card behaviors.
                            </li>
                            <li>
                              Circumvent any Azonka policy or determinations
                              about your Azonka account such as temporary or
                              indefinite suspensions or other account holds,
                              limitations or restrictions, including, but not
                              limited to, engaging in the following actions:
                              attempting to open new or additional Azonka
                              account(s) when an account has a negative Azonka
                              balance or has been restricted, suspended or
                              otherwise limited; opening new or additional
                              Azonka accounts using information that is not your
                              own (e.g. name, address, email address, etc.); or
                              using someone else's Azonka account;
                            </li>
                            <li>
                              Harass and/or threaten our employees, agents, or
                              other users.
                            </li>
                            <li>
                              Abuse (as either a buyer or seller) our online
                              dispute resolution process and/or Azonka Buyer
                              Protection.
                            </li>
                            <li>
                              Cause us to receive a disproportionate number of
                              claims that have been closed in favour of the
                              claimant regarding your Azonka account or
                              business.
                            </li>
                            <li>
                              Have a credit score from a credit reporting agency
                              that indicates a high level of risk associated
                              with your use of the Azonka services.
                            </li>
                            <li>
                              Disclose or distribute another user's information
                              to a third party, or use such information for
                              marketing purposes unless you receive the user's
                              express consent to do so.
                            </li>
                            <li>
                              Send unsolicited emails to users or use the Azonka
                              services to collect payments for sending, or
                              assisting in sending, unsolicited emails to third
                              parties.
                            </li>
                            <li>
                              Copy, reproduce, communicate to any third party,
                              alter, modify, create derivative works, publicly
                              display or frame any content from the Azonka
                              websites without our or any applicable third
                              party's written consent.
                            </li>
                            <li>
                              Reveal your account password(s) to anyone else,
                              nor use anyone else's password. We are not
                              responsible for losses incurred by you including,
                              without limitation, the use of your account by any
                              person other than you, arising as the result of
                              misuse of passwords.
                            </li>
                          </ul>
                        </article>
                      </p>
                    </div>
                  </div>

                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">
                        Actions We May Take if You Engage in Any Restricted
                        Activities
                      </h2>

                      <p>
                        <article>
                          If we believe that you've engaged in any of these
                          activities, we may take a number of actions to protect
                          Azonka, its customers and others at any time in our
                          sole discretion. The actions we might take include,
                          but are not limited to, the following:
                          <ul>
                            <li>
                              Terminate this user agreement, limit your Azonka
                              account, and/or close or suspend your Azonka
                              account, immediately and without penalty to us and
                              without prior notice;
                            </li>
                            <li>
                              Refuse to provide the Azonka services to you now
                              and in the future;
                            </li>
                            <li>
                              Limit your access to our websites, software,
                              systems (including any networks and servers used
                              to provide any of the Azonka services) operated by
                              us or on our behalf, your Azonka account or any of
                              the Azonka services, including limiting your
                              ability to pay or send payments with any of the
                              payment methods linked to your Azonka account,
                              restricting your ability to send payments or make
                              withdrawals;
                            </li>
                            <li>
                              Hold your Azonka balance if reasonably needed to
                              protect against the risk of liability to Azonka or
                              a third party, or if you have violated our 
                              <Link to="#">Acceptable Use Policy</Link> or{" "}
                              <Link to="#">other Conditions of Use</Link>;
                            </li>
                            <li>
                              Suspend your eligibility for Azonka's Buyer
                              Protection program and/or Azonka's Seller
                              Protection program;
                            </li>
                            <li>
                              Contact buyers who have purchased goods or
                              services from you using Azonka, your bank or
                              credit or debit card issuer, other impacted third
                              parties or law enforcement about your actions;
                            </li>
                            <li>
                              Update inaccurate information you provided us;
                            </li>
                            <li>Take legal action against you;</li>
                            <li>
                              If you've violated our Acceptable Use Policy,
                              and/or Conditions of Use, then you're also
                              responsible for damages to Azonka caused by your
                              violation of this policy. Considering all existing
                              circumstances, actual damages would be impractical
                              or extremely difficult to calculate. Azonka may
                              thus deduct such damages directly from any
                              existing Azonka balance in any Azonka account you
                              control.
                            </li>
                          </ul>
                        </article>
                        <article>
                          If we close your Azonka account or terminate your use
                          of the Azonka services for any reason, we'll provide
                          you with notice of our actions and make any
                          unrestricted funds held in your Azonka account
                          available for withdrawal. You are responsible for all
                          reversals, chargebacks, claims, fees, fines, penalties
                          and other liability incurred by Azonka, any Azonka
                          customer, or a third party caused by or arising out of
                          your breach of this user agreement, and/or your use of
                          the Azonka services.
                        </article>
                      </p>
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">
                        Holds, Limitations and Reserves
                      </h2>

                      <p>
                        {/* <h4>What are holds, limitations and reserves?</h4> */}
                        <article>
                          Under certain circumstances, in order to protect
                          Azonka and the security and integrity of the network
                          of buyers and sellers that use the Azonka services,
                          Azonka may take account-level or transaction-level
                          actions. Unless otherwise noted, if we take any of the
                          actions described here, we'll provide you with notice
                          of our actions, but we retain the sole discretion to
                          take these actions. To request information in
                          connection with an account limitation, hold or
                          reserve, you should follow the instructions in our
                          phone or email notice with respect to the limitation,
                          hold or reserve.
                          <br />
                          <br />
                          Our decision about holds, limitations and reserves may
                          be based on confidential criteria that are essential
                          to our management of risk and the protection of
                          Azonka, our customers and/or service providers. We may
                          use proprietary fraud and risk modeling when assessing
                          the risk associated with your Azonka account. In
                          addition, we may be restricted by regulation or a
                          governmental authority from disclosing certain
                          information to you about such decisions. We have no
                          obligation to disclose the details of our risk
                          management or security procedures to you. In order to
                          facilitate Azonka’s actions described above and allow
                          us to assess the level of risk associated with your
                          Azonka account, you agree to cooperate with Azonka’s
                          reasonable requests for financial statements and other
                          documentation or information in a timely fashion.
                        </article>
                      </p>
                      <p>
                        <h4>Holds</h4>

                        <article>
                          A hold is an action that Azonka may take under certain
                          circumstances either at the transaction level or the
                          account level. When Azonka places a temporary hold on
                          a payment, the funds shall not be available to either
                          the sender or the recipient. Azonka reviews many
                          factors before placing a hold on a payment, including:
                          account tenure, transaction activity, business type,
                          past customer disputes, and overall customer
                          satisfaction. Some common situations where Azonka may
                          hold payments include:
                          <ul>
                            <li>
                              New sellers or sellers who have limited selling
                              activity.
                            </li>
                            <li>
                              Payments for higher-risk categories like
                              electronics.
                            </li>
                            <li>
                              Sellers who have performance issues, or a high
                              rate of buyer dissatisfaction or disputes.
                            </li>
                          </ul>
                        </article>
                      </p>
                      <p>
                        <h4>Holds based on Azonka’s risk decisions</h4>
                        <article>
                          We may place a hold on payments sent to your Azonka
                          account if, in our sole discretion, we believe that
                          there may be a high level of risk associated with you,
                          your Azonka account, or your transactions or that
                          placing such a hold is necessary to comply with
                          regulatory requirements. We make decisions about
                          whether to place a payment hold based on a number of
                          factors, including information available to us from
                          both internal sources and third parties. When we place
                          a hold on a payment, the funds may appear in your
                          Azonka account with an indication that they are
                          unavailable or pending. We'll notify you, either
                          through your Azonka account or directly by phone or
                          email, whenever we place a hold. Risk-based holds
                          generally remain in place for up to 30 days or more
                          from the date the payment was received into your
                          Azonka account unless Azonka has a reason to continue
                          to hold the payment. We may release the hold earlier
                          under certain circumstances (for example, if you've
                          uploaded shipment tracking information related to the
                          transaction, or other requested documentation), but
                          any earlier release is at our sole discretion. In this
                          case, we'll hold the payment in your Azonka account
                          until the matter is resolved.
                        </article>
                      </p>
                      <p>
                        <h4>Holds based on disputed transactions</h4>
                        <article>
                          If a payment sent to you as a seller is challenged as
                          a payment that should be invalidated and reversed, we
                          may place a temporary hold on the funds in your Azonka
                          account to cover the amount that could be reversed. If
                          we determine the transaction should not be reversed,
                          we'll lift the temporary hold. If we determine the
                          transaction should be reversed, we'll remove the funds
                          from your Azonka account.
                        </article>
                      </p>
                      <p>
                        <h4>Account Limitations</h4>
                        <article>
                          Limitations prevent you from completing certain
                          actions with your Azonka account, such as withdrawing,
                          sending or receiving payments. These limitations are
                          implemented to help protect Azonka, buyers and sellers
                          when we notice an increased financial risk, or
                          activity that appears to us as unusual or suspicious.
                          Limitations also help us collect information necessary
                          for keeping your Azonka account open. There are
                          several reasons why we may limit your access to your
                          Azonka account or the Azonka services, and/or limit
                          access to your funds, including:
                          <ul>
                            <li>
                              If we suspect someone could be using your Azonka
                              account without your knowledge, we'll limit it for
                              your protection and look into the fraudulent
                              activity.
                            </li>
                            <li>
                              If your debit or credit card issuer alerts us that
                              someone has used your card without your
                              permission. Similarly, if your bank lets us know
                              that there have been unauthorized transfers
                              between your Azonka account and your bank account.
                            </li>
                            <li>In order to comply with applicable law.</li>
                            <li>
                              If we reasonably believe you have breached this
                              agreement or violated the Conditions of Use Policy
                              or any other Agreements.
                            </li>
                            <li>
                              Seller performance indicating your Azonka account
                              is high risk. Examples include: indications of
                              poor selling performance because you've received
                              an unusually high number of claims and chargebacks
                              selling an entirely new or high cost product, or
                              if your typical sales volume increases rapidly.
                            </li>
                          </ul>
                          If we limit access to your Azonka account, we'll
                          provide you with notice of our actions and the
                          opportunity to request restoration of access if, in
                          our sole discretion, we deem it appropriate. You will
                          need to resolve any issues with your account before a
                          limitation can be removed. Normally, this is done
                          after you provide us with the information we request.
                          However, if we reasonably believe a risk still exists
                          after you have provided us that information, we may
                          take action to protect Azonka, our users, a third
                          party, or you from reversals, fees, fines, penalties,
                          legal and/or regulatory risks and any other liability.
                        </article>
                      </p>
                      <p>
                        <h4>Reserves</h4>
                        <article>
                          We may place a reserve on your Azonka account if we
                          believe there may be a high level of risk associated
                          with you, your Azonka account, your business model, or
                          your transactions. When we place a reserve on your
                          Azonka account, it means that all or some of the
                          transactions will be shown as "pending" in your Azonka
                          balance, and you will not be able to withdraw funds in
                          a "pending" status, in order to protect against the
                          risk of transactions made by you being reversed or
                          invalidated or any other risk related to your Azonka
                          account or use of the Azonka services. We make
                          decisions about whether to place a reserve based on a
                          number of factors, including information available to
                          us from both internal sources and from third parties.
                          Azonka considers a list of non-exclusive factors, and
                          whether and how these factors have changed over time,
                          including:
                          <ul>
                            <li>How long you have been in business.</li>
                            <li>
                              Whether your industry has a higher likelihood of
                              chargebacks.
                            </li>
                            <li>
                              Your payment processing history with Azonka and
                              other providers.
                            </li>
                            <li>
                              Your business and/or personal credit history.
                            </li>
                            <li>Your delivery time frames.</li>
                            <li>
                              Whether you have higher than average number of
                              returns, chargebacks, claims or disputes.
                            </li>
                            <li>
                              Whether your account has a higher than average
                              number of negative balance
                            </li>
                            Your account has recorded a number of suspicious
                            transfer activity
                          </ul>
                          If we place a reserve on funds in your account, we'll
                          notify you of our actions and the terms of the
                          reserve. There are two types of reserves that may be
                          placed on your Azonka account, and one or both may be
                          applied at the same time:
                          <ul>
                            <li>
                              <b>A Rolling reserve</b> is a reserve where a
                              percentage of each transaction you receive each
                              day is held and then released later on a scheduled
                              basis. For example, your reserve could be set at
                              5% and held for a 30-day rolling period – meaning
                              5% of the funds you receive on day 1 are held and
                              then released on day 31, 5% of the funds you
                              receive on day 2 are held until day 32, etc.
                              Rolling reserves are the most common type of
                              reserve.
                            </li>
                            <li>
                              <b>A Minimum reserve</b> is a specific minimum
                              amount that you're required to keep available in
                              your Azonka balance at all times. The minimum
                              reserve is either taken as an upfront amount
                              deposited all at once or is established on a
                              rolling basis from percentages of sales or inflow
                              until the minimum reserve is achieved, much like a
                              rolling reserve.
                            </li>
                          </ul>
                          If we change or update the terms of the reserve due to
                          a change in our risk assessment, we'll notify you of
                          the new terms.
                        </article>
                      </p>
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">
                        Court Orders, Regulatory Requirements or Other Legal
                        Process
                      </h2>

                      <p>
                        <article>
                          If we are notified of a court order or other legal
                          process (including garnishment or any equivalent
                          process) affecting you, or if we otherwise believe we
                          are required to do so in order to comply with
                          applicable law or regulatory requirements, we may be
                          required to take certain actions, including holding
                          payments to/from your Azonka account, placing a
                          reserve or limitation on your Azonka account, or
                          releasing your funds. We will decide, in our sole
                          discretion, which action is required of us. Unless the
                          court order, applicable law, regulatory requirement or
                          other legal process requires otherwise, we will notify
                          you of these actions. We do not have an obligation to
                          contest or appeal any court order or legal process
                          involving you or your Azonka account. When we
                          implement a hold, reserve or limitation as a result of
                          a court order, applicable law, regulatory requirement
                          or other legal process, the hold, reserve or
                          limitation may remain in place as long as reasonably
                          necessary as determined by Azonka
                        </article>
                      </p>
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2 id="item-received">Azonka Acceptable Use Policy</h2>

                      <p>
                        <article>
                          You are independently responsible for complying with
                          all applicable laws in all of your actions related to
                          your use of Azonka services, regardless of the purpose
                          of the use. In addition, you must adhere to the terms
                          of this Acceptable Use Policy.
                          <h4>Prohibited Activities</h4>
                          You may not use the Azonka service for activities
                          that:
                          <ul>
                            <li>
                              violate any law, statute, ordinance or regulation.
                            </li>
                            <li>
                              relate to transactions involving (a) narcotics,
                              steroids, certain controlled substances or other
                              products that present a risk to consumer safety,
                              (b) drug paraphernalia, (c) cigarettes, (d) items
                              that encourage, promote, facilitate or instruct
                              others to engage in illegal activity, (e) stolen
                              goods including digital and virtual goods, (f) the
                              promotion of hate, violence, racial or other forms
                              of intolerance that is discriminatory or the
                              financial exploitation of a crime, (g) items that
                              are considered obscene, (h) items that infringe or
                              violate any copyright, trademark, right of
                              publicity or privacy or any other proprietary
                              right under the laws of any jurisdiction, (i)
                              certain sexually oriented materials or services,
                              (j) ammunition, firearms, or certain firearm parts
                              or accessories, or (k) certain weapons or knives
                              regulated under applicable law.
                            </li>
                            <li>
                              relate to transactions that (a) show the personal
                              information of third parties in violation of
                              applicable law, (b) support pyramid or ponzi
                              schemes, matrix programs, other "get rich quick"
                              schemes or certain multi-level marketing programs,
                              (c) are associated with purchases of annuities or
                              lottery contracts, lay-away systems, off-shore
                              banking or transactions to finance or refinance
                              debts funded by a credit card, (d) are for the
                              sale of certain items before the seller has
                              control or possession of the item, (e) are by
                              payment processors to collect payments on behalf
                              of merchants, (f) are associated with the sale of{" "}
                              traveler's checks or money orders, (g) involve
                              currency exchanges or check cashing businesses,
                              (h) involve certain credit repair, debt settlement
                              services, credit transactions or insurance
                              activities, or (i) involve offering or receiving
                              payments for the purpose of bribery or corruption.
                            </li>
                            <li>
                              involve the sales of products or services
                              identified by government agencies to have a high
                              likelihood of being fraudulent.
                            </li>
                          </ul>
                        </article>
                      </p>
                    </div>
                  </div>
                  <div className="row my-5">
                    <Link to="/users/self-service" className="text-primary">
                      Back to Help
                    </Link>
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

export default RefundPolicy;
