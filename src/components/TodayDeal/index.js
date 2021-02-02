import React, { Component } from "react";
import Footer from "../HeaderFooter/Footer";
import "./Shop.css";
import { ShopItemHeader } from "./ShopItemHeader";
import { ShopItemPaginate } from "./ShopItemPaginate";
import { Link, withRouter } from "react-router-dom";
import FlashSales from "../../common/FlashSales";

import { connect } from "react-redux";
import * as actions from "../../actions";
import ShopItemAside from "./ShopItemAside";
// import queryString from "query-string";

class ShopItems extends Component {
  state = {
    products: [],
    sortState: "",
    cartData: [],
    name: "",
    category: "",
    finalPrice: 0,
    cartLength: 0,
    id: 0,
  };

  async componentDidMount() {
    // this.loadShopData();
    this.props.initiateRegistration();
    await this.props.getAdvertCategory();
    this.props.stopLoading();
  }

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
      let postObj = { productId: id, quanity: "1" };
      await this.props.addToCart(postObj);
      let { success, cart } = this.props.cartResponse;
      if (success) {
        this.setState({ cartData: cart.products });
      } else {
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
        }
      } else {
        //if cart is empty
        localStorage.setItem("cart", JSON.stringify([obj]));
        this.handleSetData();
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

  static getDerivedStateFromProps(props, state) {
    if (props.todayDeal && props.todayDeal.length > 0) {
      return { ...state, products: props.todayDeal[0].products };
    }
    return null;
  }

  renderAdverts = () => {
    return this.props.todayDeal.map((item, index) => (
      <>
        <div className="row w-100 py-3">
          {item.products.length > 0 ? (
            item.products.map((product, i) => {
              let {
                id,
                name,
                finalPrice,
                brandName,
                model,
                sellingPrice,
                mainImageUrl,
                rating,
              } = product;
              return (
                <FlashSales
                  key={i}
                  id={id}
                  rating={rating}
                  name={name}
                  brandName={brandName}
                  sellingPrice={sellingPrice}
                  model={model}
                  mainImageUrl={mainImageUrl}
                  finalPrice={finalPrice}
                  featArray={[]}
                  handleMoveWishList={this.handleMoveWishList}
                />
              );
            })
          ) : (
            <div className="empty-products my-3">
              <h3>No Product(s) found</h3>
            </div>
          )}
        </div>
      </>
    ));
  };

  handleMoveWishList = async (id) => {
    let localData = JSON.parse(localStorage.getItem("wishList"));
    if (localStorage.getItem("x-access-token")) {
      let data = this.state.products && this.state.products;
      let filt = data.filter((o) => +o.id === +id)[0];

      if (!localData) {
        localData = [filt];
        localStorage.setItem("wishList", JSON.stringify(localData));
        return this.props.successAlert("Item added successfully");
      } else {
        let _id = localData.some((o) => +o.id === +id);
        if (_id) {
          return this.props.successAlert(
            "Item has already been moved to WishList"
          );
        } else {
          localData.push(filt);
          localStorage.setItem("wishList", JSON.stringify(localData));
          return this.props.successAlert("Item added successfully");
        }
      }
    }
  };

  render() {
    return (
      <div>
        <main className="main">
          <ShopItemHeader />
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
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

                  <div className="toolbox-item toolbox-show">
                    <label>Showing 1–9 of 60 results</label>
                  </div>
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

                <hr />
                {/* Shop box */}
                {this.props.todayDeal ? (
                  this.renderAdverts()
                ) : (
                  <div className="empty-products">
                    <h3>No Product(s) found</h3>
                  </div>
                )}

                {/* SHOP BOX END */}

                {/* <!-- End .row --> */}

                <ShopItemPaginate />
              </div>
              {/* <!-- End .col-lg-9 --> */}

              <ShopItemAside />
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
    );
  }
}

const mapStateToProps = (state) => {
  const homeAdvert = state.home.adverts;
  let { cartItems, cartData, products, search, adverts } = state.inventory;
  let cartResponse = cartItems.data;
  const todayDeal = homeAdvert.filter((item) => item.name === "Today Deal");
  //   console.log("today deal: ", todayDeal);
  search = search.data;
  return {
    cartItems,
    cartResponse,
    cartData,
    products,
    search,
    adverts,
    todayDeal,
  };
};

export default withRouter(connect(mapStateToProps, actions)(ShopItems));
