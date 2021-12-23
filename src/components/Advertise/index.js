import React from "react";
import HelpMenu from "../../common/HelpMenu";
import banner from "../../assets/banner.png";
import brand from "../../assets/brand.png";
import science from "../../assets/science.png";
import { FaQRow } from "../../common/FaQRow";
import Footer from "../HeaderFooter/Footer";

const Advertize = () => {
  return (
    <div>
      <div style={{ minHeight: "fit-content" }} className="body">
        <HelpMenu page="ADVERTISE YOUR PRODUCT" />
        <div
          style={{ position: "relative", backgroundImage: `url(${banner})` }}
          className="bannerContainer"
        ></div>
        <div className="container px-3 mt-4">
          <div className="row section bg-white">
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
                  src={science}
                  style={{ width: 100, height: 100 }}
                />
              </div>
            </div>
            <div className="col-md-8">
              <article className="article">
                Through our specially designed Target-Audience algorithm powered
                by Artificial Intelligence (AI), your products are offered to
                customers who most likely need them. When you advertise on
                Azonka, you take advantage of highly discounted advertising and
                marketing rates that offer the best results at the lowest prices
                you can't get anywhere else.
              </article>
            </div>
          </div>
          <div className="row bg-white mb-4 section">
            <div className="col-md-12">
              <p>
                <article className="article">
                  We also offer a more robust and comprehensive advertisement
                  service on our platforms to deliver optimum visibility to meet
                  your business needs. There are numerous carefully selected
                  advert placement locations across our Desktop and mobile
                  platforms which provide more options for enhanced coverage and
                  success.
                </article>
              </p>
              <p>
                <article className="article">
                  Advertising your products help you reach the customers who are
                  looking for products like yours. Better positioning and
                  visibility leads to greater sales. For more information on how
                  to start an advertisement campaign, kindly email
                  support@azonka.com; or call 080xxxXXXxx
                </article>
              </p>
            </div>
          </div>
          <div className="row section mb-4">
            <div className="col-md-8">
              <p>
                <h1 className="heavy-title">Sponsored Brands &amp; Products</h1>
              </p>
              <p>
                <h4 className="sub-heavy-title">
                  What are Sponsored Brands and Products?
                </h4>
              </p>
              <p>
                <article className="article">
                  Sponsored Brands are keyword-targeted ads that appear in
                  suitable locations within the Homepage or shopping results
                  pages with a featured brand logo, and a custom headline within
                  the ad creative. Sponsored Products enjoy enhanced visibility
                  where shoppers are looking for products like yours.
                </article>
              </p>
              <p>
                <article className="article">
                  When shoppers click the ads, they are taken to a product
                  description page, custom landing page or brand store. These
                  ads help to drive discovery of your brand and products.
                </article>
              </p>
            </div>
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
                  src={brand}
                  style={{ width: 100, height: 100 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section bg-white">
        <div className="container ">
          <div className="row section py-3 bg-white">
            <div className="col-md-12">
              <h4 className="heavy-title text-center mb-3">
                Frequently asked questions
              </h4>
              <FaQRow title="Why should I use Sponsored Brands or Products Ads?" />
              <FaQRow title="What products are not eligible for Sponsored ads?" />
              <FaQRow
                title="How much does advertising cost?"
                content="A variety of ads payment options are available to meet customer needs and budget. Therefore, you can choose how much you want to spend on your ads and manage your budget."
              />
              <FaQRow title="Where will my ads be displayed?" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Advertize;
