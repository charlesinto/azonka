import React, { Component } from 'react'
import Header from '../HeaderFooter/Header'
import Footer from '../HeaderFooter/Footer'
import './Shop.css'
import productImg1 from './images/products/cart/product-1.jpg'
import productImg2 from './images/products/cart/product-2.jpg'

class ShopItems extends Component {
    render() {
        return (
            <div>
                <Header />
                <main className="main">
                    <div className="banner banner-cat" >
                        <div className="banner-content container">
                            <h2 className="banner-subtitle">check out over <span>200+</span></h2>
                            <h1 className="banner-title">
                                INCREDIBLE deals
            </h1>
                            <a href="#" className="btn btn-dark">Shop Now</a>
                        </div>
                        {/* <!-- End .banner-content --> */}
                    </div>
                    {/* <!-- End .banner --> */}

                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="index.html"><i className="icon-home"></i></a></li>
                                <li className="breadcrumb-item"><a href="#">Electronics</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Headsets</li>
                            </ol>
                        </div>
                        {/* <!-- End .container --> */}
                    </nav>

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <nav className="toolbox">
                                    <div className="toolbox-left">
                                        <div className="toolbox-item toolbox-sort">
                                            <div className="select-custom">
                                                <select name="orderby" className="form-control">
                                                    <option value="menu_order" selected="selected">Default sorting</option>
                                                    <option value="popularity">Sort by popularity</option>
                                                    <option value="rating">Sort by average rating</option>
                                                    <option value="date">Sort by newness</option>
                                                    <option value="price">Sort by price: low to high</option>
                                                    <option value="price-desc">Sort by price: high to low</option>
                                                </select>
                                            </div>
                                            {/* <!-- End .select-custom --> */}

                                            <a href="#" className="sorter-btn" title="Set Ascending Direction"><span className="sr-only">Set
                                    Ascending Direction</span></a>
                                        </div>
                                        {/* <!-- End .toolbox-item --> */}
                                    </div>
                                    {/* <!-- End .toolbox-left --> */}

                                    <div className="toolbox-item toolbox-show">
                                        <label>Showing 1–9 of 60 results</label>
                                    </div>
                                    {/* <!-- End .toolbox-item --> */}

                                    <div className="layout-modes">
                                        <a href="category.html" className="layout-btn btn-grid active" title="Grid">
                                            <i className="icon-mode-grid"></i>
                                        </a>
                                        <a href="category-list.html" className="layout-btn btn-list" title="List">
                                            <i className="icon-mode-list"></i>
                                        </a>
                                    </div>
                                    {/* <!-- End .layout-modes --> */}
                                </nav>

                                <div className="row row-sm">
                                    <div className="col-6 col-md-4 col-xl-3">
                                        <div className="product">
                                            <figure className="product-image-container">
                                                <a href="product.html" className="product-image">
                                                    <img src={productImg1} alt="product" />
                                                </a>
                                                <a href="ajax\product-quick-view.html" className="btn-quickview">Quick View</a>
                                            </figure>
                                            <div className="product-details">
                                                <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{ width: "80%" }}></span>
                                                        {/* <!-- End .ratings --> */}
                                                    </div>
                                                    {/* <!-- End .product-ratings --> */}
                                                </div>
                                                {/* <!-- End .product-container --> */}
                                                <h2 className="product-title">
                                                    <a href="product.html">Headphone</a>
                                                </h2>
                                                <div className="price-box">
                                                    <span className="product-price">$28.00</span>
                                                </div>
                                                {/* <!-- End .price-box --> */}

                                                <div className="product-action">
                                                    <a href="#" className="paction add-wishlist" title="Add to Wishlist">
                                                        <span>Add to Wishlist</span>
                                                    </a>

                                                    <a href="product.html" className="paction add-cart" title="Add to Cart">
                                                        <span>Add to Cart</span>
                                                    </a>

                                                    <a href="#" className="paction add-compare" title="Add to Compare">
                                                        <span>Add to Compare</span>
                                                    </a>
                                                </div>
                                                {/* <!-- End .product-action --> */}
                                            </div>
                                            {/* <!-- End .product-details --> */}
                                        </div>
                                        {/* <!-- End .product --> */}
                                    </div>
                                    {/* <!-- End .col-xl-3 --> */}

                                    <div className="col-6 col-md-4 col-xl-3">
                                        <div className="product">
                                            <figure className="product-image-container">
                                                <a href="product.html" className="product-image">
                                                    <img src={productImg2} alt="product" />
                                                </a>
                                                <a href="ajax\product-quick-view.html" className="btn-quickview">Quick View</a>
                                                <span className="product-label label-sale">-20%</span>
                                                <span className="product-label label-hot">New</span>
                                            </figure>
                                            <div className="product-details">
                                                <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{ width: "0%" }}></span>
                                                        {/* <!-- End .ratings --> */}
                                                    </div>
                                                    {/* <!-- End .product-ratings --> */}
                                                </div>
                                                {/* <!-- End .product-container --> */}
                                                <h2 className="product-title">
                                                    <a href="product.html">Computer Mouse</a>
                                                </h2>
                                                <div className="price-box">
                                                    <span className="old-price">$60.00</span>
                                                    <span className="product-price">$48.00</span>
                                                </div>
                                                {/* <!-- End .price-box --> */}

