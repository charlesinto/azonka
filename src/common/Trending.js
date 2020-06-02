import React, { Component } from 'react';
import bannerImage from "../css/images/banners/banner-1.jpg";
class Trending extends Component {
    render() {
        return (
            <div className="col-md-4">
                <div className="banner banner-image">
                    <a href="#h">
                        <img src={bannerImage} alt="banner" />
                    </a>
                </div>
            </div>
        );
    }
}

export default Trending;