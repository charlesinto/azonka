import React from "react";
import { Link } from "react-router-dom";

const HelpMenu = ({ page }) => {
  return (
    <>
      <div className="scrolling-wrapper">
        <div className="card-scroll border-left">
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Link to="/">
              <article
                className={`${
                  page === "HOME" ? "text-title active" : "text-title"
                }`}
              >
                HOME
              </article>
            </Link>
          </div>
        </div>
        <div className="card-scroll border-left">
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Link to="/cashbonus-reward">
              <article
                className={`${
                  page === "AZONKA CASH BONUS"
                    ? "text-title active"
                    : "text-title"
                }`}
              >
                AZONKA CASH BONUS
              </article>
            </Link>
          </div>
        </div>
        <div className="card-scroll border-left">
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Link>
              <article
                className={`${
                  page === "AZONKA CREDIT POINT"
                    ? "text-title active"
                    : "text-title"
                }`}
              >
                AZONKA CREDIT POINT
              </article>
            </Link>
          </div>
        </div>
        <div className="card-scroll border-left">
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Link to="/advertise-product">
              <article
                className={`${
                  page === "ADVERTISE YOUR PRODUCT"
                    ? "text-title active"
                    : "text-title"
                }`}
              >
                ADVERTISE YOUR PRODUCT
              </article>
            </Link>
          </div>
        </div>
        <div className="card-scroll border-left">
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Link>
              <article
                className={`${
                  page === "MAKE MONEY ON AZONKA"
                    ? "text-title active"
                    : "text-title"
                }`}
              >
                MAKE MONEY ON AZONKA
              </article>
            </Link>
          </div>
        </div>
        <div className="card-scroll border-left">
          <div className="d-flex h-100 justify-content-center align-items-center">
            <Link>
              <article
                className={`${
                  page === "AZONKA MOBILE APP"
                    ? "text-title active"
                    : "text-title"
                }`}
              >
                AZONKA MOBILE APP
              </article>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpMenu;
