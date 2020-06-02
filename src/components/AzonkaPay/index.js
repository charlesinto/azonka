import React, { Component } from 'react';
import UserLayout from "../HOC/UserLayout";
import { connect } from "react-redux";
import * as actions from "../../actions";

class index extends Component {
    componentDidMount(){
        this.props.switchActiveLink('azonkaPay')
    }
    render() {
        return (
            <UserLayout>
                
            </UserLayout>
        );
    }
}

export default connect(null, actions)(index);