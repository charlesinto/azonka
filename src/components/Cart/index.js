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
    componentDidMount() {
        this.props.switchActiveLink('Cart')
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

    render() {
        return (
            <div>
                <Header />
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

                                            <ProductRow />
                                            <ProductRowActions />
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td colspan="4" className="clearfix">
                                                    <div className="float-left">
                                                        <a href="category.html" className="btn btn-outline-secondary">Continue Shopping</a>
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
                                                    <label className="custom-control-label" for="flat-rate">Fixed $5.00</label>
                                                </div>
                                            </div>

                                            <div className="form-group form-group-custom-control">
                                                <label>Best Rate</label>
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="best-rate" />
                                                    <label className="custom-control-label" for="best-rate">Table Rate $15.00</label>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <table className="table table-totals">
                                        <tbody>
                                            <tr>
                                                <td>Subtotal</td>
                                                <td>$17.90</td>
                                            </tr>

                                            <tr>
                                                <td>Tax</td>
                                                <td>$0.00</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td>Order Total</td>
                                                <td>$17.90</td>
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



export default connect(null, actions)(Cart)