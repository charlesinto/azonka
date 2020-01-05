import React, { Component } from 'react';
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import queryString from "query-string";
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Validator from 'validator';
import * as actions from "../../actions";
import { connect } from "react-redux";

class LoginSignup extends Component {
    state={tab:'login', callingCode:'',
     countryData: [],
     extendedUserType: 'user',
     register: {emailAddress:'',
            phoneNumber:'',
            extendedUserType: 'user',
            referredBy:'',
            repeatPassword: '',
            firstName:'',
            lastName: '',
            gender:'Male',
            password:'',
            companyName:'',
            headOfficeAddress:'',
            contactLine: '',
            country:'Nigeria',
            inValidElments: [],
            validationMessage: {},
            countryCode:'234',
            isoCode:'NGA',
        },
    login: {
        emailAddress:'',
        password:'',
        validationMessage: {},
        inValidElments: []
    },
     validationMessage: {},
     agreeToTerms: false,
     showSpinner: false
    }
    handleChange = (value, target, event = null, selected=null) => {
        switch(target){
            case 'tab':
                this.setState({tab: value})
            break;
            default:
                return;
        }
    }
    hanldeInputChange = (event, newValue) => {
        switch(event.target.name){
            case 'country':
                this.setState({
                    selected: {
                        code:  newValue.props.children[1],
                        img: newValue.props.children[0].props.src,
                        alt: newValue.props.children[0].props.alt
                    },
                    callingCode: newValue.props.children[1]
                })
            break;
        }
    }
    componentDidMount(){
        const query = queryString.parse(this.props.location.search)
        if (query['referral']) {
            this.setState({
                register: {...this.state.register, referredBy: query['referral']}
            })
        } 
        fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(data => {
                // data.sort((element1, element2)=> {
                //     return element1.callingCodes[0] - element2.callingCodes[0]
                // })
                this.setState({
                    countryData: data
                })
            })
    }
    handleInputChange = (event, form) => {
        const {target: { name, value}} = event;
        if(form === 'login'){
           const index = this.state.login.inValidElments.indexOf(name)
            let newInvalidElements = []
                    if(index !== -1){
                        this.state.login.inValidElments.splice(index, 1)
                    }
                    newInvalidElements = [...this.state.login.inValidElments]
                this.setState({
                    'login': {...this.state.login, [name]: value,
                        inValidElments: newInvalidElements
                    },
                    
                })
        }
        else if(form === 'register'){
            const index = this.state.register.inValidElments.indexOf(name)
                let newInvalidElements = []
                if(index !== -1){
                    this.state.register.inValidElments.splice(index, 1)
                }
                newInvalidElements = [...this.state.register.inValidElments]
                if(name === 'countryCode'){
                    let country = ''
                    let isoCode = ''
                    fetch(`https://restcountries.eu/rest/v2/callingcode/${value}`)
                        .then(res => res.json())
                        .then(data => {
                            country = data.name;
                            isoCode = data.alpha2Code;
                            this.setState({
                                'register': {...this.state.register, [name]: value,
                                country, isoCode, inValidElments: newInvalidElements},
                            })
                        })
                        .catch(err => console.log(err))
                }else{
                    this.setState({
                        'register': {...this.state.register, [name]: value,
                            inValidElments: newInvalidElements},
                        
                    })
                }
        }
        
        
    }
    handleFormSubmit = (e, form) => {
        e.preventDefault();
        if(form === 'login'){
           const validationResponse = this.validateFormData(this.state.login, 'login')
                const { isValid} = validationResponse;
                if(!isValid){
                    const { inValidElments, validationMessage} = validationResponse
                    this.props.renderError('Incomplete Details, please check and try again')
                    return  this.setState({
                        login: {
                            ...this.state.login,
                            inValidElments,
                            validationMessage
                        }
                    })
                }
                this.props.initiateRegistration()
                //call the api
                const {emailAddress, password} = this.state.login
                this.props.login({emailAddress, password})
        }
        else if(form === 'register'){
            const validationResponse = this.validateFormData(this.state.register, 'register')
                const { isValid} = validationResponse;
                if(!isValid){
                    const { inValidElments, validationMessage} = validationResponse
                    this.props.renderError('Incorrect data provided, Please check and try again');
                    
                   return  this.setState({
                        register: {
                           ...this.state.register, inValidElments, validationMessage
                        }
                    })
                }
                else if(!this.state.agreeToTerms){
                   return this.props.renderError('You must agree to terms and policy')
                }else{
                    //call the api
                    const { emailAddress, phoneNumber, referredBy, 
                        password, repeatPassword, extendedUserType, 
                        headOfficeAddress, companyName, firstName, lastName, gender,country, countryCode,isoCode,
                         contactLine} = this.state.register;
                        localStorage.setItem('userRegDetails', JSON.stringify({
                            emailAddress, phoneNumber, referredBy, contactLine,
                            headOfficeAddress, companyName, extendedUserType, password, repeatPassword,
                            firstName, lastName, gender, country, countryCode, isoCode
                        }))
                    this.props.initiateRegistration()
                    return this.props.registerUser({
                        emailAddress, phoneNumber, referredBy, password,
                        repeatPassword, type:extendedUserType, headOfficeAddress, companyName,
                        firstName, lastName, gender, contactLine, profileImage:'',
                        country, countryCode, isoCode
                    })
                }
        }
        
    }
    validateFormData = (formdata, form) => {
        if(form === 'login'){
            const { emailAddress, password,} = formdata;
                let isValid = true;
                const inValidElments = []
                const validationMessage = {}
                if(!(emailAddress.trim() !== '' && Validator.isEmail(emailAddress))){
                    isValid = false
                    inValidElments.push('emailAddress')
                    
                    validationMessage['emailAddress'] = 'Email is required or not in right format'
                }
                if(!(password.trim() !== '')){
                    isValid = false;
                    inValidElments.push('password')
                    validationMessage['password'] = 'Password is required'
                }
                return {
                    isValid,
                    validationMessage,
                    inValidElments,
                    formdata
                }
        }
        else if(form === 'register'){
            const { emailAddress, phoneNumber, password, repeatPassword, headOfficeAddress,
                contactLine, companyName, extendedUserType,gender,country, firstName, lastName} = formdata;
                let isValid = true;
                const inValidElments = []
                const validationMessage = {}
                if(!(emailAddress && emailAddress.trim() !== '' && Validator.isEmail(emailAddress))){
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
                if(!(password.trim() !== '')){
                    isValid = false;
                    inValidElments.push('password')
                    validationMessage['password'] = 'Password is required'
                }
                if(!(repeatPassword === password)){
                    isValid = false
                    inValidElments.push('repeatPassword')
                    validationMessage['repeatPassword'] = 'Repeat Password and Password do not match'
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
        
    }

    toggleCheck = () => {
        this.setState({
            agreeToTerms: !this.state.agreeToTerms
        })
    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <Header />
                <div className="router-container mfp-content" style={{
                    display: 'block',
                    zIndex: 1
                }}>

                    <div className="modal-wrapper" style={{ padding: '2rem 0 2rem 0rem' }}>
                        <div className="container">
                            <div className="destktop-form" >
                                <div className="row">
                                    <div className="col-md-6">
                                        <h2 className="title mb-2">Login</h2>

                                        <form action="#" className="mb-1">
                                            <label htmlFor="login-email">Email address <span className="required">*</span></label>
                                            <input name='emailAddress' value={this.state.login.emailAddress} onChange={(e) => this.handleInputChange(e, 'login')} type="email" className="form-input form-wide mb-2" id="login-email" required="" />
                                            {
                                                this.state.login.inValidElments.includes('emailAddress') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.login.validationMessage['emailAddress']}
                                                    </div>
                                                ): null 
                                            }
                                            <label htmlFor="login-password">Password <span className="required">*</span></label>
                                            <input name='password' value={this.state.login.password} onChange={(e) => this.handleInputChange(e, 'login')} type="password" className="form-input form-wide mb-2" id="login-password" required="" />
                                            {
                                                this.state.login.inValidElments.includes('password') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.login.validationMessage['password']}
                                                    </div>
                                                ): null 
                                            }
                                            <div className="form-footer" style={{marginBottom:'0.5rem'}}>
                                                <button type="submit" onClick={(e) => this.handleFormSubmit(e, 'login')} className="btn btn-primary btn-md">LOGIN</button>

