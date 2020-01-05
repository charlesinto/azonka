import React, { Component } from 'react';
import newsIcon from "../../images/news_icon.png";

class SubscribeBanner extends Component {
    render() {
        return (
            <div id="subscribe-banner-wrap">
                <div id="subscribe-banner">
                    <div className="subscribe-content">
                        <div className="subscribe-header">
                            <figure>
                                <img src={newsIcon} alt="subscribe-icon" />
                            </figure>
                            <p className="subscribe-title">Subscribe to our Newsletter</p>
                            <p>And receive the latest news and offers</p>
                        </div>
                        <form className="subscribe-form">
                            <input type="text" name="subscribe_email" id="subscribe_email" placeholder="Enter your email here..." />
                            <button className="button medium dark">Subscribe!</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubscribeBanner;