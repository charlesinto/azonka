import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../HeaderFooter/Header'
import imgLoader from '../../common/tenor.gif'

import { connect } from "react-redux";
import * as actions from "../../actions";

class ShopItemDetails extends Component {
    state = { id: "", qty: 1, products: [], detailsData: {}, arr: [], imgLoaded: false }
    async componentDidMount() {
        console.log(this.props.match.params.id)
        let id = this.props.match.params.id;
        this.setState({ id })
        this.loadShopData()
        this.getDetails()

    }
    getDetails = () => {
        let { products, id } = this.state;
        console.log("showst", this.state)
        let detailsData = products.filter(data => id === data.id)[0]

        this.setState({ detailsData })
    }
    loadShopData = async () => {

        let token = localStorage.getItem("x-access-token");
        if (token) {
            await this.props.fetchFeaturedItems()
            this.setState({ products: this.props.products })
            console.log("show", this.state)

            let { products, id } = this.state;

            let detailsData = products.filter(data => id == data.id)[0]
            this.setState({ detailsData })
        } else {
            let localShopData = await JSON.parse(localStorage.getItem("shop"))
            let { id } = this.state;


            let detailsData = localShopData.filter(data => id == data.id)[0]
            console.log("shows", detailsData)
            this.setState({ detailsData, arr: localShopData.filter(data => id == data.id) })
        }



    }
    handleAddCart = async (e, itemSelected, id) => {
        console.log(id)
        let token = (localStorage.getItem("x-access-token"));
        // return console.log(token)
        if (token) {
            let postObj = { productId: `${id}`, quantity: `${this.state.qty}` };
            console.log('here o', postObj)
            await this.props.addToCart(postObj)
            // console.log("flash props", this.props)
            this.handleSetOnlineData()
            // this.props.renderError("An error occured")

        } else {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            this.setState({ cartData })
            console.log(this.props.cartItems)
            // let { products } = this.props
            // let obj = products.filter(data => parseInt(id) === data.id)[0]
            // console.log(cartData, products, obj)
            //check if item is in cart

            if (cartData) { //item exists
                // return console.log("data", cartData)
                let isAdded = cartData.some(data => data.id === parseInt(id)); //check if clicked item exist in cart
                if (isAdded) {
                    return this.props.successAlert('Item has already been added')
                } else {
                    localStorage.setItem("cart", JSON.stringify([...cartData, itemSelected]))
                    this.handleSetLocalData()
                }

            } else {
                // if cart is empty
                localStorage.setItem("cart", JSON.stringify([itemSelected]))
                this.handleSetLocalData()
            }
        }

    }
    handleSetLocalData = async () => {
        await this.props.fetchLocalCart()
        let { cartData } = this.props;
        this.setState({ cartData }, () => this.props.successAlert('Item added to cart successfully'))
    }
    handleSetOnlineData = async () => {
        await this.props.fetchCart()
        let { products } = this.props.cartItems
        this.setState({ cartData: products })
    }
    handleChange = (e, finalPrice, id) => {
        let { qty } = this.state;
        this.setState({ qty: e.target.value < 0 ? -1 * e.target.value : e.target.value })
        // console.log(this.state)
    }
    handleIncreaseQty = (e, finalPrice, id) => {
        let { qty } = this.state;
        this.setState({ qty: qty + 1 })
        // console.log(this.state)
    }
    handleDecreaseQty = (e, finalPrice, id) => {
        let { qty } = this.state;

        this.setState({ qty: qty > 0 ? qty - 1 : 0 })
        // console.log(this.state) imgLoaded ? detailsData.mainImageUrl :
    }
    render() {
        let { detailsData, imgLoaded } = this.state;
        let productImage = detailsData != null ? detailsData.mainImageUrl : imgLoader
        const { id, finalPrice } = detailsData ? detailsData : {}
        return (
            <>
                <Header />

                <main className="main" style={{ paddingTop: '12rem' }}>
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="index.html"><i className="icon-home"></i></Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/shops/category/${detailsData && detailsData.category && detailsData.category.name}`}>
                                        {detailsData && detailsData.category && detailsData.category.name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    {detailsData && detailsData.subCategory && detailsData.subCategory.name}
                                </li>
                            </ol>
                        </div>
                        {/* <!-- End .container --> */}
                    </nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="product-single-container product-single-default">
                                    <div className="row" style={{ marginTop: "2rem" }}>
                                        <div className="col-lg-7 col-md-6 product-single-gallery">
                                            <div className="product-slider-container product-item">
                                                <img src={imgLoaded ? productImage : imgLoader} alt=".." loading="lazy" onLoad={() => this.setState({ imgLoaded: true })} />
                                                <span className="prod-full-screen">
                                                    <i className="icon-plus"></i>
                                                </span>
                                            </div>
                                            {/* <div className="prod-thumbnail row owl-dots" id='carousel-custom-dots'>
                                                <div className="col-3 owl-dot">
                                                    <img src="assets\images\products\zoom\product-1.jpg" />
                                                </div>
                                                <div className="col-3 owl-dot">
                                                    <img src="assets\images\products\zoom\product-2.jpg" />
                                                </div>
                                                <div className="col-3 owl-dot">
                                                    <img src="assets\images\products\zoom\product-3.jpg" />
                                                </div>
                                                <div className="col-3 owl-dot">
                                                    <img src="assets\images\products\zoom\product-4.jpg" />
                                                </div>
                                            </div> */}
                                        </div>
                                        {/* <!-- End .col-lg-7 --> */}

                                        {


                                        }

                                        <div className="col-lg-5 col-md-6">
                                            <div className="product-single-details">
                                                <h1 className="product-title">{detailsData && detailsData.name} ({detailsData && detailsData.model})</h1>

                                                <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{ width: "60%" }}></span>
                                                        {/* <!-- End .ratings --> */}
                                                    </div>
                                                    {/* <!-- End .product-ratings --> */}

                                                    {/* <Link to="#" className="rating-link">( 6 Reviews )</Link> */}
                                                </div>
                                                {/* <!-- End .product-container --> */}

                                                <div className="price-box">
                                                    <span className="old-price">&#8358;{detailsData && detailsData.sellingPrice}</span>
                                                    <span className="product-price">&#8358;{detailsData && detailsData.finalPrice}</span>
                                                </div>
                                                {/* <!-- End .price-box --> */}

                                                <div className="product-desc">
                                                    <p>{detailsData && detailsData.description}</p>
                                                </div>
                                                {/* <!-- End .product-desc --> */}

                                                {/* <div className="product-filters-container">
                                                    <div className="product-single-filter">
                                                        <label>Colors:</label>
                                                        <ul className="config-swatch-list">
                                                            <li className="active">
                                                                <Link to="#" style={{ backgroundColor: "#6085a5" }}>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#" style={{ backgroundColor: "#ab6e6e" }}>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#" style={{ backgroundColor: "#b19970" }}>
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <Link to="#" style={{ backgroundColor: "#11426b" }}>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div> */}
                                                {/* <!-- End .product-filters-container --> */}

                                                <div className="product-action product-all-icons">
                                                    {/* <div className="product-single-qty">
                                                        <input className="horizontal-quantity form-control" type="text" />
                                                    </div> */}
                                                    <div style={{ marginRight: 8 }} className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
                                                        <input className="vertical-quantity form-control" value={this.state.qty} onChange={(e) => this.handleChange(e, finalPrice, id)} type="number" />
                                                        <span className="input-group-btn-vertical">
                                                            <button className="btn btn-outline bootstrap-touchspin-up icon-up-dir" type="button" onClick={(e) => this.handleIncreaseQty(e, finalPrice, id)} ></button>
                                                            <button className="btn btn-outline bootstrap-touchspin-down icon-down-dir" type="button" onClick={(e) => this.handleDecreaseQty(e, finalPrice, id)} ></button></span>
                                                    </div>
                                                    {/* <!-- End .product-single-qty --> */}

                                                    <span id={id} onClick={(e) => this.handleAddCart(e, detailsData, id)} className="paction add-cart" title="Add to Cart">
                                                        <span>Add to Cart</span>
                                                    </span>
                                                    <span className="paction add-wishlist" title="Add to Wishlist">
                                                        <span>Add to Wishlist</span>
                                                    </span>
                                                    <span className="paction add-compare" title="Add to Compare">
                                                        <span>Add to Compare</span>
                                                    </span>
                                                </div>
                                                {/* <!-- End .product-action --> */}

                                                <div className="product-single-share">
                                                    <label>Share:</label>
                                                    {/* <!-- www.addthis.com share plugin--> */}
                                                    <div className="addthis_inline_share_toolbox"></div>
                                                </div>
                                                {/* <!-- End .product single-share --> */}
                                            </div>
                                            {/* <!-- End .product-single-details --> */}
                                        </div>







                                        {/* <!-- End .col-lg-5 --> */}
                                    </div>
                                    {/* <!-- End .row --> */}
                                </div>
                                {/* <!-- End .product-single-container --> */}

                                <div className="product-single-tabs">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <Link className="nav-link active" id="product-tab-desc" data-toggle="tab"
                                                href="#product-desc-content" role="tab" aria-controls="product-desc-content"
                                                aria-selected="true">Description</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" id="product-tab-tags" data-toggle="tab" href="#product-tags-content"
                                                role="tab" aria-controls="product-tags-content" aria-selected="false">Tags</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" id="product-tab-reviews" data-toggle="tab"
                                                href="#product-reviews-content" role="tab" aria-controls="product-reviews-content"
                                                aria-selected="false">Reviews</Link>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id="product-desc-content" role="tabpanel"
                                            aria-labelledby="product-tab-desc">
                                            <div className="product-desc-content">
                                                <p>{detailsData && detailsData.description}</p>
                                                {/* <ul>
                                                    <li><i className="icon-ok"></i>Any Product types that You want - Simple,
                                                        Configurable
                                                     </li>
                                                    <li><i className="icon-ok"></i>Downloadable/Digital Products, Virtual Products</li>
                                                    <li><i className="icon-ok"></i>Inventory Management with Backordered items</li>
                                                </ul> */}
                                                {/* <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, <br />quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. </p> */}
                                            </div>
                                            {/* <!-- End .product-desc-content --> */}
                                        </div>
                                        {/* <!-- End .tab-pane --> */}

                                        <div className="tab-pane fade" id="product-tags-content" role="tabpanel"
                                            aria-labelledby="product-tab-tags">
                                            <div className="product-tags-content">
                                                <form action="#">
                                                    <h4>Add Your Tags:</h4>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-sm" required={true} />
                                                        <input type="submit" className="btn btn-primary" value="Add Tags" />
                                                    </div>
                                                    {/* <!-- End .form-group --> */}
                                                </form>
                                                <p className="note">Use spaces to separate tags. Use single quotes (') for phrases.</p>
                                            </div>
                                            {/* <!-- End .product-tags-content --> */}
                                        </div>
                                        {/* <!-- End .tab-pane --> */}

                                        <div className="tab-pane fade" id="product-reviews-content" role="tabpanel"
                                            aria-labelledby="product-tab-reviews">
                                            <div className="product-reviews-content">
                                                <div className="collateral-box">
                                                    <ul>
                                                        <li>Be the first to review this product</li>
                                                    </ul>
                                                </div>
                                                {/* <!-- End .collateral-box --> */}

                                                <div className="add-product-review">
                                                    <h3 className="text-uppercase heading-text-color font-weight-semibold">WRITE YOUR
                                                        OWN
                                        REVIEW</h3>
                                                    <p>How do you rate this product? *</p>

                                                    <form action="#">
                                                        <table className="ratings-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>&nbsp;</th>
                                                                    <th>1 star</th>
                                                                    <th>2 stars</th>
                                                                    <th>3 stars</th>
                                                                    <th>4 stars</th>
                                                                    <th>5 stars</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Quality</td>
                                                                    <td>
                                                                        <input type="radio" name="ratings[1]" id="Quality_1" value="1"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="ratings[1]" id="Quality_2" value="2"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="ratings[1]" id="Quality_3" value="3"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="ratings[1]" id="Quality_4" value="4"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="ratings[1]" id="Quality_5" value="5"
                                                                            className="radio" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Value</td>
                                                                    <td>
                                                                        <input type="radio" name="value[1]" id="Value_1" value="1"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="value[1]" id="Value_2" value="2"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="value[1]" id="Value_3" value="3"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="value[1]" id="Value_4" value="4"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="value[1]" id="Value_5" value="5"
                                                                            className="radio" />
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Price</td>
                                                                    <td>
                                                                        <input type="radio" name="price[1]" id="Price_1" value="1"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="price[1]" id="Price_2" value="2"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="price[1]" id="Price_3" value="3"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="price[1]" id="Price_4" value="4"
                                                                            className="radio" />
                                                                    </td>
                                                                    <td>
                                                                        <input type="radio" name="price[1]" id="Price_5" value="5"
                                                                            className="radio" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <div className="form-group">
                                                            <label>Nickname <span className="required">*</span></label>
                                                            <input type="text" className="form-control form-control-sm" required={true} />
                                                        </div>
                                                        {/* <!-- End .form-group --> */}
                                                        <div className="form-group">
                                                            <label>Summary of Your Review <span className="required">*</span></label>
                                                            <input type="text" className="form-control form-control-sm" required={true} />
                                                        </div>
                                                        {/* <!-- End .form-group --> */}
                                                        <div className="form-group mb-2">
                                                            <label>Review <span className="required">*</span></label>
                                                            <textarea cols="5" rows="6"
                                                                className="form-control form-control-sm"></textarea>
                                                        </div>
                                                        {/* <!-- End .form-group --> */}

                                                        <input type="submit" className="btn btn-primary" value="Submit Review" />
                                                    </form>
                                                </div>
                                                {/* <!-- End .add-product-review --> */}
                                            </div>
                                            {/* <!-- End .product-reviews-content --> */}
                                        </div>
                                        {/* <!-- End .tab-pane --> */}
                                    </div>
                                    {/* <!-- End .tab-content --> */}
                                </div>
                                {/* <!-- End .product-single-tabs --> */}
                            </div>
                            {/* <!-- End .col-lg-9 --> */}

                            <div className="sidebar-overlay"></div>
                            <div className="sidebar-toggle"><i className="icon-sliders"></i></div>
                            <aside className="sidebar-product col-lg-3 padding-left-lg mobile-sidebar">
                                <div className="sidebar-wrapper">
                                    <div className="widget widget-brand">
                                        {/* <Link to="#">
                                            <img src="assets\images\product-brand.png" alt="brand name" />
                                        </Link> */}
                                    </div>
                                    {/* <!-- End .widget --> */}

                                    <div className="widget widget-info">
                                        <ul>
                                            <li>
                                                <i className="icon-shipping"></i>
                                                <h4>FREE<br />SHIPPING</h4>
                                            </li>
                                            <li>
                                                <i className="icon-us-dollar"></i>
                                                <h4>100% MONEY<br />BACK GUARANTEE</h4>
                                            </li>
                                            <li>
                                                <i className="icon-online-support"></i>
                                                <h4>ONLINE<br />SUPPORT 24/7</h4>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <!-- End .widget --> */}

                                    <div className="widget widget-banner">
                                        {/* <div className="banner banner-image">
                                            <Link to="#">
                                                <img src="assets\images\banners\banner-sidebar.jpg" alt="Banner Desc" />
                                            </Link>
                                        </div> */}
                                        {/* <!-- End .banner --> */}
                                    </div>
                                    {/* <!-- End .widget --> */}

                                    <div className="widget widget-featured">
                                        <h3 className="widget-title">Featured Products</h3>

                                        <div className="widget-body">
                                            <div className="owl-carousel widget-featured-products">
                                                <div className="featured-col">
                                                    <div className="product product-sm">
                                                        <figure className="product-image-container">
                                                            {/* <Link to="product.html" className="product-image">
                                                                <img src="assets\images\products\small\product-1.jpg" alt="product" />
                                                            </Link> */}
                                                        </figure>
                                                        <div className="product-details">
                                                            <h2 className="product-title">
                                                                <Link to="product.html">Mouse</Link>
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
                                                            <Link to="product.html" className="product-image">
                                                                <img src="assets\images\products\home-featured-1.jpg" alt="product" />
                                                            </Link>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h2 className="product-title">
                                                                <Link to="product.html">Headset</Link>
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
                                                            <Link to="product.html" className="product-image">
                                                                <img src="assets\images\products\home-featured-2.jpg" alt="product" />
                                                            </Link>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h2 className="product-title">
                                                                <Link to="product.html">Technicca</Link>
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
                                                            <Link to="product.html" className="product-image">
                                                                <img src="assets\images\products\home-featured-3.jpg" alt="product" />
                                                            </Link>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h2 className="product-title">
                                                                <Link to="product.html">Skullcanddy</Link>
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
                                                            <Link to="product.html" className="product-image">
                                                                <img src="assets\images\products\home-featured-4.jpg" alt="product" />
                                                            </Link>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h2 className="product-title">
                                                                <Link to="product.html">Phillips</Link>
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
                                                            <Link to="product.html" className="product-image">
                                                                <img src="assets\images\products\home-featured-5.jpg" alt="product" />
                                                            </Link>
                                                        </figure>
                                                        <div className="product-details">
                                                            <h2 className="product-title">
                                                                <Link to="product.html">Senheisser</Link>
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
                                </div>
                            </aside>
                            {/* <!-- End .col-md-3 --> */}
                        </div>
                        {/* <!-- End .row --> */}
                    </div>
                    {/* <!-- End .container --> */}


                    {/* <!-- End .featured-section --> */}


                </main>
            </>
        )
    }
}


const mapStateToProps = state => {

    const { cartItems, cartData, products } = state.inventory;
    let cartResponse = cartItems.data
    // console.log("fire", state)
    return {
        cartItems, cartResponse, cartData, products
    }
}

export default connect(mapStateToProps, actions)(ShopItemDetails); 