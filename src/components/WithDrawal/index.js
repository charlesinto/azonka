import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "validator";
import WalletDataTable from "../../common/WalletDataTable";
import Dashboard from "../HOC/Dashboard";
import * as actions from "../../actions";
// import MaterialTable from "material-table";

class index extends Component {
  INITIAL_STATE = {
    emailAddress: "",
    amount: "",
    pin: "",
    bank: "",
    customAmount: 0,
    amountToWithdraw: "",
  };
  constructor(props) {
    super(props);
    this.state = { ...this.INITIAL_STATE };
  }
  componentDidMount() {
    this.props.initiateRegistration();
    this.props.setActiveLink("Wallet Withdrawal");
    const { emailAddress } = JSON.parse(localStorage.getItem("azonta-user"));
    this.setState({ emailAddress }, () => {
      this.props.getUserWalletDetals();
    });
  }
  numberWithCommas = (number = "") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  converToDate = (timestamp) => {
    // const MONTHS = ['January','February', 'March', 'April', 'May', 'June', 'July'
    //     ,'August','September', 'October', 'November', 'Decemeber']
    const date = new Date(timestamp);
    // return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
    return date.toLocaleString();
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
    if (name === "amountToWithdraw") {
      amountToWithdraw = value.split(",").join("");
      if (amountToWithdraw !== "") {
        return this.setState({
          [name]: amountToWithdraw,
        });
      }
      // return this.setState({
      //     [name] : 0
      // })
    }
    return this.setState({
      [name]: value,
    });
  };
  handleFormSubmit = async (e) => {
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
    console.log("amount to widthdraw: ", amountToWithdraw);
    await this.props.withdrawlFromWallet(
      parseInt(amountToWithdraw) * 100,
      bank,
      pin
    );
    this.setState({ ...this.INITIAL_STATE });
  };
  numberWithCommas = (number = "") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    return (
      <Dashboard>
        <div className="container-fluid">
          <div className="container-fluid">
            <div className="row ">
              <div className="current-balance bg-white">
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
          <div className="row pt-3">
            <div className="col-md-12">
              <div className=" rm-border">
                {/* <h4>Wallet Withdrawal</h4> */}
                <hr className="line-separator" />
                <form autoComplete="off">
                  <input
                    autocomplete="false"
                    name="hidden"
                    type="text"
                    className="hidden-input"
                  />
                  <hr className="line-separator top" />
                  <div className="row" style={{ marginTop: "1rem" }}>
                    <div className="form-group col-md-12 col-sm-12">
                      <label
                        htmlFor="ccnum"
                        className="rl-label required rm-margin-top"
                      >
                        Amount to withdraw (NGN)
                      </label>
                      <input
                        onKeyDown={this.handlePinCodeInputChange}
                        onChange={this.handleInputChange}
                        value={this.numberWithCommas(
                          this.state.amountToWithdraw
                        )}
                        type="text"
                        className="form-control"
                        id="ccnum"
                        name="amountToWithdraw"
                        placeholder="Enter amount to withdraw"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6 col-sm-12">
                      <label
                        htmlFor="exp_year"
                        className="rl-label required rm-margin-top"
                      >
                        Bank to be paid
                      </label>
                      <label htmlFor="exp_year" className="select-block">
                        <select
                          className="form-control"
                          onChange={this.handleInputChange}
                          value={this.state.bank}
                          name="bank"
                          id="exp_year"
                        >
                          <option value="">Select Bank</option>
                          {this.props.savedBanks.map((bank) => (
                            <optgroup label={bank.name}>
                              <option value={bank.id}>
                                {`${bank.accountName} - ${bank.accountNumber}`}
                              </option>
                            </optgroup>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="form-group col-md-6 col-sm-12">
                      <label
                        htmlFor="secode"
                        className="rl-label required rm-margin-top"
                      >
                        Security PIN
                      </label>
                      <input
                        onChange={this.handleInputChange}
                        value={this.state.pin}
                        style={{ marginTop: "2.3rem" }}
                        type="password"
                        className="form-control"
                        id="secode"
                        name="pin"
                        placeholder="Enter your security pin here..."
                      />
                    </div>
                  </div>
                  <hr className="line-separator" />
                  <button
                    onClick={this.handleFormSubmit}
                    className="btn  btn-success"
                  >
                    Make Withdrawal
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginTop: 10 }}>
            <div className=" col-md-12">
              <div className="">
                {/* <h4>Wallet Transactions</h4> */}
                <hr className="line-separator" />
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-12">
                      <WalletDataTable data={this.props.transactions} />
                    </div>
                  </div>
                  {/* > */}
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps, actions)(index);

/*
<div className="order-table mb-3">
                    <MaterialTable
                      components={{
                        Action: (props) => {
                          // console.log(props)
                          if (props.action.icon === "save") {
                            return (
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`/store/qrcode-generate/${props.data.deliveryCode}`}
                                className="btn btn-lg btn-primary"
                              >
                                Generate Qr Code
                              </a>
                            );
                          }
                          if (props.action.icon === "check") {
                            const isChecked =
                              this.state.selectedDelivery.findIndex(
                                (item) => item.id === props.data.id
                              ) !== -1;
                            return (
                              <>
                                <input
                                  onClick={() =>
                                    this.onDeliverySelect(props.data)
                                  }
                                  type="checkbox"
                                  className=" mx-3"
                                  style={{ display: "block", marginTop: 5 }}
                                  checked={isChecked}
                                />{" "}
                                <button className="btn btn-primary mx-2">
                                  View Products
                                </button>
                              </>
                            );
                          }
                        },
                      }}
                      columns={[
                        {
                          title: "Type",
                          field: "type",
                          render: (data) => {
                            return data.type.toUpperCase();
                          },
                        },
                        { title: "Amount", field: "amount" },
                        { title: "Description", field: "desc" },
                        {
                          title: "Status",
                          field: "status",
                          render: (data) => {
                            return data.status.toUpperCase();
                          },
                        },
                        {
                          title: "Date",
                          field: "createdAt",
                          render: (data) => {
                            return this.converToDate(data.createdAt);
                          },
                        },
                      ]}
                      data={this.props.transactions}
                      title=""
                      options={{
                        headerStyle: {
                          // background: "#00AAFF",
                          color: "#000",
                          fontFamily: '"Titillium Web", sans-serif',
                          fontWeight: "bold",
                          zIndex: 1,
                        },
                        rowStyle: {
                          fontSize: "18px !important",
                          fontFamily: '"Titillium Web", sans-serif',
                        },
                        searchFieldStyle: {},
                        actionsColumnIndex: -1,
                      }}
                    />
                  </div>

*/
