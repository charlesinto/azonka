import React, { Component } from 'react';
import {  withToastManager } from 'react-toast-notifications';
import UserLayout from "../HOC/UserLayout";
import * as actions from "../../actions";
import Validator from "validator";
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from "react-redux";

class index extends Component {
    state = {
        profileInformation: {},
        billingInformation: {},
        shippingInformation: {},
        copyToShip: false,
        showBalanceInStatusBar: true,
        sendEmails: true,
        inValidElements: [],
        changedElements: [],
        pin: '',
        showAlert: false
    }
    componentDidMount(){
        this.props.switchActiveLink('account-setting')
        //this.pinRef = React.createRef()
    }
    static getDerivedStateFromProps(nextProps, state){
        const {user} = nextProps;
        if(user){
            const { firstName, lastName, emailAddress, phoneNumber, country} = user
            return {
                profileInformation: {
                    firstName,
                    lastName,
                    emailAddress,
                    phoneNumber,
                    country,
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
        const touchedElementsIndex = this.state.changedElements.findIndex(element => element === name)
        const newTouchedElements = this.state.changedElements
        if(touchedElementsIndex === -1){
            newTouchedElements.push(name)
        }
        this.setState({
            [field] : {...this.state[field], [name]: value},
            inValidElements: [...this.state.inValidElements],
            changedElements: [...newTouchedElements]
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
        Object.keys(data).forEach(element => {
            if(element === 'emailAddress'){
                if(!Validator.isEmail(data[element])){
                    isValid = false;
                    inValidElements.push({field, input:'emailAddress'})
                }
            }
            if(element === 'phoneNumber'){
                if(!/^[0-9]*$/.test(data['phoneNumber'])){
                    isValid = false;
                    inValidElements.push({field, input:'phoneNumber'})
                }
            }
            else if(data[element].trim() === ''){
                
                isValid = false;
                inValidElements.push({field, input:'firstName'})
            }
        })
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
    handlePinChange = pin => {
        this.setState({
            pin: pin.target.value
        })
        // this.setState({
        //     showAlert: false
        // })
    }
    handleFormSubmit = e => {
     
        e.preventDefault()
        const updatedElement = {};
        this.state.changedElements.forEach(element => {
            updatedElement[element] = this.state.profileInformation[element]
        })
        const {isValid, inValidElements} = this.validateFormData(updatedElement, 'profileInformation')
        

        if(isValid){
            if(this.state.pin.trim() !== '' ){
                if(Object.keys(updatedElement).length > 0){
                    this.props.initiateRegistration()
                    this.props.updateUserProfile(updatedElement)
                    this.setState({
                        changedElements: []
                    })
                }
            }else{
                this.setState({
                    showAlert: true
                })
            }
            
        }else{
            console.log('not called')
            this.props.renderError('One or more fields not filled, Please check your form and try again')
            this.setState({
                inValidElements
            })
        }
    }
    processForm = () => {
        this.setState({
            showAlert: false,
            
        }, () => {
            const updatedElement = {};
            this.state.changedElements.forEach(element => {
                updatedElement[element] = this.state.profileInformation[element]
            })
            const {isValid, inValidElements} = this.validateFormData(updatedElement, 'profileInformation')
            
            console.log('this profile', updatedElement)
            console.log(isValid, inValidElements)
            
            if(Object.keys(updatedElement).length > 0){
                this.props.initiateRegistration()
                this.props.updateUserProfile(updatedElement)
                this.setState({
                    changedElements: [],
                    pin: ''
                })

            }else{
                this.setState({
                    pin: ''
                })
            }
        })
        
    }
    onCancel = () => {
        this.setState({
            showAlert: false
        })
    }
    isInvalid = (target,field) => {
        const index = this.state.inValidElements.findIndex(element => element.field === field && element.input === target)
        return index !== -1
    }
    closeSnackBar = () => {
        this.props.closeSnackBar()
    }
    render() {
        return (
            <UserLayout>
                <div className="headline buttons primary">
                    <h4>Profile</h4>
                    
                </div>
                <div className="form-box-items">
                    <div className="form-box-item">
                        <h4>Profile Information</h4>
                        <hr className="line-separator" />
                        {/* <div className="profile-image">
                            <div className="profile-image-data" style={{float:'none'}}>
                                <figure className="user-avatar medium">
                                    <img src={profileImage} alt="profile-default" />
                                </figure>
                                <p className="text-header">Profile Photo</p>
                                <p className="upload-details">Minimum size 70x70px (optional)</p>
                            </div>
                            <div className="upload-btn-wrapper" style={{margin: '10px 0'}}>
                                <button className="btn">Upload photo</button>
                                <input type="file" name="myfile" />
                            </div>
                        </div> */}

                        <form id="profile-info-form">
                            <div className="input-container">
                                <label htmlFor="firstName" className="rl-label required">First Name</label>
                                <input type="text" className={`${this.isInvalid('firstName','profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} id="acc_name" name="firstName" value={this.state.profileInformation.firstName} placeholder="first name." />
                            </div>
                            <div className="input-container">
                                <label htmlFor="lastName" className="rl-label required">Last Name</label>
                                <input type="text" className={`${this.isInvalid('lastName', 'profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} id="acc_name" name="lastName" value={this.state.profileInformation.lastName} placeholder="last name" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="emailAddress" className="rl-label">Email</label>
                                <input disabled type="email" id="new_email" className={`${this.isInvalid('emailAddress', 'profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} name="emailAddress" value={this.state.profileInformation.emailAddress} placeholder="Enter your email address here..." />
                            </div>
                            <div className="input-container">
                                <label htmlFor="phoneNumber" className="rl-label">Phone number</label>
                                <input type="text" id="new_email" className={`${this.isInvalid('phoneNumber', 'profileInformation') ?  'invalid': ''}`} onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} name="phoneNumber" value={this.state.profileInformation.phoneNumber} placeholder="Phone Number" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="country" className="rl-label required">Country</label>
                                <label htmlFor="country" className="select-block">
                                    <select name="country" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} value={this.state.profileInformation.country} id="country1">
                                        <option value="">Select your State/City...</option>
                                        <option value="Nigeria">Nigeria</option>
                                    </select>
                                </label>
                            </div>
                            <div className="input-container">
                                <label htmlFor="about" className="rl-label">About</label>
                                <input type="text" id="about" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} value={this.state.profileInformation.about} name="about" placeholder="This will appear bellow your avatar... (max 140 char)" />
                            </div>
                            <div style={{margin:'20px 0 20px 10px', display:"flex", justifyContent:"flex-end", width:"100%"}}>
                                <button form="profile-info-form" onClick={this.handleFormSubmit} className="button mid-short secondary">Save Changes</button>
                            </div>
                        </form>
                    </div>
                    {
                        this.state.showAlert ?
                            <SweetAlert
                            
                            required
                            type="custom"
                            ref = {ref => this.inputRef = ref}
                            inputType="password"
                            title="Enter Pin"
                            focusConfirmBtn
                            validationMsg="Pin is required"
                            onConfirm={(response) => this.processForm()}
                            showCancel
                            showConfirm={this.state.pin.length > 0 ? true: false}
                            onCancel={() => this.setState({showAlert: false})}
                        >
                            <input type="password" value={this.state.pin} onChange={this.handlePinChange} 
                            className="form-control"/>
                        </SweetAlert> : null

                    }
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    console.log('state', state)
    const { home: {currentUser, showSuccessBar, message}, reg: { loading, error, errorMessage}} = state
    return {
        user: currentUser,
        loading,
        error,
        errorMessage,
        showSuccessBar,
        message
    }
}

export default connect(mapStateToProps, actions)(withToastManager(index));