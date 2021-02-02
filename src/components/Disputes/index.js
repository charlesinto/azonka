import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import * as actions from "../../actions";
// import DisputeOrderDataTable from '../../common/DisputeOrderDatable';
import { Typography } from "@material-ui/core";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import Axios from "axios";

class Disputes extends Component {
  state = {
    selected: "",
    orderId: "",
    files: null,
    message: "",
    exampleCheck2: false,
    delivery: [],
    selectedDelivery: [],
    openDisputes: [],
    damaged: false,
    different: false,
    selectedBox: "box2",
    closedOrders: [],
    exampleCheck1: false,
    notDelivered: false,
    orderDelivered: false,
  };
  async componentDidMount() {
    this.props.setActiveLink("");
    this.props.initiateRegistration();
    await this.props.fetchOrders();
    this.props.stopLoading();
    window.$("input[type='file']").change(function () {
      var $fileUpload = window.$("input[type='file']");
      if (parseInt($fileUpload.get(0).files.length) > 5) {
        $fileUpload.val("");
        alert("You can only upload a maximum of 5 files");
      }
    });
    this.getOpenDisputes();
  }
  componentWillUnmount() {
    window.$("input[type='file']").unbind();
  }
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.orders && nextProps.orders.length > 0) {
      // const closedOrders = nextProps.orders.filter(order => order.status.toLowerCase() !== 'created' && order.status.toLowerCase() !== 'rejected')
      return { ...state, closedOrders: nextProps.orders };
    }
    return { ...state };
  }
  getOpenDisputes = async () => {
    try {
      const token = localStorage.getItem("x-access-token");
      const response = await Axios.get("/api/v1/user/dispute/get", {
        headers: { "x-access-token": token },
      });
      console.log(response.data);
      this.setState({
        openDisputes: response.data.diputes,
      });
    } catch (error) {
      console.log(error);
      Swal.fire("some errors were encountered loading all disputes");
    }
  };
  handleClose = () => {
    this.setState(
      {
        selectedBox: "box2",
      },
      () => window.$("#notDelivered").prop("checked", false)
    );
  };
  handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "message") {
      // console.log('called here now')`
      return this.setState({
        [name]: value,
      });
    }
    if (name === "damaged") {
      return this.setState({
        [name]: !this.state.damaged,
      });
    }
    if (name === "different") {
      return this.setState({
        [name]: !this.state.different,
      });
    }
  };
  renderAlert = () => {
    if (this.state.selectedBox === "box1") {
      return (
        <Dialog
          open={this.state.selectedBox === "box1"}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography variant="h5">Order in Progress</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Typography variant="subtitle1">
                The process cannot be continued as the order is still being
                processed
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return null;
  };
  selectBox = async (box) => {
    switch (box) {
      case "box1":
        this.setState({ selectedBox: "box1" });
        break;
      case "box2":
        this.setState({ selectedBox: "box2" });
        this.props.initiateRegistration();
        await this.props.fetchOrders();
        this.props.stopLoading();
        break;
      case "box3":
        this.setState({ selectedBox: "box3" });
        break;
      default:
        break;
    }
  };
  handleRowClick = (orderId) => {
    const order = this.props.orders.find(
      (item) => item.id === parseInt(orderId)
    );
    console.log("order is: ", order);
    window.$("#exampleModal").modal("show");
    this.setState({
      orderId,
      delivery: order.delivery,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    var $fileUpload = window.$("input[type='file']");
    console.log($fileUpload.get(0).files);
    // $fileUpload.get(0).files.length
    const { message } = this.state;
    if ($fileUpload.get(0).files.length === 0) {
      return alert("Upload atleast one image");
    }
    if (message.trim() === "") {
      return alert("Please enter complaint");
    }

    if (this.state.selectedDelivery.length === 0) {
      return Swal.fire("Please select a delivery");
    }
    console.log(this.state.selectedDelivery);
    this.props.initiateRegistration();
    await this.props.createDispute(
      this.state.selectedDelivery,
      this.state.message,
      $fileUpload.get(0).files,
      this.state.damaged,
      this.state.different
    );
    await this.setState({
      damaged: false,
      different: false,
      message: "",
    });
    $fileUpload.val("");
  };
  agreeTotermsChange = (event) => {
    const { name } = event.target;
    console.log(this.state);
    if (name === "notDelivered") {
      return this.setState(
        {
          notDelivered: !this.state.notDelivered,
        },
        () => {
          if (this.state.notDelivered) {
            window.$("#orderDelivered").prop("checked", false);
            this.selectBox("box1");
          }
        }
      );
    }
    return this.setState(
      {
        orderDelivered: !this.state.orderDelivered,
      },
      () => {
        if (this.state.orderDelivered) {
          window.$("#notDelivered").prop("checked", false);
          this.selectBox("box2");
        }
      }
    );
  };
  onDeliverySelect = (data) => {
    const deliveries = this.state.selectedDelivery;
    const index = this.state.selectedDelivery.findIndex(
      (item) => item.id === data.id
    );
    if (index !== -1) {
      deliveries.splice(index, 1);
      return this.setState(
        {
          selectedDelivery: deliveries,
        },
        () => console.log(this.state.selectedDelivery)
      );
    }
    deliveries.push(data);
    return this.setState(
      {
        selectedDelivery: deliveries,
      },
      () => console.log(this.state.selectedDelivery)
    );
  };
  renderComponent = () => {
    switch (this.state.selectedBox) {
      case "box2":
        //    return  <DisputeOrderDataTable handleRowClick={this.handleRowClick} data={this.props.orders} />
        return (
          <div className="order-table">
            <MaterialTable
              title=""
              components={{
                Action: (props) => {
                  // console.log(props)
                  if (props.action.icon === "check") {
                    return (
                      <button
                        onClick={() => this.handleRowClick(props.data.id)}
                        className="btn btn-lg btn-primary"
                      >
                        Raise Dispute
                      </button>
                    );
                  }
                },
              }}
              columns={[
                { title: "Order Number", field: "id" },
                {
                  title: "Date Ordered",
                  field: "createdAt",
                  render: (data) => {
                    return new Date(data.createdAt).toDateString();
                  },
                },
              ]}
              data={this.state.closedOrders}
              options={{
                headerStyle: {
                  background: "#00AAFF",
                  color: "#FFF",
                  fontFamily: '"Open Sans", sans-serif',
                  fontWeight: "bold",
                  fontSize: 16,
                  zIndex: 1,
                },
                searchFieldStyle: {},
                actionsColumnIndex: -1,
              }}
              actions={[
                {
                  icon: "check",
                  tooltip: "Select Delivery",
                  onClick: (event, rowData) => {
                    // Do save operation
                  },
                },
                // {

                //   icon: 'save',
                //   tooltip: 'Save User',
                //   onClick: (event, rowData) => {
                //     // Do save operation
                //   },
                // },
              ]}
            />
          </div>
        );
      case "box3":
        console.log("called");
        return this.renderOpenDisputes();

      default:
        break;
    }
  };
  renderOpenDisputes = () => {
    return (
      <MaterialTable
        data={this.state.openDisputes}
        title=""
        components={{
          Action: (props) => {
            // console.log(props)
            if (props.action.icon === "view") {
              return (
                <button
                  disabled={props.data.status.toLowerCase() === "resolved"}
                  title="Resolve"
                  onClick={() => this.resolveDispute(props.data)}
                  className="btn mr-3 btn-lg btn-info"
                >
                  Resolve
                </button>
              );
            }
          },
        }}
        columns={[
          { title: "Dispute ID", field: "id" },
          {
            title: "Date Opened",
            field: "createdAt",
            render: (data) => this.convertToDateTime(data.createdAt),
          },
          {
            title: "Status",
            field: "status",
            render: (data) => <span class="badge-soft">{data.status}</span>,
          },
        ]}
        options={{
          headerStyle: {
            background: "#00AAFF",
            color: "#FFF",
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: "bold",
            fontSize: 16,
            zIndex: 1,
          },
          searchFieldStyle: {},
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "view",
            tooltip: "Select Delivery",
            onClick: (event, rowData) => {
              // Do save operation
            },
          },
        ]}
      />
    );
  };
  resolveDispute = async (data) => {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Resolve Dispute",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.value) {
        try {
          this.props.initiateRegistration();
          const token = localStorage.getItem("x-access-token");
          await Axios.post(
            `/api/v1/user/dispute/resolve/${data.id}`,
            {},
            { headers: { "x-access-token": token } }
          );
          await this.getOpenDisputes();
          this.props.stopLoading();
          Swal.fire("Resolve Dispute", "Action successful", "success");
        } catch (error) {
          this.props.stopLoading();

          if (error.response) {
            console.log(error.response);
            Swal.fire(error.response.data);
          } else {
            console.log(error);
            Swal.fire("some errors were encountered");
          }
        }
      }
    });
  };
  convertToDateTime = (timestamp) => {
    return this.convertToDateTimeString(new Date(timestamp));
  };
  convertToDateTimeString = (date) => {
    let yr = date.getFullYear();
    let mo = date.getMonth() + 1;
    let day = date.getDate();

    let hours = date.getHours();
    let hr = hours < 10 ? "0" + hours : hours;

    let minutes = date.getMinutes();
    let min = minutes < 10 ? "0" + minutes : minutes;

    let seconds = date.getSeconds();
    let sec = seconds < 10 ? "0" + seconds : seconds;

    let newDateString = yr + "-" + mo + "-" + day;
    let newTimeString = hr + ":" + min + ":" + sec;

    let excelDateString = newDateString + " " + newTimeString;

    return excelDateString;
  };
  render() {
    return (
      <div>
        <div className="router-container">
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <div className="container">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <i className="icon-home"></i>
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/users/profile">Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/user/dasboard/help">Help</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Disputes
                </li>
              </ol>
            </div>
          </nav>

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-4">
                <div class="">
                  <div class="card-body">
                    <ul class="list-group">
                      <li
                        onClick={() => this.selectBox("box2")}
                        className={`list-group-item ${
                          this.state.selectedBox === "box2" ? "active" : ""
                        } cursor-pointer`}
                      >
                        Orders delivered
                      </li>
                      <li
                        onClick={() => this.selectBox("box3")}
                        className={`list-group-item ${
                          this.state.selectedBox === "box3" ? "active" : ""
                        } cursor-pointer`}
                      >
                        Disputes
                      </li>
                      {/* <li onClick={() => this.selectBox('box1')} className={`list-group-item ${this.state.selectedBox === 'box1' ? 'active' : '' } cursor-pointer`}>Orders not yet delivered</li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">{this.renderComponent()}</div>
            </div>
          </div>
        </div>
        {this.renderAlert()}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Open Dispute
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">
                      Enter your Complaint
                    </label>
                    <textarea
                      value={this.state.message}
                      onChange={this.handleChange}
                      name="message"
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      maxLength="1000"
                      rows="1"
                    ></textarea>
                    <small id="emailHelp" class="form-text text-muted">
                      Maximum of 1000 characters
                    </small>
                  </div>
                  <div className="form-group">
                    <label for="exampleFormControlFile1">Upload Images</label>
                    <input
                      min="1"
                      max="5"
                      name="files"
                      onClick={this.handleChange}
                      accept="image/*"
                      type="file"
                      multiple
                      class="form-control-file"
                      id="exampleFormControlFile1"
                    />
                    <small id="emailHelp" class="form-text text-muted">
                      maximum of 5 Images
                    </small>
                  </div>
                  <div className="form-check" style={{ display: "flex" }}>
                    <input
                      onChange={this.handleChange}
                      type="checkbox"
                      name="damaged"
                      class="mx-3"
                      style={{ display: "block", marginTop: 5 }}
                      id="exampleCheck1"
                    />
                    <label
                      class="form-check-label"
                      for="damaged"
                      style={{ marginTop: "0px !important" }}
                    >
                      Damaged and Defective Item
                    </label>
                  </div>
                  <div className="form-check" style={{ display: "flex" }}>
                    <input
                      onChange={this.handleChange}
                      type="checkbox"
                      name="different"
                      class=" mx-3"
                      style={{ display: "block", marginTop: 5 }}
                      id="exampleCheck2"
                    />
                    <label
                      class=""
                      for="different"
                      style={{ marginTop: "0px !important" }}
                    >
                      Entirely Different Item
                    </label>
                  </div>

                  <br />
                  <br />
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
                                {/* <button className="btn btn-primary mx-2">
                                  View Products
                                </button> */}
                              </>
                            );
                          }
                        },
                      }}
                      columns={[
                        { title: "Delivery ID", field: "id" },
                        { title: "Payment Mode", field: "paymentType" },
                        { title: "Delivery Code", field: "deliveryCode" },
                        { title: "Delivery Days", field: "deliveryDays" },
                        {
                          title: "Total Amount(NGN)",
                          field: "totalAmount",
                          render: (data) => {
                            return data.totalAmount / 100;
                          },
                        },
                      ]}
                      data={this.state.delivery}
                      title="Choose Delivery"
                      options={{
                        headerStyle: {
                          background: "#00AAFF",
                          color: "#FFF",
                          fontFamily: '"Open Sans", sans-serif',
                          fontWeight: "bold",
                          zIndex: 1,
                        },
                        searchFieldStyle: {},
                        actionsColumnIndex: -1,
                      }}
                      actions={[
                        {
                          icon: "check",
                          tooltip: "Select Delivery",
                          onClick: (event, rowData) => {
                            // Do save operation
                          },
                        },

                        // {

                        //   icon: 'save',
                        //   tooltip: 'Save User',
                        //   onClick: (event, rowData) => {
                        //     // Do save operation
                        //   },
                        // },
                      ]}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-primary"
                >
                  Log Dispute
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { orders } = state.inventory;
  return { orders };
};