                                                {/* <div className="custom-control custom-checkbox form-footer-right">
                                                    <input type="checkbox" className="custom-control-input" id="lost-password" />
                                                    <label className="custom-control-label form-footer-right" for="lost-password">Remember Me</label>
                                                </div> */}
                                            </div>
                                            <Link to="/users" style={{ display: 'block', width: '100%', textAlign: 'center' }} className="forget-password"> Forgot your password?</Link>
                                        </form>
                                    </div>

                                    <div className="col-md-6" style={{borderLeft:'1px solid #f3f3f3'}}>
                                        <h2 className="title mb-2">New To Azonka? Create Account..</h2>

                                        <div className="form-footer" style={{marginBottom:'0.5rem', marginTop: '5rem'}}>
                                            <Link to="/users/register" className="btn btn-primary">CREATE ACCOUNT</Link>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="social-login-wrapper">
                                    <p style={{ textAlign: 'center' }}>Access your account through  your social networks.</p>
                                    <div style={{ textAlign: 'center' }}>
                                        <div className="btn-group">
                                            <a className="btn btn-social-login btn-md btn-gplus mb-1"><i className="icon-gplus"></i><span>Google</span></a>
                                            <a className="btn btn-social-login btn-md btn-facebook mb-1"><i className="icon-facebook"></i><span>Facebook</span></a>
                                            <a className="btn btn-social-login btn-md btn-twitter mb-1"><i className="icon-twitter"></i><span>Twitter</span></a>
                                        </div>
                                    </div>

