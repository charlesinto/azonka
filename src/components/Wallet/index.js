import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Dashboard from "../HOC/Dashboard";
import { PAY_STACK_PUBLIC_KEY } from "../../config/config";
import PaystackButton from "react-paystack";
import validator from "validator";

class Wallet extends Component {
  state = {
    emailAddress: "",
    amount: 0,
    pin: "",
    bank: "",
    customAmount: 0,
    amountToWithdraw: "",
  };
  componentDidMount() {
    document.querySelector(".pay-1").addEventListener("click", () => {
      this.setState({ amount: 1000 });
    });
    document.querySelector(".pay-2").addEventListener("click", () => {
      this.setState({ amount: 5000 });
    });
    document.querySelector(".pay-3").addEventListener("click", () => {
      this.setState({ amount: 10000 });
    });
    document.querySelector(".pay-4").addEventListener("click", () => {
      this.setState({ amount: 15000 });
    });
    document.querySelector(".pay-5").addEventListener("click", () => {
      this.setState({ amount: 20000 });
    });
    document.querySelector(".pay-6").addEventListener("click", () => {
      this.setState({ amount: 50000 });
    });
    document.querySelector(".pay-7").addEventListener("click", () => {
      this.setState({ amount: 100000 });
    });
    document.querySelector(".pay-8").addEventListener("click", () => {
      this.setState({ amount: 1000000 });
    });
    this.props.initiateRegistration();
    this.props.setActiveLink("Azonka Wallet");
    const { emailAddress } = JSON.parse(localStorage.getItem("azonta-user"));
    this.setState({ emailAddress }, () => {
      this.props.getUserWalletDetals();
    });
  }
  componentWillUnmount() {
    document.querySelector(".pay-1").removeEventListener("click", () => {});
    document.querySelector(".pay-2").removeEventListener("click", () => {});
    document.querySelector(".pay-3").removeEventListener("click", () => {});
    document.querySelector(".pay-4").removeEventListener("click", () => {});
    document.querySelector(".pay-5").removeEventListener("click", () => {});
    document.querySelector(".pay-6").removeEventListener("click", () => {});
    document.querySelector(".pay-7").removeEventListener("click", () => {});
    document.querySelector(".pay-8").removeEventListener("click", () => {});
  }
  callback = (response) => {
    console.log(response);
    if (response.status === "success" && response.message === "Approved") {
      this.props.initiateRegistration();
      this.topUpUserWalllet(response.trxref, this.state.amount);
    } // card charged successfully, get reference here
    //this.props.initiateRegistration()
  };
  topUpUserWalllet = async (txnRef, amount) => {
    await this.props.topUpUserWalllet(txnRef, amount);
    this.setState({ customAmount: 0 });
  };
  close = () => {
    console.log("Payment closed");
  };
  getReference = (amount) => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  numberWithCommas = (number = "") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
  handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    let amountToWithdraw = "";
    if (name === "customAmount") {
      amountToWithdraw = value.split(",").join("");
      if (amountToWithdraw !== "") {
        return this.setState({
          [name]: parseInt(amountToWithdraw),
        });
      }
      return this.setState({
        [name]: 0,
      });
    }
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { amountToWithdraw, bank, pin } = this.state;
    if (
      validator.isEmpty(amountToWithdraw) ||
      validator.isEmpty(pin) ||
      validator.isEmpty(bank)
    ) {
      if (validator.isEmpty(bank)) {
        return this.props.renderError("Please Select Bank");
      }
      if (validator.isEmpty(pin)) {
        return this.props.renderError("Please provide pin");
      }
      if (validator.isEmpty(amountToWithdraw)) {
        return this.props.renderError("Please provide amount to withdraw");
      }
    }
    if (parseInt(amountToWithdraw) > parseInt(this.props.balance)) {
      return this.props.renderError(
        "Action could not be performed, Insufficient fund in wallet"
      );
    }
    this.props.initiateRegistration();
    this.props.withdrawlFromWallet(parseInt(amountToWithdraw) * 100, bank, pin);
  };
  render() {
    return (
      <Dashboard>
        <div>
          <div className="container">
            <div className="row ">
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
            Fund Your Wallet
          </h4>
          <hr className="line-separator" />
        </div>
        <div className="container-fluid" style={{ margin: "16px 0" }}>
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <div className="pack-box mt-card">
                <p className="text-header small">Small Pack</p>
                <p className="price larger">
                  <span>&#8358; </span>1,000
                </p>
                <p className="credit">No Bonus Credit</p>
                <div>
                  <p>
                    <PaystackButton
                      text="Fund Wallet"
                      className="btn pay-1 wallet-btn btn-block py-4 btn-primary"
                      callback={this.callback}
                      close={this.close}
                      disabled={false}
                      embed={false}
                      reference={this.getReference()}
                      email={this.state.emailAddress}
                      amount={1000 * 100}
                      paystackkey={PAY_STACK_PUBLIC_KEY}
                      tag="button"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="pack-box mt-card">
                <p className="text-header small">Savings Pack</p>
                <p className="price larger">
                  <span>&#8358; </span>5,000
                </p>
                <p className="credit">No Bonus Credit</p>
                <div>
                  <p>
                    <PaystackButton
                      text="Fund Wallet"
                      className="btn pay-2 wallet-btn btn-block py-4 btn-primary"
                      callback={this.callback}
                      close={this.close}
                      disabled={false}
                      embed={false}
                      reference={this.getReference()}
                      email={this.state.emailAddress}
                      amount={5000 * 100}
                      paystackkey={PAY_STACK_PUBLIC_KEY}
                      tag="button"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="pack-box mt-card">
                <p className="text-header small">Medium Pack</p>
                <p className="price larger">
                  <span>&#8358; </span>10,000
                </p>
                <p className="credit">No Bonus Credit</p>
                <div>
                  <p>
                    <PaystackButton
                      text="Fund Wallet"
                      className="btn pay-3 wallet-btn btn-block py-4 btn-primary"
                      callback={this.callback}
                      close={this.close}
                      disabled={false}
                      embed={false}
                      reference={this.getReference()}
                      email={this.state.emailAddress}
                      amount={10000 * 100}
                      paystackkey={PAY_STACK_PUBLIC_KEY}
                      tag="button"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="pack-box mt-card">
                <span className="pin primary">Popular</span>
                <p className="text-header small">Jumbo Pack</p>
                <p className="price larger">
                  <span>&#8358; </span>15,000
                </p>
                <p className="credit">No Bonus Credit</p>
                <div>
                  <p>
                    <PaystackButton
                      text="Fund Wallet"
                      className="btn pay-4 wallet-btn btn-block py-4 btn-primary"
                      callback={this.callback}
                      close={this.close}
                      disabled={false}
                      embed={false}
                      reference={() => this.getReference(15000)}
                      email={this.state.emailAddress}
                      amount={15000 * 100}
                      paystackkey={PAY_STACK_PUBLIC_KEY}
                      tag="button"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-3">
              <div className="pack-box mt-card">
                <span className="pin primary">Popular</span>
                <p className="text-header small">Elite Pack</p>
                <p className="price larger">
                  <span>&#8358; </span>20,000
                </p>
                <p className="credit">No Bonus Credit</p>
                <div>
                  <p>
                    <PaystackButton
                      text="Fund Wallet"
                      className="btn pay-5 wallet-btn btn-block py-4 btn-primary"
                      callback={this.callback}
                      close={this.close}
                      disabled={false}
                      embed={false}
                      reference={this.getReference()}
                      email={this.state.emailAddress}
                      amount={20000 * 100}
                      paystackkey={PAY_STACK_PUBLIC_KEY}
                      tag="button"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="pack-box mt-card">
                <p className="text-header small">Discover Pack</p>
                <p className="price larger">
                  <span>&#8358; </span>50,000
                </p>
                <p className="credit">No Bonus Credit</p>
                <div>
                  <p>
                    <PaystackButton
                      text="Fund Wallet"
                      className="btn pay-6 wallet-btn btn-block py-4 btn-primary"
                      callback={this.callback}
                      close={this.close}
                      disabled={false}
                      embed={false}
                      reference={this.getReference()}
                      email={this.state.emailAddress}
                      amount={50000 * 100}
                      paystackkey={PAY_STACK_PUBLIC_KEY}
                      tag="button"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="pack-box mt-card">
                <span className="pin primary">Popular</span>
                <p className="text-header small">Family Pack</p>
                <p className="price larger">
                  <span>&#8358; </span>100,000
                </p>
                <p className="credit">No Bonus Credit</p>
                <div>
                  <p>
                    <PaystackButton
                      text="Fund Wallet"
                      className="btn pay-7 wallet-btn btn-block py-4 btn-primary"
                      callback={this.callback}
                      close={this.close}
                      disabled={false}
                      embed={false}
                      reference={this.getReference()}
                      email={this.state.emailAddress}
                      amount={100000 * 100}
                      paystackkey={PAY_STACK_PUBLIC_KEY}
                      tag="button"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-3">
              <div className="pack-box mt-card">
                <span
                  className="pin primary"
                  style={{ backgroundColor: "rgb(232, 18, 121)" }}
                >
                  Hot Deal
                </span>
                <p className="text-header small">Super Pack</p>
                <p className="price larger">
                  <span>&#8358; </span>1,000,000
                </p>
                <p className="credit">No Bonus Credit</p>
                <div>
                  <p>
                    <PaystackButton
                      text="Fund Wallet"
                      className="btn wallet-btn pay-8 btn-block py-4 btn-primary"
                      callback={this.callback}
                      close={this.close}
                      disabled={false}
                      embed={false}
                      reference={this.getReference()}
                      email={this.state.emailAddress}
                      amount={1000000 * 100}
                      paystackkey={PAY_STACK_PUBLIC_KEY}
                      tag="button"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <h3 style={{ fontFamily: "Roboto, sans-serif", fontSize: "1.8em" }}>
              Enter Custom Amount
            </h3>
            <div className="col-12" style={{ display: "flex" }}>
              <div className="form-group col-sm-8 col-md-8 col-lg-6">
                <input
                  onKeyDown={(e) => this.handlePinCodeInputChange(e)}
                  onChange={(e) => this.handleInputChange(e)}
                  value={this.numberWithCommas(this.state.customAmount)}
                  type="text"
                  className="form-control"
                  id="customAmount"
                  name="customAmount"
                  placeholder="Enter amount"
                />
              </div>
              <div className="form-group col-sm-4 col-md-4 col-lg-6">
                <p>
                  <PaystackButton
                    text="Fund Wallet"
                    className="btn py-4 btn-primary"
                    callback={this.callback}
                    close={this.close}
                    disabled={false}
                    embed={false}
                    reference={this.getReference()}
                    email={this.state.emailAddress}
                    amount={parseInt(this.state.customAmount) * 100}
                    paystackkey={PAY_STACK_PUBLIC_KEY}
                    tag="button"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-card-shadow">
                            <div className="form-box-item rm-border" >
                                <h4>Wallet Withdrawal</h4>
                                <hr className="line-separator" />
                                <form >
                                    <hr className="line-separator top"/>
                                    <div className="row" style={{marginTop: '1rem'}}>
                                        <div className="form-group col-md-12 col-sm-12">
                                            <label htmlFor="ccnum" className="rl-label required rm-margin-top" >Amount to withdraw</label>
                                            <input onKeyDown={this.handlePinCodeInputChange} onChange={this.handleInputChange} value={this.numberWithCommas(this.state.amountToWithdraw)} type="text" className="form-control"
                                             id="ccnum" name="amountToWithdraw" placeholder="Enter amount to withdraw" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-md-6 col-sm-12">
                                            <label htmlFor="exp_year" className="rl-label required rm-margin-top">Bank to be paid</label>
                                            <label htmlFor="exp_year" className="select-block">
                                                <select className="form-control" onChange={this.handleInputChange} value={this.state.bank} name="bank" id="exp_year">
                                                    <option value="">Select Bank</option>
                                                    {
                                                        this.props.savedBanks.map(bank => (
                                                            <optgroup label={bank.name}>
                                                                <option value={bank.id}>
                                                                    {`${bank.accountName} - ${bank.accountNumber}` }
                                                                </option>
                                                            </optgroup>
                                                        ))
                                                    }
                                                </select>
                                            </label>
                                        </div>
                                        <div className="form-group col-md-6 col-sm-12">
                                            <label htmlFor="secode" className="rl-label required rm-margin-top">Security Pin</label>
                                            <input onChange={this.handleInputChange} value={this.state.pin} style={{marginTop:'2.3rem'}} type="password" className="form-control" id="secode" name="pin" placeholder="Enter your security pin here..." />
                                        </div>
                                    </div>
                                    <hr className="line-separator"/>
                                    <button onClick={this.handleFormSubmit} style={{width:'100%'}} className="btn btn-sm btn-outline-success">Make Withdrawal</button>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                    <div className="row" style={{marginTop: 10}}>
                        <div className="col-lg-12 col-md-12 col-sm-12 mt-card-shadow">
                            <div className="form-box-item rm-border" >
                                    <h4>Wallet Transactions</h4>
                                    <hr className="line-separator" />
                                <div className="conatiner-fluid">
                                   <WalletDataTable data={this.props.transactions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                */}
      </Dashboard>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    bank: {
      loading,
      error,
      errorMessage,
      successMessage,
      showSuccessBar,
      banks,
      savedBanks,
      resetForm,
      transactions,
      balance,
      walletId,
    },
    reg: { unAuthorized },
  } = state;
  const sortedBanks = banks.sort(
    (item1, item2) => item1.name.toLowerCase() > item2.name.toLowerCase()
  );
  return {
    banks: sortedBanks,
    loading,
    error,
    errorMessage,
    successMessage,
    showSuccessBar,
    savedBanks,
    unAuthorized,
    resetForm,
    transactions,
    balance,
    walletId,
  };
};

export default connect(mapStateToProps, actions)(Wallet);
