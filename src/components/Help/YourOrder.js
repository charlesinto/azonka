import React from "react";
import Footer from "../HeaderFooter/Footer";
import { Link } from "react-router-dom";

const YourOrder = () => {
  return (
    <React.Fragment>
      <div className="router-container">
        <div className="h-100 w-100 py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-10">
                <div className="row my-2">
                  <h2>How to Shop on Azonka</h2>
                  <p>
                    <article>
                      Orders are created when you purchase an item on our
                      website or apps with your Azonka wallet, Bank transfers,
                      USSD or Debit/Credit card. Shopping on azonka.com is easy,
                      safe, and very rewarding. You may follow these quick steps
                      to create an order:
                      <ul className="ordered-list">
                        <li>
                          - Browse through listed items under an array of
                          categories, subcategories, and links
                        </li>
                        <li>
                          - Add item(s) to your cart and proceed to make payment
                        </li>
                        <li>
                          - Provide your desired delivery details and make
                          payment for your purchased item
                        </li>
                      </ul>
                      You will be adequately notified of your order creation
                      upon successful payment.
                      <br />
                      <br />
                      <b>Note:</b> To retain interest in any listed item(s), and
                      perhaps intend to complete payment at a later date, you
                      can easily move the item(s) to your <b>“Wishlist”</b>. You
                      are however encouraged to purchase your desired items as
                      soon as you can while they are in stock.
                    </article>
                  </p>
                </div>

                <div className="row my-2">
                  <h2>Pricing and Promotions</h2>
                  <p>
                    <article>
                      Maximum customer satisfaction is the prime objective,
                      therefore, we go over and beyond to ensure the integrity
                      of products listed on our website and apps. Our offer of
                      continuous value-based rewards, promotions and special
                      offers, remains unrivaled.
                      <br />
                      <br />
                      With Azonka, you enjoy fantastic price slashes on quality
                      products, and captivating deals. Keep shopping with us to
                      get instant updates on promos and hot discount on sales.
                    </article>
                  </p>
                </div>
                <div className="row my-2">
                  <h2>Shipping &amp; Delivery</h2>
                  <p>
                    <article>
                      Azonka coordinates with reputable delivery and logistics
                      partners to give you a seamless and satisfactory shopping
                      experience. Shipping / Delivery fees will vary depending
                      on the location and size of the selected item(s)
                      <br />
                      <br />
                      To determine the applicable shipping fees for the items in
                      your Cart:
                      <ul>
                        <li>Select Checkout</li>
                        <li>
                          Review your order list and select{" "}
                          <code> Pay Now</code>
                        </li>
                        <li>Select or add your Shipping / Delivery address</li>
                        <li>
                          Select your payment channel (
                          <b>Azonka Wallet, Debit/Credit card</b>){" "}
                        </li>
                        <li>
                          Select <code>Continue</code>, shipping cost will be
                          displayed
                        </li>
                      </ul>
                      - How long does it take to receive my orders?
                      <br />
                      Delivery time starts from the day one of our delivery
                      associates makes the first attempt to deliver to you to
                      the day delivery is completed.
                      <br />
                      <br />
                      Delivery will be attempted 3 times over a 5-day period
                      (7:00 am to 5:30pm) after which we will cancel the order.
                      Timelines for delivery are business days – Monday to
                      Friday only, excluding weekends depending on the delivery
                      option chosen and the location of your delivery address.
                    </article>
                  </p>
                </div>
                <div className="row my-2">
                  <h2>
                    Delivery Confirmation and Payment Confirmation Code (PCC)
                  </h2>
                  <p>
                    <article>
                      Azonka.com utilizes a unique system for order delivery
                      confirmation to ensure transparency and efficiency. The
                      well-designed processes from the point of payment to
                      delivery are simple and seamless for all web and mobile
                      app users.
                    </article>
                  </p>
                </div>
                <div className="row my-2">
                  <h2>
                    Delivery Confirmation and Payment Confirmation Code (PCC)
                  </h2>
                  <p>
                    <article>
                      Upon successful payment for a product, an order is created
                      and an email notification containing your{" "}
                      <b>Payment Confirmation Code (PCC)</b>, which validates
                      that order, is sent to you. Buyers are advised to keep the
                      issued PCC confidential, and only present it the seller or
                      delivery personnel at the point of delivery to confirm the
                      receipt of the delivered item(s). Your order may not be
                      handed over to you in the absence of the valid PCC.
                      <br />
                      <br />
                      <b>Note:</b> Multiple different PCCs may be issued to you
                      corresponding to the different sellers/vendors fulfilling
                      the order, which might be delivered separately; however,
                      each PCC issued to you will clearly indicate the
                      corresponding seller and items covered by it.
                      <br />
                      <br />
                      Alternatively, order deliveries may be confirmed
                      effectively via the <code>AzonkaPay</code> feature of the{" "}
                      <b>Azonka.com Mobile App</b>. To confirm your order
                      delivery on the mobile app, follow these simple steps
                      <br />
                      <br />
                      <ul className="ordered-list">
                        <li>
                          <b>Step 1:</b> Sign in to your Azonka Mobile App
                        </li>
                        <li>
                          <b>Step 2:</b> Access the <code>AzonkaPay</code>{" "}
                          feature on the menu side panel
                        </li>
                        <li>
                          <b>Step 3:</b> Select “Scan to Confirm Delivery” and
                          scan the QR code attached to the delivered package
                        </li>
                        <li>
                          <b>Step 4:</b> Review the order delivery details
                        </li>
                        <li>
                          <b>Step 5:</b> Confirm the delivery
                        </li>
                      </ul>
                    </article>
                  </p>
                </div>
                <div className="row my-2">
                  <h2>Returns, Refunds & Order Disputes</h2>
                  <p>
                    <article>
                      Azonka.com Return and Refund Policy, which is implemented
                      via our{" "}
                      <Link to="/refund-policy">Buyer Protection Program</Link>,
                      guarantees FULL refund for all valid order dispute claims.
                      <br />
                      <br />
                      The issuance of the unique Payment Confirmation Code (PCC)
                      offers an adequate preliminary protection to the buyer and
                      qualifies the buyer for refund where there is clear
                      evidence of Product Description violation by the seller
                      under the <b>“Significantly Not as Described”</b> claim;
                      or where a seller in unable to fulfill your order under
                      the <b>“Item Not Received”</b> claim.
                      <br />
                      <br />
                      Before you choose to initiate an Order Dispute claim’, you
                      must ensure that your transaction is eligible and satisfy
                      all necessary conditions under the{" "}
                      <b>“Item Not Received”</b> or{" "}
                      <b>“Significantly Not as Described”</b> category as
                      prescribed by the Azonka Return and Refund Policy. You
                      must also follow our{" "}
                      <b>Azonka online order dispute resolution process</b> to
                      pursue your claim within <b>48hrs</b> upon delivery of
                      your item(s).
                    </article>
                  </p>
                </div>
                <div className="row my-2">
                  <h2>How do I get a Payment Refund?</h2>
                  <p>
                    <article>
                      You will be automatically refunded for eligible purchases
                      made on azonka.com where the seller is clearly unable to
                      fulfill the order. In such cases, you will be notified of
                      such change(s) in your order. For other eligible order
                      dispute claims, where applicable, refunds will be made
                      directly to your azonka wallet following the resolution of
                      the order dispute process.
                    </article>
                  </p>
                </div>
                <div className="row my-2">
                  <div>
                    <h2>How to raise Order Dispute</h2>

                    <p>
                      <article>
                        An order dispute can be raised by the following steps:
                        <br />
                        <br />
                        <ul className="ordered-list">
                          <li>
                            <b>Step 1: </b> Sign in to your account and select
                            Help on the homepage
                          </li>
                          <li>
                            <b>Step 2: </b> Select{" "}
                            <code>Manage Orders &gt; Order dispute</code>
                          </li>
                          <li>
                            <b>Step 3: </b> Identify the appropriate order, and
                            select <code>Raise Dispute </code>
                          </li>
                        </ul>
                      </article>
                    </p>
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

export default YourOrder;
