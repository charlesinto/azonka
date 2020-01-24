
import React, { Component } from 'react'

class ShopItemAside extends Component {
    state = { priceRange: 0 }
    render() {
        return (
            <aside className="sidebar-shop col-lg-3 order-lg-first">
                <div className="sidebar-wrapper">
                    <div className="widget">
                        <h3 className="widget-title">
                            <a data-toggle="collapse" href="#widget-body-1" role="button" aria-expanded="true"
                                aria-controls="widget-body-1">electronics</a>
                        </h3>

                        <div className="collapse show" id="widget-body-1">
                            <div className="widget-body">
                                <ul className="cat-list">
                                    <li><a href="#">Smart TVs</a></li>
                                    <li><a href="#">Cameras</a></li>
                                    <li><a href="#">Head Phones</a></li>
                                    <li><a href="#">Games</a></li>
                                </ul>
                            </div>
                            {/* <!-- End .widget-body --> */}
                        </div>
                        {/* <!-- End .collapse --> */}
                    </div>
                    {/* <!-- End .widget --> */}

                    <div className="widget">
                        <h3 className="widget-title">
                            <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true"
                                aria-controls="widget-body-2">Price</a>
                        </h3>

                        <div className="collapse show" id="widget-body-2">
                            <div className="widget-body">
                                <form action="#">
                                    <div className="price-slider-wrapper">
                                        <div id="price-slider"></div>
                                    </div>
                                    {/* <!-- End .price-slider-wrapper --> */}

                                    <div className="filter-price-action">
                                        <button type="submit" className="btn btn-primary">Filter</button>
                                        <div class="form-group">
                                            {/* <label for="formControlRange">Example Range input</label> */}
                                            <input type="range" class="form-control-range" id="formControlRange"
                                                min="10" max="1000000" value="50" onChange={this.handleRangeChange} />
                                        </div>
                                    </div>
                                    {/* <!-- End .filter-price-action --> */}
                                </form>
                            </div>
                            {/* <!-- End .widget-body --> */}
                        </div>
                        {/* <!-- End .collapse --> */}
                    </div>
                    {/* <!-- End .widget --> */}

                    <div className="widget">
                        <h3 className="widget-title">
                            <a data-toggle="collapse" href="#widget-body-3" role="button" aria-expanded="true"
                                aria-controls="widget-body-3">Size</a>
                        </h3>

                        <div className="collapse show" id="widget-body-3">
                            <div className="widget-body">
                                <ul className="config-size-list">
                                    <li><a href="#">S</a></li>
                                    <li className="active"><a href="#">M</a></li>
                                    <li><a href="#">L</a></li>
                                    <li><a href="#">XL</a></li>
                                    <li><a href="#">2XL</a></li>
                                    <li><a href="#">3XL</a></li>
                                </ul>
                            </div>
                            {/* <!-- End .widget-body --> */}
                        </div>
                        {/* <!-- End .collapse --> */}
                    </div>
                    {/* <!-- End .widget --> */}

                    <div className="widget">
                        <h3 className="widget-title">
                            <a data-toggle="collapse" href="#widget-body-4" role="button" aria-expanded="true"
                                aria-controls="widget-body-4">Brands</a>
                        </h3>

                        <div className="collapse show" id="widget-body-4">
                            <div className="widget-body">
                                <ul className="cat-list">
                                    <li><a href="#">Adidas <span>18</span></a></li>
                                    <li><a href="#">Camel <span>22</span></a></li>
                                    <li><a href="#">Seiko <span>05</span></a></li>
                                    <li><a href="#">Samsung Galaxy <span>68</span></a></li>
                                    <li><a href="#">Sony <span>03</span></a></li>
                                </ul>
                            </div>
                            {/* <!-- End .widget-body --> */}
                        </div>
                        {/* <!-- End .collapse --> */}
                    </div>
                    {/* <!-- End .widget --> */}

                    <div className="widget">
                        <h3 className="widget-title">
                            <a data-toggle="collapse" href="#widget-body-6" role="button" aria-expanded="true"
                                aria-controls="widget-body-6">Color</a>
                        </h3>

                        <div className="collapse show" id="widget-body-6">
                            <div className="widget-body">
                                <ul className="config-swatch-list">
                                    <li>
                                        <a href="#" style={{ backgroundColor: "#4090d5" }}></a>
                                    </li>
                                    <li className="active">
                                        <a href="#" style={{ backgroundColor: "#f5494a" }}></a>
                                    </li>
                                    <li>
                                        <a href="#" style={{ backgroundColor: "#fca309" }}></a>
                                    </li>
                                    <li>
                                        <a href="#" style={{ backgroundColor: "#11426b" }}></a>
                                    </li>
                                    <li>
                                        <a href="#" style={{ backgroundColor: "#f0f0f0" }}></a>
                                    </li>
                                    <li>
                                        <a href="#" style={{ backgroundColor: "#3fd5c9" }}></a>
                                    </li>
                                    <li>
                                        <a href="#" style={{ backgroundColor: "#979c1c" }}></a>
                                    </li>
                                    <li>
                                        <a href="#" style={{ backgroundColor: "#7d5a3c" }}></a>
                                    </li>
                                </ul>
                            </div>
                            {/* <!-- End .widget-body --> */}
                        </div>
                        {/* <!-- End .collapse --> */}
                    </div>
                    {/* <!-- End .widget --> */}

                    <div className="widget widget-featured">
                        <h3 className="widget-title">Featured Products</h3>

                        <div className="widget-body">
                            <div className="owl-carousel widget-featured-products">
                                <div className="featured-col">
                                    <div className="product product-sm">
                                        <figure className="product-image-container">
                                            <a href="product.html" className="product-image">
                                                <img src="assets\images\products\small\product-1.jpg" alt="product" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Mouse</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: "80%" }}></span>
                                                    {/* <!-- End .ratings --> */}
                                                </div>
                                                {/* <!-- End .product-ratings --> */}
                                            </div>
                                            {/* <!-- End .product-container --> */}
                                            <div className="price-box">
                                                <span className="product-price">$45.00</span>
                                            </div>
                                            {/* <!-- End .price-box --> */}
                                        </div>
                                        {/* <!-- End .product-details --> */}
                                    </div>
                                    {/* <!-- End .product --> */}

