import React, { Component } from 'react';
import UserLayout from "../HOC/UserLayout";
import { connect } from "react-redux";
import * as actions from "../../actions";

class CreateStore extends Component {
    componentDidMount(){
        this.props.switchActiveLink('create-store')
    }
    render() {
        return (
            <UserLayout>
                
            </UserLayout>
        );
    }
}

export default connect(null, actions)(CreateStore);