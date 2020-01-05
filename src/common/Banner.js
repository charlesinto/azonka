import React, { Component } from 'react';
import bannerPoster from "../css/images/banners/banner-sidebar.jpg";

class Banner extends Component {
    render() {
        return (
            <div class="banner banner-image">
                <a href="#">
                    <img src={bannerPoster} alt="banner" />
                </a>
            </div>
        );
    }
}

export default Banner;