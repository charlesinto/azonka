import React, { Component } from "react";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import Drawer from "@material-ui/core/Drawer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import Validator from "validator";
import { PAY_STACK_PUBLIC_KEY } from "../../config/config";
import Swal from "sweetalert2";
import Axios from "axios";
import locationState from "../../helper/locationState";


class Checkout extends Component {
  INITIAL_STATE = {
    sum: 0,
    modal: false,
    firstName: "",
    lastName: "",
    userAddress: "",
    address: [],
    state: "",
    country: "",
    payType: "pay with debit",
    paystack: false,
    emailAddress: "",
    auth: false,
    transactionNumber: "",
    addressId: "",

    states: [],
    city: "",
    cities: [],
    delivery: {},
    query:""
  };
  autoComplete = null;
  autoCompleteRef;
  
  constructor() {
    super()
    this.state = { ...this.INITIAL_STATE };
    this.autoCompleteRef = React.createRef()
  }
  async componentDidMount() {

    
    
    let token = localStorage.getItem("x-access-token");

    if (!token) {
      return this.props.history.push("/users/cart");
    } else {
      if (this.props.amount > 0) {
        const states = locationState.getStates();
        console.log("states: ", states);
        const { firstName, lastName, emailAddress } = JSON.parse(
          localStorage.getItem("azonta-user")
        );
        this.setState({
          auth: true,
          firstName,
          lastName,
          emailAddress,
          states,
        });
        this.props.initiateRegistration();
        await this.loadCart();

        this.props.stopLoading();
        this.handleScriptLoad(this.autoCompleteRef)
      } else {
        return this.props.history.push("/users/cart");
      }
    }
  }

  

 loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