                                </div> */}
                            </div>
                            <div className="mobile-form">
                                <div style={{display:'flex', justifyContent:'center', width:"100%"}}>
                                    <Tabs value={this.state.tab}
                                        className={classes.tab}
                                        TabIndicatorProps={{
                                            style:{
                                                backgroundColor:'#08c'
                                            }
                                        }}
                                        onChange={(value, newValue) => this.handleChange(newValue,'tab', value)}
                                    aria-label="wrapped label tabs example">
                                        
                                        <Tab  
                                            
                                            className={classes.tab} value="login" 
                                            label="Login" {...a11yProps('login')} />
                                        <Tab 
                                            className={classes.tab} value="signup" 
                                                label="Create Account" {...a11yProps('signup')} />
                                    </Tabs>
                                </div>
                                <TabPanel value={this.state.tab} index="login">
                                    <form action="#" className="mb-1">
                                            <label htmlFor="login-email3">Email address <span className="required">*</span></label>
                                            <input name='emailAddress' value={this.state.login.emailAddress} onChange={(e) => this.handleInputChange(e, 'login')} type="email" className="form-input form-wide mb-2" id="login-email3" required="" />
                                            {
                                                this.state.login.inValidElments.includes('emailAddress') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.login.validationMessage['emailAddress']}
                                                    </div>
                                                ): null 
                                            }
                                            <label htmlFor="login-password3">Password <span className="required">*</span></label>
                                            <input name='password' value={this.state.login.password} onChange={(e) => this.handleInputChange(e, 'login')} type="password" className="form-input form-wide mb-2" id="login-password3" required="" />
                                            {
                                                this.state.login.inValidElments.includes('password') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.login.validationMessage['password']}
                                                    </div>
                                                ): null 
                                            }
                                            <div className="form-footer" style={{marginBottom:'0.5rem'}}>
                                                <button type="submit" onClick={(e) => this.handleFormSubmit(e, 'login')} className="btn btn-primary btn-md">LOGIN</button>

                                                {/* <div className="custom-control custom-checkbox form-footer-right">
                                                    <input type="checkbox" className="custom-control-input" id="lost-password" />
                                                    <label className="custom-control-label form-footer-right" for="lost-password">Remember Me</label>
                                                </div> */}
                                            </div>
                                            <a href="#" style={{ display: 'block', width: '100%', textAlign: 'center' }} className="forget-password"> Forgot your password?</a>
                                    </form>
                                </TabPanel>
                                <TabPanel value={this.state.tab} index="signup">
                                    <form action="#">
                                        <label htmlFor="register-firstname5">First Name<span className="required">*</span></label>
                                        <input name='firstName' value={this.state.register.firstName} onChange={(e) => this.handleInputChange(e, 'register')} type="text" className="form-input form-wide mb-2" id="register-firstname5" required="" />
                                        {
                                            this.state.register.inValidElments.includes('firstName') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.register.validationMessage['firstName']}
                                                </div>
                                            ): null 
                                        }
                                        <label htmlFor="register-lastname5">Last Name<span className="required">*</span></label>
                                        <input name='lastName' value={this.state.register.lastName} onChange={(e) => this.handleInputChange(e, 'register')} type="text" className="form-input form-wide mb-2" id="register-lastname5" required="" />
                                        {
                                            this.state.register.inValidElments.includes('lastName') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.register.validationMessage['lastName']}
                                                </div>
                                            ): null 
                                        }
                                        <label htmlFor="gender">Gender<span className="required">*</span></label>
                                        <select name='gender' value={this.state.register.gender} onChange={(e) => this.handleInputChange(e, 'register')} className="" id="gender">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {
                                            this.state.register.inValidElments.includes('gender') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.register.validationMessage['gender']}
                                                </div>
                                            ): null 
                                        }
                                        <label htmlFor="register-country5">Country<span className="required">*</span></label>
                                        <select name='countryCode' value={this.state.register.countryCode} onChange={(e) => this.handleInputChange(e, 'register')} className="" id="register-country5">
                                            <option value="">Select country</option>
                                            {
                                                this.state.countryData.map(data => {
                                                    if(data.callingCodes[0].trim() === ''){
                                                        return ;
                                                    }
                                                    return <option value={data.callingCodes[0]}>{data.name}</option>
                                                })
                                            }
                                        </select>
                                        {
                                            this.state.register.inValidElments.includes('country') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.register.validationMessage['country']}
                                                </div>
                                            ): null 
                                        }
                                        <label htmlFor="register-phonenumber5">Phone Number<span className="required">*</span></label>
                                        
                                        <input name='phoneNumber' value={this.state.register.phoneNumber} onChange={(e) => this.handleInputChange(e, 'register')} type="text" className="form-input form-wide mb-2" id="register-phonenumber5" required="" />
                                        {
                                            this.state.register.inValidElments.includes('phoneNumber') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.register.validationMessage['phoneNumber']}
                                                </div>
                                            ): null 
                                        }
                                        <label htmlFor="register-email5">Email address <span className="required">*</span></label>
                                        <input name='emailAddress' value={this.state.register.emailAddress} onChange={(e) => this.handleInputChange(e, 'register')} type="email" className="form-input form-wide mb-2" id="register-email5" required />
                                        {
                                            this.state.register.inValidElments.includes('emailAddress') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.register.validationMessage['emailAddress']}
                                                </div>
                                            ): null 
                                        }
                                        <label htmlFor="register-password5">Password <span className="required">*</span></label>
                                        <input name='password' value={this.state.register.password} onChange={(e) => this.handleInputChange(e, 'register')} type="password" className="form-input form-wide mb-2" id="register-password5" required="" />
                                        {
                                            this.state.register.inValidElments.includes('password') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.register.validationMessage['password']}
                                                </div>
                                            ): null 
                                        }
                                        <label htmlFor="register-repeatpassword5">Repeat Password<span className="required">*</span></label>
                                        <input name='repeatPassword' value={this.state.register.repeatPassword} onChange={(e) => this.handleInputChange(e, 'register')} type="password" className="form-input form-wide mb-2" id="register-repeatpassword5" required="" />
                                        {
                                            this.state.register.inValidElments.includes('repeatPassword') ?
                                            (
                                                <div className="error-message required">
                                                    {this.state.register.validationMessage['repeatPassword']}
                                                </div>
                                            ): null 
                                        }
                                        <label htmlFor="register-code5">Referral Code</label>
                                        <input name='referredBy' value={this.state.register.referredBy} onChange={(e) => this.handleInputChange(e, 'register')} type="text" className="form-input form-wide mb-2" id="register-code5" required="" />
                                        <div className="form-footer" style={{marginBottom:'0.5rem'}}>
                                            <button onClick={(e) => this.handleFormSubmit(e, 'register')} type="submit" className="btn btn-primary btn-md">Register</button>

                                            <div className="custom-control custom-checkbox">
                                                <input checked={this.state.agreeToTerms} onChange={this.toggleCheck} type="checkbox" className="custom-control-input" id="newsletter-signup1" />
                                                <label className="custom-control-label" for="newsletter-signup1">
                                                    <a href="#">I agree to Terms and Policy</a></label>
                                            </div>
                                        </div>
                                    </form>
                                </TabPanel>
                            </div>
                        </div>


                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  function a11yProps(index) {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }

const contentStyle = {
    form:{
        marginBottom: 20,
         marginTop: 40
    },
    formCaption: {
        color: '#08c',
        fontSize: '1.65rem',
        fontWeight: 700,
        textTransform:'capitalize',
        textAlign:'center',
        fontFamily: "Titillium Web, sans-serif",
    },
    form1: {
        borderRight: '1px solid #f3f3f3',
    },
    form2: {
        paddingLeft: 30
    }
}

const styles = theme => {
    return {
        ...theme.spreadIt,
        button: {
            marginTop: 30,
            paddingTop: 12,
            paddingLeft: 16,
            paddingBottom: 12,
            paddingRight: 12,
            '& > *': {
                fontFamily: "Titillium Web, sans-serif",
                fontSize: '1.65rem'
            }
        },
        root: {
            fontFamily: "Titillium Web, sans-serif",
            fontSize: '1.25rem',
            '& > *': {
              width: '100%',
              marginBottom: 20,
              fontFamily: "Titillium Web, sans-serif",
              fontSize: '1.25rem',
              fontWeight: 500
            },
            label:{
                fontSize: '2rem'
            }
          },
        select: {
            marginTop: 60
        },
        formButton: {
            marginTop: 30
        },
        tab:{
            fontFamily: "Titillium Web, sans-serif",
            '& > *':{
                fontFamily: "Titillium Web, sans-serif",
                fontSize: '1.35rem',
            }
        },
        textStyle: {
            fontFamily: "Titillium Web, sans-serif",
            fontSize:'1.35rem'
            
        }
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(withStyles(styles)(LoginSignup));
