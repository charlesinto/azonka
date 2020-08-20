import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withToastManager } from 'react-toast-notifications';
import CustomInput from "../../common/CustomInput";
// import Header from "../HeaderFooter/Header";
import { Link } from "react-router-dom";
import swal from "sweetalert2";

class AgentSignUp extends Component {
    state = {
        error: null,
        file: null,
        validId: null,
        validPhoto: null,
        questions: [],
        inValidElments: [],
        validationMessage: {},
        pincode: '',
        agreeToTerms: false,
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
    handleInputChange = (e) => {
        const {target: { name}} = e;
        this.setState({
            [name]: e.target.files
        })
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
    handleFormSave = (e) => {
        e.preventDefault();
        const { validId, validPhoto, agreeToTerms } = this.state;
        if(!agreeToTerms){
            return swal.fire('You Must Agree to Terms and Conditions')
            
        }
        if(!validId){
            return swal.fire('Please upload valid identification')
        }
        if(!validPhoto){
            return swal.fire('Please upload valid photo')
        }
        this.props.initiateRegistration()
        return this.props.upgradeToAgent(validId, validPhoto)
        
    }
    render() {
        return (
            <div >
                {/* <Header /> */}
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
                    <div className="container mt-5 mb-5">

                        <div className="row justify-content-center">

                            <div className="col-md-6 shadow bg-white" style={{padding: 0}}>
                                <div className="container-fluid rounded">
                                    <div className="row header-row-special px-3 py-2">
                                        <h4 className="text-light">Upgrade your Account to Agent</h4>
                                    </div>
                                    <div className="row px-4 py-4">
                                        <div className="col-md-12">
                                            <form>
                                                <fieldset>
                                                    <div className="form-group">
                                                        <label for="exampleFormControlFile1">Upload Valid ID (International passport, Vehicle Driver’s license, Permanent Voters card, National Identity number)</label>
                                                        <input name="validId" onChange={this.handleInputChange} accept="image/png, image/jpeg" type="file" className="form-control-file" id="exampleFormControlFile1" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="exampleFormControlFile2">Passport photograph</label>
                                                        <input name="validPhoto" onChange={this.handleInputChange} accept="image/png, image/jpeg" type="file" className="form-control-file" id="exampleFormControlFile2" />
                                                    </div>
                                                    <div className="form-group d-flex">
                                                        <input type="checkbox" id="agreeToTerms"
                                                        onChange={(event) => {this.setState({agreeToTerms: !this.state.agreeToTerms})}} name="i agree" value="sellers" checked={this.state.agreeToTerms} />
                                                        <label className="label-check" onClick={(event) => {this.setState({agreeToTerms: !this.state.agreeToTerms})}}>
                                                            <span className="checkbox primary primary"><span></span></span>
                                                            I agree To <span className="text-success">Privacy and Policy</span>
                                                                </label>
                                                       
                                                    </div>
                                                    <div className="form-group d-flex mt-4 justify-content-center">
                                                        <input onClick={this.handleFormSave} type="submit" value="Submit" className="btn px-5 py-2 btn-lg btn-primary" />
                                                    </div>
                                                </fieldset>

                                            </form>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

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

/*

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

*/

export default connect(mapStateToProps, actions)(withToastManager(AgentSignUp))