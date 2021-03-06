import React, { Component } from 'react';
import * as actions from './../actions';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom'
import ItemModal from '../components/Cart/ItemModal';




class FlashSales extends Component {
    state = { products: [], itemDetails: {}, imgLoaded: false }
    componentDidMount() {
        this.setState({ products: this.props.featArray })
    }
    componentWillReceiveProps = props => {
        if (props.cartItems !== this.props.cartItems) {
            this.setState({ cartItems: props && props.cartItems, cartLength: props.cartItems ? props.cartItems.length : 0 });
        }
    }
    handleAddCart = async (e, id) => {
        // return console.log(id)
        let token = (localStorage.getItem("x-access-token"));
        // return console.log(token)
        if (token) {
            let postObj = { productId: `${id}`, quantity: "1" };
            this.props.initiateRegistration()
            this.props.addToCart(postObj)
            // console.log("flash props", this.props)
            // let { data } = this.props.cartItems;
            // console.log('data', data)
            //     this.setState({ cartData: data.cart.products })
            //     this.handleSetOnlineData()

        } else {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            this.setState({ cartData })
            let { products } = this.state
            let obj = products.filter(data => id === data.id)[0]

            //check if item is in cart

            if (cartData) { //item exists
                // return console.log("data", cartData)
                let isAdded = cartData.some(data => data.id === id); //check if clicked item exist in cart
                if (isAdded) {
                    return this.props.successAlert('Item has already been added')
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
        this.setState({ cartData }, () => this.props.successAlert('Item added to cart successfully'))
    }
    handleSetOnlineData = async () => {
        await this.props.fetchCart()
        let { products } = this.props.cartItems
        this.setState({ cartData: products })
    }
    handleDetailModal = async (e) => {
        let { products } = this.state;
        let itemDetails = products.filter(data => data.id === parseInt(e.target.id));
        await this.props.itemDetailModalAction(itemDetails)
        this.setState({ itemDetails })
    }
    handleItemDetails = (e) => {
        this.props.history.push(`/shop-details/${e.target.id}`)
    }

    render() {
        // console.log("nonso", this.state.imgLoaded)
        const { id, name, sellingPrice, mainImageUrl } = this.props
        return (

            <div className="product col-md-4" key={id}>
                <figure className="product-image-container" >
                    <span className="product-image" id={id} onClick={this.handleItemDetails}>
                        <img src={mainImageUrl} alt="product" className="image-view" loading="lazy" onLoad={() => this.setState({ imgLoaded: true })} />
                    </span>
                    <span className="btn-quickview" id={id} data-toggle="modal" data-target="#exampleModal" onClick={this.handleDetailModal} style={{ cursor: "pointer" }} >Quick View</span>
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
                        <a href="#N" className="paction add-wishlist" title="Add to Wishlist">
                            <span>Add to Wishlist</span>
                        </a>

                        <span id={id} onClick={(e) => this.handleAddCart(e, id)} class="paction add-cart" title="Add to Cart" style={{ fontSize: "13px" }}>
                            Add to Cart
                        </span>

                        <a href="#N" className="paction add-compare" title="Add to Compare">
                            <span>Add to Compare</span>
                        </a>
                    </div>
                </div>
                <ItemModal />
            </div>

        );
    }
}
const mapStateToProps = state => {
    let { products, cartItems } = state.inventory
    return {
        products, cartItems
    }

}




export default withRouter(connect(mapStateToProps, actions)(FlashSales));


