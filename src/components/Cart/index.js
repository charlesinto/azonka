import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CartPrice from "../../common/CartPrice";
import CartItem from "../../common/CartItem";
import CartActions from "../../common/CartActions";
import ProductRow from '../../common/ProductRow';
import Drawer from '@material-ui/core/Drawer';

class Cart extends Component {
    state = {
        data: [], sum: 0, cartData: [], cartLength: 0, quantity: {},
        deletedCartItems: [], changeItems: [], modal: false
    }
    async componentDidMount() {
        this.props.switchActiveLink('Cart')
        await this.loadCart()
        this.calSum()

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
            <div className="container-fluid">
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
            await this.props.fetchCart();
            this.setState({
                cartData: this.props.cartItems.products,
                quantity: this.props.cartItems.quantity
            })
        } else {
            await this.props.fetchLocalCart()
            this.setState({ cartData: this.props.cartData })
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
        //const { cartData} = this.state;
        if (localStorage.getItem('x-access-token')) {
            this.props.initiateRegistration()
            await this.props.removeCartItem(id)
            this.calSum()
            return console.log('vvv', this.props.cartItems.products)
        }
        const cartData = this.state.cartData;
        const index = cartData.findIndex(element => element.id === id)
        const deletedItems = this.state.deletedCartItems;
        if (index !== -1) {
            if (!deletedItems.includes(id)) {
                deletedItems.push(id)
            }
            cartData.splice(index, 1)
        }
        return this.setState({
            cartData: [...cartData],
            deletedCartItems: [...deletedItems]
        }, () => this.calSum())
    }
    handleMoveWishList = async (id) => {
        let localData = JSON.parse(localStorage.getItem("wishList"))
        if (localStorage.getItem('x-access-token')) {
            const filt = this.state.cartData.filter(o => o.id === id)[0]
            if (!localData) {
                localData = [filt]
                localStorage.setItem("wishList", JSON.stringify(localData))
                await this.props.removeCartItem(id)
                this.calSum()
                return this.props.successAlert('Item added successfully')
                
            } else {
                let _id = localData.some(o => o.id === id)
                if (_id) {
                    this.props.successAlert('Item added successfully')
                    await this.props.removeCartItem(id)
                    this.calSum()
                    return this.props.successAlert('Item has already been moved to WishList')
                } else {
                    localData.push(filt)
                    localStorage.setItem("wishList", JSON.stringify(localData))
                    await this.props.removeCartItem(id)
                    this.calSum()
                    return  this.props.successAlert('Item added successfully')
                     
                }
            }
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
        return (
            <div >
                {/* <Header /> */}
                <div className="router-container">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="cart-table-container">
                                    <div className="col-lg-12 mx-auto  my-5">
                                        <div className="cart-table-container container-fluid">
                                            <div className="row item-header">
                                                <div className="header-item-name col-md-6 ">
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
                                            </div>

                                            {/* TABLE DETAILS START */}

                                            {
                                                this.state.cartData && this.state.cartData.length > 0 ? this.state.cartData.map(data => {
                                                    return (
                                                        <ProductRow
                                                            calSums={(sum, productId, qty) =>
                                                                this.calSums(sum, productId, qty)}
                                                            calSum={this.calSum}
                                                            quantity={this.state.quantity[data.id]}
                                                            handleItemDelete={this.handleItemDelete}
                                                            handleMoveWishList={this.handleMoveWishList}
                                                            {...data}

                                                        />
                                                    )
                                                }) : (
                                                        <div className="row">
                                                            
                                                    </div>
                                                    )
                                            }

                                            {/* TABLE DETAILS END */}

                                        </div>

                                        {/* <div className="cart-discount">
                                            <h4>Apply Discount Code</h4>
                                            <form action="#">
                                                <div className="input-group">
                                                    <input type="text" className="form-control form-control-sm" placeholder="Enter discount code" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-sm btn-primary" type="submit">Apply Discount</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div> */}
                                    </div>
                                </div>
                            </div>


                            <div className="col-lg-4">
                                <div className="cart-summary">
                                    <h3>Summary</h3>
                                    <h4>
                                        <a data-toggle="collapse" href="#total-estimate-section" className="collapsed" role="button" aria-expanded="false" aria-controls="total-estimate-section">Estimate Shipping and Tax</a>
                                    </h4>
                                    <div className="collapse" id="total-estimate-section">
                                        <form action="#">
                                            <div className="form-group form-group-sm">
                                                <label>Country</label>
                                                <div className="select-custom">
                                                    <select className="form-control form-control-sm">
                                                        <option value="USA">United States</option>
                                                        <option value="Turkey">Turkey</option>
                                                        <option value="China">China</option>
                                                        <option value="Germany">Germany</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group form-group-sm">
                                                <label>State/Province</label>
                                                <div className="select-custom">
                                                    <select className="form-control form-control-sm">
                                                        <option value="CA">California</option>
                                                        <option value="TX">Texas</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="form-group form-group-sm">
                                                <label>Zip/Postal Code</label>
                                                <input type="text" className="form-control form-control-sm" />
                                            </div>

                                            <div className="form-group form-group-custom-control">
                                                <label>Flat Way</label>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="flat-rate" />
                                                    <label className="custom-control-label" htmlFor="flat-rate">Fixed $5.00</label>
                                                </div>
                                            </div>

                                            <div className="form-group form-group-custom-control">
                                                <label>Best Rate</label>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="best-rate" />
                                                    <label className="custom-control-label" htmlFor="best-rate">Table Rate $15.00</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <table className="table table-totals">
                                        <tbody>
                                            <tr>
                                                <td>Subtotal</td>
                                                <td>&#8358; {this.numberWithCommas(this.state.sum)}</td>
                                            </tr>

                                            <tr>
                                                <td>Tax</td>
                                                <td>&#8358; 0.00</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td>Order Total</td>
                                                <td>&#8358;  {this.numberWithCommas(this.state.sum)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div className="checkout-methods">
                                        <span onClick={this.payNowClickHandler}
                                            className="btn btn-lg w-100 btn-primary">Pay Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6"></div>
                </div>
                {
                    this.renderModal()
                }
            </div>
        )
    }
}

const mapStateToProps = state => {

    let { categories, cartItems, cartData } = state.inventory
    console.log('cartData', cartData)
    return {
        categories, cartItems, cartData
    }
}



export default connect(mapStateToProps, actions)(Cart)