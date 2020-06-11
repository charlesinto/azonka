import React, { Component } from 'react';

class HomeSlide extends Component {
    render() {
        return (
            <div className="bkkk">
                <div className="home-slider-responsive" style={{backgroundImage: `url(${this.props.image})`}}>
                    {/* <img src={this.props.image} alt="profile" /> */}
                </div>
                <div className="bkkk-slide-content text-white">
                    {/* <h3 style={{color:"#fff", textShadow:'2px 2px #ccc'}} >Get up to <span>60%</span> off</h3>
                    <h1 style={{color:"#fff", textShadow:'2px 2px #ccc'}} >Summer Sale</h1>
                    <p style={{color:"#fff", textShadow:'2px 2px #ccc'}} >Limited items available at this price.</p> */}
                    <span href="category.html" className="btn btn-dark">Shop Now</span>
                </div>
            </div>
        );
    }
}

export default HomeSlide;