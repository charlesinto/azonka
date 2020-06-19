import React, { Component } from 'react';
// import bannerPoster from "../css/images/banners/banner-sidebar.jpg";
import { Link } from "react-router-dom";
class Banner extends Component {
    render() {
        return (
            <div class="banner banner-image border">
                <Link to="#advert">
                    <img src={this.props.image} className="d-block w-100" alt="banner" />
                </Link>
            </div>
        );
    }
}

export default Banner;