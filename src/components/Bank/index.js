import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import NoRecordFound from "../../common/NoRecordFound";
import { withToastManager } from "react-toast-notifications";
import * as actions from "../../actions";
import BankListItem from "../../common/BankListItem";
import SweetAlert from "react-bootstrap-sweetalert";
import Dashboard from "../HOC/Dashboard";
import BankDataTable from "../../common/BankDataTable";
import App from "../../services";
// import axios from "axios";

class Bank extends Component {
  state = {
    inValidElments: [],
    validationMessage: [],
    // banks: [],
    slug: "",
    accountName: "",
    accountNumber: "",
    showAlert: false,
    actionMode: "save",
    pin: "",
    showInfo: false,
    id: "",
    banks: [
      {
        name: "Access Bank",
        slug: "access-bank",
        code: "044",
        longcode: "044150149",
        gateway: "emandate",
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 1,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T08:06:44.000Z",
      },
      {
        name: "Access Bank (Diamond)",
        slug: "access-bank-diamond",
        code: "063",
        longcode: "063150162",
        gateway: "emandate",
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 3,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T08:06:48.000Z",
      },
      {
        name: "ALAT by WEMA",
        slug: "alat-by-wema",
        code: "035A",
        longcode: "035150103",
        gateway: "emandate",
        pay_with_bank: true,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 27,
        createdAt: "2017-11-15T12:21:31.000Z",
        updatedAt: "2020-09-28T14:54:26.000Z",
      },
      {
        name: "ASO Savings and Loans",
        slug: "asosavings",
        code: "401",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 63,
        createdAt: "2018-09-23T05:52:38.000Z",
        updatedAt: "2019-01-30T09:38:57.000Z",
      },
      {
        name: "Bowen Microfinance Bank",
        slug: "bowen-microfinance-bank",
        code: "50931",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 108,
        createdAt: "2020-02-11T15:38:57.000Z",
        updatedAt: "2020-02-11T15:38:57.000Z",
      },
      {
        name: "CEMCS Microfinance Bank",
        slug: "cemcs-microfinance-bank",
        code: "50823",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 74,
        createdAt: "2020-03-23T15:06:13.000Z",
        updatedAt: "2020-03-23T15:06:28.000Z",
      },
      {
        name: "Citibank Nigeria",
        slug: "citibank-nigeria",
        code: "023",
        longcode: "023150005",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 2,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T20:24:02.000Z",
      },
      {
        name: "Ecobank Nigeria",
        slug: "ecobank-nigeria",
        code: "050",
        longcode: "050150010",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 4,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T20:23:53.000Z",
      },
      {
        name: "Ekondo Microfinance Bank",
        slug: "ekondo-microfinance-bank",
        code: "562",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 64,
        createdAt: "2018-09-23T05:55:06.000Z",
        updatedAt: "2018-09-23T05:55:06.000Z",
      },
      {
        name: "Eyowo",
        slug: "eyowo",
        code: "50126",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 167,
        createdAt: "2020-09-07T13:52:22.000Z",
        updatedAt: "2020-09-10T10:42:40.000Z",
      },
      {
        name: "Fidelity Bank",
        slug: "fidelity-bank",
        code: "070",
        longcode: "070150003",
        gateway: "emandate",
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 6,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T07:25:19.000Z",
      },
      {
        name: "First Bank of Nigeria",
        slug: "first-bank-of-nigeria",
        code: "011",
        longcode: "011151003",
        gateway: "ibank",
        pay_with_bank: true,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 7,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2019-11-21T05:09:47.000Z",
      },
      {
        name: "First City Monument Bank",
        slug: "first-city-monument-bank",
        code: "214",
        longcode: "214150018",
        gateway: "emandate",
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 8,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T08:06:46.000Z",
      },
      {
        name: "FSDH Merchant Bank Limited",
        slug: "fsdh-merchant-bank-limited",
        code: "501",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 112,
        createdAt: "2020-08-20T09:37:04.000Z",
        updatedAt: "2020-08-20T09:37:04.000Z",
      },
      {
        name: "Globus Bank",
        slug: "globus-bank",
        code: "00103",
        longcode: "103015001",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 70,
        createdAt: "2020-02-11T15:38:57.000Z",
        updatedAt: "2020-02-11T15:38:57.000Z",
      },
      {
        name: "Guaranty Trust Bank",
        slug: "guaranty-trust-bank",
        code: "058",
        longcode: "058152036",
        gateway: "ibank",
        pay_with_bank: true,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 9,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-07-17T16:36:24.000Z",
      },
      {
        name: "Hackman Microfinance Bank",
        slug: "hackman-microfinance-bank",
        code: "51251",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 111,
        createdAt: "2020-08-20T09:32:48.000Z",
        updatedAt: "2020-08-20T09:32:48.000Z",
      },
      {
        name: "Hasal Microfinance Bank",
        slug: "hasal-microfinance-bank",
        code: "50383",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 81,
        createdAt: "2020-02-11T15:38:57.000Z",
        updatedAt: "2020-02-11T15:38:57.000Z",
      },
      {
        name: "Heritage Bank",
        slug: "heritage-bank",
        code: "030",
        longcode: "030159992",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 10,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T20:24:23.000Z",
      },
      {
        name: "Jaiz Bank",
        slug: "jaiz-bank",
        code: "301",
        longcode: "301080020",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 22,
        createdAt: "2016-10-10T17:26:29.000Z",
        updatedAt: "2016-10-10T17:26:29.000Z",
      },
      {
        name: "Keystone Bank",
        slug: "keystone-bank",
        code: "082",
        longcode: "082150017",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 11,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T20:23:45.000Z",
      },
      {
        name: "Kuda Bank",
        slug: "kuda-bank",
        code: "50211",
        longcode: "",
        gateway: "digitalbankmandate",
        pay_with_bank: true,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 67,
        createdAt: "2019-11-15T17:06:54.000Z",
        updatedAt: "2020-07-01T15:05:18.000Z",
      },
      {
        name: "Lagos Building Investment Company Plc.",
        slug: "lbic-plc",
        code: "90052",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 109,
        createdAt: "2020-08-10T15:07:44.000Z",
        updatedAt: "2020-08-10T15:07:44.000Z",
      },
      {
        name: "One Finance",
        slug: "one-finance",
        code: "565",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 82,
        createdAt: "2020-06-16T08:15:31.000Z",
        updatedAt: "2020-06-16T08:15:31.000Z",
      },
      {
        name: "Parallex Bank",
        slug: "parallex-bank",
        code: "526",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 26,
        createdAt: "2017-03-31T13:54:29.000Z",
        updatedAt: "2019-01-30T09:43:56.000Z",
      },
      {
        name: "Parkway - ReadyCash",
        slug: "parkway-ready-cash",
        code: "311",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 110,
        createdAt: "2020-08-10T15:07:44.000Z",
        updatedAt: "2020-08-10T15:07:44.000Z",
      },
      {
        name: "Polaris Bank",
        slug: "polaris-bank",
        code: "076",
        longcode: "076151006",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 13,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2016-07-14T10:04:29.000Z",
      },
      {
        name: "Providus Bank",
        slug: "providus-bank",
        code: "101",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 25,
        createdAt: "2017-03-27T16:09:29.000Z",
        updatedAt: "2019-12-16T10:14:36.000Z",
      },
      {
        name: "Rubies MFB",
        slug: "rubies-mfb",
        code: "125",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 69,
        createdAt: "2020-01-25T09:49:59.000Z",
        updatedAt: "2020-01-25T09:49:59.000Z",
      },
      {
        name: "Sparkle Microfinance Bank",
        slug: "sparkle-microfinance-bank",
        code: "51310",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 72,
        createdAt: "2020-02-11T18:43:14.000Z",
        updatedAt: "2020-02-11T18:43:14.000Z",
      },
      {
        name: "Stanbic IBTC Bank",
        slug: "stanbic-ibtc-bank",
        code: "221",
        longcode: "221159522",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 14,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T20:24:17.000Z",
      },
      {
        name: "Standard Chartered Bank",
        slug: "standard-chartered-bank",
        code: "068",
        longcode: "068150015",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 15,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T20:23:40.000Z",
      },
      {
        name: "Sterling Bank",
        slug: "sterling-bank",
        code: "232",
        longcode: "232150016",
        gateway: "emandate",
        pay_with_bank: true,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 16,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-08-05T09:58:23.000Z",
      },
      {
        name: "Suntrust Bank",
        slug: "suntrust-bank",
        code: "100",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 23,
        createdAt: "2016-10-10T17:26:29.000Z",
        updatedAt: "2016-10-10T17:26:29.000Z",
      },
      {
        name: "TAJ Bank",
        slug: "taj-bank",
        code: "302",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 68,
        createdAt: "2020-01-20T11:20:32.000Z",
        updatedAt: "2020-01-20T11:20:32.000Z",
      },
      {
        name: "TCF MFB",
        slug: "tcf-mfb",
        code: "51211",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 75,
        createdAt: "2020-04-03T09:34:35.000Z",
        updatedAt: "2020-04-03T09:34:35.000Z",
      },
      {
        name: "Titan Bank",
        slug: "titan-bank",
        code: "102",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 73,
        createdAt: "2020-03-10T11:41:36.000Z",
        updatedAt: "2020-03-23T15:06:29.000Z",
      },
      {
        name: "Union Bank of Nigeria",
        slug: "union-bank-of-nigeria",
        code: "032",
        longcode: "032080474",
        gateway: "emandate",
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 17,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T20:22:54.000Z",
      },
      {
        name: "United Bank For Africa",
        slug: "united-bank-for-africa",
        code: "033",
        longcode: "033153513",
        gateway: "emandate",
        pay_with_bank: true,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 18,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-09-08T10:51:01.000Z",
      },
      {
        name: "Unity Bank",
        slug: "unity-bank",
        code: "215",
        longcode: "215154097",
        gateway: "emandate",
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 19,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2019-07-22T12:44:02.000Z",
      },
      {
        name: "VFD",
        slug: "vfd",
        code: "566",
        longcode: "",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: false,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 71,
        createdAt: "2020-02-11T15:44:11.000Z",
        updatedAt: "2020-02-11T15:44:11.000Z",
      },
      {
        name: "Wema Bank",
        slug: "wema-bank",
        code: "035",
        longcode: "035150103",
        gateway: null,
        pay_with_bank: false,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 20,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2020-02-18T20:23:58.000Z",
      },
      {
        name: "Zenith Bank",
        slug: "zenith-bank",
        code: "057",
        longcode: "057150013",
        gateway: "emandate",
        pay_with_bank: true,
        active: true,
        is_deleted: null,
        country: "Nigeria",
        currency: "NGN",
        type: "nuban",
        id: 21,
        createdAt: "2016-07-14T10:04:29.000Z",
        updatedAt: "2016-07-14T10:04:29.000Z",
      },
    ],
  };

