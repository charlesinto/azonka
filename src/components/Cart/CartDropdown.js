
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as actions from "../../actions";

class CartDropdown extends Component {
    state = { data: [], sum: 0, cartData: [], cartLength: 0 }

    componentDidMount() {
        this.loadCart()
    }
    componentWillReceiveProps = props => {
        if (props.cartData !== this.props.cartData) {
            this.setState({ cartData: props && props.cartData, cartLength: props.cartData ? props.cartData.length : 0 });
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
        let id = e.target.id;
        let newItems = cartData.filter(data => data.id != id);
        localStorage.setItem("cart", JSON.stringify(newItems));
        let newCartData = JSON.parse(localStorage.getItem("cart"))
        return this.setState({ cartData: newCartData })
    }

    loadCart = async () => {

        // setInterval(async () => {
        let token = localStorage.getItem("x-access-token");
        if (token) {
           // alert()
            await this.props.fetchCart();
            this.setState({ cartData: this.props.cartItems.products })
        } else {
            await this.props.fetchLocalCart()
            this.setState({ cartData: this.props.cartData })
        }
    }
    formatMoney(amount) {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    render() {

        let { cartData } = this.state;
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
                                            // console.log(_data)
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
                                                            ₦{this.formatMoney(sellingPrice)}
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
                                        this.formatMoney(this.calSum())

                                    }
                                </span>
                            </div>

                            <div className="dropdown-cart-action">
                                <Link to="/users/cart" className="btn">View Cart</Link>
                                <Link to="/users/cart" className="btn">Checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {

    let { categories, cartItems, cartData } = state.inventory;
    return {
        categories, cartItems, cartData
    }
}

export default connect(mapStateToProps, actions)(CartDropdown);
