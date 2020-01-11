import React, { Component } from 'react';
import * as actions from './../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import homeProduct from "../css/images/products/home-featured-1.jpg";

class FlashSales extends Component {
    state = { products: [] }
    componentDidMount() {
        // console.log("joro", this.props)
    }
    handleAddToCart = async (e, id) => {
        let productId = id;
        let quanity = "1";
        let obj = { productId, quanity }
        console.log('here o', obj)
        await this.props.addToCart(obj)
    }
    render() {
        console.log("joro", this.props)
        const { id, name, brandName, model, sellingPrice, mainImageUrl } = this.props
        return (
            <div className="product col-md-4" key={id}>
                <figure className="product-image-container">
                    <a href="product.html" className="product-image">
                        <img src={mainImageUrl} alt="product" className="image-view" />
                    </a>
                    <a href="ajax\product-quick-view.html" className="btn-quickview">Quick View</a>
                </figure>
                <div className="product-details">
                    <div className="ratings-container">
                        <div className="product-ratings">
                            <span className="ratings" style={{ width: "80%" }}></span>
                        </div>
                    </div>

                    <h2 className="product-title">
                        <a href="product.html">{name} </a>
                    </h2>
                    <div className="price-box">
                        <span className="product-price">&#8358; {sellingPrice}</span>
                    </div>

                    <div className="product-action">
                        <a href="#" className="paction add-wishlist" title="Add to Wishlist">
                            <span>Add to Wishlist</span>
                        </a>

                        <span id={id} onClick={(e) => this.handleAddToCart(e, id)} className="paction add-cart" title="Add to Cart">
                            <span>Add to Cart</span>
                        </span>

                        <a href="#" className="paction add-compare" title="Add to Compare">
                            <span>Add to Compare</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    const { products } = state.inventory
    return {
        products
    }
}
export default connect(mapStateToProps, actions)(FlashSales);
