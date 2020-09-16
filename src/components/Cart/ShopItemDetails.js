import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../HeaderFooter/Header";
import imgLoader from "../../common/tenor.gif";
import dayjs from "dayjs";
import { connect } from "react-redux";
import * as actions from "../../actions";
import relativeTime from "dayjs/plugin/relativeTime";
import Axios from "axios";
import Pages from "../../config/pages";
import Positions from "../../config/position";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import FeatureProductItem from "../../common/FeatureProductItem";
import Footer from "../HeaderFooter/Footer";

class ShopItemDetails extends Component {
  state = {
    id: "",
    qty: 1,
    products: [],
    detailsData: {},
    arr: [],
    imgLoaded: false,
    activeSubLink: "Description",
    topBanner: [],
    lowerBanner: [],
    leftBanner: [],
    slidesToShow: 4,
    bottomBanner: null,
    bottomBanner1: null,
    bottomBanner2: null,
  };
  async componentDidMount() {
    if (window.innerWidth < 768) {
      this.setState({
        slidesToShow: 1,
      });
    }
    const $this = this;
    if (window.attachEvent) {
      window.attachEvent("onresize", function (e) {
        if (window.innerWidth > 768) {
          return $this.setState({
            slidesToShow: 4,
          });
        } else {
          return $this.setState({
            slidesToShow: 1,
          });
        }
      });
    } else if (window.addEventListener) {
      window.addEventListener(
        "resize",
        function () {
          if (window.innerWidth > 768) {
            // alert()
            return $this.setState({
              slidesToShow: 4,
            });
          }
          return $this.setState({
            slidesToShow: 1,
          });
        },
        true
      );
    }
    console.log(this.props.match.params.id);
    let id = this.props.match.params.id;
    await this.setState({ id });
    // await this.loadShopData()
    this.getDetails();
    this.getFeaturedCategoriesImages();
  }
  static getDerivedStateFromProps(nextProps, state) {
    return { ...state, detailsData: nextProps.productFound };
  }

