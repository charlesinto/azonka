import React, { Component } from 'react';

class Trending extends Component {
    render() {
        return (
            <div className="col-lg-4 col-sm-4" key={this.props.index}>
                <div className="banner banner-image border">
                    <a href="#ddd">
                        <img src={this.props.image} alt="banner" />
                    </a>
                </div>
            </div>
        );
    }
}

export default Trending;