import React, { Component } from 'react';
import * as actions from './../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import homeProduct from "../css/images/products/home-featured-1.jpg";
import { fetchItems } from './../actions';

class FeatureProductItem extends Component {
    state = { products: [], cartItems: {} }
    componentDidMount() {
        console.log("adigun", this.props)
        this.setState({ products: this.props.featArray })
    }
    componentWillReceiveProps = props => {
        console.log("new props feat", props)
        if (props.cartItems !== this.props.cartItems) {
            this.setState({ cartItems: props && props.cartItems, cartLength: props.cartItems ? props.cartItems.length : 0 });
        }
    }

    handleAddCart = async (e) => {
        let id = e.target.id;
        // return console.log(id)
        let token = (localStorage.getItem("x-access-token"));
        // return console.log(token)
        if (token) {
            let postObj = { productId: id, quanity: "1" };

            await this.props.addToCart(postObj)

            let { data } = this.props.cartItems
            // console.log("needs", data)
            // let {} 

            if (data.success) {
                this.setState({ cartData: data.cart.products })
                this.handleSetOnlineData()
            } else {
                alert("An error occured")
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
                    this.handleSetLocalData()
                }

            } else {
                //if cart is empty
                localStorage.setItem("cart", JSON.stringify([obj]))
                this.handleSetLocalData()
            }
        }

    }
    handleSetLocalData = async () => {
        await this.props.fetchLocalCart()
        let { cartData } = this.props;
        this.setState({ cartData })
    }
    handleSetOnlineData = async () => {
        console.log("online props", this.props)
        await this.props.fetchCart()
        console.log("king,", this.props)
        let { products } = this.props.cartItems
        // console.log("firedata", cartData)
        this.setState({ cartData: products })
    }
    render() {
        // console.log("joro", this.props)
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
                        <Link to="#" class="paction add-wishlist" title="Add to Wishlist">
                            <span>Add to Wishlist</span>
                        </Link>

                        <span id={id} onClick={this.handleAddCart} class="paction add-cart" title="Add to Cart" style={{ fontSize: "13px" }}>
                            Add to Cart
                        </span>

                        <Link href="#" class="paction add-compare" title="Add to Compare">
                            <span>Add to Compare</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {

    let { products, cartItems } = state.inventory
    // cartItems = cartItems.products;
    console.log("adigun", state)
    return {
        products, cartItems
    }
}
export default connect(mapStateToProps, actions)(FeatureProductItem);
