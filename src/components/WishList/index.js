import React, { Component } from 'react';
import UserLayout from "../HOC/UserLayout";
import { connect } from "react-redux";
import * as actions from "../../actions";

class WishList extends Component {
    componentDidMount(){
        this.props.switchActiveLink('wishlist')
    }
    renderAuthDashboard =  () => {
        return (<UserLayout>

        </UserLayout>)
    }
    noAuthDashboard = () => {
        return (
            <div style={{minHeight: '40vh'}}>
                No items found
            </div>
        )
    }
    render() {
        return localStorage.getItem('azonta-user') ? this.renderAuthDashboard() : this.noAuthDashboard()
    }
}
const mapStateToProps = state => {
    return {...state}
}
export default connect(mapStateToProps, actions)(WishList);