 handleScriptLoad = (autoCompleteRef) => {
  this.autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    {  componentRestrictions: { country: "NG" } }
  );
  this.autoComplete.setFields(["address_components", "formatted_address"]);
  this.autoComplete.addListener("place_changed", () =>
    this.handlePlaceSelect()
  );
}

  handlePlaceSelect= async () => {
  const addressObject = this.autoComplete.getPlace();
  const query = addressObject.formatted_address;
  console.log('query: ',query)
  this.setState({query, userAddress: query})
  console.log(addressObject);
}

  loadCart = async () => {
    // setInterval(async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let token = localStorage.getItem("x-access-token");
        if (token) {
          // this.props.initiateRegistration();
          this.setState(
            {
              cartData: this.props.cartItems.products,
              quantity: this.props.cartItems.quantity,
            },
            async () => {
              console.log(this.state);
              this.calculateSum();
              this.props.initiateRegistration();
              await this.props.setCategories();
              await this.props.fetchCheckoutCart();
              this.props.stopLoading();
            }
          );

          resolve(null);
          // console.log("aza", this.state.cartData)
        } else {
          await this.props.fetchLocalCart();
          console.log("load drp", this.props.cartData);
          this.setState({ cartData: this.props.cartData });
          resolve(null);
        }
      } catch (error) {
        reject(error);
        console.log(error);
      }
    });
  };

  calculateSum = () => {
    const { cartData } = this.state;
    let amountOrdered = cartData
      ? cartData.reduce((a, b) => {
          return a + b.finalPrice * (this.state.quantity[b.id] || 1);
        }, 0)
      : 0;

    this.setState({ sum: amountOrdered }, () => this.props.stopHomeLoading());
  };
  numberWithCommas = (number = "") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  toggleDrawer = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  callback = (response) => {
    console.log("Response from Paystack: ", response);
    if (response.status === "success" && response.message === "Approved") {
      try {
        this.props.initiateRegistration();
        // console.log(this.props.cartData);
        const deliveryFeePerSeller = {};
        Object.keys(this.state.delivery).forEach((key) => {
          if (key !== "totalDeliveryFee") {
            deliveryFeePerSeller[key] = `${
              this.state.delivery[key].delivery.deliveryAmount * 100
            }`;
          }
        });

        console.log(deliveryFeePerSeller);

        this.props.registerPayment(
          response.transaction,
          response.trxref,
          this.state.sum,
          this.state.payType,
          this.props.cartData,
          this.state.addressId,
          this.state.userAddress,
          "",
          this.state.state,
          this.state.city,
          `${this.state.delivery.totalDeliveryFee * 100}`,
          deliveryFeePerSeller
        );
      } catch (error) {
        console.log("error is: ", error);
      }
    } // card charged successfully, get reference here
    //this.props.initiateRegistration()
  };
  close = () => {
    console.log("Payment closed");
  };
  getReference = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  };
  renderModal = () => {
    if (this.state.modal) {
      return (
        <Drawer
          anchor="bottom"
          open={this.state.modal}
          onClose={() => this.toggleDrawer()}
        >
          <div
            role="presentation"
            anchor="bottom"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
            className="modal-bottom-padding"
          >
            <main className="container">
              <div className="row">
                <div className="col-12">
                  <article className="default-font article-header">
                    Hello, Awesome User
                  </article>
                  <p className="default-font article-body">
                    Thank you for shopping through Azonka, please kindly{" "}
                    <strong
                      style={{
                        color: "#000",
                        textTransform: "capitalize",
                      }}
                    >
                      login or create account{" "}
                    </strong>
                    to make purchases and enjoy the full benefits provided for
                    you
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div
                    style={{
                      display: "flex",
                      margin: "10px 0px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={this.toggleDrawer}
                      style={{ marginRight: 10 }}
                      className="btn btn-sm btn-outline-dark"
                    >
                      Thanks, Later
                    </button>
                    <Link to="/users/login" className="btn btn-sm btn-success">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </Drawer>
      );
    }
  };
  handleInputChange = (e, form) => {
    e.preventDefault();
    const {
      target: { name, value },
    } = e;
    if (name === "paymentType" || name === "paymentTypet") {
      return this.setState(
        {
          payType: value,
        },
        () => console.log(this.state)
      );
    }
    this.setState(
      {
        [name]: value,
      },
      async () => {
        try {
          if (name === "state") {
            const locals = locationState.getLocalgovernments(this.state.state);

            this.setState({
              cities: locals,
            });
          }
        } catch (error) {}
      }
    );
  };
  handleAddressSelect = (id) => {
    if (this.state.addressId === id) {
      this.setState({
        addressId: "",
      });
    } else {
      this.setState({
        addressId: id,
      });
    }
  };
  renderShippingLocation = () => {
    if (this.state.auth) {
      return (
        <div className="card">
          <div className="card-header">
            <div className="container">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h4 className="default-font">Delivery Address</h4>
                </div>
                <div style={{ textAlign: "right" }}>
                  {this.state.auth ? (
                    <Link
                      to="/users/profile"
                      style={{ cursor: "pointer" }}
                      title="Edit Profile"
                      className="btn-edit"
                    >
                      EDIT <i className="icon-pencil"></i>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="container">
              <div className="row">
                {this.props.address.length > 0 ? (
                  <ul style={{ width: "100%" }}>
                    {this.props.address.map((item, i) => (
                      <li
                        style={{
                          display: "flex",
                          width: "100%",
                          alignItems: "center",
                          marginBottom: 16,
                        }}
                        key={i}
                      >
                        <input
                          type="checkbox"
                          value={`${item.id}`}
                          name={`${item.id}`}
                          onChange={(e) => this.handleInputChange(e, "address")}
                          checked={parseInt(this.state.addressId) === item.id}
                        />
                        <label
                          style={{ display: "flex" }}
                          value={`${item.id}`}
                          name={`${item.id}`}
                          className="label-check"
                          onClick={(e) => this.handleAddressSelect(item.id)}
                        >
                          <span className="checkbox primary primary">
                            <span></span>
                          </span>
                          <p
                            className="address-htag"
                            style={{
                              padding: "0 8px",
                              fontFamily: "open sans, sans-serif",
                              fontSize: "2.1rem",
                              color: "#000",
                            }}
                          >
                            <span
                              style={{
                                marginLeft: 8,
                                textTransform: "capitalize",
                              }}
                            >
                              {item.address1},
                            </span>
                            <span
                              style={{
                                marginLeft: 8,
                                textTransform: "capitalize",
                              }}
                            >
                              {item.state},
                            </span>
                            <span
                              style={{
                                marginLeft: 8,
                                textTransform: "capitalize",
                              }}
                            >
                              {item.country}
                            </span>
                          </p>
                        </label>
                      </li>
                    ))}

                    <li
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <form
                        action="#"
                        style={{ width: "100%" }}
                        className="mb-1"
                      >
                        <div className="row">
                          <div className="col-md-12 col-sm-12">
                            <label htmlFor="address">
                              Address
                              <span className="required">*</span>
                            </label>
                            <input
                          name="userAddress"
                          placeholder="Enter delivery address"
                          
                          type="text"
                          className="form-input form-wide mb-2"
                          required=""
                          ref={this.autoCompleteRef}
                        onChange={event => this.setState({query: event.target.value})}
                        
                        value={this.state.query}
                        />
                            
                            {/* <input
                              name="userAddress"
                              placeholder="Enter delivery address"
                              value={this.state.userAddress}
                              onChange={(e) =>
                                this.handleInputChange(e, "login")
                              }
                              type="text"
                              className="form-input form-wide mb-2"
                              required=""
                            /> */}
                            {/* <GooglePlacesAutocomplete apiKey="AIzaSyBla_4kdbuaPErMj-s-VQHHs_hKGcKakic" /> */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="state">
                              State
                              <span className="required">*</span>
                            </label>
                            <select
                              name="state"
                              value={this.state.state}
                              onChange={(e) =>
                                this.handleInputChange(e, "login")
                              }
                            >
                              <option value="">Select State</option>
                              {this.state.states.map((e, i) => (
                                <option value={e.name} key={i}>
                                  {e.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="city">
                              City
                              <span className="required">*</span>
                            </label>
                            <select
                              name="city"
                              value={this.state.city}
                              onChange={(e) =>
                                this.handleInputChange(e, "login")
                              }
                            >
                              <option value="">Select City</option>
                              {this.state.cities.map((e, i) => (
                                <option value={e.name} key={i}>
                                  {e.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </form>
                    </li>
                  </ul>
                ) : (
                  <form action="#" style={{ width: "100%" }} className="mb-1">
                    <div className="row">
                      <div className="col-md-12 col-sm-12">
                        <label htmlFor="address">
                          Address
                          <span className="required">*</span>
                        </label>
                        <input
                          name="userAddress"
                          placeholder="Enter delivery address"
                          
                          type="text"
                          className="form-input form-wide mb-2"
                          required=""
                          ref={this.autoCompleteRef}
                        onChange={event => this.setState({query: event.target.value})}
                        
                        value={this.state.query}
                        />
                         {/* <input
                        ref={this.autoCompleteRef}
                        className="form-input form-wide mb-2"
                        onChange={event => this.setState({query: event.target.value})}
                        placeholder="Enter a City"
                        value={this.state.query}
                      /> */}
                        {/* <GooglePlacesAutocomplete apiKey="AIzaSyBla_4kdbuaPErMj-s-VQHHs_hKGcKakic" /> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="state">
                          State
                          <span className="required">*</span>
                        </label>
                        <select
                          name="state"
                          value={this.state.state}
                          onChange={(e) => this.handleInputChange(e, "login")}
                        >
                          <option value="">Select State</option>
                          {this.state.states.map((e, i) => (
                            <option value={e.name} key={i}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="city">
                          City
                          <span className="required">*</span>
                        </label>
                        <select
                          name="city"
                          value={this.state.city}
                          onChange={(e) => this.handleInputChange(e, "login")}
                        >
                          <option value="">Select City</option>
                          {this.state.cities.map((e, i) => (
                            <option value={e.name} key={i}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  renderUserData = () => {
    if (this.state.auth) {
      return (
        <div className="card">
          <div className="card-header">
            <div className="container">
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h4 className="default-font">Profile Information</h4>
                </div>
                <div style={{ textAlign: "right" }}>
                  {this.state.auth ? (
                    <Link
                      to="/users/profile"
                      style={{ cursor: "pointer" }}
                      title="Edit Profile"
                      className="btn-edit"
                    >
                      EDIT <i className="icon-pencil"></i>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <span className="checkout-user-icon">
                    <i className="far fa-user"></i>
                  </span>
                  <span className="checkout-user">
                    {`${this.state.firstName} ${this.state.lastName}`}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <span className="checkout-user-icon">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="checkout-sub-title">
                    {this.state.emailAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="card">
        <div className="card-header">
          <div className="container">
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h4 className="default-font">Profile Information</h4>
              </div>
              <div style={{ textAlign: "right" }}>
                {this.state.auth ? (
                  <Link
                    to="/users/profile"
                    style={{ cursor: "pointer" }}
                    title="Edit Profile"
                    className="btn-edit"
                  >
                    EDIT <i className="icon-pencil"></i>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="container">
            <form action="#" className="mb-1">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="firstName">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    name="firstName"
                    value={this.state.firstName}
                    onChange={(e) => this.handleInputChange(e, "login")}
                    type="text"
                    className="form-input form-wide mb-2"
                    id="login-email"
                    required=""
                  />
                </div>
                <div className="col-md-6 col-sm-12">
                  <label htmlFor="lastName">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    name="lastName"
                    value={this.state.lastName}
                    onChange={(e) => this.handleInputChange(e, "login")}
                    type="text"
                    className="form-input form-wide mb-2"
                    id="login-email"
                    required=""
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <label htmlFor="emailAddress">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    name="emailAddress"
                    value={this.state.emailAddress}
                    onChange={(e) => this.handleInputChange(e, "login")}
                    type="text"
                    className="form-input form-wide mb-2"
                    id="login-email"
                    required=""
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  paymentType = () => {
    return (
      <>
        <div
          className="col-md-6 col-sm-12"
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <input
            disabled={!this.state.auth}
            style={{ marginRight: 8 }}
            type="checkbox"
            id="paymentType2"
            value="pay with wallet"
            name="paymentTypet"
            checked={this.state.payType === "pay with wallet" ? true : false}
          />
          <label
            value="pay with wallet"
            name="paymentTypet"
            className="label-check"
            htmlFor="paymentTypet"
            onClick={(e) => this.handleCheckBoxClick("pay with wallet")}
          >
            <span className="checkbox primary primary">
              <span></span>
            </span>
            <span className="checkout-user-icon">
              <i className="fas fa-wallet"></i>
            </span>
            Pay with your Azonka Wallet
          </label>
        </div>
        <div
          className="col-md-6 col-sm-12"
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <input
            type="checkbox"
            id="paymentType"
            value="pay with debit"
            name="paymentType"
            onChange={(e) => this.handleInputChange(e, "paymentType")}
            checked={this.state.payType === "pay with debit"}
          />
          <label
            value="pay with debit"
            name="paymentType"
            className="label-check"
            htmlFor="paymentType"
            onClick={(e) => this.handleCheckBoxClick("pay with debit")}
          >
            <span className="checkbox primary primary">
              <span></span>
            </span>
            <span className="checkout-user-icon">
              <i className="far fa-credit-card"></i>
            </span>
            Pay with a Debit Card
          </label>
        </div>
      </>
    );
  };
  handleCheckBoxClick = (paymentType) => {
    this.setState({ payType: paymentType });
  };
  payNow = async (e) => {
    e.preventDefault();
    if (!this.state.auth) {
      const {
        firstName,
        lastName,
        emailAddress,
        userAddress,
        country,
        payType,
        state,
      } = this.state;
      if (!this.state.auth) {
        return this.setState({
          modal: true,
        });
      }
      if (!Validator.isEmail(emailAddress)) {
        return this.props.renderError("Email address is required or invalid");
      } else if (Validator.isEmpty(firstName) || Validator.isEmpty(lastName)) {
        return this.props.renderError("First Name and Last Name is required");
      } else if (Validator.isEmpty(state)) {
        return this.props.renderError("Please provide State");
      } else if (Validator.isEmpty(userAddress)) {
        return this.props.renderError("Please provide delivery address");
      } else if (Validator.isEmpty(country)) {
        return this.props.renderError("Please provide Country");
      } else if (Validator.isEmpty(payType)) {
        return this.props.renderError("Please select payment type");
      }

      // if(payType === 'pay with debit'){
      //     //this.props.successAlert('hello')
      //    return  this.payWithPayStack()
      // }
    } else {
      const { userAddress, addressId } = this.state;
      if (Validator.isEmpty(`${addressId}`) && Validator.isEmpty(userAddress)) {
        return this.props.renderError("Please provide a delivery location");
      } else if (Validator.isEmpty(this.state.payType)) {
        return this.props.renderError("Please choose a payment type");
      }
      if (Validator.isEmpty(`${addressId}`)) {
        if (this.state.city.trim() === "" || this.state.state.trim() === "") {
          return Swal.fire("Error", "Please select State and City", "error");
        }
      }
      // process payment
      try {
        this.props.initiateRegistration();
        const deliveryFeeDetails = await this.getDeliveryFeeDetails();
        this.props.stopLoading();
        this.setState(
          {
            delivery: { ...deliveryFeeDetails },
          },
          () =>
            window
              .$("#orderDetails")
              .modal({ backdrop: "static", keyboard: false, show: true })
        );
      } catch (error) {
        this.props.stopLoading();
        Swal.fire("Action could not be completed", error, "error");
        console.log("here called in here: ", error);
      }
    }
  };
  getDeliveryFeeDetails = () => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(this.props.cartItems, this.props.home_categories);
        //group the products into seller
        const productGroupedBySeller = {};

        this.props.cartItems.products.forEach((prod) => {
          //if it is a new seller, we initiailize the seller and add his product
          if (!productGroupedBySeller[prod.owner]) {
            // get the deliveryFee model for the product
            let found = false;
            this.props.home_categories.forEach((cat) => {
              // this is where I need to change to subcategory
              if (cat.id === prod.subCategory) {
                found = true;
                prod.delivery = cat.deliveryFee[0];
              }
            });
            // check if category modeil is not found
            if (!found) {
              // do online check calling the category id
            }
            productGroupedBySeller[prod.owner] = {
              products: [prod],
            };
          } else {
            let found = false;
            this.props.home_categories.forEach((cat) => {
              if (cat.id === prod.subCategory) {
                found = true;
                prod.delivery = cat.deliveryFee[0];
              }
            });
            // check if category modeil is not found
            if (!found) {
              // do online check calling the category id
            }
            productGroupedBySeller[
              prod.owner
            ].products = [].concat(
              productGroupedBySeller[prod.owner].products,
              [prod]
            );
          }
        });

        // get the maximum deliveryFee for each seller

        Object.keys(productGroupedBySeller).forEach((seller) => {
          let maxDeliveryPrice = { flatFee: 0 };
          productGroupedBySeller[seller].products.forEach((prod) => {
            if (prod.delivery.flatFee > maxDeliveryPrice.flatFee) {
              maxDeliveryPrice = { ...prod.delivery };
              maxDeliveryPrice.product = prod;
            }
          });

          productGroupedBySeller[seller].delivery = maxDeliveryPrice;
        });

        //check the quantity ordered for the product with the maximum delivery fee

        // get the total delivery Fee
        const locations = await this.getDeliveryDetailsonOrder(
          productGroupedBySeller
        );

        console.log(locations);

        const orderLocation = {};
        locations.forEach((point) => {
          if (point === "") {
            return reject("Address coordinates could not be determined");
          }
          if (orderLocation[point.seller]) {
            orderLocation[point.seller][point.type] = {
              lat: point.lat,
              lng: point.lng,
            };
          } else {
            orderLocation[point.seller] = {};
            orderLocation[point.seller][point.type] = {
              lat: point.lat,
              lng: point.lng,
            };
          }
        });

        const distances = await this.getDistances(orderLocation);
        distances.forEach((dist) => {
          if (dist.totalDrviningDistance === -1) {
            return reject("Delivery distance could not be determined");
          }
          productGroupedBySeller[dist.seller].delivery.distance =
            dist.totalDrviningDistance;
          productGroupedBySeller[dist.seller].delivery.location =
            orderLocation[dist.seller];
        });
        let total = 0;
        Object.keys(productGroupedBySeller).forEach((seller) => {
          productGroupedBySeller[
            seller
          ].delivery.quantiyOrdered = this.props.cartItems.quantity[
            productGroupedBySeller[seller].delivery.product.id
          ];
          if (
            productGroupedBySeller[seller].delivery.quantiyOrdered >
            productGroupedBySeller[seller].delivery.maxQuantity
          ) {
            productGroupedBySeller[seller].delivery.deliveryAmount = Math.round(
              productGroupedBySeller[seller].delivery.flatFee / 100 +
                (productGroupedBySeller[seller].delivery.incrementalPercentage /
                  100) *
                  (productGroupedBySeller[seller].delivery.distanceFee / 100) +
                productGroupedBySeller[seller].delivery.distance *
                  (productGroupedBySeller[seller].delivery.distanceFee / 100)
            );
          } else {
            productGroupedBySeller[seller].delivery.deliveryAmount = Math.round(
              productGroupedBySeller[seller].delivery.flatFee / 100 +
                productGroupedBySeller[seller].delivery.distance *
                  (productGroupedBySeller[seller].delivery.distanceFee / 100)
            );
          }
          total += productGroupedBySeller[seller].delivery.deliveryAmount;
        });
        productGroupedBySeller.totalDeliveryFee = total;

        return resolve(productGroupedBySeller);
      } catch (error) {
        this.props.stopLoading();
        console.log("errors: ", error);
        reject(error);
      }
    });
  };
  getDeliveryDetailsonOrder = (productGroupedBySeller, cb) => {
    // let total = 0;

    let promises = [];
    Object.keys(productGroupedBySeller).forEach((seller) => {
      // let distance;
      if (this.state.userAddress.trim() !== "") {
        promises.push(
          this.geoCodeAddress(this.state.userAddress, seller, "destination")
        );
      } else {
        const index = this.props.address.findIndex(
          (ele) => parseInt(ele.id) === parseInt(this.state.addressId)
        );
        promises.push(
          this.geoCodeAddress(
            this.props.address[index].address1,
            seller,
            "destination"
          )
        );
      }

      promises.push(
        this.geoCodeAddress(
          productGroupedBySeller[seller].delivery.product.store.address,
          seller,
          "pickup"
        )
      );
    });
    return Promise.all(promises);
  };
  getDistances = (locations = {}) => {
    let promises = [];
    Object.keys(locations).forEach((point) => {
      const { destination, pickup } = locations[point];
      promises.push(
        this.getDrivingDistance(
          destination.lat,
          destination.lng,
          pickup.lat,
          pickup.lng,
          point
        )
      );
    });
    return Promise.all(promises);
  };
  geoCodeAddress = (address = "", seller, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          "https://azonka.herokuapp.com/api/v1/delivery/geo-code-address",
          {
            address,
            seller,
            type,
          }
        );
        const dt = response.data;
        console.log("dt: ".dt);
        // resolve({ totalDrviningDistance, seller });
        resolve(dt);
      } catch (error) {
        console.log("error in geocode: ", error);
        this.props.stopLoading();
        reject(error);
      }
    });
  };
  getDrivingDistance = (lat1, lon1, lat2, lon2, seller) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          "https://azonka.herokuapp.com/api/v1/delivery/get-driving-distance",
          {
            lat1,
            lon1,
            lat2,
            lon2,
            seller,
          }
        );
        const dt = response.data;
        // resolve({ totalDrviningDistance, seller });
        resolve(dt);
      } catch (error) {
        console.log(error);
        this.props.stopLoading();
        reject(error);
      }
    });
  };
  processPayment = async () => {
    window.$("#orderDetails").modal("hide");
    const { payType } = this.state;
    if (payType === "pay with debit") {
      //this.props.successAlert('hello')
      return this.payWithPayStack();
    } else {
      const { value: pin } = await Swal.fire({
        title: "Enter Your Wallet PIN",
        input: "password",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!(value && value.trim() !== "")) {
            return "Wallet PIN Requred!";
          }
        },
      });

      // if (parseInt(this.props.amount) > parseInt(this.props.balance / 100)) {
      //     return this.props.renderError('Insufficient funds, please fund your wallet')
      // }

      if (pin && pin.trim() !== "") {
        const deliveryFeePerSeller = {};
        Object.keys(this.state.delivery).forEach((key) => {
          if (key !== "totalDeliveryFee") {
            deliveryFeePerSeller[key] = `${
              this.state.delivery[key].delivery.deliveryAmount * 100
            }`;
          }
        });
        this.props.initiateRegistration();
        this.props.registerPayment(
          "",
          "",
          this.props.amount,
          this.state.payType,
          this.state.cartData,
          this.state.addressId,
          this.state.userAddress,
          pin,
          this.state.state,
          this.state.city,
          `${this.state.delivery.totalDeliveryFee * 100}`,
          deliveryFeePerSeller
        );
      }
    }
  };
  payWithPayStack = () => {
    // this.setState({ paystack: true })
    // console.log('called paystack')
    var handler = window.PaystackPop.setup({
      key: PAY_STACK_PUBLIC_KEY,
      email: this.state.emailAddress,
      amount: this.state.sum + this.state.delivery.totalDeliveryFee * 100,
      currency: "NGN",
      ref: this.getReference, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
        custom_fields: [
          {
            display_name: "Mobile Number",
            variable_name: "mobile_number",
            value: "+2348012345678",
          },
        ],
      },
      callback: this.callback,
      onClose: this.close,
    });
    handler.openIframe();
  };
  getTransactionNumber = () => {
    const txnRef = this.getReference();
    this.setState({ transactionNumber: txnRef });
    return txnRef;
  };
  componentWillUnmount() {
    this.setState({ ...this.INITIAL_STATE });
  }
  render() {
    return (
      <>
        <Header />

        <main style={{ paddingTop: "12rem" }}>
          <nav
            style={{ margin: "10px 0" }}
            aria-label="breadcrumb"
            className="breadcrumb-nav"
          >
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <i className="icon-home"></i>
                  </Link>
                </li>
                <li className="breadcrumb-item active">
                  <Link to="/users/cart">Shopping Cart</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </ol>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <div className="col-lg-8" style={{ margin: "10px 0" }}>
                <div className="container">
                  {/* <div className="row">
                                        <h2 className="default-font ">User Information</h2>
                                        
                                    </div>
                                    <div className="row">
                                        <hr style={{width:'100%'}} />
                                    </div> */}
                  <div className="row">
                    <div className="col-12">
                      {this.state.auth ? this.renderUserData() : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      {/* {this.state.auth ? this.renderShippingLocation() : null} */}
                                    {this.renderShippingLocation()}
                    </div>
                  </div>
                  <div className="row">
                    {this.state.auth ? this.paymentType() : null}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="cart-summary">
                  <h3>Summary</h3>

                  <table className="table table-totals">
                    <tbody>
                      <tr>
                        <td>Subtotal</td>
                        <td>
                          &#8358; {this.numberWithCommas(this.state.sum / 100)}
                        </td>
                      </tr>

                      <tr>
                        <td>Tax</td>
                        <td>&#8358; 0.00</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Order Total</td>
                        <td>
                          &#8358; {this.numberWithCommas(this.state.sum / 100)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>

                  <div className="checkout-methods">
                    <span
                      onClick={this.payNow}
                      className="btn  btn-lg w-100 btn-primary"
                    >
                      Continue
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="orderDetails"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            data-keyboard="false"
            data-backdrop="static"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body py-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="bg-white order-header shadow py-4 w-100">
                          <span className="text-success">Order Summary</span>
                        </div>
                      </div>
                    </div>
                    <div className="py-5">
                      <div className="row">
                        <div className="col-md-8 order-summary-icon order-amount-pay">
                          <span className="mr-2">
                            <i class="fas fa-money-bill-wave"></i>
                          </span>
                          <span>Order Total</span>
                        </div>
                        <div className="col-md-4 order-shipping-fee">
                          <div className="d-flex w-100 justify-content-end">
                            <span>
                              &#8358;{" "}
                              {this.numberWithCommas(this.state.sum / 100)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8 order-summary-icon order-amount-pay">
                          <span className="mr-2">
                            <i class="fas fa-luggage-cart"></i>
                          </span>
                          <span>Shipping Fee</span>
                        </div>
                        <div className="col-md-4 order-shipping-fee">
                          <div className="d-flex w-100 justify-content-end">
                            <span>
                              &#8358;{" "}
                              {this.numberWithCommas(
                                this.state.delivery.totalDeliveryFee
                                  ? this.state.delivery.totalDeliveryFee
                                  : 0
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row pb-2 pt-2">
                        <hr className="w-100" />
                      </div>
                      <div className="row">
                        <div className="col-md-8 order-summary-icon order-amount-pay">
                          <span>Total</span>
                        </div>
                        <div className="col-md-4 order-shipping-fee">
                          <div className="d-flex w-100 justify-content-end">
                            <span>
                              &#8358;{" "}
                              {this.numberWithCommas(
                                (this.state.delivery.totalDeliveryFee
                                  ? this.state.delivery.totalDeliveryFee
                                  : 0) +
                                  this.state.sum / 100
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row py-3">
                        <div className="col-md-12">
                          <div className="d-flex w-100 justify-content-center">
                            <button
                              onClick={this.processPayment}
                              className="btn btn-lg btn-primary mr-3"
                            >
                              Pay
                            </button>
                            <button
                              data-dismiss="modal"
                              className="btn btn-lg btn-danger"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {this.renderModal()}

        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    home: { amount, home_categories },
    bank: { balance },
    inventory: { categories, cartItems, cartData, address },
  } = state;

  return {
    amount,
    categories,
    cartItems,
    cartData,
    address,
    balance,
    home_categories,
  };
};

export default connect(mapStateToProps, actions)(Checkout);