  getDetails = async () => {
    let { id } = this.state;
    // console.log("showst", this.state)
    await this.props.getProductById(id);
    // let detailsData = products.filter(data => parseInt(id) === data.id)[0]
    // console.log('det', detailsData)
    // this.setState({ detailsData })
  };
  converToDate = (dateData) => {
    dayjs.extend(relativeTime);
    const date = new Date(dateData);

    const day = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return dayjs(day).fromNow();
  };
  loadShopData = async () => {
    let token = localStorage.getItem("x-access-token");
    if (token) {
      await this.props.fetchFeaturedItems();
      // await this.props.searchItem(this.state.id)
      console.log(this.props.products);
      await this.setState({ products: this.props.products });
      console.log("show", this.state);

      let { products, id } = this.state;

      let detailsData = products.filter((data) => id === data.id)[0];
      this.setState({ detailsData });
    } else {
      let localShopData = await JSON.parse(localStorage.getItem("shop"));
      let { id } = this.state;

      let detailsData = localShopData.filter((data) => id === data.id)[0];
      console.log("shows", detailsData);
      this.setState({
        detailsData,
        arr: localShopData.filter((data) => id === data.id),
      });
    }
  };
  handleAddCart = async (e, itemSelected, id) => {
    console.log(id);
    let token = localStorage.getItem("x-access-token");
    // return console.log(token)
    if (token) {
      let postObj = { productId: `${id}`, quantity: `${this.state.qty}` };
      console.log("here o", postObj);
      await this.props.addToCart(postObj);
      // console.log("flash props", this.props)
      this.handleSetOnlineData();
      // this.props.renderError("An error occured")
    } else {
      let cartData = JSON.parse(localStorage.getItem("cart"));
      this.setState({ cartData });
      console.log(this.props.cartItems);
      // let { products } = this.props
      // let obj = products.filter(data => parseInt(id) === data.id)[0]
      // console.log(cartData, products, obj)
      //check if item is in cart

      if (cartData) {
        //item exists
        // return console.log("data", cartData)
        let isAdded = cartData.some((data) => data.id === parseInt(id)); //check if clicked item exist in cart
        if (isAdded) {
          return this.props.successAlert("Item has already been added");
        } else {
          localStorage.setItem(
            "cart",
            JSON.stringify([...cartData, itemSelected])
          );
          this.handleSetLocalData();
        }
      } else {
        // if cart is empty
        localStorage.setItem("cart", JSON.stringify([itemSelected]));
        this.handleSetLocalData();
      }
    }
  };
  handleSetLocalData = async () => {
    await this.props.fetchLocalCart();
    let { cartData } = this.props;
    this.setState({ cartData }, () =>
      this.props.successAlert("Item added to cart successfully")
    );
  };
  handleSetOnlineData = async () => {
    await this.props.fetchCart();
    let { products } = this.props.cartItems;
    this.setState({ cartData: products });
  };
  handleChange = (e, finalPrice, id) => {
    this.setState({
      qty: e.target.value < 0 ? -1 * e.target.value : e.target.value,
    });
    // console.log(this.state)
  };
  handleIncreaseQty = (e, finalPrice, id) => {
    let { qty } = this.state;
    this.setState({ qty: qty + 1 });
    // console.log(this.state)
  };
  handleDecreaseQty = (e, finalPrice, id) => {
    let { qty } = this.state;

    this.setState({ qty: qty > 0 ? qty - 1 : 0 });
    // console.log(this.state) imgLoaded ? detailsData.mainImageUrl :
  };
  setActiveSubLink = (link) => {
    this.setState({
      activeSubLink: link,
    });
  };
  getFeaturedCategoriesImages = async () => {
    const responseAds = await Axios.get("/api/v1/ad/get-ads/0/1000");

    const ads = responseAds.data.ads.filter(
      (item) => item.page === Pages.PRODUCT_DETAIL_PAGE
    );
    console.log("ads", ads);
    const topBanner = ads.filter((item) => item.position === Positions.TOP);
    const lowerBanner = ads.filter((item) => item.position === Positions.LOWER);
    console.log(lowerBanner);
    const leftBanner = ads.filter((item) => item.position === Positions.LEFT);
    const bottomBanner1 = ads.filter(
      (item) => item.position === Positions.BOTTOM_BANNER1
    )[0];
    const bottomBanner2 = ads.filter(
      (item) => item.position === Positions.BOTTOM_BANNER2
    )[0];
    if (lowerBanner.length > 4) {
      lowerBanner.splice(4, lowerBanner.length);
    } else if (lowerBanner.length > 0 && lowerBanner.length < 4) {
      const remainingItem = 4 - lowerBanner.length;
      for (let i = 0; i < remainingItem; i++) {
        lowerBanner.push(lowerBanner[0]);
      }
    }

    this.setState({
      topBanner,
      lowerBanner,
      leftBanner,
      bottomBanner1,
      bottomBanner2,
    });
  };
  renderRating = (data) => {
    console.log(data);
    return data && data.reviews
      ? data.reviews.map((review) => {
          return (
            <div className="card shadow p-3 mb-2 bg-white rounded">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2 photo-time">
                    <img
                      alt="avatar"
                      src="https://image.ibb.co/jw55Ex/def_face.jpg"
                      className="img img-rounded img-fluid"
                    />
                    <p className="text-secondary text-center">
                      {this.converToDate(review.createdAt)}
                    </p>
                  </div>
                  <div className="col-md-10">
                    <p>
                      <a
                        className="float-left"
                        href="https://maniruzzaman-akash.blogspot.com/p/contact.html"
                      >
                        <strong>Anonymous</strong>
                      </a>
                      {this.renderRatingStar(review)}
                    </p>
                    <div className="clearfix"></div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      : null;
    // return null;
  };

  renderRatingStar = (data) => {
    const ratings = [];

    for (let i = 1; i < Math.floor(data.rating); i++) {
      ratings.push(<i className="text-warning fa fa-star"></i>);
    }
    return ratings.map((star) => {
      return <span className="float-right">{star}</span>;
    });
  };
  formatMoney(amount) {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
  render() {
    let { detailsData, imgLoaded } = this.state;
    console.log(detailsData);
    let productImage =
      detailsData != null ? detailsData.mainImageUrl : imgLoader;
    const { id, finalPrice, deliveryDays } = detailsData ? detailsData : {};
    return (
      <>
        <Header />

        <main className="main" style={{ paddingTop: "12rem" }}>
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="index.html">
                    <i className="icon-home"></i>
                  </Link>
                </li>
                {/**shop?name=&category= */}
                <li className="breadcrumb-item">
                  <Link
                    to={`/shop?name=&category=${
                      detailsData &&
                      detailsData.category &&
                      detailsData.category.name
                    }`}
                  >
                    {detailsData &&
                      detailsData.category &&
                      detailsData.category.name}
                  </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {detailsData &&
                    detailsData.subCategory &&
                    detailsData.subCategory.name}
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
                        <img
                          src={imgLoaded ? productImage : imgLoader}
                          alt=".."
                          loading="lazy"
                          onLoad={() => this.setState({ imgLoaded: true })}
                        />
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

                    {}

                    <div className="col-lg-5 col-md-6">
                      <div className="product-single-details">
                        <h1 className="product-title">
                          {detailsData && detailsData.name} (
                          {detailsData && detailsData.model})
                        </h1>

                        {/* <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{ width: "60%" }}></span>
                                                     
                                                    </div>
                                                </div> */}
                        {/* <!-- End .product-container --> */}

                        <div className="price-box">
                          <span
                            className="old-price mr-1"
                            style={{ fontSize: "1rem" }}
                          >
                            &#8358;{" "}
                            {detailsData &&
                              this.formatMoney(detailsData.sellingPrice / 100)}
                          </span>
                          <span
                            className="product-price "
                            style={{ fontSize: "1.2rem !important" }}
                          >
                            &#8358;{" "}
                            {detailsData &&
                              this.formatMoney(detailsData.finalPrice / 100)}
                          </span>
                        </div>
                        {deliveryDays ? (
                          <div className="delivery-timeline-wrapper">
                            <i
                              style={{
                                color: "rgb(0, 136, 204)",
                                fontSize: "20px",
                              }}
                              className="icon-shipping"
                            ></i>
                            {/* <h4>FREE<br />SHIPPING</h4> */}
                            <span>Expected Delivery Day(s)</span>
                            <div className="delivery-timeline">
                              <span>{deliveryDays} Day(s)</span>
                            </div>
                          </div>
                        ) : null}
                        {/* <!-- End .price-box --> */}

                        {/* <div className="product-desc">
                                                    <p>{detailsData && detailsData.description}</p>
                                                </div> */}
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
                          <div
                            style={{ marginRight: 8 }}
                            className="input-group  bootstrap-touchspin bootstrap-touchspin-injected"
                          >
                            <input
                              className="vertical-quantity form-control"
                              value={this.state.qty}
                              onChange={(e) =>
                                this.handleChange(e, finalPrice, id)
                              }
                              type="number"
                            />
                            <span className="input-group-btn-vertical">
                              <button
                                className="btn btn-outline bootstrap-touchspin-up icon-up-dir"
                                type="button"
                                onClick={(e) =>
                                  this.handleIncreaseQty(e, finalPrice, id)
                                }
                              ></button>
                              <button
                                className="btn btn-outline bootstrap-touchspin-down icon-down-dir"
                                type="button"
                                onClick={(e) =>
                                  this.handleDecreaseQty(e, finalPrice, id)
                                }
                              ></button>
                            </span>
                          </div>
                          {/* <!-- End .product-single-qty --> */}

                          <span
                            id={id}
                            onClick={(e) =>
                              this.handleAddCart(e, detailsData, id)
                            }
                            className="paction add-cart"
                            title="Add to Cart"
                          >
                            <span>Add to Cart</span>
                          </span>
                          {/* <span className="paction add-wishlist" title="Add to Wishlist">
                                                        <span>Add to Wishlist</span>
                                                    </span> */}
                          {/* <span className="paction add-compare" title="Add to Compare">
                                                        <span>Add to Compare</span>
                                                    </span> */}
                        </div>
                        {/* <!-- End .product-action --> */}

                        <div className="product-single-share d-block">
                          <h4>Description:</h4>
                          {/* <!-- www.addthis.com share plugin--> */}
                          <div className="text-sm-left mt-2">
                            {detailsData && detailsData.description}
                          </div>
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
                      <Link
                        onClick={() => this.setActiveSubLink("Description")}
                        className="nav-link active px-3"
                        id="product-tab-desc"
                        data-toggle="tab"
                        href="#product-desc-content"
                        role="tab"
                        aria-controls="product-desc-content"
                        aria-selected="true"
                      >
                        Description
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                                            <Link onClick={() => this.setActiveSubLink('Tag')} className="nav-link" id="product-tab-tags" data-toggle="tab" href="#product-tags-content"
                                                role="tab" aria-controls="product-tags-content" aria-selected="false">Tags</Link>
                                        </li> */}
                    <li className="nav-item">
                      <Link
                        onClick={() => this.setActiveSubLink("Review")}
                        className="nav-link px-3"
                        id="product-tab-reviews"
                        data-toggle="tab"
                        href="#product-reviews-content"
                        role="tab"
                        aria-controls="product-reviews-content"
                        aria-selected="false"
                      >
                        Reviews{" "}
                        <span className="mx-2">
                          {detailsData &&
                            detailsData.rating &&
                            Math.ceil(detailsData.rating)}
                        </span>
                        <span className="">
                          <i className="fas fa-star"></i>
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className={`tab-pane fade show ${
                        this.state.activeSubLink === "Description"
                          ? "active"
                          : ""
                      }`}
                      id="product-desc-content"
                      role="tabpanel"
                      aria-labelledby="product-tab-desc"
                    >
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

                    {/* <div className={`tab-pane fade show ${this.state.activeSubLink === 'Tag' ? 'active' : ''}`} id="product-tags-content" role="tabpanel"
                                            aria-labelledby="product-tab-tags">
                                            <div className="product-tags-content">
                                                <form action="#">
                                                    <h4>Add Your Tags:</h4>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-sm" required={true} />
                                                        <input type="submit" className="btn btn-primary" value="Add Tags" />
                                                    </div>
                                                </form>
                                                <p className="note">Use spaces to separate tags. Use single quotes (') for phrases.</p>
                                            </div>
                                        </div> */}
                    {/* <!-- End .tab-pane --> */}

                    <div
                      className={`tab-pane fade show ${
                        this.state.activeSubLink === "Review" ? "active" : ""
                      }`}
                      id="product-reviews-content"
                      role="tabpanel"
                      aria-labelledby="product-tab-reviews"
                    >
                      <div className="product-reviews-content">
                        <div>
                          <div className="container">
                            {/* <h2 className="text-center">Bootstrap 4 User Rating Form / Comment Form</h2> */}
                            {this.renderRating(detailsData)}

                            {/* <div className="card shadow p-3 mb-5 bg-white rounded">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-2 photo-time">
                                                                    <img src="https://image.ibb.co/jw55Ex/def_face.jpg" alt="avatar" className="img img-rounded img-fluid" />
                                                                    <p className="text-secondary text-center">15 Minutes Ago</p>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <p>
                                                                        <a className="float-left"  href="https://maniruzzaman-akash.blogspot.com/p/contact.html">
                                                                            <strong>Charles Odogwu</strong></a>
                                                                        <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                                        <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                                        <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                                        <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                                    </p>
                                                                    <div className="clearfix"></div>
                                                                    <p>Lorem Ipsum is simply dummy text of the pr make
                                                                        but also the leap into electronic typesetting,
                                                                        remaining essentially unchanged. It was popularised
                                                                        in the 1960s with the release of Letraset sheets
                                                                            containing Lorem Ipsum passages, and more recently
                                                                        with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                          </div>
                        </div>
                      </div>
                      {/* <!-- End .product-reviews-content --> */}
                    </div>
                    {/* <!-- End .tab-pane --> */}
                  </div>
                  {/* <!-- End .tab-content --> */}
                </div>
                <div className="row mt-3">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex justify-content-between">
                          <h4>
                            Products in{" "}
                            {this.state.detailsData.category &&
                              this.state.detailsData.category.name}{" "}
                            Category
                          </h4>
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            className="text-primary"
                            href={`/shop?name=&category=${
                              this.state.detailsData.category &&
                              this.state.detailsData.category.id
                            }&categoryName=${
                              this.state.detailsData &&
                              this.state.detailsData.category &&
                              this.state.detailsData.category.name
                            }`}
                          >
                            View All
                          </a>
                        </div>
                      </div>
                    </div>

                    <hr />
                  </div>
                </div>
                <div className="mt-3 mb-5">
                  <div className="">
                    {this.state.detailsData &&
                    this.state.detailsData.categoryProducts &&
                    this.state.detailsData.categoryProducts.length > 0 ? (
                      <div className="bg-white  px-5 p-5">
                        <Slider
                          {...{
                            ...settings,
                            slidesToShow: this.state.slidesToShow,
                          }}
                        >
                          {this.state.products
                            ? this.state.detailsData &&
                              this.state.detailsData.categoryProducts &&
                              this.state.detailsData.categoryProducts.map(
                                (res) => {
                                  let {
                                    id,
                                    name,
                                    brandName,
                                    model,
                                    finalPrice,
                                    sellingPrice,
                                    mainImageUrl,
                                  } = res;
                                  return (
                                    <FeatureProductItem
                                      finalPrice={finalPrice}
                                      id={id}
                                      name={name}
                                      brandName={brandName}
                                      sellingPrice={sellingPrice}
                                      model={model}
                                      mainImageUrl={mainImageUrl}
                                      featArray={this.state.products}
                                      handleMoveWishList={
                                        this.handleMoveWishList
                                      }
                                    />
                                  );
                                }
                              )
                            : null}
                        </Slider>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className=" bottom-banner-product-detail mt-3">
                  <img
                    alt="bottom"
                    src={`${
                      this.state.bottomBanner1
                        ? this.state.bottomBanner1.url
                        : "https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"
                    }`}
                  />
                </div>
                <div className=" bottom-banner-product-detail mt-2 mb-2">
                  <img
                    alt="bottom"
                    src={`${
                      this.state.bottomBanner2
                        ? this.state.bottomBanner2.url
                        : "https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"
                    }`}
                  />
                </div>
                {/* <!-- End .product-single-tabs --> */}
              </div>
              {/* <!-- End .col-lg-9 --> */}

              <div className="sidebar-overlay"></div>
              <div className="sidebar-toggle">
                <i className="icon-sliders"></i>
              </div>
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
                        <h4>
                          FREE
                          <br />
                          SHIPPING
                        </h4>
                      </li>
                      <li>
                        <i className="icon-us-dollar"></i>
                        <h4>
                          100% MONEY
                          <br />
                          BACK GUARANTEE
                        </h4>
                      </li>
                      <li>
                        <i className="icon-online-support"></i>
                        <h4>
                          ONLINE
                          <br />
                          SUPPORT 24/7
                        </h4>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- End .widget --> */}

                  <div className="widget widget-banner">
                    <div
                      className="banner banner-image"
                      style={{ height: 300 }}
                    >
                      <Link to="#" className="h-100">
                        <img
                          style={{ objectFit: "cover", height: "100%" }}
                          src={`${
                            this.state.leftBanner.length > 0
                              ? this.state.leftBanner[0].url
                              : "https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"
                          }`}
                          alt="Banner Desc"
                        />
                      </Link>
                    </div>
                    {/* <!-- End .banner --> */}
                  </div>
                  {/* <!-- End .widget --> */}

                  <div className="widget widget-featured">
                    {/* <h3 className="widget-title">Featured Products</h3> */}

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
        <Footer />
      </>
    );
  }
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  arrows: false,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const mapStateToProps = (state) => {
  const { cartItems, cartData, products, productFound } = state.inventory;
  let cartResponse = cartItems.data;
  // console.log("fire", state)
  return {
    cartItems,
    cartResponse,
    cartData,
    products,
    productFound,
  };
};

export default connect(mapStateToProps, actions)(ShopItemDetails);
