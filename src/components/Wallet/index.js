import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Dashboard from "../HOC/Dashboard";
import { PAY_STACK_PUBLIC_KEY } from "../../config/config";
import PaystackButton from "react-paystack";
import WalletDataTable  from "../../common/WalletDataTable";

class Wallet extends Component {
    state = {emailAddress: '', amount: 0}
    componentDidMount(){
        document.querySelector('.pay-1').addEventListener('click', () => {
            this.setState({amount: 1000})
        })
        document.querySelector('.pay-2').addEventListener('click', () => {
            this.setState({amount: 5000})
        })
        document.querySelector('.pay-3').addEventListener('click', () => {
            this.setState({amount: 10000})
        })
        document.querySelector('.pay-4').addEventListener('click', () => {
            this.setState({amount: 15000})
        })
        document.querySelector('.pay-5').addEventListener('click', () => {
            this.setState({amount: 20000})
        })
        document.querySelector('.pay-6').addEventListener('click', () => {
            this.setState({amount: 50000})
        })
        document.querySelector('.pay-7').addEventListener('click', () => {
            this.setState({amount: 100000})
        })
        document.querySelector('.pay-8').addEventListener('click', () => {
            this.setState({amount: 1000000})
        })
        this.props.initiateRegistration()
        this.props.setActiveLink('Azonka Wallet')
        const { emailAddress} = JSON.parse(localStorage.getItem('azonta-user'))
         this.setState({emailAddress}, () => {
            this.props.getUserWalletDetals()
         })
         
    }
    componentWillUnmount(){
        document.querySelector('.pay-1').removeEventListener('click',() => {})
        document.querySelector('.pay-2').removeEventListener('click',() => {})
        document.querySelector('.pay-3').removeEventListener('click',() => {})
        document.querySelector('.pay-4').removeEventListener('click',() => {})
        document.querySelector('.pay-5').removeEventListener('click',() => {})
        document.querySelector('.pay-6').removeEventListener('click',() => {})
        document.querySelector('.pay-7').removeEventListener('click',() => {})
        document.querySelector('.pay-8').removeEventListener('click',() => {})
    }
    callback = (response) => {
        console.log(response);
        if(response.status === 'success' && response.message === 'Approved'){
            this.props.initiateRegistration()
            this.props.topUpUserWalllet(response.trxref, this.state.amount )
        } // card charged successfully, get reference here
        //this.props.initiateRegistration()
    }
    close = () => {
        console.log("Payment closed");
    }
    getReference = (amount) => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render(){
        return (
            <Dashboard>
                <div>
                    <div className="container">
                        <div className="row">
                            <div className="current-balance mt-card">
                                <span>Current Balance</span>
                                <span className="text-success">&#8358; {this.numberWithCommas(this.props.balance / 100)}</span>
                            </div>
                        </div>
                    </div>
                    <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif',
                            marginLeft: 20
                        }}>Fund Your Wallet</h4>
                    <hr className="line-separator" />
                </div> 
                <div className="container" style={{margin: '16px 0'}}>
                    <div className="row">
                        <div className="col-sm-12 col-md-3">
                            <div className="pack-box mt-card">
                                <p className="text-header small">Small Pack</p>
                                <p className="price larger"><span>&#8358; </span>1,000</p>
                                <p className="credit">No Bonus Credit</p>
                                <div>
                                    <p>
                                    <PaystackButton
                                        text="Fund Wallet"
                                        className="btn pay-1 wallet-btn btn-block btn-sm btn-primary"
                                        callback={this.callback}
                                        close={this.close}
                                        disabled={false}
                                        embed={false}
                                        reference={this.getReference()}
                                        email={this.state.emailAddress}
                                        amount={1000 * 100}
                                        paystackkey={PAY_STACK_PUBLIC_KEY}
                                        tag="button"
                                    />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pack-box mt-card">
                                <p className="text-header small">Savings Pack</p>
                                <p className="price larger"><span>&#8358; </span>5,000</p>
                                <p className="credit">No Bonus Credit</p>
                                <div>
                                    <p>
                                    <PaystackButton
                                        text="Fund Wallet"
                                        className="btn pay-2 wallet-btn btn-block btn-sm btn-primary"
                                        callback={this.callback}
                                        close={this.close}
                                        disabled={false}
                                        embed={false}
                                        reference={this.getReference()}
                                        email={this.state.emailAddress}
                                        amount={5000 * 100}
                                        paystackkey={PAY_STACK_PUBLIC_KEY}
                                        tag="button"
                                    />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pack-box mt-card">
                                <p className="text-header small">Medium Pack</p>
                                <p className="price larger"><span>&#8358; </span>10,000</p>
                                <p className="credit">No Bonus Credit</p>
                                <div>
                                    <p>
                                    <PaystackButton
                                        text="Fund Wallet"
                                        className="btn pay-3 wallet-btn btn-block btn-sm btn-primary"
                                        callback={this.callback}
                                        close={this.close}
                                        disabled={false}
                                        embed={false}
                                        reference={this.getReference()}
                                        email={this.state.emailAddress}
                                        amount={10000 * 100}
                                        paystackkey={PAY_STACK_PUBLIC_KEY}
                                        tag="button"
                                    />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pack-box mt-card">
                                <span className="pin primary">Popular</span>
                                <p className="text-header small">Jumbo Pack</p>
                                <p className="price larger"><span>&#8358; </span>15,000</p>
                                <p className="credit">No Bonus Credit</p>
                                <div>
                                    <p>
                                    <PaystackButton
                                        text="Fund Wallet"
                                        className="btn pay-4 wallet-btn btn-block btn-sm btn-primary"
                                        callback={this.callback}
                                        close={this.close}
                                        disabled={false}
                                        embed={false}
                                        reference={() => this.getReference(15000)}
                                        email={this.state.emailAddress}
                                        amount={15000 * 100}
                                        paystackkey={PAY_STACK_PUBLIC_KEY}
                                        tag="button"
                                        
