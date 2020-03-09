import React, {Component} from 'react';
import { connect } from "react-redux";
import * as actions  from "../../actions";

import Dashboard from "../HOC/Dashboard";

class ChangePinConde extends Component{
    INITIAL_STATE = {
        securityQuestion: '',
        questions: [],
        securityAnswer: '',
        emailAddress: '',
        password: ''
    }
    constructor(props){
        super(props)
        this.state = {...this.INITIAL_STATE}
    }
    async componentDidMount(){
        this.props.setActiveLink('Change Pincode')
        this.props.initiateRegistration()
        this.props.getSecurityQuestions();
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.questions.length !== state.questions.length){
            const questions = []
            Object.keys(nextProps.questions).forEach(key => {
                questions.push({id: key, question: nextProps.questions[key]})
            })
            return {...state, questions}
        }
    }
    handleOnChange = (e) => {
        const {target: {name, value}} = e
        this.setState({
            [name] : value
        })
    }
    handleFormSubmit = async (e) => {
        e.preventDefault()
        const {securityQuestion, securityAnswer, emailAddress, password} = this.state
        if(securityQuestion.trim() === ''){
            return this.props.renderError('Please provide response to security question')
        }
        if(securityAnswer.trim() === ''){
            return this.props.renderError('Please choose a security question')
        }
        if(emailAddress.trim() === ''){
            return this.props.renderError('Please provide email address')
        }
        if(password.trim() === ''){
            return this.props.renderError('Please provide password')
        }
        this.props.initiateRegistration();
        await this.props.resetAccountPin(this.state)
        this.setState({
            ...this.INITIAL_STATE
        })
    }
    render(){
        return (
            <Dashboard>
                <h2>Rest Wallet Pincode</h2>
                <form action="" className="col-md-12 col-sm-12">
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="form-group required-field">
                                <label htmlFor="securityQuestion">Select Security Question</label>
                                 <select value={this.state.securityQuestion} 
                                    name="securityQuestion"
                                    onChange={this.handleOnChange} 
                                    className="form-control">
                                     <option value="">Select</option>
                                     {
                                         this.state.questions.map(response => (
                                         <option value={response.id}>{response.question}</option>
                                         ))
                                     }
                                 </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="form-group required-field">
                                <label htmlFor="securityAnswer">Provide Response</label>
                                 <input value={this.state.securityAnswer} 
                                 onChange={this.handleOnChange}
                                 type="text"
                                 placeholder="Your response"
                                 className="form-control" name="securityAnswer"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="form-group required-field">
                                <label htmlFor="emailAddress">Email Address</label>
                                 <input 
                                 onChange={this.handleOnChange}
                                 type="email"
                                 placeholder="Email Address"
                                 value={this.state.emailAddress} 
                                 className="form-control" name="emailAddress"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                            <div className="form-group required-field">
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" value={this.state.password} placeholder="password"
                                    onChange={this.handleOnChange} className="form-control" required="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="col-md-8 col-sm-12"></div>
                        <div classNam="col-md-4 col-sm-4" style={{textAlign:'right'}}>
                            <button onClick={this.handleFormSubmit} type="submit" className="btn btn-sm btn-primary">
                                Reset Pin
                            </button>
                        </div>
                    </div>
                </form>
            </Dashboard>
        )
    }
}

const mapStateToProps = state =>{
    const {reg: {questions, errorMessage, error}} = state;
    return {
        questions,error, errorMessage
    }
}

export default connect(mapStateToProps, actions)(ChangePinConde)