  validateFormData = (formdata) => {
    const { accountNumber, accountName, slug } = formdata;
    console.log(formdata);
    let isValid = true;
    const inValidElments = [];
    const validationMessage = {};
    if (!(slug && slug.trim() !== "")) {
      isValid = false;
      inValidElments.push("slug");

      validationMessage["slug"] = "Please select Bank";
    }
    if (!(accountName && accountName.trim() !== "")) {
      isValid = false;
      inValidElments.push("accountName");
      validationMessage["accountName"] = "Account Name required";
    }
    if (!(accountNumber && accountNumber.trim() !== "")) {
      isValid = false;
      inValidElments.push("accountNumber");
      validationMessage["accountNumber"] = "Account Number required";
    }
    return {
      isValid,
      validationMessage,
      inValidElments,
      formdata,
    };
  };
  handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    console.log(name, value);
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
      () => {
        const { accountName, accountNumber } = this.state;
        if (accountName.trim() === "" && accountNumber.trim() === "") {
          return this.setState({
            actionMode: "save",
          });
        }
      }
    );
  };
  renderLookUp = () => {
    const lookupdata = {};
    this.props.banks.forEach((element) => {
      lookupdata[element.slug] = element.name;
    });
    return lookupdata;
  };
  async componentDidMount() {
    this.props.initiateRegistration();
    this.props.setActiveLink("Bank");
    // await this.props.getBanks();
    await this.props.getSavedBanks();
    // const response = await axios.get("https://api.paystack.co/bank", {
    //   headers: {
    //     "Access-Control-Allow-Headers": "*",
    //   },
    // });
    // console.log("response: ", response);
    // const banks = response.data.data;
    // console.log("Banks: ", banks);
    this.props.stopLoading();
    // this.setState(
    //   {
    //     banks,
    //   },
    //   () => {
    //     this.props.stopLoading();
    //   }
    // );
  }
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.resetForm) {
      return {
        ...state,
        actionMode: "save",
        longcode: "",
        accountNumber: "",
        accountName: "",
        slug: "",
      };
    }
    return null;
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.processForm();
  };
  handlePinChange = (pin) => {
    this.setState({
      pin: pin.target.value,
    });
  };
  processForm = () => {
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
    const selectedBank = this.state.banks.filter(
      (element) => element.slug === this.state.slug
    );
    const { accountNumber, accountName } = this.state;
    console.log(selectedBank, accountName, accountNumber);
    this.props.initiateRegistration();
    if (selectedBank.length > 0) {
      const bankDetails = selectedBank[0];
      const payload = {
        ...bankDetails,
        accountName,
        accountNumber,
      };
      const sanitizedPayload = App.santizePayload(payload);
      return this.props.saveBank(sanitizedPayload);
    }
  };
  closeSnackBar = () => {
    this.props.closeSnackBar();
  };
  logout = () => {
    this.props.logout();
    return <Redirect to="/users/login" />;
  };
  converToDate = (timestamp) => {
    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "Decemeber",
    ];
    const date = new Date(timestamp);
    return `${date.getDate()} ${
      MONTHS[date.getMonth()]
    }, ${date.getFullYear()}`;
  };
  _handleRowClick = (id, action = "") => {
    if (action === "edit") {
      console.log("id oooo", id);
      const index = this.props.savedBanks.findIndex(
        (element) => element.id === parseInt(id)
      );
      if (index !== -1) {
        const bank = this.props.savedBanks.find(
          (element) => element.id === parseInt(id)
        );
        this.setState({
          longcode: bank.longcode,
          slug: bank.slug,
          accountNumber: bank.accountNumber,
          accountName: bank.accountName,
          actionMode: "update",
          name: bank.name,
          id: bank.id,
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
  _renderStoreList = () => {
    if (this.props.savedBanks.length > 0) {
      return this.props.savedBanks.map((bank, i) => {
        const { id, name, accountName, accountNumber, createdAt } = bank;
        return (
          <BankListItem
            bank={name}
            accountName={accountName}
            accountNumber={accountNumber}
            createdAt={this.converToDate(createdAt)}
            key={id}
            id={id}
            handleRowClick={(id, action) => this._handleRowClick(id, action)}
          />
        );
      });
    }
    return <NoRecordFound />;
  };
  handleFormUpdate = (e, actionMode = null) => {
    e.preventDefault();
    const { longcode, accountName, accountNumber } = this.state;
    if (
      longcode.trim() === "" ||
      accountName.trim() === "" ||
      accountNumber.trim() === ""
    ) {
      return this.props.renderError(
        "Bank, Account Number and Account Name is required"
      );
    }
    if (this.state.pin.trim() === "") {
      this.setState({
        showAlert: true,
        actionMode,
      });
    }
  };
  handleFormDelete = (e, actionMode = null) => {
    e.preventDefault();
    // if(this.state.pin.trim() === ''){
    //     this.setState({
    //         showAlert: true,
    //         actionMode
    //     })
    // }
    this.setState({
      inValidElments: [],
      validationMessage: [],
      banks: [],
      longcode: "",
      accountName: "",
      accountNumber: "",
      showAlert: false,
      actionMode: "save",
      pin: "",
    });
  };
  updateDeleteBank = () => {
    this.setState(
      {
        showAlert: false,
      },
      () => {
        this.props.initiateRegistration();
        this.props.modifyAccount(
          this.state.actionMode,
          {
            longcode: this.state.longcode,
            name: this.state.name,
            accountNumber: this.state.accountNumber,
            accountName: this.state.accountName,
            pin: this.state.pin,
          },
          this.state.id
        );
      }
    );
  };
  deleteFile = async () => {
    this.props.initiateRegistration();
    await this.props.modifyAccount("delete", null, this.state.id);
    this.setState({ showInfo: false, id: null });
  };
  onCancel = () => {
    this.setState({
      id: null,
      showInfo: false,
    });
  };
  render() {
    return (
      <Dashboard>
        <div style={{}}>
          <div className="add-bank">
            <h4
              className="popup-title verify-email"
              style={{
                fontWeight: "normal",
                fontFamily: "Roboto, sans-serif",
                marginLeft: 20,
              }}
            >
              Add Bank
            </h4>
            <hr className="line-separator" />
            <form>
              <div className="container-fluid">
                <div className="row py-3">
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group required-field">
                      <label htmlFor="bankName" className="rl-label">
                        Bank Name
                      </label>
                      <select
                        name="slug"
                        className={`form-control ${
                          this.state.inValidElments.includes("slug")
                            ? "invalid"
                            : ""
                        }`}
                        value={this.state.slug}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Select Bank</option>
                        {this.state.banks.map(({ name, slug }, i) => (
                          <option key={i} value={slug}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {this.state.inValidElments.includes("slug") ? (
                      <div className="error-message required">
                        {this.state.validationMessage["slug"]}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group required-field">
                      <label htmlFor="accountName" className="rl-label">
                        Account Name
                      </label>
                      <input
                        type="text"
                        id="password5"
                        className={`form-control ${
                          this.state.inValidElments.includes("accountName")
                            ? "invalid"
                            : ""
                        }`}
                        value={this.state.accountName}
                        onChange={this.handleInputChange}
                        name="accountName"
                        placeholder="Account Name"
                      />
                    </div>
                    {this.state.inValidElments.includes("accountName") ? (
                      <div className="error-message required">
                        {this.state.validationMessage["accountName"]}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className="form-group required-field">
                      <label htmlFor="accountNumber" className="rl-label">
                        Account Number
                      </label>
                      <input
                        type="number"
                        id="password5"
                        className={`form-control ${
                          this.state.inValidElments.includes("accountNumber")
                            ? "invalid"
                            : ""
                        }`}
                        value={this.state.accountNumber}
                        onChange={this.handleInputChange}
                        name="accountNumber"
                        placeholder="Account Number"
                      />
                    </div>
                    {this.state.inValidElments.includes("accountNumber") ? (
                      <div className="error-message required">
                        {this.state.validationMessage["accountNumber"]}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div style={{ padding: "20px 0 10px" }}>
                  {this.state.actionMode === "save" ? (
                    <div className="row">
                      <div className="col-md-8 col-sm-12"></div>
                      <div className="form-footer">
                        <div
                          className="form-footer-right"
                          style={{ marginLeft: 10 }}
                        >
                          <button
                            onClick={this.handleFormSubmit}
                            type="submit"
                            className="btn px-5 py-2 btn-primary"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-md-8 col-sm-12"></div>
                      <div className="col-md-4 col-sm-12">
                        <div style={{ marginBottom: 10, marginLeft: 10 }}>
                          <button
                            onClick={(e) => this.handleFormUpdate(e, "update")}
                            className="btn px-5 py-2 btn-warning"
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
                            className="btn px-5 py-2 btn-danger"
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

            <div
              style={{
                maxWidth: "100%",
                margin: "0 10px 0 10px",
                background: "#fff",
                overflowX: "auto",
                padding: "20px 0px 20px 0px",
              }}
            >
              <BankDataTable
                data={this.props.savedBanks}
                handleRowClick={(id, action) =>
                  this._handleRowClick(id, action)
                }
              />
            </div>
          </div>

          {this.state.showAlert ? (
            <SweetAlert
              required
              type="custom"
              ref={(ref) => (this.inputRef = ref)}
              inputType="password"
              title="Enter Pin"
              focusConfirmBtn
              validationMsg="Pin is required"
              onConfirm={(response) => this.updateDeleteBank()}
              showCancel
              showConfirm={this.state.pin.length > 0 ? true : false}
              onCancel={() => this.setState({ showAlert: false })}
            >
              <input
                type="password"
                value={this.state.pin}
                onChange={this.handlePinChange}
                className="form-control"
              />
            </SweetAlert>
          ) : null}
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
      // banks,
      savedBanks,
      resetForm,
    },
    reg: { unAuthorized },
  } = state;
  // const sortedBanks = banks.sort(
  //   (item1, item2) => item1.name.toLowerCase() > item2.name.toLowerCase()
  // );
  console.log("unathourized", unAuthorized);
  return {
    loading,
    error,
    errorMessage,
    successMessage,
    showSuccessBar,
    savedBanks,
    unAuthorized,
    resetForm,
  };
};

export default connect(mapStateToProps, actions)(withToastManager(Bank));
