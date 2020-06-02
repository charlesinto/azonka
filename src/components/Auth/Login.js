import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import Validator from "validator";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Link,  } from 'react-router-dom';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

class Login extends Component {
    state = {
        emailAddress: '',
        password: '',
        inValidElments: [],
        validationMessage:{},
        rememberPassword: true,
        showModal: false,
        resetPwdEmail: '',
        showSpinner: false
    }
    validateFormData = (formdata) => {
        const { emailAddress, password,} = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if(!(emailAddress.trim() !== '' && Validator.isEmail(emailAddress))){
            isValid = false
            inValidElments.push('emailAddress')
            
            validationMessage['emailAddress'] = 'Email required or not in right format'
        }
        if(!(password.trim() !== '')){
            isValid = false;
            inValidElments.push('password')
            validationMessage['password'] = 'Password required'
        }
        return {
            isValid,
            validationMessage,
            inValidElments,
            formdata
        }
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const {add} = this.props.toastManager;
        const userData = {...this.state}

        const validationResponse = this.validateFormData(userData)
        const { isValid} = validationResponse;
        if(!isValid){
            const { inValidElments, validationMessage} = validationResponse
            add('form invalid, please check and try again', { appearance: 'error' })
           return  this.setState({
                inValidElments,
                validationMessage
            })
        }
        this.props.initiateRegistration()
        //call the api
        const {emailAddress, password} = this.state
        this.props.login({emailAddress, password})
    }
    resendEmailPassword = e => {
        e.preventDefault()
        const {resetPwdEmail} = this.state;
        const {add} = this.props.toastManager;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if(!(resetPwdEmail.trim() !== '' && Validator.isEmail(resetPwdEmail))){
            isValid = false
            inValidElments.push('resetPwdEmail')
            add('Incorrect email address, please check and try again', { appearance: 'error' })
            validationMessage['resetPwdEmail'] = 'Email required or not in right format'
            return this.setState({
                inValidElments,
                validationMessage
            })
        }
        if(isValid){
            //call the api
            this.props.forgotPassword(resetPwdEmail)
        }
    }
    handleInputChange = (event) => {
        const {target: { name, value}} = event;
        const index = this.state.inValidElments.indexOf(name)
        let newInvalidElements = []
        if(index !== -1){
            this.state.inValidElments.splice(index, 1)
        }
        newInvalidElements = [...this.state.inValidElments]
        this.setState({
            [name] : value,
            newInvalidElements
        })
    }
    toggleRememberPassword = e => {
        this.setState({
            rememberPassword: !this.state.rememberPassword
        })
    }
    handleClose = () => {}
    toggleCheckbox = e => {}
    toggleModal = () => {
        this.setState({
            showModal: true
        })
    }
    clearSpinner = () => {
        this.setState({
            showSpinner: false
        })
        return null
    }
    closeModal = () => {
        const index = this.state.inValidElments.indexOf('resetPwdEmail')
        let newInvalidElements = []
        if(index !== -1){
            this.state.inValidElments.splice(index, 1)
        }
        newInvalidElements = [...this.state.inValidElments]
        this.setState({
            showModal: false,
            newInvalidElements
        })
    }
    closeSnackBar = () => {
        this.setState({
            showSpinner: false
        })
        this.props.closeSnackBar()
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
                            <li className="breadcrumb-item"><a href="index.html"><i className="icon-home"></i></a></li>
                            <li className="breadcrumb-item active" aria-current="page">Login</li>
                        </ol>
                    </div>
                </nav>
                
            <div className="form-popup custom-input">
                <div className="form-popup-headline secondary">
                    <h2>Login to your Account</h2>
                    <p>Enter now to your account and start buying and selling!</p>
                </div>
                <div className="form-popup-content">
                    <form id="login-form2">
                        <label htmlFor="emailAddress" className="rl-label">Email Adress</label>
                        <input type="email" id="emailAddress"
                             className={`${this.state.inValidElments.includes('emailAddress') ? 'invalid' : '' }`}
                              value={this.state.emailAddress} onChange={this.handleInputChange} 
                              name="emailAddress" placeholder="Enter your email here..." />
                        {
                                this.state.inValidElments.includes('emailAddress') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['emailAddress']}
                                    </div>
                                ): null 
                        }
                        <label htmlFor="password" className="rl-label">Password</label>
                        <input type="password" id="password5" 
                            className={`${this.state.inValidElments.includes('password') ? 'invalid' : '' }`} 
                            value={this.state.password} onChange={this.handleInputChange} 
                            name="password" placeholder="Enter your password here..." />
                        {
                                this.state.inValidElments.includes('password') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['password']}
                                    </div>
                                ): null 
                        }
                        <input type="checkbox" id="remember2" onChange={this.toggleCheckbox} name="remember2" checked={this.state.rememberPassword} />
                        <label htmlFor="remember2" className="label-check" onClick={this.toggleRememberPassword}>
                            <span className="checkbox primary primary"><span></span></span>
                            Remember username and password
						</label>
                        <p>Forgot your password? <span style={{cursor:'pointer'}} onClick={this.toggleModal} className="primary">Click here!</span></p>
                        <button className="button mid secondary" onClick={this.handleFormSubmit}>Login <span className="primary">Now!</span></button>
                        <p style={{textAlign:'center', margin:'15px 0px'}}>New to Azonka?
                                <Link to="/users/register" style={{color:'#00d7b3', cursor:'pointer'}}>  Create your account</Link></p>
                    </form>
                    <hr className="line-separator double" />
                </div>
                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className={classes.modal}
                    open={this.state.showModal}
                    onClose={() => this.handleClose()}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={this.state.showModal}>
                    <div className={` ${classes.paper}`}>
                        <div className="form-popup-content">
                            <h4 className="popup-title"><div>Restore your Password</div>
                                <div style={{cursor: 'pointer'}} className="close-modal" onClick={this.closeModal}>&times;</div>
                            </h4>
                            <hr className="line-separator short" />
                            
                            <form id="restore-pwd-form">
                                <label htmlFor="resetPwdEmail" className="rl-label">Email Address</label>
                                <input type="email" className={`${this.state.inValidElments.includes('resetPwdEmail') ? 'invalid' : '' }`}
                                 id="resetPwdEmail" value={this.state.resetPwdEmail} onChange={this.handleInputChange} 
                                 name="resetPwdEmail" placeholder="Enter your email address..." />
                                {
                                    this.state.inValidElments.includes('resetPwdEmail') ?
                                    (
                                        <div className="error-message required">
                                            {this.state.validationMessage['resetPwdEmail']}
                                        </div>
                                    ): null 
                                }
                                <button onClick={this.resendEmailPassword} style={{marginTop:'5%'}} className="button mid dark no-space">Restore your <span className="primary">Password</span></button>
                            </form>
                        </div>
                    </div>
                    </Fade>
                </Modal>
            </div>
            </div>
            <Footer />
            </div>
        );
    }
}
const styles = theme => ( {
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        maxWidth: '600px',
        margin: '0 auto'
      },
      paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #fff',
        borderRadius: '4px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '100%',
        position: 'relative'
      },
      title: {
          color: '#000'
      }
    }
)
//redirectToVerify
const mapStateToProps = state => {
    const {reg:{ loading, error, errorMessage,redirectToProfile,
        redirectToVerify, successMessage, showSuccessBar}} = state;
    return {
        loading,
        error, 
        errorMessage,
        showSuccessBar,
        successMessage,
        redirectToProfile,
        redirectToVerify
    }
}
export default connect(mapStateToProps, actions)(withStyles(styles)(withToastManager(Login)))