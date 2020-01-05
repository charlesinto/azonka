import React, { Component } from 'react';
import bannerImage from "../css/images/banners/banner-1.jpg";
class Trending extends Component {
    render() {
        return (
            <div class="col-md-4">
                <div class="banner banner-image">
                    <a href="#">
                        <img src={bannerImage} alt="banner" />
                    </a>
                </div>
            </div>
        );
    }
}

export default Trending;