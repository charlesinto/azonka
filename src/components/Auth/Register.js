import React, {  Component } from 'react';
import {  withToastManager } from 'react-toast-notifications';
import Validator from 'validator';
import { connect } from 'react-redux';
import queryString from "query-string";
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import { amber } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import withStyles from "@material-ui/core/styles/withStyles";
import * as actions from "../../actions";
import countryData from "../../assets/countryCode.json";
import { Link } from 'react-router-dom';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

import ReactFlagsSelect from 'react-flags-select';
 
//import css module
import 'react-flags-select/css/react-flags-select.css';
 



class Register extends Component {
    state = {
        extendedUserType: 'user',
        emailAddress:'',
        phoneNumber:'',
        referredBy:'',
        repeatPassword: '',
        firstName:'',
        lastName: '',
        gender:'Male',
        password:'',
        companyName:'',
        headOfficeAddress:'',
        contactLine: '',
        country:'',
        inValidElments: [],
        countryCode:'+234',
        isoCode:'NGA',
        validationMessage: {},
        agreeToTerms: false,
        showSpinner: false
    }
    componentDidMount(){
        const query = queryString.parse(this.props.location.search)
        if (query['referral']) {
            this.setState({
                referredBy: query['referral']
            })
        } 
    }
    extendedUserTypeChange = (event, value) => {
        this.setState({
            extendedUserType: value
        })
    }
    handleInputChange = (event) => {
        const {target: { name, value}} = event;
        const index = this.state.inValidElments.indexOf(name)
        let newInvalidElements = []
        if(index !== -1){
            this.state.inValidElments.splice(index, 1)
        }
        newInvalidElements = [...this.state.inValidElments]
        if(name ==='country'){
            let countryCode, isoCode = null
            const index = countryData.findIndex(element => element.country === value)
            if(index !== -1){
                countryCode = countryData.find(element => element.country === value).countryCode
                isoCode = countryData.find(element => element.country === value).isoCode
            }
            return this.setState({
                [name] : value,
                newInvalidElements,
                countryCode,
                isoCode
            }, () => console.log(this.state))
        }
        this.setState({
            [name] : value,
            newInvalidElements
        })
    }
    clearSpinner = () => {
        this.setState({
            showSpinner: false
        })
        return null
    }
    validateFormData = (formdata) => {
        const { emailAddress, phoneNumber, password, repeatPassword, headOfficeAddress,
        contactLine, companyName, extendedUserType,gender,country, firstName, lastName} = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if(!(emailAddress.trim() !== '' && Validator.isEmail(emailAddress))){
            isValid = false
            inValidElments.push('emailAddress')
            
            validationMessage['emailAddress'] = 'Email required or not in right format'
        }
        if(country.trim() === ''){
            isValid = false;
            inValidElments.push('country')
            validationMessage['country'] = 'Please select country'
        }
        if(!(phoneNumber.trim() !== '' && Validator.isNumeric(phoneNumber))){
            isValid = false
            inValidElments.push('phoneNumber')
            validationMessage['phoneNumber'] = 'Phone number must be a number'
        }
        if(!(firstName.trim())){
            isValid = false
            inValidElments.push('firstName')
            validationMessage['firstName'] = 'First name required'
        }
        if(!(lastName.trim())){
            isValid = false
            inValidElments.push('lastName')
            validationMessage['lastName'] = 'Last name required'
        }
        if(!(gender.trim())){
            isValid = false
            inValidElments.push('gender')
            validationMessage['gender'] = 'Please select one'
        }
        if(!(password.trim() !== '' && password.length >= 6)){
            isValid = false;
            inValidElments.push('password')
            validationMessage['password'] = 'minimum of 6 characters required'
        }
        if(!(repeatPassword === password)){
            isValid = false
            inValidElments.push('repeatPassword')
            validationMessage['repeatPassword'] = 'Repeat Password do not match'
        }
        
        if(extendedUserType.trim() !== ''){
            if(extendedUserType.trim() === 'seller'){
                if(!(headOfficeAddress.trim() !== '')){
                    isValid = false
                    inValidElments.push('headOfficeAddress')
                    validationMessage['headOfficeAddress'] = 'Please provide company address'
                }
                if(!(companyName.trim() !== '')){
                    isValid = false
                    inValidElments.push('companyName')
                    validationMessage['companyName'] = 'Please provide company name'
                }
                if(!(contactLine.trim() !== '')){
                    isValid = false
                    inValidElments.push('contactLine')
                    validationMessage['contactLine'] = 'Please Provide contact Line'
                }
            }
        }else{
            isValid = false
            inValidElments.push('extendedUserType')
            validationMessage['extendedUserType'] = 'Select Profile type'
        }
        return {
            isValid,
            validationMessage,
            inValidElments,
            formdata
        }
    }

