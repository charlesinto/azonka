import React, { Component } from 'react';
import { Redirect, } from "react-router-dom";
import { connect } from "react-redux";
import NoRecordFound from "../../common/NoRecordFound";
import { withToastManager } from 'react-toast-notifications';
import * as actions from "../../actions";
import BankListItem from "../../common/BankListItem";
import SweetAlert from 'react-bootstrap-sweetalert';
import Dashboard from '../HOC/Dashboard';
import BankDataTable from "../../common/BankDataTable";




class Bank extends Component {
    state = {
        inValidElments: [],
        validationMessage: [],
        // banks: [],
        showAlert: false,
        actionMode: 'save',
        pin: '', 
        showInfo: false,
        id: '',
        banks: [
 {           
active: true,
code: "044",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "emandate",
id: 1,
is_deleted: null,
longcode: "044150149",
name: "Access Bank",
pay_with_bank: false,
slug: "access-bank",
type: "nuban",
updatedAt: "2020-02-18T08:06:44.000Z",
        },
{
active: true,
code: "063",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "emandate",
id: 3,
is_deleted: null,
longcode: "063150162",
name: "Access Bank (Diamond)",
pay_with_bank: false,
slug: "access-bank-diamond",
type: "nuban",
updatedAt: "2020-02-18T08:06:48.000Z",
        },
{
active: true,
code: "035A",
country: "Nigeria",
createdAt: "2017-11-15T12:21:31.000Z",
currency: "NGN",
gateway: "emandate",
id: 27,
is_deleted: null,
longcode: "035150103",
name: "ALAT by WEMA",
pay_with_bank: true,
slug: "alat-by-wema",
type: "nuban",
updatedAt: "2020-02-18T06:46:46.000Z",
        },
{
active: true,
code: "070",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "emandate",
id: 6,
is_deleted: null,
longcode: "070150003",
name: "Fidelity Bank",
pay_with_bank: false,
slug: "fidelity-bank",
type: "nuban",
updatedAt: "2020-02-18T07:25:19.000Z",
        },
{
active: true,
code: "011",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "ibank",
id: 7,
is_deleted: null,
longcode: "011151003",
name: "First Bank of Nigeria",
pay_with_bank: true,
slug: "first-bank-of-nigeria",
type: "nuban",
updatedAt: "2019-11-21T05:09:47.000Z",
        },
{
active: true,
code: "214",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "emandate",
id: 8,
is_deleted: null,
longcode: "214150018",
name: "First City Monument Bank",
pay_with_bank: false,
slug: "first-city-monument-bank",
type: "nuban",
updatedAt: "2020-02-18T08:06:46.000Z",
        },
{
active: true,
code: "058",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "ibank",
id: 9,
is_deleted: null,
longcode: "058152036",
name: "Guaranty Trust Bank",
pay_with_bank: true,
slug: "guaranty-trust-bank",
type: "nuban",
updatedAt: "2020-06-04T14:14:06.000Z",
        },
{
active: true,
code: "232",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "emandate",
id: 16,
is_deleted: null,
longcode: "232150016",
name: "Sterling Bank",
pay_with_bank: false,
slug: "sterling-bank",
type: "nuban",
updatedAt: "2020-05-27T08:38:56.000Z",
        },
{
active: true,
code: "032",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "emandate",
id: 17,
is_deleted: null,
longcode: "032080474",
name: "Union Bank of Nigeria",
pay_with_bank: false,
slug: "union-bank-of-nigeria",
type: "nuban",
updatedAt: "2020-02-18T20:22:54.000Z",
        },
{
active: true,
code: "033",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "emandate",
id: 18,
is_deleted: null,
longcode: "033153513",
name: "United Bank For Africa",
pay_with_bank: true,
slug: "united-bank-for-africa",
type: "nuban",
updatedAt: "2019-05-20T21:23:20.000Z",
        },
{
active: true,
code: "215",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "emandate",
id: 19,
is_deleted: null,
longcode: "215154097",
name: "Unity Bank",
pay_with_bank: false,
slug: "unity-bank",
type: "nuban",
updatedAt: "2019-07-22T12:44:02.000Z",
        },
{
active: true,
code: "057",
country: "Nigeria",
createdAt: "2016-07-14T10:04:29.000Z",
currency: "NGN",
gateway: "emandate",
id: 21,
is_deleted: null,
longcode: "057150013",
name: "Zenith Bank",
pay_with_bank: true,
slug: "zenith-bank",
type: "nuban",
updatedAt: "2016-07-14T10:04:29.000Z"}
        ]
    }

