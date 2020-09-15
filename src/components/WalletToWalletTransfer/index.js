import React, { Component } from "react";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import * as actions from "../../actions";
import Dashboard from "../HOC/Dashboard";
import Axios from "axios";
import Swal from "sweetalert2";

class WalletToWalletTransfer extends Component {
  INITIAL_STATE = {
    walletId: "",
    amount: "",
    pin: "",
    recipientFirstName: "",
    recipientLastName: "",
    showConfirmDialog: false,
  };
  constructor(props) {
    super(props);
    this.state = { ...this.INITIAL_STATE };
  }
  componentDidMount() {
    this.props.setActiveLink("Wallet Transfer");
    this.props.getUserWalletDetals();
  }
  handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "amount") {
      const amountToTransfer = value.split(",").join("");
      if (amountToTransfer !== "") {
        return this.setState({
          [name]: this.numberWithCommas(amountToTransfer),
        });
      }
    }
    this.setState({
      [name]: value,
    });
  };
  numberWithCommas = (number = "") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  onFormSubmit = async (e) => {
    e.preventDefault();
    if (this.state.amount.trim() === "") {
      return this.props.renderError("Amount cannot be zero or empty");
    }
    if (this.state.pin.trim() === "") {
      return this.props.renderError("Please provide your security pin");
    }
    if (this.state.walletId.trim() === "") {
      return this.props.renderError("Please provide receiver wallet Id");
    }
    this.getRecipientDetails();
    // await this.setState({showConfirmDialog: true})
  };
  getRecipientDetails = async () => {
    try {
      this.props.initiateRegistration();
      const token = localStorage.getItem("x-access-token");
      const response = await Axios.get(
        `/api/v1/user/wallet/get-user-from-wallet-id/${this.state.walletId}`,
        { headers: { "x-access-token": token } }
      );
      this.props.stopLoading();
      const user = response.data.user;
      await this.setState({
        showConfirmDialog: true,
        recipientFirstName: user.firstName,
        recipientLastName: user.lastName,
      });
    } catch (error) {
      this.props.stopLoading();
      if (error.response) {
        return Swal.fire(
          "Error fetching user",
          error.response.data.message,
          "info"
        );
      }
      Swal.fire("some errors were encountered");
    }
  };
  handlePinCodeInputChange = (e) => {
    // console.log(e.key)
    const KEYS_ALLOWED = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const CONTROLS = [
      "Backspace",
      "ArrowUp",
      "Enter",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];
    console.log(e.key);
    if (KEYS_ALLOWED.includes(e.key) || CONTROLS.includes(e.key)) {
      if (e.target.value.trim().length === 4 && !CONTROLS.includes(e.key)) {
        return e.preventDefault();
      }
      return e;
    }
    return e.preventDefault();
  };
  onConfirm = async (e) => {
    // call the api to transfer
    await this.setState({ showConfirmDialog: false });
    this.props.initiateRegistration();

    const amount = this.state.amount.split(",").join("");
    await this.props.transferToWallet({
      amount: `${parseInt(amount) * 100}`,
      receiver: this.state.walletId,
      pin: this.state.pin,
      currency: "naira",
    });
    this.setState({ ...this.INITIAL_STATE });
  };
  onCancel = (e) => {
    this.setState({ showConfirmDialog: false });
  };
  render() {
    return (
      <Dashboard>
        <div className="container-fluid">
          <div className="container-fluid">
            <div className="row">
              <div className="current-balance mt-card">
                <div>
                  <span className="mr-2">Current Balance</span>
                  <span className="text-success">
                    &#8358; {this.numberWithCommas(this.props.balance / 100)}
                  </span>
                </div>
                <div className="">
                  <span>Wallet ID: </span>
                  <span>{this.props.walletId}</span>
                </div>
              </div>
            </div>
          </div>
          <h4
            className="popup-title verify-email"
            style={{
              fontWeight: "normal",
              fontFamily: "Roboto, sans-serif",
              marginLeft: 20,
            }}
          >
            Wallet Transfers
          </h4>
          <hr className="line-separator" />
          <form autoComplete={false} onSubmit={this.onFormSubmit}>
            <fieldset>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="walletId">Reciever Wallet Id</label>
                    <input
                      type="text"
                      name="walletId"
                      value={this.state.walletId}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="amount">Enter Amount</label>
                    <input
                      onKeyDown={this.handlePinCodeInputChange}
                      type="text"
                      name="amount"
                      value={this.state.amount}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="amount">Enter Pin</label>
                    <input
                      type="password"
                      name="pin"
                      value={this.state.pin}
                      className="form-control"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="form-group">
                    <button
                      type="submit"
                      onSubmit={this.onFormSubmit}
                      className="transfer-btn btn btn-primary btn-small"
                    >
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
          {this.state.showConfirmDialog ? (
            <SweetAlert
              warning
              showCancel
              confirmBtnText="Transfer"
              confirmBtnBsStyle="primary"
              title={`Confirm Transfer`}
              onConfirm={this.onConfirm}
              onCancel={this.onCancel}
              focusCancelBtn
            >
              Transfer <b>NGN {this.state.amount} </b>to{" "}
              <b>
                {this.state.recipientFirstName} {this.state.recipientLastName}
              </b>
              . Are you sure?
            </SweetAlert>
          ) : null}
        </div>
      </Dashboard>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    bank: { balance, walletId },
  } = state;
  return {
    balance,
    walletId,
  };
};

export default connect(mapStateToProps, actions)(WalletToWalletTransfer);
