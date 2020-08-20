import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import ReferralTable from "../../common/ReferralTable";

import Dashboard from '../HOC/Dashboard';

class index extends Component {
    constructor(props) {
        super(props)
        this.state = { currentPageCount: 10, lastIndex: 4, limit: 0, referrals: [] }
        this.referralCode = React.createRef()
        this.referralLink = React.createRef()
        this.refCode = React.createRef();
        this.refLink = React.createRef()

    }

    componentDidMount() {
        this.props.setActiveLink('Referral')
        const { match: { params: { id } } } = this.props
        console.log('parmas', id)
        const currentUser = JSON.parse(localStorage.getItem('azonta-user'))
        const referral = currentUser ? [...currentUser.referrals,
        ...currentUser.referredSellers] : []
        this.setState({
            referrals: referral
        })
    }
    copyToClipBoard = (emitter, targetElement) => {
        this[`${targetElement}`].current.select()
        document.execCommand("copy");
        this[`${emitter}`].current.classList.add('copied-container')
        setTimeout(() => {
            this[`${emitter}`].current.classList.remove('copied-container')
        }, 3000)
    }
    render() {
        console.log('current user', this.props.currentUser)
        const user = JSON.parse(localStorage.getItem('azonta-user'))
        const { referralCode } = user;
        return (
            <Dashboard>
                <h2>Referrals</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-6 ref-div">
                            <div className="card mx-3 py-4 px-4" style={{height: '14rem'}}>
                                <div className="ref-heading">
                                    <span>Referral Code</span>
                                    <div className="ref-icon" ref={this.refCode} onClick={(e) => this.copyToClipBoard('refCode', 'referralCode')}>
                                        <span><i className="far fa-clipboard"></i></span>
                                    </div>
                                </div>
                                <div className="ref-text py-4">
                                    <textarea style={{minHeight: '40px !important', height:'40px'}}  className="select-area text-success" readOnly ref={this.referralCode} value={`${referralCode}`}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 ref-div ">
                            <div className="card py-4 px-4" style={{height: '14rem'}}>
                                <div className="ref-heading ">
                                    <span>Referral Link</span>
                                    <div className="ref-icon" ref={this.refLink} onClick={(e) => this.copyToClipBoard('refLink', 'referralLink')}>
                                        <span><i className="far fa-clipboard"></i></span>
                                    </div>

                                </div>
                            <div className="ref-text py-4">
                                <div >
                                    <a className="text-success" href={`localhost:3000/users/register/${referralCode}`} rel="noopener noreferrer" target="_blank">
                                        http://167.99.154.149:1337/users/register/{referralCode}
                                    </a>
                                </div>
                                {/* <textarea style={{ minHeight: '7rem', overflowY: 'hidden' }} className="select-area referralLink" readOnly ref={this.referralLink}
                                    value={`http://167.99.154.149:1337/users/register?referral=${referralCode}`}></textarea> */}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12">
                    <ReferralTable data={this.state.referrals} />
                </div>

            </Dashboard>
        );
    }
}

const mapStateToProps = state => {
    const { home: { currentUser } } = state;
    return {
        currentUser
    }
}

export default connect(mapStateToProps, actions)(index);