                                                <div className="product-action">
                                                    <a href="#" className="paction add-wishlist" title="Add to Wishlist">
                                                        <span>Add to Wishlist</span>
                                                    </a>

                                                    <a href="product.html" className="paction add-cart" title="Add to Cart">
                                                        <span>Add to Cart</span>
                                                    </a>

                                                    <a href="#" className="paction add-compare" title="Add to Compare">
                                                        <span>Add to Compare</span>
                                                    </a>
                                                </div>
                                                {/* <!-- End .product-action --> */}
                                            </div>
                                            {/* <!-- End .product-details --> */}
                                        </div>
                                        {/* <!-- End .product --> */}
                                    </div>
                                    {/* <!-- End .col-xl-3 --> */}

                                    <div className="col-6 col-md-4 col-xl-3">
                                        <div className="product">
                                            <figure className="product-image-container">
                                                <a href="product.html" className="product-image">
                                                    <img src={productImg1} alt="product" />
                                                </a>
                                                <a href="ajax\product-quick-view.html" className="btn-quickview">Quick View</a>
                                            </figure>
                                            <div className="product-details">
                                                <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{ width: "60%" }}></span>
                                                        {/* <!-- End .ratings --> */}
                                                    </div>
                                                    {/* <!-- End .product-ratings --> */}
                                                </div>
                                                {/* <!-- End .product-container --> */}
                                                <h2 className="product-title">
                                                    <a href="product.html">Laptop</a>
                                                </h2>
                                                <div className="price-box">
                                                    <span className="product-price">$850.00</span>
                                                </div>
                                                {/* <!-- End .price-box --> */}

                                                <div className="product-action">
                                                    <a href="#" className="paction add-wishlist" title="Add to Wishlist">
                                                        <span>Add to Wishlist</span>
                                                    </a>

                                                    <a href="product.html" className="paction add-cart" title="Add to Cart">
                                                        <span>Add to Cart</span>
                                                    </a>

                                                    <a href="#" className="paction add-compare" title="Add to Compare">
                                                        <span>Add to Compare</span>
                                                    </a>
                                                </div>
                                                {/* <!-- End .product-action --> */}
                                            </div>
                                            {/* <!-- End .product-details --> */}
                                        </div>
                                        {/* <!-- End .product --> */}
                                    </div>
                                    {/* <!-- End .col-xl-3 --> */}

                                    <div className="col-6 col-md-4 col-xl-3">
                                        <div className="product">
                                            <figure className="product-image-container">
                                                <a href="product.html" className="product-image">
                                                    <img src={productImg1} alt="product" />
                                                </a>
                                                <a href="ajax\product-quick-view.html" className="btn-quickview">Quick View</a>
                                            </figure>
                                            <div className="product-details">
                                                <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{ width: "40%" }}></span>
                                                        {/* <!-- End .ratings --> */}
                                                    </div>
                                                    {/* <!-- End .product-ratings --> */}
                                                </div>
                                                {/* <!-- End .product-container --> */}
                                                <h2 className="product-title">
                                                    <a href="product.html">Camera</a>
                                                </h2>
                                                <div className="price-box">
                                                    <span className="product-price">$299.00</span>
                                                </div>
                                                {/* <!-- End .price-box --> */}

                                                <div className="product-action">
                                                    <a href="#" className="paction add-wishlist" title="Add to Wishlist">
                                                        <span>Add to Wishlist</span>
                                                    </a>

                                                    <a href="product.html" className="paction add-cart" title="Add to Cart">
                                                        <span>Add to Cart</span>
                                                    </a>

                                                    <a href="#" className="paction add-compare" title="Add to Compare">
                                                        <span>Add to Compare</span>
                                                    </a>
                                                </div>
                                                {/* <!-- End .product-action --> */}
                                            </div>
                                            {/* <!-- End .product-details --> */}
                                        </div>
                                        {/* <!-- End .product --> */}
                                    </div>
                                    {/* <!-- End .col-xl-3 --> */}

                                    <div className="col-6 col-md-4 col-xl-3">
                                        <div className="product">
                                            <figure className="product-image-container">
                                                <a href="product.html" className="product-image">
                                                    <img src={productImg2} alt="product" />
                                                </a>
                                                <a href="ajax\product-quick-view.html" className="btn-quickview">Quick View</a>
                                            </figure>
                                            <div className="product-details">
                                                <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{ width: "50%" }}></span>
                                                        {/* <!-- End .ratings --> */}
                                                    </div>
                                                    {/* <!-- End .product-ratings --> */}
                                                </div>
                                                {/* <!-- End .product-container --> */}
                                                <h2 className="product-title">
                                                    <a href="product.html">Shoes</a>
                                                </h2>
                                                <div className="price-box">
                                                    <span className="product-price">$79.00</span>
                                                </div>
                                                {/* <!-- End .price-box --> */}

                                                <div className="product-action">
                                                    <a href="#" className="paction add-wishlist" title="Add to Wishlist">
                                                        <span>Add to Wishlist</span>
                                                    </a>

                                                    <a href="product.html" className="paction add-cart" title="Add to Cart">
                                                        <span>Add to Cart</span>
                                                    </a>

                                                    <a href="#" className="paction add-compare" title="Add to Compare">
                                                        <span>Add to Compare</span>
                                                    </a>
                                                </div>
                                                {/* <!-- End .product-action --> */}
                                            </div>
                                            {/* <!-- End .product-details --> */}
                                        </div>
                                        {/* <!-- End .product --> */}
                                    </div>
                                    {/* <!-- End .col-xl-3 --> */}

                                    <div className="col-6 col-md-4 col-xl-3">
                                        <div className="product">
                                            <figure className="product-image-container">
                                                <a href="product.html" className="product-image">
                                                    <img src={productImg1} alt="product" />
                                                </a>
                                                <a href="ajax\product-quick-view.html" className="btn-quickview">Quick View</a>
                                            </figure>
                                            <div className="product-details">
                                                <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{ width: "50%" }}></span>
                                                        {/* <!-- End .ratings --> */}
                                                    </div>
                                                    {/* <!-- End .product-ratings --> */}
                                                </div>
                                                {/* <!-- End .product-container --> */}
                                                <h2 className="product-title">
                                                    <a href="product.html">Shoes</a>
                                                </h2>
                                                <div className="price-box">
                                                    <span className="product-price">$79.00</span>
                                                </div>
                                                {/* <!-- End .price-box --> */}

                                                <div className="product-action">
                                                    <a href="#" className="paction add-wishlist" title="Add to Wishlist">
                                                        <span>Add to Wishlist</span>
                                                    </a>

                                                    <a href="product.html" className="paction add-cart" title="Add to Cart">
                                                        <span>Add to Cart</span>
                                                    </a>

                                                    <a href="#" className="paction add-compare" title="Add to Compare">
                                                        <span>Add to Compare</span>
                                                    </a>
                                                </div>
                                                {/* <!-- End .product-action --> */}
                                            </div>
                                            {/* <!-- End .product-details --> */}
                                        </div>
                                        {/* <!-- End .product --> */}
                                    </div>
                                    {/* <!-- End .col-xl-3 --> */}





                                </div>
                                {/* <!-- End .row --> */}

                                <nav className="toolbox toolbox-pagination">
                                    <div className="toolbox-item toolbox-show">
                                        <label>Showing 1–9 of 60 results</label>
                                    </div>
                                    {/* <!-- End .toolbox-item --> */}

                                    <ul className="pagination">
                                        <li className="page-item disabled">
                                            <a className="page-link page-link-btn" href="#"><i className="icon-angle-left"></i></a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">1 <span className="sr-only">(current)</span></a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                                        <li className="page-item"><span>...</span></li>
                                        <li className="page-item"><a className="page-link" href="#">15</a></li>
                                        <li className="page-item">
                                            <a className="page-link page-link-btn" href="#"><i className="icon-angle-right"></i></a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            {/* <!-- End .col-lg-9 --> */}

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
                                                        {/* <!-- End #price-slider --> */}
                                                    </div>
                                                    {/* <!-- End .price-slider-wrapper --> */}

                                                    <div className="filter-price-action">
                                                        <button type="submit" className="btn btn-primary">Filter</button>

                                                        <div className="filter-price-text">
                                                            <span id="filter-price-range"></span>
                                                        </div>
                                                        {/* <!-- End .filter-price-text --> */}
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
                            {/* <!-- End .col-lg-3 --> */}
                        </div>
                        {/* <!-- End .row --> */}
                    </div>
                    {/* <!-- End .container --> */}

                    <div className="mb-5"></div>
                    {/* <!-- margin --> */}
                </main>
                <Footer />
            </div>

        )
    }
}


export default ShopItems