export default connect(mapStateToProps, actions)(Disputes);

/*
<div className="container mt-3">
                        <div className="row mb-3 ">
                            <span className="dispute-type">Choose Dispute Type</span>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-4 col-xs-12 d-flex">
                            <input onClick={this.agreeTotermsChange} id="notDelivered" name="notDelivered" type="checkbox" class="mx-3" style={{display:'block', marginTop:5}}  />
                                <label class="form-check-label" htmlFor="notDelivered" style={{marginTop:'0px !important'}}>Order has not been delivered</label>
                            {/* <label class="label">
                                <input type="checkbox" name="checkbox" class="checkbox" checked="" />
                                <div class="checkDiv">
                                    <div class="lineOne"></div>
                                    <div class="lineTwo"></div>
                                </div>
                            </label> 

                                {/* <div onClick={() => this.selectBox('box1')} className={`shadow-sm custom-box p-3 mb-5 bg-white cursor-pointer ${this.state.selected === 'box1'? 'selectedBox': ''}`}>
                                   Order has not been delivered
                                </div> 
                                </div>
                                <div className="col-md-4 col-xs-12 d-flex">
                                    
                                <input onClick={this.agreeTotermsChange} name="orderDelivered" type="checkbox" class="mx-3" style={{display:'block', marginTop:5}} id="orderDelivered" />
                                    <label class="form-check-label" htmlFor="orderDelivered" style={{marginTop:'0px !important'}}>Order has been delivered</label>
                                    {/* <div onClick={() => this.selectBox('box2')} className={`shadow-sm custom-box p-3 mb-5 bg-white cursor-pointer ${this.state.selected === 'box2'? 'selectedBox': ''}`}>
                                        Order has been delivered
                                    </div> 
                                </div>
                            </div>
                            {
                                this.state.selected === 'box2' ? (
                                    <div className="row mt-5">
                                        <DisputeOrderDataTable handleRowClick={this.handleRowClick} data={this.props.orders} />
                                    </div>
                                ): null
                            }
                        </div>

*/
