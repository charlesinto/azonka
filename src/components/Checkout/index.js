import React, { Component } from 'react';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import Drawer from '@material-ui/core/Drawer';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import PaystackButton from 'react-paystack';
import Validator from 'validator';
import { PAY_STACK_PUBLIC_KEY } from '../../config/config';

class Checkout extends Component {
    INITIAL_STATE = {
        sum: 0, modal: false, firstName: '', lastName: '', userAddress: '',
        address: [], state: '', country: '', payType: 'pay with debit', paystack: false,
        emailAddress: '', auth: false, transactionNumber: '', addressId: ''
    }
    constructor(props){
        super(props)
        this.state = {...this.INITIAL_STATE}
    }
    componentDidMount() {
        let token = (localStorage.getItem("x-access-token"));

        if (!token) {
            return this.props.history.push('/users/cart')
        } else {
            if (this.props.amount > 0) {
                this.props.initiateRegistration()
                this.loadCart()
                const { firstName, lastName, emailAddress } = JSON.parse(localStorage.getItem('azonta-user'))
                return this.setState({ auth: true, firstName, lastName, emailAddress })
            } else {
                return this.props.history.push('/users/cart')
            }
        }
        
    }
    
    loadCart = async () => {

        // setInterval(async () => {
        let token = localStorage.getItem("x-access-token");
        if (token) {
            await this.props.fetchCheckoutCart();
            console.log("aza o", this.props.cartItems)
            let { products, quantity } = this.props.cartItems;
            this.setState({
                cartData: this.props.cartItems.products,
                quantity: this.props.cartItems.quantity
            }, () => {
                console.log(this.state)
                this.calculateSum()
            })
            // console.log("aza", this.state.cartData)
        } else {
            await this.props.fetchLocalCart()
            console.log("load drp", this.props.cartData)
            this.setState({ cartData: this.props.cartData })
        }

    }

