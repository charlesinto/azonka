import React, { Component } from 'react';

class Trending extends Component {
    render() {
        return (
            <div className="col-md-4">
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