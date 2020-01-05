import React, { Component } from 'react';

class HomeSlide extends Component {
    render() {
        return (
            <div className="home-slide">
                <div style={{width:"100%", height:"100%"}} >
                    <img src={this.props.image} style={{width:"100%", maxHeight:"100%", height:"auto"}} />
                </div>
                <div className="home-slide-content text-white">
                    {/* <h3 style={{color:"#fff", textShadow:'2px 2px #ccc'}} >Get up to <span>60%</span> off</h3>
                    <h1 style={{color:"#fff", textShadow:'2px 2px #ccc'}} >Summer Sale</h1>
                    <p style={{color:"#fff", textShadow:'2px 2px #ccc'}} >Limited items available at this price.</p> */}
                    <a href="category.html" className="btn btn-dark">Shop Now</a>
                </div>
            </div>
        );
    }
}

export default HomeSlide;