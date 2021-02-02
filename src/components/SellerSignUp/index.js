import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withToastManager } from "react-toast-notifications";
import { Link } from "react-router-dom";
import Header from "../HeaderFooter/Header";
import Swal from "sweetalert2";
import axios from "axios";
import Pages from "../../config/pages";
import Positions from "../../config/position";
import { fileUpload } from "../util/FileUploader";

class SellerSignUp extends Component {
  state = {
    questions: [],
    inValidElments: [],
    validationMessage: {},
    container: "form",
    pincode: "",
    companyName: "",
    headOfficeAddress: "",
    contactLine: "",
    leftBanner: null,
    showSpinner: false,
    agreeToTerms: false,
    referredBy: "",
    validId: null,
  };
  componentDidMount() {
    this.props.getSecurityQuestions();
    window.$("#exampleModal").modal("show");
  }
  getFeaturedCategoriesImages = async () => {
    const responseAds = await axios.get("/api/v1/ad/get-ads/0/1000");

    const ads = responseAds.data.ads.filter(
      (item) => item.page === Pages.AGENT_SIGNUP
    );
    console.log("ads", ads);
    const topBanner = ads.filter((item) => item.position === Positions.TOP);
    const lowerBanner = ads.filter((item) => item.position === Positions.LOWER);
    console.log(lowerBanner);
    const leftBanner = ads.filter((item) => item.position === Positions.LEFT)[
      Math.random() * ads.length - 1
    ];
    const bottomBanner = ads.filter(
      (item) => item.position === Positions.BOTTOM
    )[0];
    const popUp = ads.filter((item) => item.position === Positions.POP_UP);
    if (lowerBanner.length > 4) {
      lowerBanner.splice(4, lowerBanner.length);
    } else if (lowerBanner.length > 0 && lowerBanner.length < 4) {
      const remainingItem = 4 - lowerBanner.length;
      for (let i = 0; i < remainingItem; i++) {
        lowerBanner.push(lowerBanner[0]);
      }
    }

    this.setState({
      topBanner,
      lowerBanner,
      leftBanner,
      bottomBanner,
      popUp: popUp.length > 0 ? popUp : this.state.popUp,
    });
  };
  handleInputChange = (event) => {
    const {
      target: { name, value },
    } = event;

    const index = this.state.inValidElments.indexOf(name);
    let newInvalidElements = [];
    newInvalidElements = [...this.state.inValidElments];
    if (index !== -1) {
      this.state.inValidElments.splice(index, 1);
    }
    newInvalidElements = [...this.state.inValidElments];
    if (
      name === "pincode" ||
      name === "companyName" ||
      name === "headOfficeAddress" ||
      name === "contactLine" ||
      name === "referredBy"
    ) {
      return this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        [name]: event.target.files,
      });
    }
    if (this.state.questions.length <= 0) {
      this.setState({
        questions: [{ question_id: name, answer: value }],
        newInvalidElements,
      });
    } else {
      let newQuestion = [];
      const index = this.state.questions.findIndex(
        ({ question_id }) => question_id === name
      );
      if (index !== -1) {
        newQuestion = this.state.questions;
        newQuestion.splice(index, 1);
        this.setState({
          questions: [...newQuestion, { [name]: value }],
          newInvalidElements,
        });
      }
      this.setState({
        questions: [
          ...this.state.questions,
          { question_id: name, answer: value },
        ],
        newInvalidElements,
      });
    }
  };
  validateFormData = (FormData) => {
    let isValid = true;
    let requiredField = [];
    if (FormData.companyName.trim() === "") {
      isValid = false;
      requiredField.push("companyName");
    }
    if (FormData.headOfficeAddress.trim() === "") {
      isValid = false;
      requiredField.push("headOfficeAddress");
    }
    if (FormData.contactLine.trim() === "") {
      isValid = false;
      requiredField.push("companyName");
    }
    this.setState({
      inValidElments: [...requiredField],
    });
    return isValid;
  };
  closeSpinner = () => {
    this.setState({
      showSpinner: false,
    });
    return null;
  };
  handleFormSubmit = async (event) => {
    event.preventDefault();
    const isValid = this.validateFormData(this.state);
    if (isValid) {
      console.log("form is valid");
      console.log("security questions", this.state);
      //call the api

      const referredBy = this.state.referredBy;
      const companyName = this.state.companyName;
      const headOfficeAddress = this.state.headOfficeAddress;
      const contactLine = this.state.contactLine;
      let sellerIdentification = "";
      if (!this.state.agreeToTerms) {
        return Swal.fire("You Must Agree to terms and Conditions");
      } else {
        try {
          this.props.initiateRegistration();
          if (this.state.validId !== null) {
            const uploadResponse = await fileUpload(
              this.state.validId,
              "sellers-credentials"
            );
            sellerIdentification = uploadResponse.Location;
          }
          // console.log(sellerIdentification);
          this.props.updateUserType(
            {
              referredBy,
              companyName,
              headOfficeAddress,
              contactLine,
              sellerIdentification,
            },
            "seller"
          );
        } catch (error) {
          this.props.stopLoading();
          console.log(error);
          Swal.fire(
            error && error.message
              ? error.message
              : "Some errors were encountered"
          );
        }
      }

      //naviagate the user to profile page
      //call the api
    } else {
      //form is not valid display error

      this.props.renderError(
        "One or more fields not filled, please cheack and try again"
      );
    }
  };
  agreeTotermsChange = () => {
    this.setState({ agreeToTerms: true });
  };
  render() {
    return (
      <div>
        <Header />

        <div className="router-container">
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <i className="icon-home"></i>
                  </Link>
                </li>
                <li className="breadcrumb-item" aria-current="page">
                  <Link to="/users/profile">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Seller Signup
                </li>
              </ol>
            </div>
          </nav>
          <div
            className="container"
            // style={{
            //   width: "80%",
            //   paddingBottom: "20px",
            //   maxWidth: "800px",
            // }}
          >
            <div className="row py-4">
              <div className="col-md-8 shadow bg-white">
                <div className="form-popup-headline secondary">
                  <h2>Signup to be a Seller!</h2>
                </div>
                <form action="#">
                  <div className="row">
                    <div className="col-sm-11">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group required-field">
                            <label htmlFor="acc-name">Business Name</label>
                            <input
                              type="text"
                              value={this.state.companyName}
                              onChange={this.handleInputChange}
                              placeholder="Business Name"
                              className="form-control"
                              id="acc-name"
                              name="companyName"
                              required=""
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group required-field">
                            <label htmlFor="acc-mname">
                              Head Office Address
                            </label>
                            <input
                              type="text"
                              value={this.state.headOfficeAddress}
                              onChange={this.handleInputChange}
                              placeholder="Head Office Address"
                              className="form-control"
                              id="acc-mname"
                              name="headOfficeAddress"
                            />
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
                            <label htmlFor="acc-lastname">Contact Number</label>
                            <input
                              type="text"
                              value={this.state.contactLine}
                              onChange={this.handleInputChange}
                              placeholder="Contact Line"
                              className="form-control"
                              id="acc-lastname3"
                              name="contactLine"
                              required=""
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="acc-lastname">
                              Agent Code (optional)
                            </label>
                            <input
                              type="text"
                              value={this.state.referredBy}
                              onChange={this.handleInputChange}
                              placeholder="Agent Code"
                              className="form-control"
                              id="acc-lastname4"
                              name="referredBy"
                              required=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row my-2">
                    <div className="col-md-12">
                      <hr />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label for="exampleFormControlFile1">
                          Upload Valid ID (International passport, Vehicle
                          Driver’s license, Permanent Voters card, National
                          Identity number)
                        </label>
                        <input
                          name="validId"
                          onChange={this.handleInputChange}
                          accept="image/png, image/jpeg"
                          type="file"
                          className="form-control-file"
                          id="exampleFormControlFile1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="terms-condition-container d-flex">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          name="i agree"
                          value="sellers"
                          checked={this.state.agreeToTerms}
                        />
                        <label
                          className="label-check"
                          onClick={(event) => this.agreeTotermsChange(event)}
                        >
                          <span className="checkbox primary primary">
                            <span></span>
                          </span>
                          I agree to
                        </label>
                        <span className="terms" style={{ lineHeight: 2.2 }}>
                          terms, condition and privacy policy
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-2"></div>
                  <div className="required text-right">* Required Field</div>
                  <div className="form-footer">
                    <Link to="/users/profile">
                      <i className="icon-angle-double-left"></i>Back
                    </Link>

                    <div className="form-footer-right">
                      <button
                        onClick={this.handleFormSubmit}
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4">
                <div className="widget widget-banner">
                  <div className="banner banner-image" style={{ height: 400 }}>
                    <Link to="#" className="h-100">
                      <img
                        style={{ objectFit: "cover", height: "100%" }}
                        src={`${
                          this.state.leftBanner
                            ? this.state.leftBanner.url
                            : "https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"
                        }`}
                        alt="Banner Desc"
                      />
                    </Link>
                  </div>
                  {/* <!-- End .banner --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                {/* <h5 class="modal-title" id="exampleModalLabel">
                  Welcome!, we are delighted to have you
                </h5> */}
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body"></div>
              {/* <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary btn-lg"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    reg: {
      loading,
      error,
      errorMessage,
      successMessage,
      questions,
      showSuccessBar,
      redirectToLogin,
      unAuthorized,
    },
  } = state;
  return {
    loading,
    error,
    errorMessage,
    showSuccessBar,
    successMessage,
    questions,
    redirectToLogin,
    unAuthorized,
  };
};

export default connect(
  mapStateToProps,
  actions
)(withToastManager(SellerSignUp));
