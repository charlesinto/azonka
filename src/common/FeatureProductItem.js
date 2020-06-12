import React, { Component } from 'react';
import * as actions from './../actions';
import { connect } from 'react-redux';
import {  withRouter, Link } from 'react-router-dom'
// import swal from 'sweetalert2'

class FeatureProductItem extends Component {
    state = { products: [], cartItems: {} }
    componentDidMount() {
        this.setState({ products: this.props.featArray })
    }
    componentWillReceiveProps = props => {
        if (props.cartItems !== this.props.cartItems) {
            this.setState({ cartItems: props && props.cartItems, cartLength: props.cartItems ? props.cartItems.length : 0 });
        }
    }

    handleAddCart = async (e, id) => {
        let token = (localStorage.getItem("x-access-token"));
        // return console.log(token)
        if (token) {
            // return console.log(token)
            let postObj = { productId: `${id}`, quantity: "1" };
            this.props.initiateRegistration()
            this.props.addToCart(postObj)

            //let { data } = this.props.cartItems
            // console.log("needs", data)
            // let {} 
            //  this.handleSetOnlineData()
            //this.props.("An error occured")
            // if (data.success) {
            //     this.setState({ cartData: data.cart.products })

            // } else {

            // }

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
                    return this.props.successAlert("Item has already been added")
                } else {
                    localStorage.setItem("cart", JSON.stringify([...cartData, obj]))
                    this.handleSetLocalData()
                    // return swal.fire("Response", "Item added to cart", "success")
                    return this.props.showSuccessALert("Item has already been added")
                }

            } else {
                //if cart is empty
                localStorage.setItem("cart", JSON.stringify([obj]))
                this.handleSetLocalData()

                // return swal.fire("Response", "Item added to cart", "success")
                return this.props.showSuccessALert("Item has already been added")
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
        // console.log("firedata", cartData)
        this.setState({ cartData: products })
    }
    handleDetailModal = async (e) => {
        let { products } = this.state;
        // console.log(e.target.id);
        let itemDetails = products.filter(data => data.id === parseInt(e.target.id));
        // console.log(itemDetails)
        await this.props.itemDetailModalAction(itemDetails)
        // this.setState({ itemDetails })
    }
    handleItemDetails = (e) => {
        this.props.history.push(`/shop-details/${e.target.id}`)
    }
    handleMoveWishList = (id) => {
        this.props.handleMoveWishList(id)
    }
    render() {
        // console.log("joro", this.props)
        const { id, name, sellingPrice,finalPrice, mainImageUrl } = this.props
        return (
            <div className="product" key={id} style={{ marginRight: 8 }}>
                {/* <ItemModal /> */}
                <figure className="product-image-container">
                    <span className="product-image" id={id} onClick={this.handleItemDetails}>
                        <img src={mainImageUrl} alt="product" className="image-view" loading="lazy" />
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
                        <Link to="#" className="wordbreak">{name} </Link>
                    </h2>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-sm-6 price-box">
                                    <span className="product-price">&#8358; {finalPrice && finalPrice > 0 ? finalPrice : sellingPrice}</span>
                                </div>
                                <div className="col-sm-6 price-box">
                                    <span className="old-price product-price">&#8358; {sellingPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="product-action">
                        {/* <Link to="#" class="paction add-wishlist" title="Add to Wishlist" id={id}
                            onClick={(e) => {
                                e.preventDefault()
                                this.handleMoveWishList(id)
                            }}
                        >
                            <span>Add to Wishlist</span>
                        </Link> */}
                        <span id={id} onClick={(e) => this.handleAddCart(e, id)} className="paction add-to-cart-mobile add-cart" title="Add to Cart" style={{ fontSize: "13px" }}>

                        </span>
                        <span id={id} onClick={(e) => this.handleAddCart(e, id)} className="paction add-to-cart-desktop add-cart" title="Add to Cart" style={{ fontSize: "13px" }}>
                            Add to Cart
                        </span>

                        {/* <Link href="#" class="paction add-compare" title="Add to Compare">
                            <span>Add to Compare</span>
                        </Link> */}
                    </div>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {

    let { products, cartItems } = state.inventory;
    return {
        products, cartItems
    }
}
export default withRouter(connect(mapStateToProps, actions)(FeatureProductItem));
