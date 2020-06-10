import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Dashboard extends Component {
    state = { userData: null }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('azonta-user'))
        this.setState({
            userData: user
        })
    }
    redirectToSetupWallet = e => {
        e.preventDefault()
        this.props.history.push('/users/securityquestions')
    }
    render() {
        const { userData } = this.state
        return (
            <div>
                <Header />
                <div className="router-container">
                    <main className="main">
                        <nav aria-label="breadcrumb" className="breadcrumb-nav">
                            <div className="container-fluid list-breadcrumbs">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item" aria-current="page">Dashboard</li>
                                    <li className="breadcrumb-item active">{this.props.dashboardActiveLink}</li>

                                </ol>

                            </div>

                        </nav>
                        <div className="container" style={{ margin: "10px 0 10px 0", display: "flex", justifyContent: "flex-end" }}>
                            {
                                userData && userData.type === 'user' ? (
                                    <div className="breadcrumb-item">
                                        <Link to="/users/seller/signup" className="upgrade-btn btn btn-warning btn-sm">Become a seller</Link>
                                    </div>

                                ) : null
                            }
                            {
                                userData && userData.type === 'user' ? (
                                    <div className="breadcrumb-item">
                                        <Link to="/users/agent/signup" className="upgrade-btn btn btn-warning btn-sm">Become an agent</Link>
                                    </div>
                                ) : null
                            }
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 order-lg-last dashboard-content">
                                    {this.props.children}
                                </div>

                                <aside className="sidebar col-lg-3">
                                    <div className="widget widget-dashboard">
                                        <ul className="list">
                                            <li style={{ position: 'relative' }} className={this.props.dashboardActiveLink === 'Profile' ?
                                                'active' : ''}><Link to="/users/profile">My Profile</Link>
                                                {
                                                    userData && !userData.pinSet ? (
                                                        <span onClick={this.redirectToSetupWallet} className="setup-wallet badge badge-info">Setup wallet</span>
                                                    ) : null
                                                }
                                            </li>
                                            <li className={this.props.dashboardActiveLink === 'Cart' ? 'active' : ''}><Link to="/users/cart">Cart</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'My Orders' ? 'active' : ''}><Link to="/users/placed-orders">My Orders</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Change Password' ? 'active' : ''}><Link to="/users/reset-password">Change Password</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Change Pincode' ? 'active' : ''}><Link to="/users/change-pincode">Change Pincode</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Bank' ? 'active' : ''}><Link to="/users/banks">My Bank</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Azonka Wallet' || this.props.dashboardActiveLink === 'Wallet Withdrawal'
                                                || this.props.dashboardActiveLink === 'Wallet Transfer' ? 'activeParent': '' }>
                                                <a className="parent-link" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                    My Azonka Wallet
                                                </a>
                                                {/* <Link to="/users/wallet">My Azonka Wallet</Link> */}
                                                <ul style={{marginLeft: '0.9em'}} className="list collapse" id="collapseExample">
                                                    <li className={this.props.dashboardActiveLink === 'Azonka Wallet' ? 'active' : ''}><Link to="/users/wallet/fund">Fund Wallet</Link></li>
                                                    <li className={this.props.dashboardActiveLink === 'Wallet Withdrawal' ? 'active' : ''}><Link to="/users/wallet/withdraw">Wallet Withdrawal</Link></li>
                                                    <li className={this.props.dashboardActiveLink === 'Wallet Transfer' ? 'active' : ''}><Link to="/users/wallet/wallet-transfer">Wallet To Wallet Transfer</Link></li> 
                                                </ul>
                                            </li>
                                            <li className={this.props.dashboardActiveLink === 'My Azonka Credits' ? 'active' : ''}><Link to="/users/azonka-credits">My Azonka Credit</Link></li>
                                            {/* <li className={this.props.dashboardActiveLink === 'Azonka Pay' ? 'active' : ''}><Link to="#">Azonka Pay</Link></li> */}
                                            <li className={this.props.dashboardActiveLink === 'My Address Book' ? 'active' : ''}><Link to="/users/address">Address Book</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Referral' ? 'active' : ''}><Link to="/users/referrals">Referral</Link></li>
                                            {
                                                userData && userData.type !== 'user' ?
                                                    (
                                                        <li>
                                                            <Link to="/users/store">Store <span className="tip tip-hot" style={{background:'#e81279'}}>
                                                                NEW!</span></Link>
                                                        </li>
                                                    ) : null
                                            }

                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="mb-5"></div>
                    </main>
                </div>
                
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { home: { dashboardActiveLink } } = state;
    return {
        dashboardActiveLink
    }

}

export default connect(mapStateToProps, actions)(Dashboard);