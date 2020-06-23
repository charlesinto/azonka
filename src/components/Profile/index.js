import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import Dashboard from "../HOC/Dashboard";

class index extends Component {
    state = {
        firstName: '',
        lastName: '',
        country: '',
        phoneNumber: '',
        emailAddress: '',
        countryData: []
    }
    componentDidMount() {
        this.props.setActiveLink('Profile')
        const user = JSON.parse(localStorage.getItem('azonta-user'))
        const { emailAddress, firstName, lastName, phoneNumber, country } = user
        fetch('https://restcountries.eu/rest/v2/all')
            .then(res => res.json())
            .then(data => {
                data.sort((element1, element2) => {
                    if (element1.name < element2.name) {
                        return -1
                    }
                    return 1
                })
                this.setState({
                    countryData: data,
                    firstName,
                    lastName,
                    phoneNumber,
                    country,
                    emailAddress
                })
            })
    }
    handleOnChange = e => {
        const { target: { name, value } } = e;
        this.setState({
            [name]: value
        })
    }
    handleFormSubmit = e => {
        e.preventDefault()
        const { firstName, lastName, phoneNumber, country, emailAddress } = this.state
        if (firstName.trim() === '' || lastName.trim() === '' || phoneNumber.trim() === ''
            || country.trim() === '' || emailAddress.trim() === '') {
            return this.props.renderError('One or more fields required')
        }
        this.props.initiateRegistration()
        this.props.updateUserProfile(this.state)
    }
    render() {
        return (
            <Dashboard {...this.props}>
                <h2>Edit Account Information</h2>
                <form action="#">
                    <div className="row">
                        <div className="col-sm-11">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group required-field">
                                        <label htmlFor="acc-name">First Name</label>
                                        <input type="text" value={this.state.firstName} onChange={this.handleOnChange} className="form-control" id="acc-name" name="firstName" required="" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="acc-mname">Last Name</label>
                                        <input type="text" value={this.state.lastName} onChange={this.handleOnChange} className="form-control" id="acc-mname" name="lastName" />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-11">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group required-field">
                                        <label htmlFor="acc-lastname">Country</label>
                                        <select value={this.state.country} onChange={this.handleOnChange} name="country" className="form-control">
                                            <option value="">Select Country</option>
                                            {
                                                this.state.countryData.map(data => (
                                                    <option value={data.name}>{data.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group required-field">
                                        <label htmlFor="acc-lastname">Phone Number</label>
                                        <input type="text" value={this.state.phoneNumber} onChange={this.handleOnChange} className="form-control" id="acc-lastname3" name="phoneNumber" required="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="form-group required-field">
                        <label htmlFor="acc-email">Email</label>
                        <input type="email" className="form-control" disabled onChange={this.handleOnChange} value={this.state.emailAddress} id="acc-email"
                            name="emailAddress" required="" />
                    </div>

                    <div className="mb-2"></div>
                    <div className="required text-right">* Required Field</div>
                    <div className="form-footer">
                        <Link to="/"><i className="icon-angle-double-left"></i>Back</Link>

                        <div className="form-footer-right">
                            <button onClick={this.handleFormSubmit} type="submit" className="btn-cm btn-lg px-5 py-2 btn-primary">Save</button>
                        </div>
                    </div>
                </form>

            </Dashboard>
        );
    }
}

const mapStateToProps = state => {
    const { home: { viewType }, reg: { unAuthorized } } = state;
    console.log('in authorized', unAuthorized)
    return {
        viewType,
        unAuthorized
    }
}

export default connect(mapStateToProps, actions)(index)