





import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CartPrice from "../../common/CartPrice";
import CartItem from "../../common/CartItem";
import CartActions from "../../common/CartActions";
import Drawer from '@material-ui/core/Drawer';
import OrderProductRow from '../../common/OrderProductRow';
import Footer from '../HeaderFooter/Footer';
import WishListRow from './WishListRow';

import nodataImg from '../../assets/nodatafound.png'

class WishList extends Component {
    state = {
        data: [], sum: 0, cartData: [], cartLength: 0, quantity: {}, wishData: [],
        deletedCartItems: [], changeItems: [], modal: false
    }
    async componentDidMount() {
        this.props.switchActiveLink('My Orders')
        await this.loadCart()
        this.calSum()
        let wishData = await JSON.parse(localStorage.getItem("wishList"))
        console.log("wizzy", wishData)
        this.loadWishList()
    }
    loadWishList = async () => {
        let wishData = await JSON.parse(localStorage.getItem("wishList"))
        this.setState({ wishData })
    }
    handleItemDelete = async id => {
        let localData = await JSON.parse(localStorage.getItem('wishList'))
        let filt = localData.filter(o => +o.id !== +id)
        console.log(id, localData, filt)
        localStorage.setItem("wishList", JSON.stringify(filt))
        this.loadWishList()
    }

    renderAuthDashboard = () => (
        <div className="router-container">
            <div className="row">

                <div className="col-sm-pull-12 col-md-12 col-sm-12">
                    <div className="cart">
                        <div className="cart-header">
                            <div className="cart-header-product">
                                <p className="text-header small">Product Details</p>
                            </div>
                            <div className="cart-header-category">
                                <p className="text-header small">Category</p>
                            </div>
                            <div className="cart-header-price">
                                <p className="text-header small">Price</p>
                            </div>
                            <div className="cart-header-actions">
                                <p className="text-header small">Remove</p>
                            </div>
                        </div>
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartPrice />
                        <CartActions />
                    </div>
                </div>
            </div>
        </div>
    )
    noAuthDashboard = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-push-12 col-md-4 col-sm-12">
                        <div className="sidebar-item">
                            <h4>Redeem Code</h4>
                            <hr className="line-separator" />
                            <form id="coupon-code-form">
                                <input type="text" name="coupon_code" placeholder="Enter your coupon code..." />
                                <button className="button mid secondary">Apply Coupon Code</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-pull-12 col-md-8">
                        <div className="cart">
                            <div className="cart-header">
                                <div className="cart-header-product">
                                    <p className="text-header small">Product Details</p>
                                </div>
                                <div className="cart-header-category">
                                    <p className="text-header small">Category</p>
                                </div>
                                <div className="cart-header-price">
                                    <p className="text-header small">Price</p>
                                </div>
                                <div className="cart-header-actions">
                                    <p className="text-header small">Remove</p>
                                </div>
                            </div>
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartPrice />
                            <CartActions />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentWillReceiveProps = props => {
        if (props.cartData !== this.props.cartData) {
            this.setState({
                cartData: props && props.cartData,
                cartLength: props.cartData ? props.cartData.length : 0
            });
        }
        else if (props.cartItems !== this.props.cartItems) {
            console.log('cart Items', props.cartItems)
            this.setState({
                quantity: props.cartItems.quantity,
                cartData: props.cartItems.products
            }, () => this.calSum())
        }
    }
    componentWillUnmount() {

        if (this.state.changeItems.length > 0) {
            this.props.initiateRegistration()
            this.props.updateCartItems(this.state.cartData, this.state.quantity, this.state.changeItems)
        }

    }
    calSum = () => {
        console.log('/>?', this.state.quantity)
        const { cartData } = this.state;
        let amountOrdered = cartData ? cartData.reduce((a, b) => {
            return a + (b.finalPrice * (this.state.quantity[b.id] || 1))
        }, 0) : 0
        this.setState({ sum: amountOrdered })
        return amountOrdered
    }
    removeFromCart = async (e) => {
        let { cartData } = this.state;
        let id = e.target.id;
        let newItems = cartData.filter(data => data.id !== id);
        localStorage.setItem("cart", JSON.stringify(newItems));
        let newCartData = JSON.parse(localStorage.getItem("cart"))
        return this.setState({ cartData: newCartData })
    }

    loadCart = async () => {

        // setInterval(async () => {
        let token = localStorage.getItem("x-access-token");
        if (token) {
            await this.props.fetchOrders();
            console.log("aza o", this.props.cartItems)
            this.setState({
                cartData: this.props.cartItems.products,
                quantity: this.props.cartItems.quantity
            })
            // console.log("aza", this.state.cartData)
        }

    }

    calSums = (sum, productId, qty) => {
        console.log(qty, sum)
        const { changeItems } = this.state;
        this.setState({
            quantity:
                { ...this.state.quantity, [productId]: qty }
        }, () => {
            const { cartData } = this.state;
            cartData.forEach(element => {

                if (element.id === productId) {
                    element.amountOrdered = sum;
                } else {
                    element.amountOrdered = element.finalPrice * this.state.quantity[element.id];
                }
            })
            let amountOrdered = cartData ? cartData.reduce((a, b) => {
                return a + b.amountOrdered
            }, 0) : 0
            if (!changeItems.includes(productId)) {
                changeItems.push(productId)
            }
            this.props.setCartDropDownTotalPrice(this.state.quantity)
            this.setState({ sum: amountOrdered, changeItems: [...changeItems] })
        })

    }

