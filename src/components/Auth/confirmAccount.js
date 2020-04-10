import React, { Component } from 'react';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';
import queryString from "query-string";
import * as actions from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class confirmAccount extends Component {
    constructor(props){
        super(props);
        this.input1 = React.createRef()
        this.input2 = React.createRef()
        this.input3 = React.createRef()
        this.input4 = React.createRef()
        this.input5 = React.createRef()
        this.input6 = React.createRef()
        this.state = {
            input1: '',
            input2:'',
            input3:'',
            input4:'',
            input5: '',
            input6:'',
            showForm: false,
            emailAddress:'',
            password: ''
        }
    }
    
    verifyEmail = () => {
        const query = queryString.parse(this.props.location.search)
        if(query['passcode']){
            this.props.initiateRegistration()
            this.props.verifyEmail({
                emailAddress: this.state.emailAddress  ,
                emailProofToken: query['passcode'],
                password: this.state.password
            })
        }else{
            this.setState({
                showForm: true
            })
        }
    }
    componentDidMount(){
        this.setState({
            showForm: false
        })
        //this.props.resetVerifyForm()
        const userRegDetails = JSON.parse(localStorage.getItem('userRegDetails'))
        if(!userRegDetails)  {
            this.props.history.push('/users/login')
        }else{
            this.setState({
                emailAddress: JSON.parse(localStorage.getItem('userRegDetails')).emailAddress,
                password: JSON.parse(localStorage.getItem('userRegDetails')).password
            }, () => this.verifyEmail())
        }
        
    }
    componentWillUnmount(){
        this.setState({
            showForm: false
        })
        this.props.resetVerificationState()
    }
    handleChange = e => {
        const {target: {name, value}} = e
        
        if(value.trim() !== ''){
            this.setState({
                [name]: value
            })
            if(name === 'input1'){
                
                this.input2.focus()
            }
            if(name === 'input2'){
                
                this.input3.focus()
            }
            if(name === 'input3'){
                
                this.input4.focus()
            }
            if(name === 'input4'){
                
                this.input5.focus()
            }
            if(name === 'input5'){
                
                this.input6.focus()
            }
        }
    }
    handleKeyPress = e => {
        const {target: {name}} = e
        if(e.key === 'Backspace'){
            this.setState({
                [name]: ''
            })
        }
    }
    resendEmailPasscode = (e) => {
        //call database emailAddress
        console.log('e', JSON.parse(localStorage.getItem('userRegDetails')).emailAddress)
        this.props.resendEmail(JSON.parse(localStorage.getItem('userRegDetails')).emailAddress)
        //add('Successful, Please check your mail to continue', { appearance: 'success' })
        this.props.showSuccessALert('Successful, Please check your mail to continue')
    }
    handleOnclick = e => {
        e.preventDefault()
        const {input1, input2, input3, input4, input5, input6} = this.state
        if(input1.trim() === '' || input2.trim() === '' || input3.trim() === '' || input4.trim() === '' || 
        input5.trim() === '' || input6.trim() === ''){
           return this.props.renderError('Incorrect passcode, please check and try again')
        }
        const code = `${input1}${input2}${input3}${input4}${input5}${input6}`
        this.props.initiateRegistration()
        this.props.verifyEmail({
            emailAddress: this.state.emailAddress,
            emailProofToken: code,
            password: this.state.password
        })
    }
    refreshPage = e => {
        e.preventDefault();
        // window.location.reload();
        this.props.history.push('/users/login')
    }
    renderVerificationForm = () => {
        console.log(this.props.verification)
        if(this.props.verification === 'none'){
            return (
                <div className="col-md-4 card" style={{
                    padding: '20px 10px 20px 10px',
                    margin: '10px'
                }}>

                    <div className="web-font" style={{ display: 'flex', flexDirection: 'row' }}>
                        <span style={{ marginRight: 16, color: '#08c', marginTop: '0.4rem' }}>
                            <i className="fas fa-check"></i>
                        </span>
                        <span style={{ fontSize: '1.8rem', fontWeight: '500', color: "#000" }}>
                            Account created successfully
                                    </span>
                    </div>
                    <div className="web-font" style={{ margin: '10px 0px 0px 0px' }}>
                        Please Check your email to verify your account
                                </div>
                    <div>
                        <h3 style={{ margin: '10px 0 10px 0' }}>Enter Passcode</h3>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <span style={{ marginRight: 8, marginTop: '0.8rem' }}>
                                <i className="fas fa-key"></i>
                            </span>
                            <input onKeyDown={this.handleKeyPress} value={this.state.input1} name="input1" onChange={this.handleChange}
                                className="otp-input" ref={input => this.input1 = input} type="text" />
                            <input onKeyDown={this.handleKeyPress} value={this.state.input2} onChange={this.handleChange}
                                name="input2" className="otp-input" ref={input => this.input2 = input} type="text" />
                            <input onKeyDown={this.handleKeyPress} value={this.state.input3} name="input3" onChange={this.handleChange}
                                className="otp-input" ref={input => this.input3 = input} type="text" />
                            <input onKeyDown={this.handleKeyPress} value={this.state.input4} name="input4" onChange={this.handleChange}
                                className="otp-input" ref={input => this.input4 = input} type="text" />
                            <input onKeyDown={this.handleKeyPress} value={this.state.input5} name="input5" onChange={this.handleChange}
                                className="otp-input" ref={input => this.input5 = input} type="text" />
                            <input onKeyDown={this.handleKeyPress} value={this.state.input6} name="input6" onChange={this.handleChange}
                                className="otp-input" ref={input => this.input6 = input} type="text" />
                        </div>
                        <div style={{ textAlign: 'right', margin: '15px 20px 0 0' }}>
                            <button onClick={this.handleOnclick} className="btn btn-sm btn-primary">verify</button>
                        </div>
                    </div>
                    <div onClick={this.resendEmailPasscode} className="web-font" style={{
                        marginTop: 10, margin: '10px 0 10px 0',
                        color: '#08c', textDecoration: "underline", cursor: 'pointer'
                    }}>
                        Didn't get the verfication email? Resend Email
                                </div>
                    <div className="web-font" style={{
                        textAlign: "right",
                        margin: '10px 20px 20px 0px'
                    }}>
                        <Link to="/"
                            style={{ color: '#fff' }} className="web-font btn btn-warning"
                        >CONTINUE TO HOME</Link>
                    </div>
                </div>
            )
        }
        else if(this.props.verification === 'true'){
            console.log('herenow')
            return (
                <div className="col-md-4 card" style={{
                    padding: '20px 10px 20px 10px',
                    margin: '10px'
                }}>

                    <div className="web-font" style={{ display: 'flex', flexDirection: 'row' }}>
                        <span style={{ marginRight: 16, color: '#08c', marginTop: '0.4rem' }}>
                            <i style={{ fontSize: '2rem' }} className="fas fa-check"></i>
                        </span>
                        <span style={{ fontSize: '1.8rem', fontWeight: '500', color: "#000" }}>
                            Account verification successful
                                    </span>
                    </div>
                    <div className="web-font" style={{
                        textAlign: "right",
                        margin: '10px 20px 20px 0px'
                    }}>
                        <Link to="/users/profile"
                            style={{ color: '#fff' }} className="web-font btn-sm btn btn-warning"
                        >CONTINUE TO PROFILE</Link>
                    </div>
                </div>
            )
        }
        else if(this.props.verification === 'false'){
            console.log('here now')
            return (
                <div className="col-md-4 card" style={{padding:'20px 10px 20px 10px',
                                 margin:'10px'}}>
                                
                                <div className="web-font" style={{display:'flex', flexDirection:'row'}}>
                                    <span style={{marginRight: 16, color:'#08c',color:'red',
                                     fontSize:'2rem', marginTop:'0.4rem'}}>
                                        <i className="fas fa-times"></i>
                                    </span>
                                    <span style={{fontSize:'1.8rem', fontWeight:'500', color:"#000"}}>
                                        Account verification failed
                                    </span>
                                </div>
                                <div className="web-font" style={{textAlign:"right",
                                    margin:'10px 20px 20px 0px'}}>
                                    <button onClick={this.refreshPage}
                                      style={{color:'#fff'}} className="web-font btn-sm btn btn-warning"
                                      >CONTINUE TO Login</button>
                                </div>
                            </div>
            )
        }
        return null
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
                                    <li className="breadcrumb-item active" aria-current="page">Verify Email</li>
                                </ol>
                            </div>
                        </nav>
                        <div className="container">
                            <div className="row">
                            <div className="col-md-4"></div>
                            {this.renderVerificationForm()}
                            <div className="col-md-4"></div>
                            </div>
                            
                        </div>
                    </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {reg:{verification}} = state;
    return {
        verification
    }
}

export default connect(mapStateToProps, actions)(confirmAccount);