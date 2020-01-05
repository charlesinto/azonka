import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from '../../actions'
import UserLayout from "../HOC/UserLayout";
import Validator from "validator";

class index extends Component {
    state = {
        profileInformation: {},
        billingInformation: {},
        shippingInformation: {},
        copyToShip: false,
        showBalanceInStatusBar: true,
        sendEmails: true,
        inValidElements: []
    }
    componentDidMount(){
        this.props.switchActiveLink('address')
    }
    static getDerivedStateFromProps(nextProps, state){
        const {user} = nextProps;
        if(user){
            const { firstName, lastName, emailAddress, phoneNumber} = user
            return {
                profileInformation: {
                    firstName,
                    lastName,
                    emailAddress,
                    phoneNumber,
                    ...state.profileInformation
                }
            }
        }
        return {...state}
    }
    handleInputChange = ({event, field}) => {
        const { target: {name, value}} = event;
        const index = this.state.inValidElements.findIndex(element => element.field === field && element.input === name)
        if(index !== -1){
            this.state.inValidElements.splice(index, 1)
        }
        this.setState({
            [field] : {...this.state[field], [name]: value},
            inValidElements: [...this.state.inValidElements]
        })
    }
    copyToShipInformation = (event) => {
        this.setState({
            copyToShip: !this.state.copyToShip
        }, () => {
            if(this.state.copyToShip){
                this.setState({
                    shippingInformation: {...this.state.billingInformation}
                })
            }
        })
    }
    toggleSendEmailNotification = (event) => {
        this.setState({
            sendEmails: !this.state.sendEmails
        })
    }
    toggleShowAccountBalance = (event) => {
        this.setState({
            showBalanceInStatusBar: !this.state.showBalanceInStatusBar
        })
    }
    validateProfileInformation = (data, field) => {
        let isValid = true
        let inValidElements = []
        if(!Validator.isEmail(data['emailAddress'])){
            isValid = false;
            inValidElements.push({field, input:'emailAddress'})
        }
        if(!/^[0-9]*$/.test(data['phoneNumber'])){
            isValid = false;
            inValidElements.push({field, input:'phoneNumber'})
        }
        if(data['firstName'].trim() === ''){
            isValid = false;
            inValidElements.push({field, input:'firstName'})
        }
        if(data['lastName'].trim() === ''){
            isValid = false;
            inValidElements.push({field, input:'lastName'})
        }
        if( data['newPassword'] && data['newPassword'].trim() !== ''){

            if( !data['new_pwd2'] || data['new_pwd2'].trim() === '' ){
                isValid = false
                inValidElements.push({field, input:'new_pwd2'})
            }
            if( !data['currentPassword'] || data['currentPassword'].trim() === ''){
                isValid = false
                inValidElements.push({field, input:'currentPassword'})
            }
        }
        return {
            isValid,
            inValidElements
        }

    }
    validateFormData = (data, field) => {
        switch(field){
            case 'profileInformation':
               return this.validateProfileInformation(data, field)
            default:
                return {}
        }

    }

    handleFormSubmit = e => {
        e.preventDefault()
        const {toastManager: {add}} = this.props;
        const {isValid, inValidElements} = this.validateFormData(this.state.profileInformation, 'profileInformation')
        
        console.log('this profile', this.state.profileInformation)
        console.log(isValid, inValidElements)

        if(isValid){
            console.log('cla')
            // this.props.initiateRegistration()
           this.props.updateUserProfile(this.state.profileInformation)
        }else{
            console.log('not called')
            add('One or more fields not filled, Please check your form and try again', { appearance: 'error' })
            this.setState({
                inValidElements
            })
        }
    }
    isInvalid = (target,field) => {
        const index = this.state.inValidElements.findIndex(element => element.field === field && element.input === target)
        return index !== -1
    }
    render() {
        return (
            <UserLayout>
                <div className="headline buttons primary">
                    <h4>Billing Information</h4>
                    <button form="profile-info-form" onClick={this.handleFormSubmit} className="button mid-short primary">Save Changes</button>
                </div>
                <div className="form-box-item">
                        <h4>Billing Information</h4>
                        <hr className="line-separator"/>
                        <div className="input-container half">
                            <label htmlFor="first_name2" className="rl-label required">First Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} type="text" form="profile-info-form" id="first_name2" value={this.state.billingInformation.firstName} name="firstName" placeholder="Enter your first name here..."/>
					    </div>
                        <div className="input-container half">
                            <label htmlFor="last_name2" className="rl-label required">Last Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} type="text" form="profile-info-form" value={this.state.billingInformation.lastName} id="last_name2" name="lastName" placeholder="Enter your last name here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email_address2" className="rl-label required">Email Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} type="email" value={this.state.billingInformation.email} form="profile-info-form" id="email_address2" name="email" placeholder="Enter your email address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="country2" className="rl-label required">Country</label>
                            <label htmlFor="country2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} value={this.state.billingInformation.country} form="profile-info-form" name="country" id="country2">
                                    <option value="0">Select your Country...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="state_city2" className="rl-label required">State/City</label>
                            <label htmlFor="state_city2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} value={this.state.billingInformation.city} form="profile-info-form" name="city" id="state_city2">
                                    <option value="0">Select your State/City...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="zipcode2" className="rl-label required">Zip Code</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} form="profile-info-form" value={this.state.billingInformation.zipcode} type="text" id="zipcode2" name="zipcode" placeholder="Enter your Zip Code here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="address2" className="rl-label required">Full Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} form="profile-info-form" value={this.state.billingInformation.address} type="text" id="address" name="address" placeholder="Enter your address here..."/>
                        </div>
                    </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {

    return {}
}

export default connect(mapStateToProps, actions)(index);