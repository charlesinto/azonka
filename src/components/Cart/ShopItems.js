import React, { Component } from 'react'
import Header from '../HeaderFooter/Header'
import Footer from '../HeaderFooter/Footer'
import './Shop.css'
import productImg1 from './images/products/cart/product-1.jpg'
import productImg2 from './images/products/cart/product-2.jpg'
import { ShopItemAside } from './ShopItemAside'
import { ShopItemHeader } from './ShopItemHeader'
import { ShopItemPaginate } from './ShopItemPaginate'


class ShopItems extends Component {
    state = { localData: [] }
    componentDidMount() {
        let localData = JSON.parse(localStorage.getItem("shop"))
        this.setState({ localData })
        console.log("shop state", localData)
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
                                        <a href="category.html" className="layout-btn btn-grid active" title="Grid">
                                            <i className="icon-mode-grid"></i>
                                        </a>
                                        <a href="category-list.html" className="layout-btn btn-list" title="List">
                                            <i className="icon-mode-list"></i>
                                        </a>
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
                                                return (

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
                                                                    </div>
                                                                </div>
                                                                <h2 className="product-title">
                                                                    <a href="product.html">Shoes</a>
                                                                </h2>
                                                                <div className="price-box">
                                                                    <span className="product-price">$79.00</span>
                                                                </div>

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
                                                            </div>
                                                        </div>
                                                    </div>


                                                )
                                            })
                                        ) : (
                                                <div>Loading</div>
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