import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import Validator from "validator";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import queryString from "query-string";
import * as actions from "../../actions";
import ErrorAlert from "../../common/ErrorAlert";
import SuccessAlert from "../../common/SuccessAlert";
import { Link, Redirect } from 'react-router-dom';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

class ResetPassword extends Component {
    state = {
        emailAddress: '',
        newPassword: '',
        inValidElments: [],
        validationMessage:{},
        rememberPassword: true,
        showModal: false,
        resetPwdEmail: '',
        passwordResetToken: ''
    }
    componentDidMount(){
        const query = queryString.parse(this.props.location.search)
        if(!query['token']){
            return this.props.history.push('/users/login')
        }
        this.setState({
            passwordResetToken: query['token']
        })
    }
    validateFormData = (formdata) => {
        const { emailAddress, newPassword, passwordResetToken} = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if(!(emailAddress.trim() !== '' && Validator.isEmail(emailAddress))){
            isValid = false
            inValidElments.push('emailAddress')
            
            validationMessage['emailAddress'] = 'Email required or not in right format'
        }
        if(!(newPassword.trim() !== '')){
            isValid = false;
            inValidElments.push('newPassword')
            validationMessage['newPassword'] = 'Password required'
        }
        if(!(passwordResetToken.trim() !== '')){
            isValid = false;
            inValidElments.push('passwordResetToken')
            validationMessage['passwordResetToken'] = 'Please provide token'
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

        //call the api
        const {emailAddress, newPassword, passwordResetToken} = this.state
        this.props.resetPasswordWithToken({emailAddress, newPassword, passwordResetToken})
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
        this.props.closeSnackBar()
    }
    render() {
        return (
            <div>
                <Header/>

                <div className="router-container">
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html"><i className="icon-home"></i></a></li>
                            <li className="breadcrumb-item active" aria-current="page">Reset Password</li>
                        </ol>
                    </div>
                </nav>
            <div className="form-popup custom-input">
                <div className="form-popup-headline secondary">
                    <h2>Reset Your Password</h2>
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
                        <label htmlFor="newPassword" className="rl-label">New Password</label>
                        <input type="password" id="newPassword5" 
                            className={`${this.state.inValidElments.includes('newPassword') ? 'invalid' : '' }`} 
                            value={this.state.newPassword} onChange={this.handleInputChange} 
                            name="newPassword" placeholder="Enter your password here..." />
                        {
                                this.state.inValidElments.includes('newPassword') ?
                                (
                                    <div className="error-message required">
                                        {this.state.validationMessage['newPassword']}
                                    </div>
                                ): null 
                        }
                        <button className="button mid secondary" onClick={this.handleFormSubmit}>Reset Password <span className="primary">Now!</span></button>
                        <p style={{textAlign:'center', margin:'15px 0px'}}>Have an Account?
                                <Link to="/users/login" style={{color:'#00d7b3', cursor:'pointer'}}> Login</Link></p>
                    </form>
                    <hr className="line-separator double" />
                </div>
                <SuccessAlert 
                    open={this.props.showSuccessBar} closeSnackBar={this.closeSnackBar}
                    message={this.props.successMessage} 
                />
                <ErrorAlert open={this.props.error} closeSnackBar={this.closeSnackBar} errorMessage={this.props.errorMessage} />
                {
                    this.props.redirectToLogin ? <Redirect to="/users/login" />: null
                }
            </div>
            </div>
            <Footer/>
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

const mapStateToProps = state => {
    const {reg:{ loading,redirectToLogin, error, errorMessage, successMessage, showSuccessBar}} = state;
    return {
        loading,
        error, 
        errorMessage,
        showSuccessBar,
        successMessage,
        redirectToLogin
    }
}
export default connect(mapStateToProps, actions)(withStyles(styles)(withToastManager(ResetPassword)))