import React, { Component } from 'react';
import logoSmall from "../../images/logo_small.png";

class Footer extends Component {
    render() {
        return (
            <footer>
                <div id="footer-top-wrap">
                    <div id="footer-top">
                        <div className="company-info">
                            <figure className="logo small">
                                {/* <div className="company-name-footer">Azonta Market</div> */}
                                <img src={logoSmall} alt="logo-small" />
                            </figure>
                            <p>Lorem ipsum dolor sit amet, consectetur isicing elit, sed do eiusmod tempor incididunt ut labo dolore magna ua.</p>
                            <ul className="company-info-list">
                                <li className="company-info-item">
                                    <span className="icon-present"></span>
                                    <p><span>850.296</span> Products</p>
                                </li>
                                <li className="company-info-item">
                                    <span className="icon-energy"></span>
                                    <p><span>1.207.300</span> Members</p>
                                </li>
                                <li className="company-info-item">
                                    <span className="icon-user"></span>
                                    <p><span>74.059</span> Sellers</p>
                                </li>
                            </ul>
                            <ul className="social-links">
                                <li className="social-link fb">
                                    <span></span>
                                </li>
                                <li className="social-link twt">
                                    <span ></span>
                                </li>
                                <li className="social-link db">
                                    <span ></span>
                                </li>
                                <li className="social-link rss">
                                    <span href="/"></span>
                                </li>
                            </ul>
                        </div>
                        <div className="link-info">
                            <p className="footer-title">Our Community</p>
                            <ul className="link-list">
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">How to Join us</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Buying and Selling</a>
                                </li>
                                {/* <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="forum.html">Emerald Forum</a>
                                </li> */}
                                {/* <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="blog-v1.html">Emerald Blog</a>
                                </li> */}
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Free Goods</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Job Oportunities</a>
                                </li>
                            </ul>
                        </div>
                        <div className="link-info">
                            <p className="footer-title">Member Links</p>
                            <ul className="link-list">
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Partner Program</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Starting a Shop</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Purchase Credits</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Withdrawals</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">World Meetings</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">How to Auction</a>
                                </li>
                            </ul>
                        </div>
                        <div className="link-info">
                            <p className="footer-title">Help and FAQs</p>
                            <ul className="link-list">
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Help Center</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">FAQs</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Terms and Conditions</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Products Licenses</a>
                                </li>
                                <li className="link-item">
                                    <div className="bullet"></div>
                                    <a href="/">Security Information</a>
                                </li>
					        </ul>
                        </div>
                        <div className="twitter-feed">
                            <p className="footer-title">Twitter Feed</p>
                            <ul className="tweets"></ul>
                        </div>
                    </div>
                </div>
                <div id="footer-bottom-wrap">
                    <div id="footer-bottom">
                        <p><span>&copy;</span><a href="index.html">Zenith Solutions</a> - All Rights Reserved 2019</p>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