    calculateSum = () => {
        const { cartData } = this.state;
        let amountOrdered = cartData ? cartData.reduce((a, b) => {
            return a + (b.finalPrice * (this.state.quantity[b.id] || 1))
        }, 0) : 0

        this.setState({ sum: amountOrdered }, () => this.props.stopHomeLoading())
    }
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    toggleDrawer = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    callback = (response) => {
        console.log(response);
        if (response.status === 'success' && response.message === 'Approved') {
            this.props.initiateRegistration()
            this.props.registerPayment(response.transaction, response.trxref,
                this.props.amount, this.state.payType, this.state.cartData,
                this.state.addressId, this.state.userAddress)
        } // card charged successfully, get reference here
        //this.props.initiateRegistration()
    }
    close = () => {
        console.log("Payment closed");
    }
    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for (let i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
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
    handleInputChange = (e, form) => {
        e.preventDefault()
        const { target: { name, value } } = e;
        if (name === 'paymentType' || name === 'paymentTypet') {
            return this.setState({
                payType: value
            }, () => console.log(this.state))
        }
        this.setState({
            [name]: value
        })
    }
    handleAddressSelect = (id) => {
        this.setState({
            addressId: id
        })
    }
    renderShippingLocation = () => {
        if (this.state.auth) {
            return (
                <div className="card">
                    <div className="card-header">
                        <div className="container">
                            <div style={{
                                display: 'flex', width: '100%',
                                justifyContent: 'space-between'
                            }}>
                                <div >
                                    <h4 className="default-font">Delivery Address</h4>
                                </div>
                                <div style={{ textAlign: 'right' }} >
                                    {
                                        this.state.auth ? (
                                            <Link to="/users/profile" style={{ cursor: 'pointer' }}
                                                title="Edit Profile" className="btn-edit">
                                                EDIT <i className="icon-pencil"></i></Link>
                                        )
                                            : null
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className="row">

                                {
                                    this.props.address.length > 0 ? (
                                        <ul style={{ width: '100%' }}>
                                            {this.props.address.map((item, i) => (
                                                <li style={{
                                                    display: 'flex', width: "100%",
                                                    alignItems: 'center', marginBottom: 16
                                                }} key={i}>
                                                    <input type="checkbox" value={`${item.id}`}
                                                        name={`${item.id}`} onChange={(e) => this.handleInputChange(e, 'address')}
                                                        checked={parseInt(this.state.addressId) === item.id} />
                                                    <label style={{ display: 'flex' }} value={`${item.id}`} name={`${item.id}`} className="label-check"
                                                        onClick={(e) => this.handleAddressSelect(item.id)}>
                                                        <span className="checkbox primary primary"><span></span></span>
                                                        <h3 className="address-htag" style={{
                                                            padding: '0 8px',
                                                            fontFamily: "open sans, sans-serif", fontSize: '2.1rem'
                                                        }}>
                                                            <span style={{ marginLeft: 8, textTransform: 'capitalize' }}>
                                                                {item.address1},
                                                            </span>
                                                            <span style={{ marginLeft: 8, textTransform: 'capitalize' }}>
                                                                {item.state},
                                                            </span>
                                                            <span style={{ marginLeft: 8, textTransform: 'capitalize' }}>
                                                                {item.country}
                                                            </span>
                                                        </h3>

                                                    </label>
                                                </li>
                                            ))
                                            }
                                            
                                            <li style={{
                                                display: 'flex', width: "100%",
                                                alignItems: 'center', marginBottom: 16
                                            }}>
                                                <form action="#" style={{ width: '100%' }} className="mb-1">
                                                    <div className="row">
                                                        <div className="col-md-12 col-sm-12">
                                                            <label htmlFor="address">Address
                                                                <span className="required">*</span></label>
                                                            <input name='userAddress' placeholder="Enter delivery address" value={this.state.userAddress}
                                                                onChange={(e) =>
                                                                    this.handleInputChange(e, 'login')} type="text"
                                                                className="form-input form-wide mb-2"
                                                                required="" />
                                                        </div>
                                                    </div>
                                                </form>
                                            </li>
                                        </ul>
                                    ) :
                                        (
                                            <form action="#" style={{ width: '100%' }} className="mb-1">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <label htmlFor="address">Address
                                                        <span className="required">*</span></label>
                                                        <input name='userAddress' placeholder="Enter delivery address" value={this.state.userAddress}
                                                            onChange={(e) =>
                                                                this.handleInputChange(e, 'login')} type="text"
                                                            className="form-input form-wide mb-2"
                                                            required="" />
                                                    </div>
                                                </div>
                                            </form>
                                        )

                                }

                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }
    renderUserData = () => {
        if (this.state.auth) {
            return (
                <div className="card">
                    <div className="card-header">
                        <div className="container">
                            <div style={{
                                display: 'flex', width: '100%',
                                justifyContent: 'space-between'
                            }}>
                                <div >
                                    <h4 className="default-font">Profile Information</h4>
                                </div>
                                <div style={{ textAlign: 'right' }} >
                                    {
                                        this.state.auth ? (
                                            <Link to="/users/profile" style={{ cursor: 'pointer' }}
                                                title="Edit Profile" className="btn-edit">
                                                EDIT <i className="icon-pencil"></i></Link>
                                        )
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <span className="checkout-user-icon">
                                        <i className="far fa-user"></i>
                                    </span>
                                    <span className="checkout-user">
                                        {`${this.state.firstName} ${this.state.lastName}`}
                                    </span>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <span className="checkout-user-icon">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                    <span className="checkout-sub-title">
                                        {this.state.emailAddress}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className="card">
                <div className="card-header">
                    <div className="container">
                        <div style={{
                            display: 'flex', width: '100%',
                            justifyContent: 'space-between'
                        }}>
                            <div >
                                <h4 className="default-font">Profile Information</h4>
                            </div>
                            <div style={{ textAlign: 'right' }} >
                                {
                                    this.state.auth ? (
                                        <Link to="/users/profile" style={{ cursor: 'pointer' }}
                                            title="Edit Profile" className="btn-edit">
                                            EDIT <i className="icon-pencil"></i></Link>
                                    )
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="container">
                        <form action="#" className="mb-1">
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="firstName">First Name <span className="required">*</span></label>
                                    <input name='firstName' value={this.state.firstName}
                                        onChange={(e) => this.handleInputChange(e, 'login')} type="text"
                                        className="form-input form-wide mb-2" id="login-email" required="" />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                                    <input name='lastName' value={this.state.lastName}
                                        onChange={(e) => this.handleInputChange(e, 'login')} type="text"
                                        className="form-input form-wide mb-2" id="login-email" required="" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 col-sm-12">
                                    <label htmlFor="emailAddress">Email Address <span className="required">*</span></label>
                                    <input name='emailAddress' value={this.state.emailAddress}
                                        onChange={(e) => this.handleInputChange(e, 'login')} type="text"
                                        className="form-input form-wide mb-2" id="login-email" required="" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    paymentType = () => {
        return (
            <>
                <div className="col-md-6 col-sm-12" style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>

                    <input disabled={!this.state.auth} style={{ marginRight: 8 }}
                        type="checkbox" id="paymentType2" value="pay with wallet"
                        name="paymentTypet"
                        checked={this.state.payType === 'pay with wallet' ? true : false} />
                    <label value="pay with wallet" name="paymentTypet" className="label-check" htmlFor='paymentTypet'
                        onClick={(e) => this.handleCheckBoxClick('pay with wallet')}>
                        <span className="checkbox primary primary"><span></span></span>
                        <span className="checkout-user-icon">
                            <i className="fas fa-wallet"></i>
                        </span>
                        Pay with your Azonka Wallet
                    </label>

                </div>
                <div className="col-md-6 col-sm-12" style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>

                    <input type="checkbox" id="paymentType" value="pay with debit"
                        name="paymentType" onChange={(e) => this.handleInputChange(e, 'paymentType')}
                        checked={this.state.payType === 'pay with debit'} />
                    <label value="pay with debit" name="paymentType" className="label-check" htmlFor='paymentType'
                        onClick={(e) => this.handleCheckBoxClick('pay with debit')}>
                        <span className="checkbox primary primary"><span></span></span>
                        <span className="checkout-user-icon">
                            <i className="far fa-credit-card"></i>
                        </span>
                        Pay with a Debit Card
                    </label>
                </div>
            </>
        )
    }
    handleCheckBoxClick = paymentType => {
        this.setState({ payType: paymentType })
    }
    payNow = e => {
        e.preventDefault()
        if (!this.state.auth) {
            const { firstName, lastName, emailAddress, userAddress,
                state, country, payType } = this.state;
            if (!this.state.auth) {
                return this.setState({
                    modal: true
                })
            }
            if (!Validator.isEmail(emailAddress)) {
                return this.props.renderError('Email address is required or invalid')
            }
            else if (Validator.isEmpty(firstName) || Validator.isEmpty(lastName)) {
                return this.props.renderError('First Name and Last Name is required')
            }
            else if (Validator.isEmpty(state)) {
                return this.props.renderError('Please provide State')
            }
            else if (Validator.isEmpty(userAddress)) {
                return this.props.renderError('Please provide delivery address')
            }
            else if (Validator.isEmpty(country)) {
                return this.props.renderError('Please provide Country')
            }
            else if (Validator.isEmpty(payType)) {
                return this.props.renderError('Please select payment type')
            }


            // if(payType === 'pay with debit'){
            //     //this.props.successAlert('hello')
            //    return  this.payWithPayStack()
            // }
        } else {
            const { userAddress, addressId, payType } = this.state;
            if (Validator.isEmpty(`${addressId}`) && Validator.isEmpty(userAddress)) {
                return this.props.renderError('Please provide a delivery location')
            }
            else if (Validator.isEmpty(this.state.payType)) {
                return this.props.renderError('Please choose a payment type')
            }
            if (payType === 'pay with debit') {
                //this.props.successAlert('hello')
                return this.payWithPayStack()
            } else {
                if (parseInt(this.props.amount) > parseInt(this.props.balance / 100)) {
                    return this.props.renderError('Insufficient funds, please fund your wallet')
                }
                this.props.initiateRegistration()
                this.props.registerPayment('', '',
                    this.props.amount * 100, this.state.payType, this.state.cartData,
                    this.state.addressId, this.state.userAddress)
            }
        }
    }
    payWithPayStack = () => {
        this.setState({ paystack: true })
        console.log('called paystack')
    }
    getTransactionNumber = () => {
        const txnRef = this.getReference()
        this.setState({ transactionNumber: txnRef })
        return txnRef;
    }
    componentWillUnmount() {
        this.setState({...this.INITIAL_STATE})
    }
    render() {
        return (
            <>
                <Header />

                <main style={{ paddingTop: "12rem" }}>
                    <nav style={{ margin: '10px 0' }} aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                                <li className="breadcrumb-item active" ><Link to="/users/cart">
                                    Shopping Cart</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Checkout</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8" style={{ margin: '10px 0' }}>
                                <div className="container">
                                    {/* <div className="row">
                                        <h2 className="default-font ">User Information</h2>
                                        
                                    </div>
                                    <div className="row">
                                        <hr style={{width:'100%'}} />
                                    </div> */}
                                    <div className="row">
                                        <div className="col-12">

                                            {
                                                this.state.auth ?
                                                    this.renderUserData() : null}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            {this.state.auth ? this.renderShippingLocation() : null}
                                        </div>
                                    </div>
                                    <div className="row">
                                        {this.state.auth ? this.paymentType() : null}
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-4">
                                <div className="cart-summary">
                                    <h3>Summary</h3>


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
                                        {
                                            this.state.paystack ? (
                                                <div>
                                                    <p>
                                                        <PaystackButton
                                                            text="Make Payment"
                                                            className="btn btn-block btn-sm btn-primary"
                                                            callback={this.callback}
                                                            close={this.close}
                                                            disabled={!this.state.paystack}
                                                            embed={false}
                                                            reference={this.getReference()}
                                                            email={this.state.emailAddress}
                                                            amount={this.state.sum * 100}
                                                            paystackkey={PAY_STACK_PUBLIC_KEY}
                                                            tag="button"
                                                        />
                                                    </p>
                                                </div>
                                            ) : null
                                        }

                                        {
                                            this.state.paystack ? null :
                                                (
                                                    <span onClick={this.payNow}
                                                        className="btn btn-block btn-sm btn-primary">Make Payment</span>
                                                )
                                        }

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
    const { home: { amount }, bank: { balance },
        inventory: { categories, cartItems, cartData, address } } = state;

    return {
        amount,
        categories, cartItems, cartData, address,
        balance
    }
}

export default connect(mapStateToProps, actions)(Checkout);