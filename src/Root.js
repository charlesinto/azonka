import React, { Component } from 'react';
import { BrowserRouter as Router, Route,  } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import Home from "./components/Home";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Referral from "./components/Referrals";
import SecurityQuestion from "./components/Auth/SecurityQuestion";

import AuthRoute from "./components/Auth/AuthRoute";
import NotFoundRoute from "./components/Auth/NotFoundRoute";

import Profile from "./components/Profile";
import AccountSetting from "./components/AccountSetting";
import Purchases from "./components/Purchases";
import Cart from "./components/Cart";
import BuyCredit from "./components/BuyCredit";
import Sales from "./components/Sales";
import ManageItems from "./components/ManageItems";
import Commission from "./components/Commission";
import WithDrawal from "./components/WithDrawal";
import UploadItem from "./components/UploadItem";
import CreateStore from "./components/CreateStore";
import Bank from "./components/Bank";
import WishList from "./components/WishList";
import AgentSignUp from "./components/AgentSignUp";
import SellerSignUp from "./components/SellerSignUp";
import AzonkaPay from "./components/AzonkaPay";
import AddressBook  from "./components/AddressBook";
import ChangePassword from "./components/Auth/changePassword";
import Store from "./components/Store";
import ResetPassword from './components/Auth/ResetPassword';
import  Layout from "./components/HOC/Layout";
import ConfirmAccount from "./components/Auth/confirmAccount";
import StoreDetail from "./components/StoreDetail";
import ScrollTop from './common/ScrollTop';
import { connect } from "react-redux";
import * as actions from "./actions";


import LoginSignup from "./components/Auth/LoginSignup";

class Root extends Component {
    componentDidMount(){
        this.props.fetchUser()
    }
    render() {
        return (
            <div>
                <Router>
                    <ScrollTop>
                        <Layout>
                            <AnimatedSwitch
                                atEnter={{ opacity: 1 }}
                                atLeave={{ opacity: 1 }}
                                atActive={{ opacity: 1 }}
                                
                            >
                                
                                <Route exact path="/" component={Home} />
                                <AuthRoute redirectIfAuth noAuthRequired exact path="/users/register" component={Register} />
                                <AuthRoute redirectIfAuth noAuthRequired  exact path="/users/verify" component={ConfirmAccount} />
                                <AuthRoute redirectIfAuth noAuthRequired exact path="/users/login" component={LoginSignup} />
                                <AuthRoute  exact path="/users/securityquestions" component={SecurityQuestion} />
                                <AuthRoute exact path="/users/profile" component={Profile} />
                                <AuthRoute exact path="/users/profile/account" component={AccountSetting} />
                                <AuthRoute noAuthRequired exact path="/users/purchases" component={Purchases} />
                                <AuthRoute noAuthRequired exact path="/users/cart" component={Cart} />
                                <AuthRoute redirectIfUser exact path="/users/create-store" component={CreateStore} />
                                <AuthRoute  exact path="/users/buycredit" component={BuyCredit} />
                                <AuthRoute redirectIfUser exact path="/users/sales" component={Sales} />
                                <AuthRoute redirectIfUser exact path="/users/commissions" component={Commission} />
                                <AuthRoute redirectIfUser exact path="/users/withdrawal" component={WithDrawal} />
                                <AuthRoute redirectIfUser exact path="/users/items/upload" component={UploadItem} />
                                <AuthRoute redirectIfUser exact path="/users/store" component={StoreDetail} />
                                <AuthRoute redirectIfUser exact path="/users/items/manage" component={ManageItems} />
                                <AuthRoute redirectIfUser exact path="/users/referrals" component={Referral} />
                                <AuthRoute  exact path="/users/banks" component={Bank} />
                                <AuthRoute exact path="/users/azonkaPay" component={AzonkaPay} />
                                <AuthRoute exact path="/users/addressBook" component={AddressBook} />
                                <AuthRoute exact path="/users/agent/signup" component={AgentSignUp} />
                                <AuthRoute exact path="/users/seller/signup" component={SellerSignUp} />
                                <AuthRoute noAuthRequired  path="/users/wishlist" component={WishList} />
                                <AuthRoute exact path="/users/reset-password" component={ChangePassword} />
                                <AuthRoute redirectIfUser exact path="/users/create/shop" component={Store} />
                                <AuthRoute redirectIfAuth noAuthRequired exact = "/password/new" component={ResetPassword} />
                                
                                <NotFoundRoute redirectIfUser path="*" component={Home} />
                                
                            </AnimatedSwitch>
                            </Layout>
                    </ScrollTop>
                </Router>
            </div>
        );
    }
}


export default connect(null, actions)(Root)