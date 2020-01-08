import React, { Component } from 'react'
import Header from '../HeaderFooter/Header'
import Footer from '../HeaderFooter/Footer'
import './Shop.css'
import productImg1 from './images/products/cart/product-1.jpg'
import productImg2 from './images/products/cart/product-2.jpg'
import { ShopItemAside } from './ShopItemAside'
import { ShopItemHeader } from './ShopItemHeader'
import { ShopItemPaginate } from './ShopItemPaginate'
import { Link } from 'react-router-dom'


class ShopItems extends Component {
    state = { localData: [], sortState: "", cartData: [] }
    componentDidMount() {
        let localData = JSON.parse(localStorage.getItem("shop"));

        this.setState({ localData })
        console.log("shop state", localData)
    }
    handleSort = (e) => {
        this.setState({ sortState: e.target.value })
        console.log("shop state", this.state.sortState)
        let selectValue = this.state.sortState;

        //  console.log("selectvalue", selectValue)
        if (this.state.sortState === "old") {
            return this.sortOldToNew()
        } else if (this.state.sortState === "new") {
            return this.sortNewToOld()
        } else if (this.state.sortState === "high") {
            return this.sortHighToLow()
        } else if (this.state.sortState === "low") {
            return this.sortLowToHigh()
        } else {
            return null;
        }


    }
    sortNewToOld = () => {
        console.log("new")
    }
    sortOldToNew = () => {
        console.log("old")
    }
    sortHighToLow = () => {
        console.log("high")
    }
    sortLowToHigh = () => {
        console.log("low")
    }
    handleItemDetails = (e) => {
        this.props.history.push(`/shop-details/${e.target.id}`)
    }
    handleAddCart = (e) => {
        let id = e.target.id;
        let cartData = JSON.parse(localStorage.getItem("cart"));
        this.setState({ cartData })
        let { localData } = this.state
        let obj = localData.filter(data => id == data.id)[0]

        //check if item is in cart

        if (cartData) { //item exists
            // console.log("data", cartData)
            let isAdded = cartData.find(data => data.id == id); //check if clicked item exist in cart
            if (isAdded) {
                return alert("Item has already been added")
            } else {
                localStorage.setItem("cart", JSON.stringify([...cartData, obj]))
            }

        } else {
            //if cart is empty
            localStorage.setItem("cart", JSON.stringify([obj]))
        }



    }
    render() {
        const { localData } = this.state;
        return (
            <div>
                <Header />
                <main className="main">
                    <ShopItemHeader />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9">
                                <nav className="toolbox">
                                    <div className="toolbox-left">
                                        <div className="toolbox-item toolbox-sort">
                                            <div className="select-custom">
                                                <select name="orderby" className="form-control" onChange={this.handleSort}>
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

                                    <div className="layout-modes">
                                        <Link to="category.html" className="layout-btn btn-grid active" title="Grid">
                                            <i className="icon-mode-grid"></i>
                                        </Link>
                                        <Link to="category-list.html" className="layout-btn btn-list" title="List">
                                            <i className="icon-mode-list"></i>
                                        </Link>
                                    </div>
                                    {/* <!-- End .layout-modes --> */}
                                </nav>

                                <div className="row row-sm mt-5">
                                    <hr />


                                    {/* Shop box */}

                                    {
                                        localData ? (
                                            localData.map(data => {
                                                console.log("shop state", data)
                                                let { id, name, finalPrice, createdAt } = data
                                                return (

                                                    <div className="col-6 col-md-4 col-xl-3" key={id}>
                                                        <div className="product">
                                                            <figure className="product-image-container">
                                                                <span id={id} className="product-image" onClick={this.handleItemDetails}>
                                                                    <img src={productImg1} alt="product" />
                                                                </span>
                                                                <Link to="ajax\product-quick-view.html" className="btn-quickview">Quick View</Link>
                                                            </figure>
                                                            <div className="product-details">
                                                                <div className="ratings-container">
                                                                    <div className="product-ratings">
                                                                        <span className="ratings" style={{ width: "50%" }}></span>
                                                                    </div>
                                                                </div>
                                                                <h2 className="product-title">
                                                                    <Link to="product.html">{name}</Link>
                                                                </h2>
                                                                <div className="price-box">
                                                                    <span className="product-price">${finalPrice}</span>
                                                                    <h2 className="product-title">
                                                                        <Link to="product.html">{new Date(createdAt).toLocaleString()}</Link>
                                                                    </h2>
                                                                </div>

                                                                <div className="product-action">
                                                                    <Link to="#" className="paction add-wishlist" title="Add to Wishlist">
                                                                        <span>Add to Wishlist</span>
                                                                    </Link>

                                                                    <span className="paction add-cart" onClick={this.handleAddCart}>
                                                                        <span id={id}>Add to Cart</span>
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

        )
    }
}


export default ShopItems