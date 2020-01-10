import React, { Component } from 'react';
import * as actions from './../actions';
import { connect } from 'react-redux';
import homeProduct from "../css/images/products/home-featured-1.jpg";

class FeatureProductItem extends Component {
    state = { products: [] }
    componentDidMount() {
        // console.log("joro", this.props)
    }
handleAddToCart = async (e) => {
    let productId = e.target.id;
    let quanity = "1";
    let obj = {productId, quanity}
    console.log(obj)
   await this.props.addToCart(obj)
}
    render() {
        console.log("joro", this.props)
        const { id, name, brandName, model, sellingPrice, mainImageUrl } = this.props
        return (
            <div class="product" key={id}>
                <figure class="product-image-container">
                    <a href="product.html" class="product-image">
                        <img src={mainImageUrl} alt="product" className="image-view" />
                    </a>
                    <a href="ajax\product-quick-view.html" class="btn-quickview">Quick View</a>
                </figure>
                <div class="product-details">
                    <div class="ratings-container">
                        <div class="product-ratings">
                            <span class="ratings" style={{ width: "80%" }}></span>
                        </div>
                    </div>

                    <h2 class="product-title">
                        <a href="product.html">{name} </a>
                    </h2>
                    <div class="price-box">
                        <span class="product-price">&#8358; {sellingPrice}</span>
                    </div>

                    <div class="product-action">
                        <a href="#" class="paction add-wishlist" title="Add to Wishlist">
                            <span>Add to Wishlist</span>
                        </a>

                        <span class="paction add-cart" title="Add to Cart">
                            <span id={id} onClick={this.handleAddToCart}> Add to Cart</span>
                        </span>

                        <a href="#" class="paction add-compare" title="Add to Compare">
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
export default connect(mapStateToProps, actions)(FeatureProductItem);
