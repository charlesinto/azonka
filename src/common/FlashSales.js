import React, { Component } from 'react';
import * as actions from './../actions';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import ItemModal from '../components/Cart/ItemModal';
import swal from 'sweetalert2'




class FlashSales extends Component {
    state = { products: [], itemDetails: {} }
    componentDidMount() {
        this.setState({ products: this.props.featArray })
    }
    componentWillReceiveProps = props => {

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
                return swal.fire("Response", "Item added to cart", "success")
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
                    return swal.fire("Response", "Item already in cart", "info")
                } else {
                    localStorage.setItem("cart", JSON.stringify([...cartData, obj]))
                    this.handleSetLocalData()
                    return swal.fire("Response", "Item added to cart", "success")
                }

            } else {
                //if cart is empty
                localStorage.setItem("cart", JSON.stringify([obj]))
                this.handleSetLocalData()
                return swal.fire("Response", "Item added to cart", "success")
            }
        }

    }
    handleSetLocalData = async () => {
        await this.props.fetchLocalCart()
        let { cartData } = this.props;
        this.setState({ cartData })
    }
    handleSetOnlineData = async () => {
        await this.props.fetchCart()
        let { products } = this.props.cartItems
        this.setState({ cartData: products })
    }
    handleDetailModal = async (e) => {
        let id = e.target.id;
        let { products } = this.state;
        let itemDetails = products.filter(data => data.id == e.target.id);
        await this.props.itemDetailModalAction(itemDetails)
        this.setState({ itemDetails })
    }
    handleItemDetails = (e) => {
        this.props.history.push(`/shop-details/${e.target.id}`)
    }
    render() {
        const { id, name, brandName, model, sellingPrice, mainImageUrl } = this.props
        return (

            <div className="product col-md-4" key={id}>
                <figure className="product-image-container" >
                    <span className="product-image" id={id} onClick={this.handleItemDetails}>
                        <img src={mainImageUrl} alt="product" className="image-view" />
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


