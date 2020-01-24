import React, { Component } from 'react'
import Header from '../HeaderFooter/Header'
import Footer from '../HeaderFooter/Footer'
import './Shop.css'
import { ShopItemHeader } from './ShopItemHeader'
import { ShopItemPaginate } from './ShopItemPaginate'
import { Link, withRouter } from 'react-router-dom'

import { connect } from "react-redux";
import * as actions from "../../actions";
import ShopItemAside from './ShopItemAside'
import queryString from 'query-string';
import { SearchItem } from '../../actions'


class ShopItems extends Component {
    state = {
        products: [], sortState: "", cartData: [],
        name: "", category: "",
        cartLength: 0
    }
    componentDidMount() {
        this.loadShopData()
        let params = queryString.parse(this.props.location.search)
        const { name, category } = params;
        this.setState({ name, category })
        this.searchItem()
    }
    componentDidUpdate() {
        this.searchItem()
    }

    handleSetCartData = () => {
        let cartData = JSON.parse(localStorage.getItem("cart"));
        this.setState({ cartData })
    }
    handleSort = () => {
        let { products } = this.state
        let selectValue = document.querySelector(".sortDrp").value;

        if (selectValue === "old") {
            let sorted = products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            this.setState({ products: sorted })
        } else if (selectValue === "new") {
            let sorted = products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            this.setState({ products: sorted })
        } else if (selectValue === "high") {
            let sorted = products.sort((a, b) => (b.finalPrice) - (a.finalPrice))
            this.setState({ products: sorted })
        } else if (selectValue === "low") {
            let sorted = products.sort((a, b) => (a.finalPrice) - (b.finalPrice))
            this.setState({ products: sorted })
        } else {
            return null;
        }

    }
    handleItemDetails = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/shop-details/${id}`)
    }
    handleAddCart = async (e) => {
        let id = e.target.id;
        // return console.log(id)
        let token = (localStorage.getItem("x-access-token"));
        if (token) {
            let postObj = { productId: id, quanity: "1" };
            await this.props.addToCart(postObj)
            console.log("fire after", this.props)
            let { success, cart } = this.props.cartResponse;
            if (success) {
                this.setState({ cartData: cart.products })
            } else {
                alert("An error occurred")
            }
        } else {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            this.setState({ cartData })
            let { products } = this.state
            let obj = products.filter(data => id == data.id)[0]

            //check if item is in cart

            if (cartData) { //item exists
                // return console.log("data", cartData)
                let isAdded = cartData.some(data => data.id == id); //check if clicked item exist in cart
                if (isAdded) {
                    return alert("Item has already been added")
                } else {
                    localStorage.setItem("cart", JSON.stringify([...cartData, obj]))
                    this.handleSetData()
                }

            } else {
                //if cart is empty
                localStorage.setItem("cart", JSON.stringify([obj]))
                this.handleSetData()
            }
        }

    }
    handleSetData = async () => {
        await this.props.fetchLocalCart()
        let { cartData } = this.props;
        this.setState({ cartData })
    }
    loadShopData = async () => {
        let { data } = this.props.products;


    }
    searchItem = async () => {
        let { name, category } = this.state;
        let postObj = {
            name,
            category,
            brandName: "",
            year: "0",
            category: "0",
            subCategory: "0",
            store: "0",
            sellingPrice: "",
            costPrice: "",
            discounts: true,
            finalPrice: ""
        }
        await this.props.SearchItem(postObj)
        let { success, products } = this.props.search;
        this.setState({ products })
    }

    render() {
        const { products, cartData } = this.state;
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
                                                <select name="orderby" className="form-control sortDrp" onChange={this.handleSort}>
                                                    <option value="menu_order" selected="selected">Default sorting</option>
                                                    <option value="old">Sort by Date(Old)</option>
                                                    <option value="new" onChange={this.sortNewToOld}>Sort by Date(New)</option>
                                                    <option value="low">Sort by price: low to high</option>
                                                    <option value="high">Sort by price: high to low</option>
                                                </select>
                                            </div>
                                            {/* <!-- End .select-custom --> */}

                                            <Link to="#" className="sorter-btn" title="Set Ascending Direction"><span className="sr-only">Set
                                    Ascending Direction</span></Link>
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

                                <div className="row row-sm mt-5">
                                    <hr />


                                    {/* Shop box */}

                                    {
                                        products ? (
                                            products.map(data => {
                                                console.log("shop state", data)
                                                let { id, name, finalPrice, createdAt, mainImageUrl } = data
                                                return (

                                                    <div className="col-6 col-md-4 col-xl-3" key={id}>
                                                        <div className="product">
                                                            <figure className="product-image-container">
                                                                <span id={id} className="product-image shop-product-image" onClick={(e) => this.handleItemDetails(e, id)}>
                                                                    <img src={mainImageUrl} alt="product" />
                                                                </span>
                                                                <Link to="#" className="btn-quickview">Quick View</Link>
                                                            </figure>
                                                            <div className="product-details">
                                                                <div className="ratings-container">
                                                                    <div className="product-ratings">
                                                                        <span className="ratings" style={{ width: "50%" }}></span>
                                                                    </div>
                                                                </div>
                                                                <h2 className="product-title">
                                                                    <Link to="#">{name}</Link>
                                                                </h2>
                                                                <div className="price-box">
                                                                    <span className="product-price"> ₦ {finalPrice}</span>
                                                                    <h2 className="product-title">
                                                                        <Link to="#">{new Date(createdAt).toLocaleString()}</Link>
                                                                    </h2>
                                                                </div>

                                                                <div className="product-action">
                                                                    <Link to="#" className="paction add-wishlist" title="Add to Wishlist">
                                                                        <span>Add to Wishlist</span>
                                                                    </Link>

                                                                    <span className="paction add-cart" style={{ fontSize: "13px" }} id={id} onClick={this.handleAddCart}>
                                                                        Add to Cart
                                                                    </span>
                                                                    <Link to="#" className="paction add-compare" title="Add to Compare">
                                                                        <span>Add to Compare</span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                )
                                            })
                                        ) : (
                                                <div>Loading...</div>
                                            )
                                    }

                                    {/* SHOP BOX END */}

                                </div>
                                {/* <!-- End .row --> */}

                                <ShopItemPaginate />
                            </div>
                            {/* <!-- End .col-lg-9 --> */}

                            < ShopItemAside />
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


const mapStateToProps = state => {

    let { cartItems, cartData, products, search } = state.inventory;
    let cartResponse = cartItems.data
    search = search.data
    return {
        cartItems, cartResponse, cartData, products, search
    }
}


export default withRouter(connect(mapStateToProps, actions)(ShopItems));