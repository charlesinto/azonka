import React, {Component} from 'react';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import Drawer from '@material-ui/core/Drawer';
import { connect } from "react-redux";
import * as actions from "../../actions";

class Checkout extends Component{
    state = {sum: 0, modal: false}
    componentDidMount(){
        let token = (localStorage.getItem("x-access-token"));
        if(this.props.amount <= 0){
            return this.props.history.push('/users/cart')
        }
        if(!token){
            this.setState({modal: true})
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
    renderModal = () => {
        if(this.state.modal){
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
                                    <article>
                                        Hello, Awesome User
                                    </article>
                                    <p>
                                        Thank you for shopping through azonka, please kindly register or create account
                                        to enjoy the full benefits provided for you
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="col-md-8 col-sm-6"></div>
                                    <div className="col-md-4 col-sm-6">
                                        <button>Login</button>
                                        <button>Thanks, Later</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </Drawer>
            )
        }
    }
    render(){
        return (
            <>
                <Header />
                <main style={{paddingTop:"12rem"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">

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
                                                <td>&#8358; {this.numberWithCommas(this.props.amount)}</td>
                                            </tr>

                                            <tr>
                                                <td>Tax</td>
                                                <td>&#8358; 0.00</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td>Order Total</td>
                                                <td>&#8358;  {this.numberWithCommas(this.props.amount)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <div className="checkout-methods">
                                        <span className="btn btn-block btn-sm btn-primary">Pay Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {
                    this.renderModal()
                }
                <Footer />
            </>
        )
    }
}

const mapStateToProps = state => {
    const {home: {amount}} = state;
    console.log('amount', amount)
    return {amount}
}

export default connect(mapStateToProps, actions)(Checkout);