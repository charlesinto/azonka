import React, { Component } from "react";
import Footer from "../HeaderFooter/Footer";
import "./Shop.css";
import { ShopItemHeader } from "./ShopItemHeader";
// import { ShopItemPaginate } from './ShopItemPaginate'
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";
import * as actions from "../../actions";
// import ShopItemAside from './ShopItemAside'
import queryString from "query-string";
import swal from "sweetalert2";
import Pages from "../../config/pages";
import Positions from "../../config/position";
import axios from "axios";
import LazyLoad from "react-lazyload";
import imagePlaceHolder from "../../css/images/image_loader.png";

class ShopItems extends Component {
  state = {
    products: [],
    sortState: "",
    cartData: [],
    name: "",
    category: "",
    finalPrice: 0,
    categoryName: "",
    cartLength: 0,
    topBanner: null,
    subCategory: "",
  };
  // componentWillMount() {
  //     this.unlisten = this.props.history.listen((location, action) => {
  //         this.searchItem()
  //     });
  // }
  async componentDidMount() {
    this.loadShopData();
    let params = queryString.parse(this.props.location.search);
    const { name, category, price, categoryName, subCategory } = params;

    await this.setState({
      name,
      category,
      finalPrice: price,
      categoryName,
      subCategory,
    });
    console.log("called here o");
    this.searchItem();
    this.listen();
  }
  listen = () => {
    this.props.history.listen((location, action) => {
      let params = queryString.parse(location.search);
      let { name } = this.state;
      if (params.name !== name) {
        this.setState({
          name: params.name,
          category: params.category,
          categoryName: params.categoryName,
        });
        // return console.log("one change", this.state, params);
        //this.searchItem()
      }

      // const { name, category, price } = params;
      // console.log(params)
    });
  };
  getFeaturedCategoriesImages = async () => {
    const responseAds = await axios.get("/api/v1/ad/get-ads/0/1000");

    const ads = responseAds.data.ads.filter(
      (item) => item.page === Pages.SHOP_PAGE
    );

    const topBanner = ads.filter((item) => item.position === Positions.TOP);
    const lowerBanner = ads.filter((item) => item.position === Positions.LOWER);
    console.log(lowerBanner);
    const leftBanner = ads.filter((item) => item.position === Positions.LEFT);
    const bottomBanner = ads.filter(
      (item) => item.position === Positions.BOTTOM
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
      bottomBanner,
    });
  };
  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).

    // let params = queryString.parse(this.props.location.search)
    // const { name, category, price } = params;
    // console.log("static nonso", params)
    // if (props.id !== state.prevId) {
    //   return {
    //     externalData: null,
    //     prevId: props.id,
    //   };
    // }

    // No state update necessary
    return null;
  }

  async componentDidUpdate(prevProps, prevState) {
    // console.log("happened", prevState)
    let params = queryString.parse(this.props.location.search);
    const { name, category, price, categoryName } = params;
    // console.log(params, prevState)
    if (
      name !== prevState.name ||
      category !== prevState.category ||
      price !== prevState.finalPrice ||
      categoryName !== prevState.categoryName
    ) {
      console.log("calle here twice");
      await this.setState({ name, category, finalPrice: price }, () =>
        console.log(this.state)
      );
      return this.searchItem();
    }
  }

  searchItem = async () => {
    this.props.initiateRegistration();
    let { name, category, finalPrice, subCategory } = this.state;

    let postObj = {
      name,
      category:
        category === "Select category" || category === "" ? "0" : category,
      brandName: "",
      year: "0",
      subCategory: subCategory && subCategory.trim() !== "" ? subCategory : "0",
      store: "0",
      sellingPrice: "",
      costPrice: "",
      discounts: true,
      finalPrice: finalPrice == null ? "0" : finalPrice,
    };
    // return console.log("nonso", postObj)
    console.log("called", postObj);
    await this.props.SearchItem(postObj);
    if (this.props.search == null) return null;
    let { products } = this.props.search;
    console.log("products", products);
    if (this.props.search) {
      this.setState({ products });
    }
  };
  handleSetCartData = () => {
    let cartData = JSON.parse(localStorage.getItem("cart"));
    this.setState({ cartData });
  };
  handleSort = () => {
    let { products } = this.state;
    let selectValue = document.querySelector(".sortDrp").value;

    if (selectValue === "old") {
      let sorted = products.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      this.setState({ products: sorted });
    } else if (selectValue === "new") {
      let sorted = products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      this.setState({ products: sorted });
    } else if (selectValue === "high") {
      let sorted = products.sort((a, b) => b.finalPrice - a.finalPrice);
      this.setState({ products: sorted });
    } else if (selectValue === "low") {
      let sorted = products.sort((a, b) => a.finalPrice - b.finalPrice);
      this.setState({ products: sorted });
    } else {
      return null;
    }
  };
  handleItemDetails = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/shop-details/${id}`);
  };
  handleAddCart = async (e) => {
    let id = e.target.id;
    // return console.log(id)
    let token = localStorage.getItem("x-access-token");
    if (token) {
      let postObj = { productId: id, quantity: "1" };
      this.props.initiateRegistration();
      await this.props.addToCart(postObj);
      let { success, cart } = this.props.cartResponse;
      if (success) {
        this.props.stopLoading();
        this.setState({ cartData: cart.products });
        // return swal.fire("Response", "Item added to cart", "success")
      } else {
        this.props.stopLoading();
        this.props.renderError("An error occurred");
      }
    } else {
      let cartData = JSON.parse(localStorage.getItem("cart"));
      this.setState({ cartData });
      let { products } = this.state;
      let obj = products.filter((data) => id === data.id)[0];

      //check if item is in cart

      if (cartData) {
        //item exists
        // return console.log("data", cartData)
        let isAdded = cartData.some((data) => data.id === id); //check if clicked item exist in cart
        if (isAdded) {
          return this.props.showSuccessALert("Item has already been added");
        } else {
          localStorage.setItem("cart", JSON.stringify([...cartData, obj]));
          this.handleSetData();
          return swal.fire("Response", "Item added to cart", "success");
        }
      } else {
        //if cart is empty
        localStorage.setItem("cart", JSON.stringify([obj]));
        this.handleSetData();
        return swal.fire("Response", "Item added to cart", "success");
      }
    }
  };
  handleSetData = async () => {
    await this.props.fetchLocalCart();
    let { cartData } = this.props;
    this.setState({ cartData });
  };
  loadShopData = async () => {};
  handleDetailModal = async (e) => {
    let { products } = this.state;
    let itemDetails = products.filter((data) => data.id === e.target.id);
    console.log(itemDetails, this.props);
    await this.props.itemDetailModalAction(itemDetails);
    return this.setState({ itemDetails });
  };
  numberWithCommas = (number = "") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <main className="main">
          <ShopItemHeader
            ads="https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"
            categoryName={this.state.categoryName}
            productName={this.state.name}
          />
          <div
            className="container"
            style={{ minHeight: "calc(100vh + 50px)" }}
          >
            <div className="row d-flex justify-content-center">
              <div className="col-lg-12">
                <nav className="toolbox">
                  <div className="toolbox-left">
                    <div className="toolbox-item toolbox-sort">
                      <div className="select-custom">
                        <select
                          name="orderby"
                          className="form-control sortDrp"
                          onChange={this.handleSort}
                        >
                          <option value="menu_order" selected="selected">
                            Default sorting
                          </option>
                          <option value="old">Sort by Date(Old)</option>
                          <option value="new" onChange={this.sortNewToOld}>
                            Sort by Date(New)
                          </option>
                          <option value="low">
                            Sort by price: low to high
                          </option>
                          <option value="high">
                            Sort by price: high to low
                          </option>
                        </select>
                      </div>
                      {/* <!-- End .select-custom --> */}

                      <Link
                        to="#"
                        className="sorter-btn"
                        title="Set Ascending Direction"
                      >
                        <span className="sr-only">Set Ascending Direction</span>
                      </Link>
                    </div>
                    {/* <!-- End .toolbox-item --> */}
                  </div>
                  {/* <!-- End .toolbox-left --> */}

                  {/* <div class="col-sm-5 my-1">
                                        <label class="sr-only" for="inlineFormInputGroupUsername">Username</label>
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Username" />
                                            <div class="input-group-append">
                                                <button className="btn btn-primary btn-sm">Search</button>
                                            </div>
                                        </div>
                                    </div> */}

                  {/* <div className="toolbox-item toolbox-show">
                                        <label>Showing 1–9 of 60 results</label>
                                    </div> */}
                  {/* <!-- End .toolbox-item --> */}

                  {/* <div className="layout-modes">
                                        <Link to="category.html" className="layout-btn btn-grid active" title="Grid">
                                            <i className="icon-mode-grid"></i>
                                        </Link>
                                        <Link to="category-list.html" className="layout-btn btn-list" title="List">
                                            <i className="icon-mode-list"></i>
                                        </Link>
                                    </div> */}
                  {/* <!-- End .layout-modes --> */}
                </nav>

                <div className="row row-sm mt-5">
                  <hr />
                  {/* Shop box */}

                  {products && products.length > 0 ? (
                    products.map((data) => {
                      let {
                        id,
                        name,
                        finalPrice,
                        sellingPrice,
                        rating,
                        createdAt,
                        mainImageUrl,
                      } = data;
                      return (
                        <div className="col-sm-6 col-md-3 col-lg-2" key={id}>
                          <div className="product">
                            <figure className="product-image-container">
                              <span
                                id={id}
                                className="product-image shop-product-image"
                                onClick={(e) => this.handleItemDetails(e, id)}
                              >
                                <LazyLoad
                                  once={true}
                                  placeholder={
                                    <img
                                      src={imagePlaceHolder}
                                      alt="..."
                                      style={{
                                        width: "200px",
                                        height: "200px",
                                      }}
                                    />
                                  }
                                >
                                  <img
                                    src={
                                      mainImageUrl
                                        ? mainImageUrl
                                        : imagePlaceHolder
                                    }
                                    alt="..."
                                    // style={{ width: "200px", height: "200px" }}
                                  />
                                  {/* <img
                            // src={imgLoaded ? productImage : imgLoader}
                            src={productImage}
                            alt=".."
                            // loading="lazy"
                            // onLoad={() => this.setState({ imgLoaded: true })}
                          /> */}
                                </LazyLoad>
                              </span>
                              {/* <span className="btn-quickview" id={id} data-toggle="modal" data-target="#exampleModal" onClick={this.handleDetailModal} style={{ cursor: "pointer" }} >Quick View</span> */}
                            </figure>
                            <div className="product-details">
                              <div className="ratings-container">
                                <div className="product-ratings">
                                  <span
                                    className="ratings"
                                    style={{ width: `${(rating / 5) * 100}%` }}
                                  ></span>
                                </div>
                              </div>
                              <h2 className="product-title">
                                <Link to="#">{name}</Link>
                              </h2>
                              <div className="price-box">
                                <span className="product-price mx-2">
                                  {" "}
                                  ₦ {this.numberWithCommas(finalPrice / 100)}
                                </span>
                                <span className="old-price product-price">
                                  {" "}
                                  ₦ {this.numberWithCommas(sellingPrice / 100)}
                                </span>
                                <h2 className="product-title">
                                  <Link to="#">
                                    {new Date(createdAt).toLocaleString()}
                                  </Link>
                                </h2>
                              </div>

                              <div className="product-action">
                                {/* <Link to="#" className="paction add-wishlist" title="Add to Wishlist">
                                                                        <span>Add to Wishlist</span>
                                                                    </Link> */}

                                <span
                                  className="paction add-cart"
                                  style={{ fontSize: "13px" }}
                                  id={id}
                                  onClick={this.handleAddCart}
                                >
                                  Add to Cart
                                </span>
                                {/* <Link to="#" className="paction add-compare" title="Add to Compare">
                                                                        <span>Add to Compare</span>
                                                                    </Link> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="empty-products">
                      <h3>No Product(s)</h3>
                    </div>
                  )}

                  {/* SHOP BOX END */}
                </div>
                {/* <!-- End .row --> */}

                {/* <ShopItemPaginate /> */}
              </div>
              {/* <!-- End .col-lg-9 --> */}

              {/* < ShopItemAside /> */}
              {/* <!-- End .col-lg-3 --> */}
            </div>
            {/* <!-- End .row --> */}
          </div>
          <div className="container">
            <div className=" bottom-banner mt-3">
              <img
                alt="bottom"
                src="https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"
              />
            </div>
          </div>
          {/* <!-- End .container --> */}

          {/* <div className="mb-5"></div> */}
          {/* <!-- margin --> */}
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { cartItems, cartData, products, search } = state.inventory;
  let cartResponse = cartItems.data;
  search = search.data;
  return {
    cartItems,
    cartResponse,
    cartData,
    products,
    search,
  };
};

export default withRouter(connect(mapStateToProps, actions)(ShopItems));
