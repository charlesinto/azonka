import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";
import { withToastManager } from 'react-toast-notifications';
import CustomInput from "../../common/CustomInput";
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

class SecurityQuestion extends Component {
    state = {
        questions: [],
        inValidElments: [],
        validationMessage: {},
        container: 'form',
        pincode: '',
        answer: '',
        question: '',
        securityQuestion: []
    }
    componentDidMount(){
        // call the api to fetch security questions
        this.props.initiateRegistration()
        this.props.getSecurityQuestions()
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.questions.length !== state.securityQuestion.length){
            const securityQuestion = []
            Object.keys(nextProps.questions).forEach(key => {
                securityQuestion.push({id: key, question: nextProps.questions[key]})
            })
            return {...state, securityQuestion}
        }
    }
    handleInputChange = (event) => {
        const {target: { name, value}} = event;
        this.setState({
            [name]: value
        })
        
    }
    displayQuestions = () => {
        const keys = Object.keys(this.props.questions)
        return keys.map((element, index) => (
            <div key={index}>
                 <div><span className="question-number">
                     { index + 1}.</span><span 
                         className="question-tag">{this.props.questions[element]}</span></div>
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
        console.log('questions', this.props.questions)
        const securityQuestion = []
        Object.keys(this.props.questions).forEach(key => {
            securityQuestion.push({id: key, question: this.props.question[key]})
        })
        if(this.props.questions.length !== this.state.securityQuestion.length ){
            this.setState({
                securityQuestion
            })
        }
        return null
    }
    handlePinCodeInputChange = e => {
        // console.log(e.key)
        const KEYS_ALLOWED = ['1', '2','3','4','5','6','7','8','9','0',]
        const CONTROLS = ['Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        if(KEYS_ALLOWED.includes(e.key) || CONTROLS.includes(e.key)){
            if(e.target.value.trim().length === 4 && !CONTROLS.includes(e.key) ){
                return e.preventDefault()
            }
            return e;
        }
        return e.preventDefault()
    }
    onSubmit = event => {
        event.preventDefault();
        if(this.state.question.trim() === ''){
            return this.props.renderError('Please choose a question and provide answer')
        }
        if(this.state.answer.trim() === ''){
            return this.props.renderError('Please provide answer')
        }
        if(this.state.pincode.trim() === ''){
            
           return  this.props.renderError('Please provide pincode')
        }
        if(this.state.pincode.length !== 4){
            return this.props.renderError('Maximum and minimum legth of 4 characters required for Pincode')
        }
        //call the api
        this.props.initiateRegistration()
        const { question, answer, pincode} = this.state;
        this.props.setPin({ securityQuestion: question, securityAnswer: answer, 
            pin:pincode})
    }
    render() {
        return (
            <div>
                <Header/>
                
                <div className="router-container">
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                            <li className="breadcrumb-item" aria-current="page"><Link to="/users/profile">Dashboard</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Setup Wallet</li>
                        </ol>
                    </div>
                </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 card" style={{padding:'15px 10px 15px 10px'}}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group required-field">
                                        <label htmlFor="acc-name">Security Question</label>
                                        <select name="question" value={this.state.question} onChange={this.handleInputChange}>
                                            <option value="">Select Question</option>
                                            {
                                                this.state.securityQuestion.map(({id, question}, i) => {
                                                    return <option key={i} value={id}>{question}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                        
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group required-field">
                                        <label htmlFor="acc-name">Provide Response</label>
                                        <input name="answer" value={this.state.answer} onChange={this.handleInputChange} className="form-control" required="" />
                                    </div>
                                </div>
                                        
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group required-field">
                                        <label htmlFor="acc-name">Enter Pincode</label>
                                        <input onKeyDown={this.handlePinCodeInputChange} maxLength="4" value={this.state.pincode} type="number"  name="pincode" onChange={this.handleInputChange}  className="form-control" required="" />
                                    </div>
                                </div>
                                        
                            </div>
                            <div className="form-footer-right" style={{textAlign:'center'}}>
                                <button onClick={this.onSubmit} type="submit" className="btn btn-primary">Submit</button>
                            </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-box-item full">
                            <h4>Steps to Setup Wallet</h4>
                            <hr className="line-separator" />
                            <div className="plain-text-box">
                                <div className="plain-text-box-item">
                                    <ol>
                                        <li>Select a security question</li>
                                        <li>Provide a response</li>
                                        <li>Provide a 4-digit pincode</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mb-5"></div>
                </div>
            </div>
            </div>
            <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {reg: {questions, errorMessage, error}} = state;
    return {
        questions,error, errorMessage
    }
}

export default connect(mapStateToProps, actions)(withToastManager(SecurityQuestion))