    validateFormData = (formdata) => {
        const { accountNumber, accountName, longcode, } = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if (!(longcode && longcode.trim() !== '')) {
            isValid = false
            inValidElments.push('longcode')

            validationMessage['longcode'] = 'Please select Bank'
        }
        if (!(accountName && accountName.trim() !== '')) {
            isValid = false;
            inValidElments.push('accountName')
            validationMessage['accountName'] = 'Account Name required'
        }
        if (!(accountNumber && accountNumber.trim() !== '')) {
            isValid = false;
            inValidElments.push('accountNumber')
            validationMessage['accountNumber'] = 'Account Number required'
        }
        return {
            isValid,
            validationMessage,
            inValidElments,
            formdata
        }
    }
    handleInputChange = e => {
        const { target: { name, value } } = e
        const index = this.state.inValidElments.indexOf(name)
        let newInvalidElements = []
        if (index !== -1) {
            this.state.inValidElments.splice(index, 1)
        }
        newInvalidElements = [...this.state.inValidElments]
        this.setState({
            [name]: value,
            newInvalidElements
        }, () => {
            const { longcode, accountName, accountNumber } = this.state
            if ((longcode.trim() === '') && (accountName.trim()
                === '') && (accountNumber.trim() === '')) {
                return this.setState({
                    actionMode: 'save'
                })
            }
        })
    }
    renderLookUp = () => {
        const lookupdata = {}
        this.props.banks.forEach((element) => {
            lookupdata[element.longcode] = element.name
        })
        return lookupdata
    }
    async componentDidMount() {
        
        this.props.setActiveLink('Bank')
        // await this.props.getBanks()
        
        this.props.getSavedBanks();
    }
    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.banks.length > 0) {
            if (nextProps.resetForm) {
                return {
                    ...state, pin: '',
                    actionMode: 'save', longcode: '', accountNumber: '', accountName: ''
                }
            }
            return { ...state,}
        }
        if (nextProps.resetForm) {
            return { ...state, actionMode: 'save', longcode: '', accountNumber: '', accountName: '' }
        }
        return null
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.processForm()
    }
    handlePinChange = pin => {
        this.setState({
            pin: pin.target.value
        })
    }
    processForm = () => {

        const { isValid, inValidElments, validationMessage } = this.validateFormData(this.state)

        if (!isValid) {
            this.props.renderError('Action cannot be performed,one or more fields required', { appearance: 'error' })

            return this.setState({
                inValidElments, validationMessage
            })


        }
        const selectedBank = this.state.banks.filter(element => element.longcode === this.state.longcode)
        const { accountNumber, accountName } = this.state
        console.log(selectedBank, accountName, accountNumber)
        this.props.initiateRegistration()
        if (selectedBank.length > 0) {
            const bankDetails = selectedBank[0]
            return this.props.saveBank({
                ...bankDetails, accountName, accountNumber
            })
        }
        console.log('some errror were encounteered')
    }
    closeSnackBar = () => {
        this.props.closeSnackBar()
    }
    logout = () => {
        this.props.logout()
        return <Redirect to="/users/login" />
    }
    converToDate = timestamp => {
        const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'
            , 'August', 'September', 'October', 'November', 'Decemeber']
        const date = new Date(timestamp)
        return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
    }
    _handleRowClick = (id, action = '') => {
        if (action === 'edit') {
            console.log('id oooo', id)
            const index = this.props.savedBanks.findIndex(element => element.id === parseInt(id))
            if (index !== -1) {
                const bank = this.props.savedBanks.find(element => element.id === parseInt(id))
                this.setState({
                    longcode: bank.longcode,
                    accountNumber: bank.accountNumber,
                    accountName: bank.accountName,
                    actionMode: 'update',
                    name: bank.name,
                    id: bank.id
                })
            }
        }
        if (action === 'delete') {
            this.setState({
                showInfo: true,
                id
            })
        }

    }
    _renderStoreList = () => {
        if (this.props.savedBanks.length > 0) {
            return this.props.savedBanks.map((bank, i) => {
                const { id, name, accountName, accountNumber, createdAt } = bank
                return (<BankListItem
                    bank={name}
                    accountName={accountName}
                    accountNumber={accountNumber}
                    createdAt={this.converToDate(createdAt)}
                    key={id}
                    id={id}
                    handleRowClick={(id, action) => this._handleRowClick(id, action)}
                />)
            })
        }
        return <NoRecordFound />
    }
    handleFormUpdate = (e, actionMode = null) => {
        e.preventDefault()
        const { longcode, accountName, accountNumber } = this.state
        if (longcode.trim() === '' || accountName.trim() === '' || accountNumber.trim() === '') {
            return this.props.renderError('Bank, Account Number and Account Name is required')
        }
        if (this.state.pin.trim() === '') {
            this.setState({
                showAlert: true,
                actionMode
            })
        }
    }
    handleFormDelete = (e, actionMode = null) => {
        e.preventDefault()
        // if(this.state.pin.trim() === ''){
        //     this.setState({
        //         showAlert: true,
        //         actionMode
        //     })
        // }
        this.setState({

            inValidElments: [],
            validationMessage: [],
            banks: [],
            longcode: '',
            accountName: '',
            accountNumber: '',
            showAlert: false,
            actionMode: 'save',
            pin: ''

        })
    }
    updateDeleteBank = () => {
        this.setState({
            showAlert: false
        }, () => {
            this.props.initiateRegistration()
            this.props.modifyAccount(this.state.actionMode, {
                longcode: this.state.longcode, name: this.state.name,
                accountNumber: this.state.accountNumber, accountName: this.state.accountName,
                pin: this.state.pin
            }, this.state.id)
        })
    }
    deleteFile = async () => {
        this.props.initiateRegistration()
       await this.props.modifyAccount('delete', null, this.state.id)
       this.setState({showInfo: false, id: null})
    }
    onCancel = () => {
        this.setState({
            id: null,
            showInfo: false
        })
    }
    render() {
        return (
            <Dashboard>
                <div style={{}}>
                    
                    <div className="add-bank">
                        <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif',
                            marginLeft: 20
                        }}>Add Bank</h4>
                        <hr className="line-separator" />
                        <form>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4 col-sm-12">
                                        <div className="form-group required-field">
                                            <label htmlFor="bankName" className="rl-label">Bank Name</label>
                                            <select name="longcode"
                                                className={`form-control ${this.state.inValidElments.includes('longcode') ? 'invalid' : ''}`}
                                                value={this.state.longcode} onChange={this.handleInputChange}>
                                                <option value="">Select Bank</option>
                                                {
                                                    this.state.banks.map(({ name, longcode }, i) => (
                                                        <option key={i} value={longcode}>{name}</option>
                                                    ))
                                                }

                                            </select>

                                        </div>
                                        {
                                            this.state.inValidElments.includes('longcode') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['longcode']}
                                                    </div>
                                                ) : null
                                        }
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <div className="form-group required-field">
                                            <label htmlFor="accountName" className="rl-label">Account Name</label>
                                            <input type="text" id="password5"
                                                className={`form-control ${this.state.inValidElments.includes('accountName') ? 'invalid' : ''}`}
                                                value={this.state.accountName} onChange={this.handleInputChange}
                                                name="accountName" placeholder="Account Name" />

                                        </div>
                                        {
                                            this.state.inValidElments.includes('accountName') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['accountName']}
                                                    </div>
                                                ) : null
                                        }
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <div className="form-group required-field">
                                            <label htmlFor="accountNumber" className="rl-label">Account Number</label>
                                            <input type="number" id="password5"
                                                className={`form-control ${this.state.inValidElments.includes('accountNumber') ? 'invalid' : ''}`}
                                                value={this.state.accountNumber} onChange={this.handleInputChange}
                                                name="accountNumber" placeholder="Account Number" />

                                        </div>
                                        {
                                            this.state.inValidElments.includes('accountNumber') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['accountNumber']}
                                                    </div>
                                                ) : null
                                        }
                                    </div>
                                </div>
                                <div style={{ padding: '20px 0 10px' }}>
                                    {
                                        this.state.actionMode === 'save' ? (
                                            <div className="row">
                                                <div className="col-md-8 col-sm-12"></div>
                                                <div className="form-footer">

                                                    <div className="form-footer-right" style={{ marginLeft: 10 }}>
                                                        <button onClick={this.handleFormSubmit} type="submit" className="btn btn-sm btn-primary">Save</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                                <div className="row">
                                                    <div className="col-md-8 col-sm-12"></div>
                                                    <div className="col-md-4 col-sm-12">
                                                        <div style={{ marginBottom: 10, marginLeft: 10 }}>
                                                            <button onClick={(e) => this.handleFormUpdate(e, 'update')} className="btn btn-sm btn-warning"
                                                                style={{
                                                                    margin: '0 auto', borderColor: '#ffc107',
                                                                    background: '#ffc107', width: '100%', color: "#fff"
                                                                }}>Update</button>
                                                        </div>
                                                        <div style={{ marginBottom: 10, marginLeft: 10 }}>
                                                            <button onClick={(e) => this.handleFormDelete(e, 'delete')} className="btn btn-sm btn-danger"
                                                                style={{ margin: '0 auto', width: '100%' }}>Cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                    }

                                </div>
                            </div>

                        </form>

                        <div style={{
                            maxWidth: "100%", margin: '0 10px 0 10px', background: '#fff', overflowX: 'auto',
                            padding: '20px 0px 20px 0px'
                        }}>
                            <BankDataTable data={this.props.savedBanks}
                                handleRowClick={(id, action) => this._handleRowClick(id, action)}
                            />
                        </div>
                    </div>

                    {
                        this.state.showAlert ?
                            <SweetAlert

                                required
                                type="custom"
                                ref={ref => this.inputRef = ref}
                                inputType="password"
                                title="Enter Pin"
                                focusConfirmBtn
                                validationMsg="Pin is required"
                                onConfirm={(response) => this.updateDeleteBank()}
                                showCancel
                                showConfirm={this.state.pin.length > 0 ? true : false}
                                onCancel={() => this.setState({ showAlert: false })}
                            >
                                <input type="password" value={this.state.pin} onChange={this.handlePinChange}
                                    className="form-control" />
                            </SweetAlert> : null

                    }
                    {
                            this.state.showInfo ? <SweetAlert
                                    info
                                    showCancel
                                    confirmBtnText="Yes, delete it"
                                    confirmBtnBsStyle="danger"
                                    title="Are you sure?"
                                    onConfirm={this.deleteFile}
                                    onCancel={this.onCancel}
                                    focusCancelBtn
                                >
                                    Action can not be undone
                                </SweetAlert> : null
                }
                </div>
            </Dashboard>
        );
    }
}

const mapStateToProps = state => {
    const { bank: { loading, error, errorMessage, successMessage,
        showSuccessBar, banks, savedBanks, resetForm }, reg: { unAuthorized } } = state;
    const sortedBanks = banks.sort((item1, item2) => item1.name.toLowerCase() > item2.name.toLowerCase())
    console.log('unathourized', unAuthorized)
    return {
        banks: sortedBanks,
        loading,
        error,
        errorMessage,
        successMessage,
        showSuccessBar,
        savedBanks,
        unAuthorized,
        resetForm
    }
}

export default connect(mapStateToProps, actions)(withToastManager(Bank));