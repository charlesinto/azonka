import React, { Component } from 'react';
import homeFeatured from "../css/images/products/home-featured-3.jpg";
class HotProduct extends Component {
    render() {
        return (
            <div class="product product-sm">
                <figure class="product-image-container">
                    <a href="product.html" class="product-image">
                        <img src={homeFeatured} alt="product" />
                    </a>
                </figure>
                <div class="product-details">
                    <h2 class="product-title">
                        <a href="product.html">Silver Porto Headset</a>
                    </h2>
                    <div class="ratings-container">
                        <div class="product-ratings">
                            <span class="ratings" style={{width:"80%"}}></span>
                        </div>
                    </div>
                    <div class="price-box">
                        <span class="product-price">$45.00</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default HotProduct;