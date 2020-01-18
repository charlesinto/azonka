import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CartPrice from "../../common/CartPrice";
import CartItem from "../../common/CartItem";
import CartActions from "../../common/CartActions";
import ProductRow from '../../common/ProductRow';
import ProductRowActions from '../../common/ProductRowActions';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

class Cart extends Component {
    state = { data: [], sum: 0, cartData: [], cartLength: 0 }
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
        console.log("new props", props)
        if (props.cartData !== this.props.cartData) {
            this.setState({ cartData: props && props.cartData, cartLength: props.cartData ? props.cartData.length : 0 });
        }
    }
    calSum = () => {
        const { cartData } = this.state;
        let amountOrdered = cartData ? cartData.reduce((a, b) => {
            return a + b.finalPrice
        }, 0) : 0
        this.setState({ sum: amountOrdered })
        return amountOrdered
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
            await this.props.fetchCart();
            // console.log("aza", this.props)
            let { products, quantity } = this.props.cartItems;
            this.setState({ cartData: this.props.cartItems.products })
            // console.log("aza", this.state.cartData)
        } else {
            console.log()
            await this.props.fetchLocalCart()
            console.log("load drp", this.props.cartData)
            this.setState({ cartData: this.props.cartData })
        }

    }

    calSums = (sum, productId) => {
        const { cartData } = this.state;
        cartData.forEach(element => {
            
            if(element.id === productId){
                element.amountOrdered = sum;
            }else{
                element.amountOrdered = element.finalPrice;
            }
        })
        let amountOrdered = cartData ? cartData.reduce((a, b) => {
            return a + b.amountOrdered
        }, 0) : 0
        this.setState({ sum: amountOrdered })
    }

    handleItemDelete = id => {
        const { cartData} = this.state;
        const index = cartData.findIndex(element => element.id === id)
        if(index !== -1){
            cartData.splice(index, 1)
        }
        return this.setState({
            cartData: [...cartData]
        })
    }
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
            <div >
                {/* <Header /> */}
                <div className="router-container">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="cart-table-container">
                                    <table className="table table-cart">
                                        <thead>
                                            <tr>
                                                <th className="product-col">Product</th>
                                                <th className="price-col">Price</th>
                                                <th className="qty-col">Qty</th>
                                                <th>Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.cartData ? this.state.cartData.map(data => {
                                                    return (
                                                        <ProductRow 
                                                            calSums={(sum, productId) =>
                                                                 this.calSums(sum, productId)} 
                                                            calSum={this.calSum} 
                                                            handleItemDelete={this.handleItemDelete}
                                                            {...data}
                                                            
                                                            />
                                                    )
                                                }) : (<div>No data available</div>)
                                            }
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td colSpan="4" className="clearfix">
                                                    <div className="float-left">
                                                        <Link to="/" className="btn btn-outline-secondary">Continue Shopping</Link>
                                                    </div>

                                                    <div className="float-right">
                                                        <a href="#" className="btn btn-outline-secondary btn-clear-cart">Clear Shopping Cart</a>
                                                        <a href="#" className="btn btn-outline-secondary btn-update-cart">Update Shopping Cart</a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
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
                                        <Link to="/users/checkout" className="btn btn-block btn-sm btn-primary">Go to Checkout</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6"></div>
                </div>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => {

    let { categories, cartItems, cartData } = state.inventory
    return {
        categories, cartItems, cartData
    }
}



export default connect(mapStateToProps, actions)(Cart)