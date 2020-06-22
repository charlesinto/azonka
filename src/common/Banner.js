import React, { Component } from 'react';
// import bannerPoster from "../css/images/banners/banner-sidebar.jpg";
import { Link } from "react-router-dom";
class Banner extends Component {
    render() {
        return (
            <div className="row justify-content-center banner-small">
                <div className="col-sm-10">
                    <div class="banner banner-image border">
                        <Link to="#featured-image">
                            <img src={this.props.image} className="d-block w-100" alt="banner" />
                        </Link>
                    </div>
                </div>

            </div>
        );
    }
}

export default Banner;