    static getDerivedStateFromProps(props, state){
        const { loading, error} = props; 
        return {loading, error}
    }
    processForm = () => {
        const {  error} = this.state; 
        const {toastManager: { add}} = this.props;
        if(error === 'some errors were encountered'){
            add('Some errors were encountered', { appearance: 'error' })
        }
        console.log('called', this.state)
        return null
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const userData = {...this.state}

        if(!this.state.agreeToTerms)
            return this.props.renderError('You must agree to terms and condition')
        const validationResponse = this.validateFormData(userData)
        const { isValid} = validationResponse;
        if(!isValid){
            const { inValidElments, validationMessage} = validationResponse
            this.props.renderError('Incorrect data provided, Please check and try again');
            
           return  this.setState({
                inValidElments,
                validationMessage
            })
        }
        this.setState({
            showSpinner : true
        })
        const { emailAddress, phoneNumber, referredBy, 
        password, repeatPassword, extendedUserType, 
        headOfficeAddress, companyName, firstName, lastName, gender,country, countryCode,isoCode,
         contactLine} = this.state;
        localStorage.setItem('userRegDetails', JSON.stringify({
            emailAddress, phoneNumber, referredBy, contactLine,
            headOfficeAddress, companyName, extendedUserType, password, repeatPassword,
            firstName, lastName, gender, country, countryCode, isoCode
        }))
        this.props.initiateRegistration()

        if(this.state.extendedUserType !== 'user'){
           return this.props.history.push('/users/securityquestions')
        }
        console.log('this', this.state)
        return this.props.registerUser({
            emailAddress, phoneNumber, referredBy, password,
            repeatPassword, type:extendedUserType, headOfficeAddress, companyName,
            firstName, lastName, gender, contactLine, profileImage:'',
            country, countryCode, isoCode
        })
    
        // return setTimeout(() => {
        //     return this.props.history.push(`/users/verify`)
        // }, 2000)
    }
    agreeTotermsChange = e => {
        this.setState({
            agreeToTerms: !this.state.agreeToTerms
        })
    }
    closeSnackBar = () => {
        console.log('closeing snackbar', this.state)
        this.props.clearError()
    }
    _countryCodeChange = (countryCode) => {
        this.props.initiateRegistration()
        fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    countryCode: result.callingCodes[0],
                    isoCode: countryCode,
                    country: result.name
                }, () => this.props.stopLoading())
            })
            .catch((err) => console.log('error encountered', err) )
        console.log('country code', countryCode)
    }
    render() {
        const { classes } = this.props;
        return (
                <div>
                    <Header />
                    
                    <div className="router-container">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Create New Account</li>
                        </ol>
                    </div>
                </nav>
                <div className="form-popup custom-input register-form">
                    <div className="form-popup-content">
                        <h4 className="popup-title">Register Account</h4>
                        <hr className="line-separator"/>
                        <form id="register-form" noValidate>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="firstName" className="rl-label">First Name</label>
                                        <input type="text" value={this.state.firstName} 
                                            className={`form-control ${this.state.inValidElments.includes('firstName') ? 'invalid' : '' }`}
                                            onChange={this.handleInputChange} id="new_pwd" name="firstName" placeholder="Enter your firstname" />
                                        
                                    </div>
                                    {
                                            this.state.inValidElments.includes('firstName') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.validationMessage['firstName']}
                                                </div>
                                            ): null 
                                        }
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="lastName" className="rl-label">Last Name</label>
                                        <input type="text" value={this.state.lastName} 
                                            className={`form-control ${this.state.inValidElments.includes('lastName') ? 'invalid' : '' }`}
                                            onChange={this.handleInputChange} id="lastName" name="lastName" placeholder="Enter your lastname"/>
                                        
                                    </div>
                                    {
                                            this.state.inValidElments.includes('lastName') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.validationMessage['lastName']}
                                                </div>
                                            ): null 
                                        }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                        <label htmlFor="lastName" className="rl-label">Gender</label>
                                        <select name="gender" onChange={this.handleInputChange}
                                            value={this.state.gender}
                                            className={`form-control ${this.state.inValidElments.includes('gender') ? 'invalid' : '' }`}
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        
                                    </div>
                                    {
                                            this.state.inValidElments.includes('gender') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.validationMessage['gender']}
                                                </div>
                                            ): null 
                                        }
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="form-group" style={{marginTop:'2.6rem'}}>
                                        <label htmlFor="emailAddress"  className="rl-label required">Email Address</label>
                                        <input type="email" id="email_address2" className={`form-control ${this.state.inValidElments.includes('emailAddress') ? 'invalid' : '' }`} value={this.state.emailAddress} name="emailAddress" onChange={this.handleInputChange} placeholder="Enter your email address here..."/>
                                    </div>
                                    {
                                        this.state.inValidElments.includes('emailAddress') ?
                                        (
                                            <div className="error-message required">
                                                {this.state.validationMessage['emailAddress']}
                                            </div>
                                        ): null 
                                    }
                                    
                                    
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6 col-sm-12">
                                    <div className="form-group" style={{marginTop:'2.6rem'}}>
                                        <label htmlFor="phoneNumber" className="rl-label required">Phone Number</label>
                                         <input type="text" id="phoneNumber" className={`form-control ${this.state.inValidElments.includes('phoneNumber') ? 'invalid' : '' }`} value={this.state.phoneNumber} name="phoneNumber" onChange={this.handleInputChange}  placeholder="Enter your phone number..."/>
                                    </div>
                                    {
                                        this.state.inValidElments.includes('phoneNumber') ?
                                        (
                                            <div className="error-message required">
                                                {this.state.validationMessage['phoneNumber']}
                                            </div>
                                        ): null 
                                    }
                                </div>
                                
                                <div className="form-group col-md-6 col-sm-12" style={{marginTop:'2.6rem'}}>
                                    <label htmlFor="country" className="rl-label required">Select Country</label>
                                    {/* <select name="country" className={`${this.state.inValidElments.includes('country') ? 'invalid' : '' }`} value={this.state.country} onChange={this.handleInputChange}>
                                        <option value="">Select country</option>
                                        <option value="Nigeria">Nigeria</option>
                                    </select> */}
                                    <ReactFlagsSelect
                                     searchable={true} searchPlaceholder={'Plese select country'} 
                                        className="react-flag"
                                        onSelect={this._countryCodeChange}
                                     />
                                    
                                </div>
                                {
                                        this.state.inValidElments.includes('country') ?
                                        (
                                            <div className="error-message required">
                                                {this.state.validationMessage['country']}
                                            </div>
                                        ): null 
                                    }
                            </div>
                            <div className="row">
                                
                                <div className="form-group col-md-6 col-sm-12">
                                    <label htmlFor="password" className="rl-label required">Password</label>
                                    <input type="password" id="password2" className={`form-control ${this.state.inValidElments.includes('password') ? 'invalid' : '' }`} name="password" value={this.state.password} onChange={this.handleInputChange}  placeholder="Enter your password here..."/>
                                    
                                </div>
                                {
                                    this.state.inValidElments.includes('password') ?
                                    (
                                        <div className="error-message required">
                                            {this.state.validationMessage['password']}
                                        </div>
                                    ): null 
                                }
                                <div className="form-group col-md-6 col-sm-12">
                                    <label htmlFor="repeatPassword" className="rl-label required">Repeat Password</label>
                                    <input type="password" id="repeat_password2" className={`form-control ${this.state.inValidElments.includes('repeatPassword') ? 'invalid' : '' }`} value={this.state.repeatPassword} name="repeatPassword" onChange={this.handleInputChange}  placeholder="Repeat your password here..."/>
                                    
                                </div>
                                {
                                    this.state.inValidElments.includes('repeatPassword') ?
                                    (
                                        <div className="error-message required">
                                            {this.state.validationMessage['repeatPassword']}
                                        </div>
                                    ): null 
                                }
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6 col-sm-12">
                                    <label htmlFor="referredBy" className="rl-label">Referral Code</label>
                                    <input type="text" id="referredBy" className={`form-control ${this.state.inValidElments.includes('referredBy') ? 'invalid' : ''}`} value={this.state.referredBy} name="referredBy" onChange={this.handleInputChange} placeholder="Enter your referral code..." />
                                    
                                </div>
                                {
                                    this.state.inValidElments.includes('referredBy') ?
                                        (
                                            <div className="error-message required">
                                                {this.state.validationMessage['referredBy']}
                                            </div>
                                        ) : null
                                }
                            </div>
                        </div>
                            
                            <div className="terms-condition-container">
                                <input type="checkbox" id="agreeToTerms"
                                    name="i agree" value="sellers" checked={this.state.agreeToTerms} />
                                <label className="label-check" onClick={(event) => this.agreeTotermsChange(event)}>
                                    <span className="checkbox primary primary"><span></span></span>
                                    I agree to
                                </label>
                                <span className="terms">
                                    terms, condition and privacy policy
                                </span>
                            </div>
                            <p style={{margin:'0px 0px', textAlign:'center'}}>Have an account? 
                                <Link style={{color:'#00d7b3', cursor:'pointer'}} to="/users/login"> Login</Link></p>
                            <div style={{textAlign:'center'}}>
                                <button className="btn btn-primary" style={{margin: '20px auto', width:'50%', maxWidth: 400}} onClick={this.handleFormSubmit}>Register <span className="primary">Now!</span></button>
                            </div>
                            
                        </form>
                        
                    </div>
                    <Snackbar
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={this.state.error}
                        autoHideDuration={6000}
                    >
                        <SnackbarContent
                            className={`${classes['warning']}`}
                            aria-describedby="client-snackbar"
                            message={
                                <span id="client-snackbar" className={classes.message}>
                                    <ErrorIcon className={`${classes.icon} ${classes.iconVariant}`} />
                                    {this.props.errorMessage}
                                </span>
                            }
                            action={[
                                <IconButton key="close" aria-label="close"  onClick={this.closeSnackBar}  color="inherit">
                                    <CloseIcon className={classes.icon}/>
                                </IconButton>
                            ]}
                            />
                    </Snackbar>
                </div>
                </div>
                <Footer />
                </div>
        );
    }
}

const mapStateToProps = state => {
    const {reg: { loading, error, errorMessage, redirectToVerify}} = state;
    return {
        loading,
        error,
        errorMessage,
        redirectToVerify
    }
}
const styles = theme => ({
    warning: {
        backgroundColor: amber[700],
      },
      icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
})
export default connect(mapStateToProps, actions)(withStyles(styles)((withToastManager(Register))))