                                    />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-3">
                            <div className="pack-box mt-card">
                                <span className="pin primary">Popular</span>
                                <p className="text-header small">Elite Pack</p>
                                <p className="price larger"><span>&#8358; </span>20,000</p>
                                <p className="credit">No Bonus Credit</p>
                                <div>
                                    <p>
                                    <PaystackButton
                                        text="Fund Wallet"
                                        className="btn pay-5 wallet-btn btn-block btn-sm btn-primary"
                                        callback={this.callback}
                                        close={this.close}
                                        disabled={false}
                                        embed={false}
                                        reference={this.getReference()}
                                        email={this.state.emailAddress}
                                        amount={20000 * 100}
                                        paystackkey={PAY_STACK_PUBLIC_KEY}
                                        tag="button"
                                    />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pack-box mt-card">
                                <p className="text-header small">Discover Pack</p>
                                <p className="price larger"><span>&#8358; </span>50,000</p>
                                <p className="credit">No Bonus Credit</p>
                                <div>
                                    <p>
                                    <PaystackButton
                                        text="Fund Wallet"
                                        className="btn pay-6 wallet-btn btn-block btn-sm btn-primary"
                                        callback={this.callback}
                                        close={this.close}
                                        disabled={false}
                                        embed={false}
                                        reference={this.getReference()}
                                        email={this.state.emailAddress}
                                        amount={50000 * 100}
                                        paystackkey={PAY_STACK_PUBLIC_KEY}
                                        tag="button"
                                    />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pack-box mt-card">
                                <span className="pin primary">Popular</span>
                                <p className="text-header small">Family Pack</p>
                                <p className="price larger"><span>&#8358; </span>100,000</p>
                                <p className="credit">No Bonus Credit</p>
                                <div>
                                    <p>
                                    <PaystackButton
                                        text="Fund Wallet"
                                        className="btn pay-7 wallet-btn btn-block btn-sm btn-primary"
                                        callback={this.callback}
                                        close={this.close}
                                        disabled={false}
                                        embed={false}
                                        reference={this.getReference()}
                                        email={this.state.emailAddress}
                                        amount={100000 * 100}
                                        paystackkey={PAY_STACK_PUBLIC_KEY}
                                        tag="button"
                                    />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="pack-box mt-card">
                                <span className="pin primary" style={{backgroundColor:'rgb(232, 18, 121)'}}>Hot Deal</span>
                                <p className="text-header small">Super Pack</p>
                                <p className="price larger"><span>&#8358; </span>1,000,000</p>
                                <p className="credit">No Bonus Credit</p>
                                <div>
                                    <p>
                                    <PaystackButton
                                        text="Fund Wallet"
                                        className="btn wallet-btn pay-8 btn-block btn-sm btn-primary"
                                        callback={this.callback}
                                        close={this.close}
                                        disabled={false}
                                        embed={false}
                                        reference={this.getReference()}
                                        email={this.state.emailAddress}
                                        amount={1000000 * 100}
                                        paystackkey={PAY_STACK_PUBLIC_KEY}
                                        tag="button"
                                    />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-card-shadow">
                            <div className="form-box-item rm-border" >
                                <h4>Wallet Withdrawal</h4>
                                <hr className="line-separator" />
                                <form >
                                    <hr className="line-separator top"/>
                                    <div className="row" style={{marginTop: '1rem'}}>
                                        <div className="form-group col-md-12 col-sm-12">
                                            <label htmlFor="ccnum" className="rl-label required rm-margin-top" >Amount to withdral</label>
                                            <input type="text" className="form-control" id="ccnum" name="ccnum" placeholder="Enter your credit card number here..." />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6 col-sm-12">
                                            <label htmlFor="exp_year" className="rl-label required rm-margin-top">Bank to be paid</label>
                                            <label htmlFor="exp_year" className="select-block">
                                                <select className="form-control" name="exp_year" id="exp_year">
                                                    <option value="">Select Bank</option>
                                                    {
                                                        this.props.savedBanks.map(bank => (
                                                            <optgroup label={bank.name}>
                                                                <option value={bank.id}>
                                                                    {`${bank.accountName} - ${bank.accountNumber}` }
                                                                </option>
                                                            </optgroup>
                                                        ))
                                                    }
                                                </select>
                                            </label>
                                        </div>
                                        <div className="form-group col-md-6 col-sm-12">
                                            <label htmlFor="secode" className="rl-label required rm-margin-top">Security Pin</label>
                                            <input style={{marginTop:'2.3rem'}} type="password" className="form-control" id="secode" name="secode" placeholder="Enter your security pin here..." />
                                        </div>
                                    </div>
                                    <hr className="line-separator"/>
                                    <button style={{width:'100%'}} className="btn btn-sm btn-outline-success">Make Withdrawal</button>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                    <div className="row" style={{marginTop: 10}}>
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-card-shadow">
                            <div className="form-box-item rm-border" >
                                    <h4>Wallet Transactions</h4>
                                    <hr className="line-separator" />
                                <div className="conatiner-fluid">
                                   <WalletDataTable data={this.props.transactions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dashboard>
        )
    }
}

const mapStateToProps = state => {
    const { bank: { loading, error, errorMessage, successMessage,
        showSuccessBar, banks, savedBanks, resetForm, transactions, balance }, 
        reg: { unAuthorized } } = state;
    const sortedBanks = banks.sort((item1, item2) => item1.name.toLowerCase() > item2.name.toLowerCase())
    return {
        banks: sortedBanks,
        loading,
        error,
        errorMessage,
        successMessage,
        showSuccessBar,
        savedBanks,
        unAuthorized,
        resetForm,
        transactions,
        balance
    }
}

export default connect(mapStateToProps, actions)(Wallet)