import React, { Component } from 'react';
import StoreDashboard from "../HOC/StoreDashboard";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Swal from 'sweetalert2';

class index extends Component {
    state = {
        companyName: '', headOfficeAddress: '', contactLine: ''
    }
    componentDidMount() {
        this.props.setActiveLink('Company Detail')
        const user = JSON.parse(localStorage.getItem('azonta-user'))
        if (user) {
            this.setState({
                companyName: user.companyName,
                headOfficeAddress: user.headOfficeAddress,
                contactLine: user.contactLine
            })
        } else {
            this.props.history.push('/users/login')
        }
    }
    handleOnChange = e => {
        const { target: { name, value } } = e;
        this.setState({
            [name]: value
        })
    }
    handleFormSubmit = e => {
        e.preventDefault()
    }
    getQrCode = (e) => {
        e.preventDefault()
        if(localStorage.getItem('azonta-user')){
            const user = JSON.parse(localStorage.getItem('azonta-user'))
            if(user.wallet){
                const walletId = user.wallet[0].id;
                // return console.log(walletId)
                return this.props.history.push(`/store/qrcode-generate/${walletId}`)
            }
            return Swal.fire('Qr Code', 'You need to setup wallet to process')
        }
    }
    render() {
        return (
            <StoreDashboard>
                <h2>Company Information</h2>
                <form action="#">
                    <div className="row">
                        <div className="col-sm-11">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group required-field">
                                        <label htmlFor="acc-name">Company Name</label>
                                        <input type="text" value={this.state.companyName} onChange={this.handleOnChange} className="form-control" id="acc-name" name="companyName" required="" />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="acc-mname">Head Office Address</label>
                                        <input type="text" value={this.state.headOfficeAddress} onChange={this.handleOnChange} className="form-control" id="acc-mname" name="headOfficeAddress" />
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
                                        <label htmlFor="acc-lastname">Contact Line</label>
                                        <input type="text" value={this.state.contactLine} onChange={this.handleOnChange} className="form-control" id="acc-lastname3" name="contactLine" required="" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mb-2"></div>
                    <div className="required text-right">* Required Field</div>
                    <div className="form-footer">
                        <Link to="/"><i className="icon-angle-double-left"></i>Back</Link>

                        <div className="form-footer-right">
                            <button className="btn btn-lg btn-secondary mx-2" onClick={this.getQrCode}> Get QR Code</button>
                            <button onClick={this.handleFormSubmit} type="submit"  className="btn btn-primary btn-lg">Save</button>
                        </div>
                    </div>
                </form>

            </StoreDashboard>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(index);