import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withToastManager } from 'react-toast-notifications';
import CustomInput from "../../common/CustomInput";
import { Redirect, Link } from "react-router-dom";
import Header from "../HeaderFooter/Header";

class SellerSignUp extends Component {
    state = {
        questions: [],
        inValidElments: [],
        validationMessage: {},
        container: 'form',
        pincode: '',
        companyName:'',
        headOfficeAddress:'',
        contactLine: '',
        showSpinner: false
    }
    componentDidMount(){
        this.props.getSecurityQuestions()
    }
    handleInputChange = (event) => {
        const {target: { name, value}} = event;

        const index = this.state.inValidElments.indexOf(name)
        let newInvalidElements = []
        newInvalidElements = [...this.state.inValidElments]
        if(index !== -1){
            this.state.inValidElments.splice(index, 1)
        }
        newInvalidElements = [...this.state.inValidElments]
        if(name === 'pincode' || name === 'companyName' 
            || name === 'headOfficeAddress' || name === 'contactLine'){
            return this.setState({
                [name]: value
            })
        }
        if(this.state.questions.length <= 0){
            this.setState({
                questions : [{question_id: name, answer: value}],
                newInvalidElements
            })
        }else{
            let newQuestion = []
            const index = this.state.questions.findIndex(({question_id}) => question_id === name)
            if(index !== -1){
                newQuestion = this.state.questions;
                newQuestion.splice(index, 1)
                this.setState({
                    questions: [...newQuestion, {[name]: value}],
                    newInvalidElements
                })
            }
            this.setState({
                questions: [...this.state.questions, {question_id: name, answer: value}],
                newInvalidElements
            })
        }
    }
     validateFormData = (FormData) => {
        let isValid = true;
        let requiredField = []
        if(FormData.companyName.trim() === ''){
            isValid = false;
            requiredField.push('companyName')
        }
        if(FormData.headOfficeAddress.trim() === ''){
            isValid = false;
            requiredField.push('headOfficeAddress')
        }
        if(FormData.contactLine.trim() === ''){
            isValid = false;
            requiredField.push('companyName')
        }
        this.setState({
            inValidElments: [ ...requiredField]
        })
        return isValid
    }
    closeSpinner = () => {
        this.setState({
            showSpinner: false
        })
        return null
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        const {toastManager: { add}} = this.props;
        const isValid = this.validateFormData(this.state)
        if(isValid){
            console.log('form is valid')
            console.log('security questions', this.state)
            //call the api
            this.props.initiateRegistration()
            const referredBy = this.state.referredBy
            const companyName = this.state.companyName;
            const headOfficeAddress = this.state.headOfficeAddress;
            const contactLine = this.state.contactLine;
            const sellerIdentification = ''
            this.props.updateUserType({ referredBy, companyName, 
                headOfficeAddress, contactLine, sellerIdentification
            }, 'seller')
            
            //naviagate the user to profile page
            //call the api
        }else{
            //form is not valid display error
            
            this.props.renderError('One or more fields not filled, please cheack and try again')
        }
    }
    render() {
        return (
            <div>
                <Header />
                
                <div className="router-container">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                                <li className="breadcrumb-item" aria-current="page"><Link to="/users/profile">Dashboard</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Seller Signup</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="form-popup custom-input" style={{
                        width: '80%', paddingBottom: '20px',
                        maxWidth: '800px'
                    }}>
                        <div className="form-popup-headline secondary">
                            <h2>Signup to be a Seller!</h2>
                        </div>
                        <div className="container">
                        <form action="#">
                            <div className="row">
                                <div className="col-sm-11">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required-field">
                                                <label htmlFor="acc-name">Company Name</label>
                                                <input type="text" value={this.state.companyName} onChange={this.handleInputChange} placeholder="company name" className="form-control" id="acc-name" name="companyName" required="" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group required-field">
                                                <label htmlFor="acc-mname">Head Office Address</label>
                                                <input type="text" value={this.state.headOfficeAddress} onChange={this.handleInputChange} placeholder="head office address" className="form-control" id="acc-mname" name="headOfficeAddress" />
                                            </div>
                                        </div>

                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-11">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required-field">
                                                <label htmlFor="acc-lastname">Contact Number</label>
                                                <input type="text" value={this.state.contactLine} onChange={this.handleInputChange} placeholder="contact line" className="form-control" id="acc-lastname3" name="contactLine" required="" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="acc-lastname">Referred By</label>
                                                <input type="text" value={this.state.referredBy} onChange={this.handleInputChange} placeholder="referral" className="form-control" id="acc-lastname4" name="referredBy" required="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mb-2"></div>
                            <div className="required text-right">* Required Field</div>
                            <div className="form-footer">
                                <Link to="/users/profile"><i className="icon-angle-double-left"></i>Back</Link>

                                <div className="form-footer-right">
                                    <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

const mapStateToProps = state => {
    const {reg:{ loading, error, errorMessage, successMessage,
        questions, showSuccessBar, redirectToLogin, unAuthorized}} = state;
    return {
        loading,
        error, 
        errorMessage,
        showSuccessBar,
        successMessage,
        questions,
        redirectToLogin,
        unAuthorized
    }
}

export default connect(mapStateToProps,actions)(withToastManager(SellerSignUp))