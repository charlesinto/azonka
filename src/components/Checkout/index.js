import React, {Component} from 'react';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import Drawer from '@material-ui/core/Drawer';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import PaystackButton from 'react-paystack';
import Validator from 'validator';
import { PAY_STACK_PUBLIC_KEY } from '../../config/config';

class Checkout extends Component{
    state = {sum: 0, modal: false,firstName:'', lastName: '',userAddress: '',
    address:[],state: '', country: '',payType: '',paystack: false,
     emailAddress:'', auth: false}
    componentDidMount(){
        let token = (localStorage.getItem("x-access-token"));

        if(this.props.amount <= 0){
            return this.props.history.push('/users/cart')
        }
        if(!token){
            this.setState({modal: true, auth: false})
        }else{
            const {firstName, lastName, emailAddress} = JSON.parse(localStorage.getItem('azonta-user'))
            this.setState({auth: true, firstName, lastName, emailAddress})
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
    callback = (response) => {
        console.log(response);
        if(response.status === 'success' && response.message === 'Approved'){
            this.props.initiateRegistration()
            this.props.registerPayment(response.transaction, response.trxref, this.props.amount, this.state.payType)
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

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
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
                                    <article className="default-font article-header">
                                        Hello, Awesome User
                                    </article>
                                    <p className="default-font article-body" >
                                        Thank you for shopping through Azonka, please kindly <strong style={{color:'#000',
                                            textTransform:'capitalize'}}>
                                            login or create account </strong>
                                        to enjoy the full benefits provided for you
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div
                                        style={{display:'flex',margin:"10px 0px",
                                        justifyContent:'flex-end'}}>
                                        
                                        <button onClick={this.toggleDrawer} style={{marginRight: 10}}
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
        const {target:{name, value}} = e;
        if(name === 'paymentType'){
            return this.setState({
                payType: value
            })
        }
        this.setState({
            [name]: value
        })
    }
    renderShippingLocation = () => {
        if(!this.state.auth){
            return (
                <div className="card">
                    <div className="card-header">
                            <div className="container">
                                <div style={{display:'flex', width:'100%',
                                    justifyContent:'space-between'}}>
                                    <div >
                                        <h4  className="default-font">Delivery Address</h4>
                                    </div>
                                    <div style={{textAlign:'right'}} >
                                        {
                                            this.state.auth ? (
                                                <Link to="/users/profile" style={{cursor:'pointer'}} 
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
                                    this.state.address.length > 0 ? (
                                        <ul>
                                            {this.state.address.map((item, i) => (
                                                <li style={{display:'flex', alignItems:'center', marginBottom:16}} key={i}>
                                                    <input style={{display:'block', marginRight:8}} 
                                                    type="radio" id={`f-option${i}`} name="selector" />
                                                    <label htmlFor="f-option">
                                                        <span className="checkout-user-icon">
                                                            <i className="fas fa-home"></i>
                                                        </span>
                                                        <span>
                                                            {item.address1}
                                                        </span>
                                                    </label>
                                                    
                                                    <div className="check"></div>
                                                </li>
                                            ))
                                            }
                                        </ul>
                                    ) : 
                                    (
                                        <form action="#" style={{width:'100%'}} className="mb-1">
                                                <div className="row">
                                                    <div className="col-md-12 col-sm-12">
                                                        <label htmlFor="address">Address 
                                                        <span className="required">*</span></label>
                                                        <input name='userAddress' value={this.state.userAddress} 
                                                            onChange={(e) =>
                                                                 this.handleInputChange(e, 'login')} type="text" 
                                                        className="form-input form-wide mb-2" 
                                                         required="" />
                                                </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                        <label htmlFor="state">State 
                                                            <span className="required">*</span></label>
                                                            <input name='state' value={this.state.state} 
                                                                onChange={(e) =>
                                                                    this.handleInputChange(e, 'login')} type="text" 
                                                            className="form-input form-wide mb-2" 
                                                             required="" />
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                    <label htmlFor="address">Country 
                                                        <span className="country">*</span></label>
                                                        <input name='country' value={this.state.country} 
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
        if(this.state.auth){
            return (
                    <div className="card">
                    <div className="card-header">
                            <div className="container">
                                <div style={{display:'flex', width:'100%',
                                    justifyContent:'space-between'}}>
                                    <div >
                                        <h4  className="default-font">Profile Information</h4>
                                    </div>
                                    <div style={{textAlign:'right'}} >
                                    {
                                            this.state.auth ? (
                                                <Link to="/users/profile" style={{cursor:'pointer'}} 
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
                            <div style={{display:'flex', width:'100%',
                                justifyContent:'space-between'}}>
                                <div >
                                    <h4  className="default-font">Profile Information</h4>
                                </div>
                                <div style={{textAlign:'right'}} >
                                    {
                                            this.state.auth ? (
                                                <Link to="/users/profile" style={{cursor:'pointer'}} 
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
                <div className="col-md-6 col-sm-12" style={{display:'flex', alignItems:'center', marginBottom:16}}>
                <input disabled={!this.state.auth} style={{display:'block', marginRight:8}} 
                    type="radio" value="pay with wallet" name="paymentType" onChange={(e) => this.handleInputChange(e, 'pay')} />
                    <label className="payment-type" htmlFor="paymentType">
                        <span className="checkout-user-icon">
                            <i className="fas fa-wallet"></i>
                        </span>
                        <span>
                            Pay with your Azonka Wallet
                        </span>
                    </label>
                    
                </div>
                <div className="col-md-6 col-sm-12" style={{display:'flex', alignItems:'center', marginBottom:16}}>
                    <input  style={{display:'block', marginRight:8}} value="pay with debit" 
                    type="radio" name="paymentType" onChange={(e) => this.handleInputChange(e, 'pay')} />
                    <label className="payment-type" htmlFor="paymentType">
                        <span className="checkout-user-icon">
                            <i className="far fa-credit-card"></i>
                        </span>
                        <span>
                            Pay with a Debit Card
                        </span>
                    </label>
                </div>
            </>
        )
    }
    payNow = e => {
        e.preventDefault()
        if(!this.state.auth){
            const {firstName, lastName, emailAddress, userAddress, 
            state, country, payType} = this.state;
            if(!Validator.isEmail(emailAddress)){
                return this.props.renderError('Email address is required or invalid')
            }
            else if(Validator.isEmpty(firstName) || Validator.isEmpty(lastName)){
                return this.props.renderError('First Name and Last Name is required')
            }
            else if(Validator.isEmpty(state)){
                return this.props.renderError('Please provide State')
            }
            else if(Validator.isEmpty(userAddress)){
                return this.props.renderError('Please provide delivery address')
            }
            else if(Validator.isEmpty(country)){
                return this.props.renderError('Please provide Country')
            }
            else if(Validator.isEmpty(payType)){
                return this.props.renderError('Please select payment type')
            }

            if(payType === 'pay with debit'){
                //this.props.successAlert('hello')
               return  this.payWithPayStack()
            }
        }else{
            const {firstName, lastName, emailAddress, payType} = this.state;
            if(!Validator.isEmail(emailAddress)){
                return this.props.renderError('Email address is required or invalid')
            }
            else if(Validator.isEmpty(firstName) || Validator.isEmpty(lastName)){
                return this.props.renderError('First Name and Last Name is required')
            }

            if(payType === 'pay with debit'){
                //this.props.successAlert('hello')
               return  this.payWithPayStack()
            }
        }
    }
    payWithPayStack = () => {
        this.setState({paystack: true})
        console.log('called paystack')
    }
    render(){
        return (
            <>
                <Header />

                <main style={{paddingTop:"12rem"}}>
                    <nav style={{margin: '10px 0'}} aria-label="breadcrumb" className="breadcrumb-nav">
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
                            <div className="col-lg-8" style={{margin:'10px 0'}}>
                                <div className="container">
                                    {/* <div className="row">
                                        <h2 className="default-font ">User Information</h2>
                                        
                                    </div>
                                    <div className="row">
                                        <hr style={{width:'100%'}} />
                                    </div> */}
                                    <div className="row">
                                        <div className="col-12">
                                            {this.renderUserData()}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            {this.renderShippingLocation()}
                                        </div>
                                    </div>
                                    <div className="row">
                                            {this.paymentType()}
                                    </div>
                                </div>
                                
                            </div>
                            <div className="col-lg-4">
                                 <div className="cart-summary">
                                    <h3>Summary</h3>

                                    {/* <h4>
                                        <a data-toggle="collapse" href="#total-estimate-section" className="collapsed" role="button" aria-expanded="false" aria-controls="total-estimate-section">Estimate Shipping and Tax</a>
                                    </h4> */}
{/* 
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
                                    </div> */}

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
                                                        amount={30 * 100}
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
    const {home: {amount}} = state;
    console.log('amount', amount)
    return {amount}
}

export default connect(mapStateToProps, actions)(Checkout);