    handleItemDelete = async (id) => {
        let { wishData } = this.state;
        if (localStorage.getItem('x-access-token')) {
            const filt = wishData.filter(o => o.id !== id)
            await localStorage.setItem("wishList", JSON.stringify(filt))
            await this.loadWishList()
            console.log("test", wishData, id, filt)
        }

    }

    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    toggleDrawer = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    payNowClickHandler = e => {
        e.preventDefault()
        if (localStorage.getItem('x-access-token')) {
            this.props.setAmount(this.state.sum)
            if (this.state.cartData.length > 0) {
                return this.props.history.push("/users/checkout")
            } else {
                return this.props.renderError('Please add 1 or more items to cart')
            }

        }
        return this.setState({ modal: true })
    }
    renderModal = () => {
        if (this.state.modal) {
            return (

                <Drawer anchor="bottom" open={this.state.modal} onClose={() => this.toggleDrawer()}>
                    <div
                        role="presentation"
                        anchor="bottom"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                        className="modal-bottom-padding"
                    >
                        <main className="container">
                            <div className="row">
                                <div className="col-12">
                                    <article className="default-font article-header">
                                        Hello, Awesome User
                                    </article>
                                    <p className="default-font article-body" >
                                        Thank you for shopping through Azonka, please kindly <strong style={{
                                            color: '#000',
                                            textTransform: 'capitalize'
                                        }}>
                                            login or create account </strong>
                                        to make purchases and enjoy the full benefits provided for you
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div
                                        style={{
                                            display: 'flex', margin: "10px 0px",
                                            justifyContent: 'flex-end'
                                        }}>

                                        <button onClick={this.toggleDrawer} style={{ marginRight: 10 }}
                                            className="btn btn-sm btn-outline-dark">
                                            Thanks, Later
                                        </button>
                                        <Link to="/users/login" className="btn btn-sm btn-success" >
                                            Login</Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </Drawer>
            )
        }
    }

    render() {
        let { wishData } = this.state
        return (
            <div >
                {/* <Header /> */}
                <div className="router-container">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                                <li className="breadcrumb-item" aria-current="page"><Link to="/users/profile">Dashboard</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">My WISHLIST</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="container" style={{ background: "#cac2c233" }}>
                        <div className="row">
                            <div className="col-lg-10 mx-auto  my-5">
                                <div className="cart-table-container container">
                                    <div className="row item-header">
                                        <div className="header-item-name col-md-4 ">
                                            ITEM
                                            </div>
                                        <div className="header-item-price col-md-2  text-center">
                                            UNIT PRICE
                                            </div>
                                        <div className="header-item-quantity col-md-2  text-center">
                                            QUANTITY
                                            </div>

                                        <div className="header-item-subtotal col-md-2  text-center">
                                            SUBTOTAL
                                            </div>
                                        <div className="header-item-subtotal col-md-2  text-center">
                                            ACTION
                                            </div>
                                    </div>

                                    {/* TABLE DETAILS START */}

                                    {
                                        wishData && wishData.length > 0 ? wishData.map(data => {
                                            return (
                                                <WishListRow
                                                    // calSums={(sum, productId, qty) =>
                                                    //     this.calSums(sum, productId, qty)}
                                                    // calSum={this.calSum}
                                                    // // quantity={this.state.quantity[data.id]}
                                                    handleItemDelete={this.handleItemDelete}
                                                    // handleMoveWishList={this.handleMoveWishList}
                                                    data={data}

                                                />
                                            )
                                        }) : (
                                                <div className="row d-flex justify-content-center my-5">
                                                    <img src={nodataImg} alt="Empty state" className="img-empty-state" />
                                                </div>
                                            )
                                    }

                                    {/* TABLE DETAILS END */}

                                </div>

                                <div className="cart-discount">
                                    <h4>Apply Discount Code</h4>
                                    <form action="#">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-sm" placeholder="Enter discount code" />
                                            <div className="input-group-append">
                                                <button className="btn btn-sm btn-primary" type="submit">Apply Discount</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="mb-6"></div>
                </div>
                {
                    this.renderModal()
                }
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {

    let { categories, cartItems, cartData, orders } = state.inventory
    console.log('cartData', cartData, orders)
    return {
        categories, cartItems, cartData, orders
    }
}



export default connect(mapStateToProps, actions)(WishList)





















// import React, { Component } from 'react';
// import UserLayout from "../HOC/UserLayout";
// import { connect } from "react-redux";
// import * as actions from "../../actions";

// // class WishList extends Component {
// //     componentDidMount(){
// //         this.props.switchActiveLink('wishlist')
// //     }
// //     renderAuthDashboard =  () => {
// //         return (<UserLayout>

// //         </UserLayout>)
// //     }
// //     noAuthDashboard = () => {
// //         return (
// //             <div style={{minHeight: '40vh'}}>
// //                 No items found
// //             </div>
// //         )
// //     }
// //     render() {
// //         return localStorage.getItem('azonta-user') ? this.renderAuthDashboard() : this.noAuthDashboard()
// //     }
// // }
// // const mapStateToProps = state => {
// //     return {...state}
// // }
// // export default connect(mapStateToProps, actions)(WishList);