import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";

class AdminHeader extends Component {
    state = {
        sideMenu: false,
        listIcon: true,
        showIcon: false,
        expand: false,
    }
    toggleSideMenu = () => {
        this.setState({
            sideMenu: !this.state.sideMenu
        })
    }
    retractHeader = () => {
        this.setState({
            expand: false,
            listIcon: true,
            showIcon: false
        })
    }
    extractHeader = () => {
        this.setState({
            expand: true,
            listIcon: false,
            showIcon: true
        })
    }
    render() {
        return (
            <div style={{zIndex:900}}>
            <div id="dashboard-options-menu" onClick={this.toggleSideMenu} 
                className={`side-menu dashboard left ${this.state.sideMenu ? 'open': 'closed'} `}>
                <div className="x-close">
                    <span>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="side-menu-header">
                    <div className="user-quickview">
                        {/* <a href="author-profile.html">
                            <div className="outer-ring">
                                <div className="inner-ring"></div>
                                <figure className="user-avatar">
                                </figure>
                            </div>
                        </a> */}
                        <p className="user-name"></p>
                    </div>

                </div>
                {/* <p className="side-menu-title">Your Account</p> */}



                <ul className="dropdown dark hover-effect interactive">
                    {/* <li className="dropdown-item remove-background">
                        <a href="dashboard-settings.html">
                            <span className="sl-icon icon-settings"></span>
                            Account Settings
                </a>
                    </li> */}
                    {/* <li className="dropdown-item remove-background">
                        <a href="dashboard-notifications.html">
                            <span className="sl-icon icon-star"></span>
                            Notifications
                </a>
                        <span className="pin soft-edged big primary">49</span>
                    </li> */}
                    {/* <li className="dropdown-item interactive remove-background">
                        <a href="#">
                            <span className="sl-icon icon-envelope"></span>
                        </a>
                        <ul className="inner-dropdown">
                            <li className="inner-dropdown-item">
                                <a href="dashboard-inbox.html">Your Inbox (36)</a>
                                <span className="pin soft-edged secondary">2</span>
                            </li>
                            <li className="inner-dropdown-item">
                                <a href="dashboard-inbox-v2.html">Your Inbox (36) V2</a>
                            </li>
                            <li className="inner-dropdown-item">
                                <a href="dashboard-openmessage.html">Open Message</a>
                            </li>
                            <li className="inner-dropdown-item">
                                <a href="dashboard-inbox.html">Starred Message</a>
                            </li>
                            <li className="inner-dropdown-item">
                                <a href="dashboard-inbox.html">Deleted Messages</a>
                            </li>
                        </ul>
                        <span className="pin soft-edged big secondary">!</span>
                    </li> */}
                    {/* <li className="dropdown-item">
                        <a href="dashboard-purchases.html">
                            <span className="sl-icon icon-tag"></span>
                            Your Purchases
                </a>
                    </li> */}
                    {/* <li className="dropdown-item">
                        <a href="dashboard-buycredits.html">
                            <span className="sl-icon icon-credit-card"></span>
                            Buy Credits
                </a>
                    </li> */}
                </ul>
                <p className="side-menu-title">Info &amp; Statistics</p>

                    <ul className="dropdown dark hover-effect">
                    <li className={`dropdown-item  remove-background ${this.props.homeActiveLink === 'shop' ? 'active' : ''}`}>
                            <Link to="/users/create/shop">
                                <span className="sl-icon icon-layers"></span>
                                Shops
                            </Link>
                        </li>
                        <li className="dropdown-item remove-background">
                            <Link to="#">
                                <span className="sl-icon icon-layers"></span>
                                Sales Statement
                            </Link>
                        </li>
                        <li className="dropdown-item remove-background">
                            <Link to="#">
                                <span className="sl-icon icon-chart"></span>
                                Statistics
                            </Link>
                        </li>
                    </ul>
                <p className="side-menu-title remove-background">Your Tools</p>
                <ul className="dropdown dark hover-effect">
                    <li className={`dropdown-item remove-background ${this.props.homeActiveLink === 'uploadItem'? 'active': ''}`}>
                        <Link to="/users/items/upload">
                            <span className="sl-icon icon-arrow-up-circle"></span>
                            Upload Item
                        </Link>
                    </li>
                    <li className={`dropdown-item remove-background ${this.props.homeActiveLink === 'manageItems'? 'active': ''}`}>
                        <Link to="/users/items/manage">
                            <span className="sl-icon icon-folder-alt"></span>
                            Manage Items
                        </Link>
                    </li>
                    <li className="dropdown-item remove-background">
                        <a href="dashboard-withdrawals.html">
                            <span className="sl-icon icon-wallet"></span>
                            Withdrawals
                        </a>
                    </li>
                    <li className={`dropdown-item  remove-background`}>
                            <Link to="/">
                                <span className="sl-icon icon-layers"></span>
                                <span style={{color:'#fff', fontSize: '1.5rem'}}>Back To Home</span>
                            </Link>
                    </li>
		        </ul>
            </div>
            <div className="dashboard-body">
            <div className="dashboard-header retracted" style={{maxHeight: `${this.state.expand ? '307px': '70px'}`}}>
            <Link to="/" className="db-close-button">
               <span><i className="fas fa-arrow-right back-arrow"></i></span>
            </Link>
            <div className="db-options-button">
               {/* <img src="images/dashboard/db-list-right.png" alt="db-list-right"/> */}
               <span className="list-button" style={{display:`${this.state.listIcon ? 'block': 'none'}`}} onClick={this.extractHeader}>
                    <i className="fas fa-list"></i>
               </span>
               <span className="list-button" onClick={this.retractHeader} style={{display: `${this.state.showIcon ? 'block': 'none'}`}}>
                    <i className="fas fa-times"></i>
               </span>
               
            </div>
            <div className="dashboard-header-item title">
                 <div className="db-side-menu-handler">
                    <span className="list-button" onClick={this.toggleSideMenu}>
                        <i className="fas fa-list"></i>
                    </span>
                </div>
                <h6>{this.props.currentUser ? `${this.props.currentUser.firstName} ${this.props.currentUser.lastName}` : 
                ''}</h6>
            </div>
            <div className="dashboard-header-item form">
                <form className="dashboard-search">
                    <input type="text" name="search" id="search_dashboard" placeholder="Search on dashboard..."/>
                    <span className="search-icon">
                        <i className="fas fa-search"></i>
                    </span>
                </form>
            </div>
            <div className="dashboard-header-item stats">
                <div className="stats-meta">
                    <div className="pie-chart pie-chart1">
                    </div>
                    <h6>64.579</h6>
                    <p>New Original Visits</p>
                </div>
            </div>
            <div className="dashboard-header-item stats">
                <div className="stats-meta">
                    <div className="pie-chart pie-chart2">
                    </div>
                    <h6>20.8</h6>
                    <p>Less Sales Than Last Month</p>
                </div>
            </div>
            <div className="dashboard-header-item stats">
                <div className="stats-meta">
                    <div className="pie-chart pie-chart3">
                    </div>
                    <h6>322k</h6>
                    <p>Total Visits This Month</p>
                </div>
            </div>
            <div className="dashboard-header-item back-button">
                <Link to="/" className="button mid secondary">Back to Homepage</Link>
            </div>
        </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => {
    const {home: {homeActiveLink, currentUser}} = state;
    console.log(state)
    return {
        homeActiveLink,
        currentUser
    }
}

export default connect(mapStateToProps, actions)(AdminHeader);