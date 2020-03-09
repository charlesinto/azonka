import React, {Component} from 'react';
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import * as actions from "../../actions";
import Dashboard from '../HOC/Dashboard';

class WalletToWalletTransfer extends Component{
    INITIAL_STATE = {walletId: '', amount: '', pin: '', showConfirmDialog: false }
    constructor(props){
        super(props);
        this.state = {...this.INITIAL_STATE}
    }
    componentDidMount(){
        this.props.setActiveLink('Wallet Transfer')
    }
    handleInputChange = e =>{
        e.preventDefault();
        const {name, value} = e.target;
        if(name === 'amount'){
            const amountToTransfer = value.split(',').join('')
            if(amountToTransfer !== ''){
                return this.setState({
                    [name] : this.numberWithCommas(amountToTransfer)
                })
            }
        }
        this.setState({
            [name]: value
        })
    }
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    onFormSubmit = async (e) => {
        e.preventDefault()
        if(this.state.amount.trim() === ''){
            return this.props.renderError('Amount cannot be zero or empty')
        }
        if(this.state.pin.trim() === ''){
            return this.props.renderError('Please provide your security pin')
        }
        if(this.state.walletId.trim() === ''){
            return this.props.renderError('Please provide receiver wallet Id')
        }
        await this.setState({showConfirmDialog: true})
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
    onConfirm = async (e) => {
        // call the api to transfer
        await this.setState({showConfirmDialog: false})
        this.props.initiateRegistration()
    
        const amount = this.state.amount.split(',').join('')
       await this.props.transferToWallet({
            amount,
            receiver: this.state.walletId,
            pin: this.state.pin,
            currency: 'naira'
        })
        this.setState({...this.INITIAL_STATE})
    }
    onCancel = e => {
        this.setState({showConfirmDialog: false})
    }
    render(){
        return <Dashboard>
            <div className="container">
                <h4 className="popup-title verify-email" style={{
                    fontWeight: 'normal',
                    fontFamily: 'Roboto, sans-serif',
                    marginLeft: 20
                }}>Wallet Transfers</h4>
                <hr className="line-separator" />
                <form autoComplete={false} onSubmit={this.onFormSubmit}>
                    <fieldset>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="walletId">Reciever Wallet Id</label>
                                    <input type="text" name="walletId" value={this.state.walletId}
                                     className="form-control" onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="amount">Enter Amount</label>
                                    <input onKeyDown={this.handlePinCodeInputChange} type="text" name="amount" value={this.state.amount}
                                     className="form-control" onChange={this.handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <label htmlFor="amount">Enter Pin</label>
                                    <input type="password" name="pin" value={this.state.pin}
                                     className="form-control" onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="form-group">
                                    <button type="submit" onSubmit={this.onFormSubmit} className="transfer-btn btn btn-primary btn-small">
                                        Transfer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
                {
                    this.state.showConfirmDialog ? <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Transfer"
                    confirmBtnBsStyle="primary"
                    title="Are you sure?"
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    focusCancelBtn
                  >
                    Transfer 	&#8358; {this.state.amount} ?
                  </SweetAlert> : null
                }
            </div>  
        </Dashboard>
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(WalletToWalletTransfer)