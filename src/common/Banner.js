import React, { Component } from 'react';
// import bannerPoster from "../css/images/banners/banner-sidebar.jpg";

class Banner extends Component {
    render() {
        return (
            <div class="banner banner-image border">
                <a href="#n">
                    <img src={this.props.image} alt="banner" />
                </a>
            </div>
        );
    }
}

export default Banner;