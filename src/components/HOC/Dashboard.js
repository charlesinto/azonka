import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import { Redirect } from "react-router-dom";
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
                            <div className="container-fluid">
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
                                            <li className={this.props.dashboardActiveLink === 'Change Password' ? 'active' : ''}><Link to="/users/reset-password">Change Password</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Change Pincode' ? 'active' : ''}><Link to="#">Change Pincode</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Bank' ? 'active' : ''}><Link to="/users/banks">My Bank</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Azonka Wallet' ? 'active' : ''}><Link to="#">My Azonka Wallet</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Azonka Credit' ? 'active' : ''}><Link to="#">My Azonka Credit</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Azonka Pay' ? 'active' : ''}><Link to="#">Azonka Pay</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Address Book' ? 'active' : ''}><Link to="#">Address Book</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Referral' ? 'active' : ''}><Link to="/users/referrals">Referral</Link></li>
                                            {
                                                userData && userData.type !== 'user' ?
                                                    (
                                                        <li><Link to="/users/store">Store</Link></li>
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