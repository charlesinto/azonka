import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import Header from "../HeaderFooter/Header";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "../../common/Avatar";
import * as actions from "../../actions";
import Footer from '../HeaderFooter/Footer';

class UserLayout extends Component {
    constructor(props){
        super(props)
        this.otherFeatures = React.createRef()
        this.featDrpdown = React.createRef()
        this.state = {openFeatureDropdown: false}
    }
    showAdvancedMenu = user => {
        if( (user && user.type === 'seller') || (user && user.type === 'agent'))
            return  (  
                <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'create-shop'? 'active': ''}`}
                    onClick={() => this.sideMenuListItemClick('')}
                >
                    <Link to="/users/create/shop">Shop</Link>
                </li>
            )
        return null
    }
    renderApprovedStatus =  user => {
        if(user){
            if(user.type !== 'user'){
                switch(user.type){
                    case 'agent':
                        if(!user.agentApproved){
                            return (<div className="awaiting-approval-class">
                                    <span>AWAITING APPROVAL</span>
                            </div>)
                        }else{
                            return (
                                
                                <div className="approved-class">
                                    <span>APPROVED</span>
                                </div>
                            )
                        }
                    default:
                        return null


                }
            }
            return null
        }
        return null
    }
    componentDidMount(){
        this.props.fetchUser()
       this.otherFeatures.current.addEventListener('click', (e) => {
           this.setState({
               openFeatureDropdown: !this.state.openFeatureDropdown
           })
           this.featDrpdown.current.classList.toggle('open-feature-dropdown')
       })
    }
    renderReferral = () => {
            return (
                <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'referals'? 'active': ''}`}
                    onClick={() => this.sideMenuListItemClick('referals')}
                >
                    <Link to={`/users/referals`}>Referrals</Link>
                </li>
            )
    }
    renderAvatar = () => {
        let {currentUser} = this.props
         currentUser = Array.isArray(currentUser) ? currentUser[0] : currentUser;
        return currentUser ? currentUser.profileImage ? (
            <img src={currentUser.profileImage} alt="avatar" />            
        ): <Avatar name={`${currentUser.firstName.substr(0,1).toUpperCase()}${currentUser.lastName.substr(0,1).toUpperCase()}`}  />
        : null
    }
    sideMenuListItemClick = clickedItem => {
        this.props.switchActiveLink(clickedItem)
    }
    logout = () => {
        this.props.logout()
        return <Redirect to="/users/login" />
    }
    renderAngle = () => {
        if(this.state.openFeatureDropdown){
            return <i className="fas fa-angle-up"></i>
        }
        return <i className="fas fa-angle-down"></i>
    }
    render() {
        let {currentUser} = this.props
         currentUser = Array.isArray(currentUser) ? currentUser[0] : currentUser;
        return (
            <div>
                <Header />
                <div className="router-container">
                    <div className="section-headline-wrap">
                        {/* <h2 className="hide-on-sm">Dashboard</h2> */}
                        <div className="section-headline">
                            <h2 style={{color:'#fff'}}>Dashboard</h2>
                        </div>
                    </div>
                    <div className="author-profile-meta-wrap">
                        <div className="author-profile-meta">
                            
                            <div className="author-profile-info">
                                <div className="author-profile-info-item">
                                    <p className="text-header">{currentUser && currentUser.type === 'seller'
                                    ? 'Company Name' : 'Full Name'
                                }</p>
                                    <p>{
                                        currentUser ? currentUser.type === 'seller' ?
                                        currentUser.companyName : `${currentUser.firstName} ${currentUser.lastName}`
                                        : null
                                    }</p>
                                </div>
                                {
                                    currentUser && currentUser.type === 'seller' ?
                                    (
                                        <div className="author-profile-info-item">
                                            <p className="text-header">Total Sales:</p>
                                            <p>{currentUser && currentUser.sales ? currentUser.sales : 0}</p>
                                        </div>
                                    ) : null
                                }
                                <div className="author-profile-info-item">
                                    <p className="text-header">Email Adress</p>
                                    <p>{currentUser && currentUser.emailAddress ? currentUser.emailAddress : null}</p>
                                </div>
                                <div className="author-profile-info-item">
                                    <p className="text-header">Contact Number</p>
                                    <p>{currentUser && currentUser.phoneNumber ? 
                                            (currentUser.countryCode + currentUser.phoneNumber) : null}</p>
                                </div>
                                {/* <div className="author-profile-info-item">
                                    <p className="text-header">Referral Code</p>
                                    <p>{currentUser && currentUser.referralCode ? 
                                            currentUser.referralCode : null}</p>
                                </div> */}

                                {
                                    currentUser && !currentUser.pinSet ?
                                    <div className="author-profile-info-item"> 
                                        <div>
                                            <Link to="/users/securityquestions" style={{color: '#fff'}} className="button secondary">
                                                Setup wallet
                                            </Link>
                                        </div>

                                    </div> : null
                                }
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="section-wrap">
                        <div className="section overflowable">
                            
                            <div className="sidebar left author-profile">
                                {/*START*/}
                                <div className="sidebar-item author-bio">
                                    <a href="user-profile.html" className="user-avatar-wrap medium">
                                        <figure className="user-avatar medium">
                                            {this.renderAvatar()}
                                        </figure>
                                    </a>
                                    <p className="text-header" style={{paddingTop:'20px'}}>{
                                      currentUser ?  `${currentUser.firstName} ${currentUser.lastName}` : null
                                    }</p>
                                    <div className="user-role">
                                        <div className="user-role-text"><span>{currentUser ?
                                             currentUser.type.toUpperCase(): null}</span></div>
                                    </div>
                                    <div className="approval-status-container">
                                        {
                                            this.renderApprovedStatus(currentUser)
                                        }
                                    </div>
                                    <ul className="share-links">
                                        <li><span className="fb"></span></li>
                                        <li><span className="twt"></span></li>
                                        <li><span className="db"></span></li>
                                    </ul>
                                    {
                                       currentUser && currentUser.type === 'user' ?
                                        (
                                            <div className="account-upgrade">
                                                <div>
                                                    <Link to="/users/agent/signup" className="button secondary account-upgrade-button">Become an agent</Link>
                                                </div>
                                                <div>
                                                    <Link to="/users/seller/signup" className="button primary account-upgrade-button">Become a seller</Link>
                                                </div>
                                            </div>
                                        ): null
                                    }
                                    
                                </div>
                                <ul className="dropdown hover-effect">
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'profile'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('profile')}
                                    >
                                        <Link to="/users/profile">Recommended For You</Link>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'account-setting'? 'active': ''}`}
                                        onClick={ () => this.sideMenuListItemClick('account-setting')}
                                    >
                                        <Link to="/users/profile/account">Profile</Link>
                                    </li>
                                    {this.renderReferral()}
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'cart'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('cart')}
                                    >
                                        <Link to="/users/cart">Cart</Link>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'wishlist'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('wishlist')}
                                    >
                                        <Link to={`/users/wishlist`}>Wishlist</Link>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'purchases'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('purchases')}
                                    >
                                        <Link to="/users/purchases">Orders</Link>
                                    </li>
                                            <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'buy-credit'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('buy-credit')}
                                            >
                                                <Link to="/users/buycredit">Buy Credit</Link>
                                            </li>
                                    
                                      <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'bank'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('bank')}
                                        >
                                            <Link to="/users/banks">My Banks</Link>
                                        </li>
                                        <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'azonkaPay'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('azonkaPay')}
                                        >
                                            <Link to="/users/azonkaPay">Azonka Pay</Link>
                                        </li>
                                        <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'address'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('address')}
                                        >
                                            <Link to="/users/addressBook">Address Book</Link>
                                        </li>
                                        {
                                                
                                                this.showAdvancedMenu(currentUser)
                                                
                                            }
                                    <li className={`dropdown-item normalize-sidebar`}
                                        
                                    >
                                        <div ref={this.otherFeatures} className="feature-drpdown custom-feature-dropdpwn hover-effect" to="#"><span>Other Features</span>
                                            <span>{this.renderAngle()}</span>
                                        </div>
                                        <div className="toggle-feature-dropdown" ref={this.featDrpdown}>
                                        <ul>
                                            <li 
                                                className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'other-features'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('')}
                                            ><Link to="/users/reset-password">Change Password</Link></li>
                                            <li onClick={() => this.sideMenuListItemClick('')} style={{borderBottom: '1px solid #ebebeb'}} className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'other-features'? 'active': ''}`}
                                            ><Link to="/users/reset-pin">Reset Pincode</Link></li>
                                            
                                        </ul>
                                        
                                        </div>
                                    </li>
                                    
                                    
                                </ul>
                                {/*END*/}
                                {this.props.homeActiveLink === 'cart' ? (
                                    <div className="sidebar-item">
                                        <h4>Redeem Code</h4>
                                        <hr className="line-separator" />
                                        <form id="coupon-code-form">
                                            <input type="text" name="coupon_code" placeholder="Enter your coupon code..."/>
                                            <button className="button mid secondary">Apply Coupon Code</button>
                                        </form>
                                    </div>
                                ) : null}
                            </div>
                            <div className="content right">
                                <div>

                                </div>
                                {this.props.children}
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const styles = theme => ({
    avatar: {
        // margin: 10,
        paddingBottom: 20,
        width: 80,
        height: 80
      },
      orangeAvatar: {
        // margin: 10,
        color: '#fff',
        width: 80,
        height: 80,
        fontSize: '2em',
      },
      purpleAvatar: {
        margin: 10,
        color: '#fff',
      },
})

const mapStateToProps = state => {
    const {home: { currentUser, cart, likes, homeActiveLink}, reg:{redirectToLogin,unAuthorized }} = state;
    return {
        currentUser, 
        cart,
        likes,
        homeActiveLink,
        redirectToLogin,
        unAuthorized
    }
}
export default connect(mapStateToProps, actions)(withStyles(styles)(UserLayout));