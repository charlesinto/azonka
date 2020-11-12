import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import Dashboard from "../HOC/Dashboard";
import SweetAlert from "react-bootstrap-sweetalert";
import AddressDataTable from "../../common/AddressDataTable";
// import Axios from "axios";
import Swal from "sweetalert2";
import locationState from "../../helper/locationState";

class index extends Component {
  INITIAL_STATE = {
    profileInformation: {},
    billingInformation: {},
    shippingInformation: {},
    copyToShip: false,
    showBalanceInStatusBar: true,
    sendEmails: true,
    inValidElements: [],
    country: "",
    address: "",
    state: "",
    name: "",
    validationMessage: [],
    inValidElments: [],
    actionMode: "save",
    isoCode: "234",
    id: null,
    cities: [],
    city: "",
    states: [
      "Abuja",
      "Abia",
      "Adamawa",
      "Akwa Ibom",
      "Anambra",
      "Bauchi",
      "Bayelsa",
      "Benue",
      "Borno",
      "Cross River",
      "Delta",
      "Ebonyi",
      "Edo",
      "Ekiti",
      "Enugu",
      "Gombe",
      "Imo",
      "Jigawa",
      "Kaduna",
      "Kano",
      "Katsina",
      "Kebbi",
      "Kogi",
      "Kwara",
      "Lagos",
      "Nassarawa",
      "Niger",
      "Ogun",
      "Ondo",
      "Osun",
      "Oyo",
      "Plateau",
      "Rivers",
      "Sokoto",
      "Taraba",
      "Yobe",
      "Zamfara",
    ],
  };
  constructor(props) {
    super(props);
    this.state = { ...this.INITIAL_STATE };
  }
  componentDidMount() {
    this.props.setActiveLink("My Address Book");
    this.props.initiateRegistration();
    this.props.getAddresses();
    const states = locationState.getStates();
    this.setState({
      states,
    });
  }

  handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    const index = this.state.inValidElments.indexOf(name);
    let newInvalidElements = [];
    if (index !== -1) {
      this.state.inValidElments.splice(index, 1);
    }
    newInvalidElements = [...this.state.inValidElments];
    this.setState(
      {
        [name]: value,
        newInvalidElements,
      },
      async () => {
        try {
          if (name === "state") {
            const locals = locationState.getLocalgovernments(this.state.state);

            this.setState(
              {
                cities: locals,
              },
              () => this.props.stopLoading()
            );
          }
        } catch (error) {
          Swal.fire("Error Loading Data", "Could not load cities", "error");
        }
      }
    );
  };
  validateFormData = (formdata) => {
    const { state, country, address, city } = formdata;
    let isValid = true;
    const inValidElments = [];
    const validationMessage = {};
    if (!(state && state.trim() !== "")) {
      isValid = false;
      inValidElments.push("state");
      validationMessage["state"] = "Please select state";
    }
    if (!(country && country.trim() !== "")) {
      isValid = false;
      inValidElments.push("country");
      validationMessage["country"] = "Please select country";
    }
    if (!(address && address.trim() !== "")) {
      isValid = false;
      inValidElments.push("address");
      validationMessage["address"] = "Address is required";
    }
    if (!(city && city.trim() !== "")) {
      isValid = false;
      inValidElments.push("city");
      validationMessage["city"] = "City is required";
    }

    return {
      isValid,
      validationMessage,
      inValidElments,
      formdata,
    };
  };
  _handleRowClick = async (id, action = "") => {
    if (action === "edit") {
      const index = this.props.address.findIndex(
        (element) => element.id === parseInt(id)
      );
      if (index !== -1) {
        const userAddress = this.props.address.find(
          (element) => element.id === parseInt(id)
        );
        console.log(userAddress);
        await this.setState({
          ...userAddress,
          id,
          name: userAddress.address1,
          address: userAddress.address1,
          actionMode: "edit",
        });
      }
    }
    if (action === "delete") {
      this.setState({
        showInfo: true,
        id,
      });
    }
  };
  processForm = (actionType = "save") => {
    const {
      isValid,
      inValidElments,
      validationMessage,
    } = this.validateFormData(this.state);
    if (!isValid) {
      this.props.renderError(
        "Action cannot be performed,one or more fields required",
        { appearance: "error" }
      );

      return this.setState({
        inValidElments,
        validationMessage,
      });
    }

    this.props.initiateRegistration();
    switch (actionType) {
      case "save":
        return this.props.createAddress(this.state);
      case "update":
        return this.props.updateAddress(this.state);
      case "delete":
        return this.props.deleteAddress(this.state.id);
      default:
        return;
    }
  };
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.processForm();
  };
  handleFormDelete = (e, actionMode = null) => {
    e.preventDefault();
    // if(this.state.pin.trim() === ''){
    //     this.setState({
    //         showAlert: true,
    //         actionMode
    //     })
    // }
    this.setState({ ...this.INITIAL_STATE });
  };
  deleteFile = async () => {
    this.props.initiateRegistration();
    await this.props.modifyAddress("delete", null, this.state.id);
    this.setState({ showInfo: false, id: null });
  };
  onCancel = () => {
    this.setState({
      id: null,
      showInfo: false,
    });
  };
  handleFormUpdate = async (e, actionType) => {
    e.preventDefault();
    const { address, state, country } = this.state;
    if (address.trim() === "") {
      return this.props.renderError("Address is required");
    }
    if (state.trim() === "") {
      return this.props.renderError("State is required");
    }
    if (country.trim() === "") {
      return this.props.renderError("Country is required");
    }
    this.props.initiateRegistration();
    await this.props.modifyAddress(
      "update",
      { ...this.state, address1: this.state.address },
      this.state.id
    );
    await this.setState({ ...this.INITIAL_STATE });
  };
  render() {
    return (
      <Dashboard>
        <h2>Manange Address Book</h2>
        <div className="add-bank">
          <form>
            <div className="container">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="name" className="rl-label">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className={`${
                      this.state.inValidElments.includes("address")
                        ? "invalid"
                        : ""
                    }`}
                    value={this.state.address}
                    onChange={this.handleInputChange}
                    placeholder="Enter Address"
                  />
                  {this.state.inValidElments.includes("address") ? (
                    <div className="error-message required">
                      {this.state.validationMessage["address"]}
                    </div>
                  ) : null}
                </div>

                <div className="col-md-6 col-sm-12">
                  <label htmlFor="state" className="rl-label">
                    State
                  </label>
                  <select
                    name="state"
                    className={`${
                      this.state.inValidElments.includes("state")
                        ? "invalid"
                        : ""
                    }`}
                    value={this.state.state}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Select State</option>
                    {this.state.states.map((state) => (
                      <option value={state.name}>{state.name}</option>
                    ))}
                  </select>
                  {this.state.inValidElments.includes("state") ? (
                    <div className="error-message required">
                      {this.state.validationMessage["state"]}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row py-3">
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="city" className="rl-label">
                    City
                  </label>
                  <select
                    name="city"
                    className={`${
                      this.state.inValidElments.includes("city")
                        ? "invalid"
                        : ""
                    }`}
                    value={this.state.city}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Select City</option>
                    {this.state.cities.map((city, i) => (
                      <option key={i} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                    {/* <option value="Nigeria">Nigeria</option> */}
                  </select>
                  {this.state.inValidElments.includes("city") ? (
                    <div className="error-message required">
                      {this.state.validationMessage["city"]}
                    </div>
                  ) : null}
                </div>
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="country" className="rl-label">
                    Country
                  </label>
                  <select
                    name="country"
                    className={`${
                      this.state.inValidElments.includes("country")
                        ? "invalid"
                        : ""
                    }`}
                    value={this.state.country}
                    onChange={this.handleInputChange}
                  >
                    <option value="">Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                  </select>
                  {this.state.inValidElments.includes("country") ? (
                    <div className="error-message required">
                      {this.state.validationMessage["country"]}
                    </div>
                  ) : null}
                </div>
              </div>
              <div style={{ padding: "20px 0 10px" }}>
                {this.state.actionMode === "save" ? (
                  <div className="row">
                    <div className="col-md-8 col-sm-12"></div>
                    <div className="col-md-4 col-sm-12">
                      <button
                        onClick={this.handleFormSubmit}
                        className="btn px-5 btn-primary"
                        style={{ margin: "0 auto" }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-8 col-sm-12"></div>
                    <div className="col-md-4 col-sm-12">
                      <div style={{ marginBottom: 10, marginLeft: 10 }}>
                        <button
                          onClick={(e) => this.handleFormUpdate(e, "update")}
                          className="btn px-5 btn-warning"
                          style={{
                            margin: "0 auto",
                            borderColor: "#ffc107",
                            background: "#ffc107",
                            width: "100%",
                            color: "#fff",
                          }}
                        >
                          Update
                        </button>
                      </div>
                      <div style={{ marginBottom: 10, marginLeft: 10 }}>
                        <button
                          onClick={(e) => this.handleFormDelete(e, "delete")}
                          className="btn px-5  btn-danger"
                          style={{ margin: "0 auto", width: "100%" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="container">
          <h4
            className="popup-title verify-email"
            style={{
              fontWeight: "normal",
              fontFamily: "Roboto, sans-serif",
              marginLeft: 20,
              marginTop: 30,
              marginBottom: 10,
            }}
          >
            Your Addresses
          </h4>
          <hr className="line-separator" />
          <AddressDataTable
            data={this.props.address}
            handleRowClick={(id, action) => this._handleRowClick(id, action)}
          />
        </div>
        {this.state.showInfo ? (
          <SweetAlert
            info
            showCancel
            confirmBtnText="Yes, delete it"
            confirmBtnBsStyle="danger"
            title="Are you sure?"
            onConfirm={this.deleteFile}
            onCancel={this.onCancel}
            focusCancelBtn
          >
            Action can not be undone
          </SweetAlert>
        ) : null}
      </Dashboard>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    store: { stores, resetForm, pageNumber, lastId },
    home: { subCategories, categories },
    inventory: { address },
  } = state;
  console.log("address", address);
  return {
    stores,
    resetForm,
    pageNumber,
    lastId,
    subCategories,
    categories,
    address,
  };
};

export default connect(mapStateToProps, actions)(index);
