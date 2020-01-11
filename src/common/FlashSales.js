import React, { Component } from 'react';
import * as actions from './../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import homeProduct from "../css/images/products/home-featured-1.jpg";

class FlashSales extends Component {
    state = { products: [] }
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
            // console.log("flash props", this.props)
            let { data } = this.props.cartItems;
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

                        <span id={id} onClick={this.handleAddCart} class="paction add-cart" title="Add to Cart" style={{ fontSize: "13px" }}>
                            Add to Cart
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
    let { products, cartItems } = state.inventory
    // cartItems = cartItems.products;
    console.log("adigun", state)
    return {
        products, cartItems
    }

}

export default connect(mapStateToProps, actions)(FlashSales);

