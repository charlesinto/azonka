import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withToastManager } from 'react-toast-notifications';
import CustomInput from "../../common/CustomInput";
import Header from "../HeaderFooter/Header";
import { Link } from "react-router-dom";

class AgentSignUp extends Component {
    state = {
        error: null,
        file: null,
        questions: [],
        inValidElments: [],
        validationMessage: {},
        pincode: '',
        showSpinner: false
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.fileUrl){
           nextProps.updateUserType({ agentIdentification: nextProps.fileUrl }, 'agent')
           return {...state, fileUrl: nextProps.fileUrl}
        }
        return null
    }
    componentDidMount(){
        this.props.getSecurityQuestions()
        this.fileInput = React.createRef();
    }
    closeSnackBar = () => {
        this.props.closeSnackBar()
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
    displayQuestions = () => {
        const keys = Object.keys(this.props.questions)
        return keys.map((element, index) => (
            <div key={index}>
                 <div>
                     <label className="rl-label required">
                     <span style={{paddingRight:8}}>
                     { index + 1}.</span>  {this.props.questions[element]}
                     </label>
                </div>
                 <CustomInput
                     onIputChange={this.handleInputChange}
                     name={element}
                     placeholder={this.props.questions[element]}
                     error={this.state.inValidElments.includes(`${element}`)}
                     errorMessage={'Required, please provide'}
                 />
            </div>))
    }
    renderQuestion = () => {
        return Object.keys(this.props.questions).length > 0 ?
         
             this.displayQuestions()
          : null
     }
     agreeTotermsChange = e => {
        this.setState({
            agreeToTerms: !this.state.agreeToTerms
        })
    }
     uploadId = e => {
         e.preventDefault()
         console.log('evebt', e.target.files[0])
         const file = e.target.files[0]
         const SUPPORTED_FILE_TYPES = ['image/png', 'image/jpeg']
         if(file){
            if(!SUPPORTED_FILE_TYPES.includes(file.type)){
                this.props.renderError('File type not supported. Supported file types are jpg, png, jpeg ')
                this.setState({
                    file: null,
                    error: true
                })
            }
            return this.setState({
                file : e.target.files[0],
                error: false
            })
          }else{
             return this.setState({
                  file : e.target.files[0],
                  error: false
              })
          }
          
     }
     validateFormData = (FormData) => {
        let isValid = true;
    
        return isValid
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        if(!this.state.agreeToTerms){
            return this.props.renderError('You must agree to Policy and Privacy')
        }
        if(this.state.error){
            return this.props.renderError('Please select file or file format not supported.')
        }
        //call the api
        this.props.initiateRegistration()
        this.props.fileuploadHandler(this.state.file, 'agentsId', 'agent')
        
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
                                <li className="breadcrumb-item active" aria-current="page">Agent Signup</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="form-popup custom-input" style={{ width: '80%',paddingBottom:'20px',
                maxWidth: '800px' }}>
                    <div className="form-popup-headline secondary">
                        <h2>Signup to be an Agent!</h2>
                    </div>
                    <form style={{ margin: '0 auto', width: '90%' }}>
                    <div style={{ padding: '20px 10px 0 10px' }}>
                            <h4 className="popup-title verify-email" style={{
                                fontWeight: 'normal',
                                fontFamily: 'Roboto, sans-serif'
                            }}>Upload ID</h4>
                            <hr className="line-separator" />
                        </div>
                        <div className="custom-file-input-button">
                            <input type="file" ref={this.fileInput}  name="agentID" value={this.state.agentID} onChange={this.uploadId} />
                        </div>
                        <div className="terms-condition-container">
                            <input type="checkbox" id="agreeToTerms"
                            onChange={(event) => this.agreeTotermsChange(event)} name="i agree" value="sellers" checked={this.state.agreeToTerms} />
                            <label className="label-check" onClick={(event) => this.agreeTotermsChange(event)}>
                                <span className="checkbox primary primary"><span></span></span>
                                I agree To
                                    </label>
                            <span className="terms">
                                Privacy and Policy
                                    </span>
                        </div>
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
            
        );
    }
}

const mapStateToProps = state => {
    const {reg:{ loading, error, errorMessage, successMessage,
        questions, showSuccessBar, redirectToLogin, unAuthorized}, home: {fileUrl}} = state;
    return {
        loading,
        error, 
        errorMessage,
        showSuccessBar,
        successMessage,
        questions,
        redirectToLogin,
        unAuthorized,
        fileUrl
    }
}

export default connect(mapStateToProps, actions)(withToastManager(AgentSignUp))