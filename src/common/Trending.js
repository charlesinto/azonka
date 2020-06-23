import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Trending extends Component {
    render() {
        return (
            <div className="col-lg-3  col-sm-3" key={this.props.index}>
                <div className="banner shadow banner-image border">
                    <Link to="#featured">
                        <img src={this.props.image} className="d-block w-100" alt="banner" />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Trending;