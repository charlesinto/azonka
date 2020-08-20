import React, { Component } from 'react';
import { connect } from "react-redux";
import validator from "validator";
import WalletDataTable from "../../common/WalletDataTable";
import Dashboard from '../HOC/Dashboard';
import * as actions from "../../actions";

class index extends Component {
     INITIAL_STATE = {emailAddress: '', amount:'', pin: '', bank: '', 
    customAmount:0, amountToWithdraw: ''}
    constructor(props){
        super(props)
        this.state = {...this.INITIAL_STATE}
    }
    componentDidMount(){
        this.props.initiateRegistration()
        this.props.setActiveLink('Wallet Withdrawal')
        const { emailAddress} = JSON.parse(localStorage.getItem('azonta-user'))
         this.setState({emailAddress}, () => {
            this.props.getUserWalletDetals()
         })
    }
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    handlePinCodeInputChange = e => {
        // console.log(e.key)
        const KEYS_ALLOWED = ['1', '2','3','4','5','6','7','8','9','0',]
        const CONTROLS = ['Backspace', 'ArrowUp','Enter', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        console.log(e.key)
        if(KEYS_ALLOWED.includes(e.key) || CONTROLS.includes(e.key)){
            if(e.target.value.trim().length === 4 && !CONTROLS.includes(e.key) ){
                return e.preventDefault()
            }
            return e;
        }
        return e.preventDefault()
    }
    handleInputChange = e => {
        const {target: {name, value}} = e;
        let amountToWithdraw = '';
        if(name === 'amountToWithdraw'){
            amountToWithdraw = value.split(',').join('')
            if(amountToWithdraw !== ''){
                return this.setState({
                    [name] : amountToWithdraw
                })
            }
            // return this.setState({
            //     [name] : 0
            // })
        }
        return this.setState({
            [name] : value
        })
        
    }
    handleFormSubmit = async (e) => {
        e.preventDefault()
        const {amountToWithdraw, bank, pin} = this.state
        if(validator.isEmpty(amountToWithdraw) || validator.isEmpty(pin) || validator.isEmpty(bank)){
            if(validator.isEmpty(bank)){
                return this.props.renderError('Please Select Bank')
            }
            if(validator.isEmpty(pin)){
                return this.props.renderError('Please provide pin')
            }
            if(validator.isEmpty(amountToWithdraw)){
                return this.props.renderError('Please provide amount to withdraw')
            }
        }
        if(parseInt(amountToWithdraw) > parseInt(this.props.balance)){
            return this.props.renderError('Action could not be performed, Insufficient fund in wallet')
        }
        this.props.initiateRegistration()
        await this.props.withdrawlFromWallet(parseInt(amountToWithdraw) * 100, bank, pin)
        this.setState({...this.INITIAL_STATE})
    }
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        return (
            <Dashboard>
                <div className="container-fluid">
                <div className="container-fluid">
                        <div className="row">
                            <div className="current-balance mt-card">
                                <span>Current Balance</span>
                                <span className="text-success">&#8358; {this.numberWithCommas(this.props.balance / 100)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-card-shadow">
                            <div className="form-box-item rm-border" >
                                <h4>Wallet Withdrawal</h4>
                                <hr className="line-separator" />
                                <form >
                                    <hr className="line-separator top"/>
                                    <div className="row" style={{marginTop: '1rem'}}>
                                        <div className="form-group col-md-12 col-sm-12">
                                            <label htmlFor="ccnum" className="rl-label required rm-margin-top" >Amount to withdraw</label>
                                            <input onKeyDown={this.handlePinCodeInputChange} onChange={this.handleInputChange} value={this.numberWithCommas(this.state.amountToWithdraw)} type="text" className="form-control"
                                             id="ccnum" name="amountToWithdraw" placeholder="Enter amount to withdraw" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6 col-sm-12">
                                            <label htmlFor="exp_year" className="rl-label required rm-margin-top">Bank to be paid</label>
                                            <label htmlFor="exp_year" className="select-block">
                                                <select className="form-control" onChange={this.handleInputChange} value={this.state.bank} name="bank" id="exp_year">
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
                                            <input onChange={this.handleInputChange} value={this.state.pin} style={{marginTop:'2.3rem'}} type="password" className="form-control" id="secode" name="pin" placeholder="Enter your security pin here..." />
                                        </div>
                                    </div>
                                    <hr className="line-separator"/>
                                    <button onClick={this.handleFormSubmit}  className="btn  btn-success">Make Withdrawal</button>
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
        );
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

export default connect(mapStateToProps, actions)(index);