                                    <div className="product product-sm">
                                        <figure className="product-image-container">
                                            <a href="product.html" className="product-image">
                                                <img src="assets\images\products\home-featured-1.jpg" alt="product" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Headset</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: "20%" }}></span>
                                                    {/* <!-- End .ratings --> */}
                                                </div>
                                                {/* <!-- End .product-ratings --> */}
                                            </div>
                                            {/* <!-- End .product-container --> */}
                                            <div className="price-box">
                                                <span className="old-price">$60.00</span>
                                                <span className="product-price">$45.00</span>
                                            </div>
                                            {/* <!-- End .price-box --> */}
                                        </div>
                                        {/* <!-- End .product-details --> */}
                                    </div>
                                    {/* <!-- End .product --> */}

                                    <div className="product product-sm">
                                        <figure className="product-image-container">
                                            <a href="product.html" className="product-image">
                                                <img src="assets\images\products\home-featured-2.jpg" alt="product" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Technicca</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: "100%" }}></span>
                                                    {/* <!-- End .ratings --> */}
                                                </div>
                                                {/* <!-- End .product-ratings --> */}
                                            </div>
                                            {/* <!-- End .product-container --> */}
                                            <div className="price-box">
                                                <span className="product-price">$50.00</span>
                                            </div>
                                            {/* <!-- End .price-box --> */}
                                        </div>
                                        {/* <!-- End .product-details --> */}
                                    </div>
                                    {/* <!-- End .product --> */}
                                </div>
                                {/* <!-- End .featured-col --> */}

                                <div className="featured-col">
                                    <div className="product product-sm">
                                        <figure className="product-image-container">
                                            <a href="product.html" className="product-image">
                                                <img src="assets\images\products\home-featured-3.jpg" alt="product" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Skullcanddy</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: "100%" }}></span>
                                                    {/* <!-- End .ratings --> */}
                                                </div>
                                                {/* <!-- End .product-ratings --> */}
                                            </div>
                                            {/* <!-- End .product-container --> */}
                                            <div className="price-box">
                                                <span className="old-price">$50.00</span>
                                                <span className="product-price">$35.00</span>
                                            </div>
                                            {/* <!-- End .price-box --> */}
                                        </div>
                                        {/* <!-- End .product-details --> */}
                                    </div>
                                    {/* <!-- End .product --> */}

                                    <div className="product product-sm">
                                        <figure className="product-image-container">
                                            <a href="product.html" className="product-image">
                                                <img src="assets\images\products\home-featured-4.jpg" alt="product" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Phillips</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: "60%" }}></span>
                                                    {/* <!-- End .ratings --> */}
                                                </div>
                                                {/* <!-- End .product-ratings --> */}
                                            </div>
                                            {/* <!-- End .product-container --> */}
                                            <div className="price-box">
                                                <span className="product-price">$29.00</span>
                                            </div>
                                            {/* <!-- End .price-box --> */}
                                        </div>
                                        {/* <!-- End .product-details --> */}
                                    </div>
                                    {/* <!-- End .product --> */}

                                    <div className="product product-sm">
                                        <figure className="product-image-container">
                                            <a href="product.html" className="product-image">
                                                <img src="assets\images\products\home-featured-5.jpg" alt="product" />
                                            </a>
                                        </figure>
                                        <div className="product-details">
                                            <h2 className="product-title">
                                                <a href="product.html">Senheisser</a>
                                            </h2>
                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{ width: "20%" }}></span>
                                                    {/* <!-- End .ratings --> */}
                                                </div>
                                                {/* <!-- End .product-ratings --> */}
                                            </div>
                                            {/* <!-- End .product-container --> */}
                                            <div className="price-box">
                                                <span className="product-price">$40.00</span>
                                            </div>
                                            {/* <!-- End .price-box --> */}
                                        </div>
                                        {/* <!-- End .product-details --> */}
                                    </div>
                                    {/* <!-- End .product --> */}
                                </div>
                                {/* <!-- End .featured-col --> */}
                            </div>
                            {/* <!-- End .widget-featured-slider --> */}
                        </div>
                        {/* <!-- End .widget-body --> */}
                    </div>
                    {/* <!-- End .widget --> */}

                    <div className="widget widget-block">
                        <h3 className="widget-title">Custom HTML Block</h3>
                        <h5>This is a custom sub-title.</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non placerat mi. </p>
                    </div>
                    {/* <!-- End .widget --> */}
                </div>
                {/* <!-- End .sidebar-wrapper --> */}
            </aside>
        )
    }
}


export default ShopItemAside