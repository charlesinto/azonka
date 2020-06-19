import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Trending extends Component {
    render() {
        return (
            <div className="col-lg-4 col-sm-4" key={this.props.index}>
                <div className="banner banner-image border">
                    <Link to="#advert">
                        <img src={this.props.image} className="d-block w-100" alt="banner" />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Trending;