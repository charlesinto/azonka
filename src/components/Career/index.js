import React from "react";
import Footer from "../HeaderFooter/Footer";
import { Link } from "react-router-dom";

const Career = () => {
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
                      <h2>WORKING FOR AZONKA</h2>
                      <p>
                        <article>
                          Become an Azonkan TODAY. Build a rewarding career for
                          yourself and earn with us. At Azonka, dreams are
                          fulfilled daily for millions of people who build their
                          businesses and earn cash rewards by selling, buying or
                          taking advantage of our unique referral model. We
                          adopt a simplified onboarding process that involves
                          the strict implementation of zero registration fee,
                          free listing and free support provision, enabling
                          sellers and agents to work and earn substantially on
                          Azonka.com. At Azonka, you are in total control of
                          your time and money. Interesting fact is that you have
                          access to earning unlimited income regardless of your
                          educational qualification, sales experience, location
                          and schedule. Welcome on board and start earning.
                        </article>
                      </p>
                    </div>
                  </div>
                  <div className="row my-5">
                    <div className="col-md-12">
                      <h2>FIND JOBS</h2>
                      <p>
                        <article>
                          Azonka.com is a high-paced working environment that
                          challenges individuals to explore their potentials
                          while delivering their duties with maximum support. We
                          are continually hiring from all fields to fill various
                          positions in different departments. Should you choose
                          to join us in an indirect capacity, our affiliate
                          programs are well designed to provide the excellent
                          work flexibility you need. To access available job
                          openings, kindly{" "}
                          <Link to="#" className="text-primary mr-1">
                            Click Here
                          </Link>
                          page. To get notifications on jobs openings and other
                          related information on Azonka.com, kindly signup to
                          our email newsletter service and follow us on our
                          corporate and social media platforms.
                        </article>
                      </p>
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

export default Career;
