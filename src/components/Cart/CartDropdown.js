
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as actions from "../../actions";

export class CartDropdown extends Component {
    state = { data: [], sum: 0, cartData: [], cartLength: 0 }

    componentDidMount() {
        this.loadCart()
        console.log("fires", this.props)
        // this.tempReload()
    }
    componentWillReceiveProps = props => {
        console.log("wunmi", props)
        if (props.setCartData !== this.props.setCartData) {
            this.setState({ cartData: props && props.setCartData, cartLength: props.setCartData ? props.setCartData.length : 0 });
        }
    }
    calSum = () => {
        let { cartData } = this.state;
        let sum = cartData ? cartData.reduce((a, b) => {
            return a + b.finalPrice
        }, 0) : 0
        return sum
    }
    removeFromCart = async (e) => {
        let { cartData } = this.state;
        // alert(e.target.id)
        let id = e.target.id;
        let newItems = cartData.filter(data => data.id != id);
        // console.log(newItems)
        localStorage.setItem("cart", JSON.stringify(newItems));
        let newCartData = JSON.parse(localStorage.getItem("cart"))
        return this.setState({ cartData: newCartData })
    }

    loadCart = async () => {
        let token = localStorage.getItem("x-access-token");
        if (token) {
            console.log("aye", this.props)
            // await this.props.fetchCart()
            this.setState({ cartData: this.props.cartItems })
            console.log("rema", this.state, this.props.setCartData)
        } else {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            this.setState({ cartData })
        }
    }

    tempReload = () => {
        setInterval(() => {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            this.setState({ cartData })
        }, 1000);
    }

    render() {

        let { cartData } = this.state
        console.log("zlatan dropdown render", this.state)
        return (
            <>
                <div className="dropdown cart-dropdown" style={{
                    background: 'transparent', border: 'none', position: 'relative',
                    width: 'fit-content'
                }}>
                    <Link to="/users/cart" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                        <span className="cart-count">{cartData ? cartData.length : 0}</span>
                    </Link>

                    <div className="dropdown-menu">
                        <div className="dropdownmenu-wrapper">
                            <div className="dropdown-cart-products">

                                {/* CART ITEMS START */}

                                {
                                    cartData ? (
                                        cartData.map(_data => {
                                            console.log(_data)
                                            let { id, name, sellingPrice, mainImageUrl } = _data
                                            return (
                                                <div className="product" key={id}>
                                                    <div className="product-details">
                                                        <h4 className="product-title">
                                                            <Link to="product.html">{name}</Link>
                                                        </h4>

                                                        <span className="cart-product-info">
                                                            {/* <span className="cart-product-qty">1</span>
                                                            x &#8358;  */}
                                                            {sellingPrice}
                                                        </span>
                                                    </div>
                                                    <figure className="product-image-container">
                                                        <Link to="product.html" className="product-image drp-product-image ">
                                                            <img src={mainImageUrl} alt="product" style={{ height: "12vh" }} />
                                                        </Link>
                                                        <span className="btn-remove" title="Remove Product"><i className="icon-cancel" id={id} onClick={this.removeFromCart}></i></span>
                                                    </figure>
                                                </div>
                                            )
                                        })
                                    ) : (
                                            <h5 className="text-dark">No data yet</h5>
                                        )
                                }



                                {/* CART ITEMS END */}

                            </div>

                            <div className="dropdown-cart-total">
                                <span>Total</span>

                                <span className="cart-total-price">&#8358;
                                {
                                        // data ? data.reduce((a, b) => {
                                        //     return a + b.finalPrice
                                        // }, 0) : 0
                                        this.calSum()
                                    }
                                </span>
                            </div>

                            <div className="dropdown-cart-action">
                                <Link to="/shop" className="btn">View Cart</Link>
                                <Link to="/shop" className="btn">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log("firexat", state)
    const { cartItems } = state.inventory;
    return {
        cartItems
    }
}

export default connect(mapStateToProps, actions)(CartDropdown);
