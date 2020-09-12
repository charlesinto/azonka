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
import MaterialTable from "material-table";
import { Typography } from "@material-ui/core";
import Swal from "sweetalert2";
import Axios from "axios";
import check from "../../assets/correct.png";
import attachement from "../../assets/attachment.png";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
// import { Dropdown} from 'react-bootstrap'

class Disputes extends Component {
  state = {
    selected: "",
    orderId: "",
    files: null,
    message: "",
    exampleCheck2: false,
    exampleCheck1: false,
    disputeState: "all",
    openDisputes: [],
    selectedDispute: null,
    photoIndex: 0,
    images: [],
    isOpen: false,
    action: "",
    notDelivered: false,
    orderDelivered: false,
  };
  async componentDidMount() {
    // this.props.initiateRegistration()
    // await this.props.fetchOrders();
    // this.props.stopLoading()
    this.props.setActiveLink("Manage Disputes");
    this.setupEvents();
    this._initState();
  }
  _initState = async () => {
    try {
      this.props.initiateRegistration();
      const token = localStorage.getItem("x-access-token");
      await this.getOpenDisputes(token);
      // await this.getUnResolvedDisputes(token)
      this.props.stopLoading();
    } catch (error) {
      console.log(error);
    }
  };
  getOpenDisputes = async (token = "") => {
    try {
      const response = await Axios.get("/api/v1/seller/dispute/get", {
        headers: { "x-access-token": token },
      });
      this.setState({
        openDisputes: response.data.disputes,
      });
    } catch (error) {
      console.log(error);
      Swal.fire("some errors were encountered loading all disputes");
    }
  };
  getUnResolvedDisputes = async (token = "") => {
    try {
      const response = await Axios.get("/api/v1/ad/get-unresolved-disputes", {
        headers: { "x-access-token": token },
      });
      this.setState({
        unresolved: response.data.disputes,
      });
    } catch (error) {
      console.log(error);
      Swal.fire("some errors were encountered loading unresolved disputes");
    }
  };
  setupEvents = () => {
    window.$("input[type='file']").change(function () {
      var $fileUpload = window.$("input[type='file']");
      if (parseInt($fileUpload.get(0).files.length) > 5) {
        $fileUpload.val("");
        alert("You can only upload a maximum of 5 files");
      }
    });
  };
  componentWillUnmount() {
    window.$("input[type='file']").unbind();
  }
  handleClose = () => {
    this.setState(
      {
        selected: "",
      },
      () => window.$("#notDelivered").prop("checked", false)
    );
  };
  handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "message") {
      return this.setState({
        [name]: value,
      });
    }
    if (name === "exampleCheck1") {
      return this.setState({
        [name]: !this.state.exampleCheck1,
      });
    }
    if (name === "exampleCheck2") {
      return this.setState({
        [name]: !this.state.exampleCheck2,
      });
    }
  };
  renderAlert = () => {
    if (this.state.selected === "box1") {
      return (
        <Dialog
          open={this.state.selected === "box1"}
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
        this.setState({ selected: "box1" });
        break;
      case "box2":
        this.setState({ selected: "box2" });
        this.props.initiateRegistration();
        await this.props.fetchOrders();
        this.props.stopLoading();
        break;
      default:
        break;
    }
  };
  handleRowClick = (orderId) => {
    window.$("#exampleModal").modal("show");
    this.setState({
      orderId,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    var $fileUpload = window.$("input[type='file']");
    // $fileUpload.get(0).files.length
    const { message } = this.state;
    if ($fileUpload.get(0).files.length === 0) {
      return alert("Upload atleast one image");
    }
    if (message.trim() === "") {
      return alert("Please enter complaint");
    }
    this.props.initiateRegistration();
    if (this.state.action === "reject") {
      await this.props.rejectDispute(
        this.state.selectedDispute.id,
        message,
        $fileUpload.get(0).files
      );
    } else {
      await this.props.acceptDispute(
        this.state.selectedDispute.id,
        message,
        $fileUpload.get(0).files
      );
    }
    await this.setState(
      {
        message: "",
      },
      () => this._initState()
    );
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
  renderTableComponent = () => {
    return this.openDisputes();
  };

  acceptDispute = async (data) => {
    Swal.fire({
      title: "<strong>Accept Dispute</strong>",
      icon: "info",
      html:
        'You agree that the buyer should be refunded and  you accept full responsibility as prescribed by <a href="#!"><strong>Azonka Terms and Condition</strong></a> ? ',

      showCloseButton: true,

      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fas fa-check"></i> I agree!',
      confirmButtonAriaLabel: "Accept Dispute",
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          this.props.initiateRegistration();
          const token = localStorage.getItem("x-access-token");
          const response = await Axios.post(
            `/api/v1/seller/dispute/accept/${data.id}`,
            {},
            { headers: { "x-access-token": token } }
          );
          console.log(response);
          this.props.stopLoading();
          Swal.fire("Accept Dispute", response.data.message, "success");
        } catch (error) {
          console.log(error.response);
          this.props.stopLoading();
          if (error.response) {
            return Swal.fire(error.response.data.message);
          }
          Swal.fire("some errors were encountered, please try again");
        }
      }
    });
  };

  pendingDisputes = () => (
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
        data={[]}
        options={{
          headerStyle: {
            background: "#FA6400",
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
  );
  openDisputes = () => (
    <div className="order-table">
      <MaterialTable
        title=""
        components={{
          Action: (props) => {
            // console.log(props)
            if (props.action.icon === "view2") {
              return (
                <button
                  onClick={() => this.viewDispute(props.data)}
                  className="btn mr-1 btn-lg btn-info"
                >
                  View
                </button>
              );
            }
            if (props.action.icon === "view3") {
              return (
                <button
                  onClick={() => this.rejectResolve("reject", props.data)}
                  className="btn mr-1 btn-lg btn-danger"
                >
                  Reject
                </button>
              );
            }
            if (props.action.icon === "view4") {
              return (
                <button
                  onClick={() => this.acceptDispute(props.data)}
                  className="btn mr-1 btn-lg btn-primary"
                >
                  Accept
                </button>
              );
            }
            if (props.action.icon === "view5") {
              return (
                <button
                  onClick={() => this.rejectResolve("resolve", props.data)}
                  className="btn mr-1 btn-lg btn-secondary"
                >
                  Resolve
                </button>
              );
            }
            //    return  (
            //    <Dropdown>
            //             <Dropdown.Toggle variant="primary" id="dropdown-basic">
            //                 <b>Action</b>
            //             </Dropdown.Toggle>

            //             <Dropdown.Menu>
            //             <Dropdown.Item onClick={() => this.viewDispute(props.data)} >View</Dropdown.Item>
            //                 <Dropdown.Item onClick={this.addProductToCart} >Reject</Dropdown.Item>
            //                 <Dropdown.Item onClick={this.viewDetails} >Accept</Dropdown.Item>
            //                 <Dropdown.Item onClick={this.viewDetails} >Resolve</Dropdown.Item>
            //             </Dropdown.Menu>
            //         </Dropdown>
            //                 <div class="dropdown">
            //   <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //     Action
            //   </button>
            //   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            //     <Link title="View" onClick={() => this.viewDispute(props.data)} className="dropdown-item" >View</Link>
            //     {/* <Link title="Accept" className="dropdown-item" onClick={() => this.acceptDispute(props.data)} >Accept</Link> */}
            //     <Link title="Reject" className="dropdown-item" onClick={() => this.rejectResolve('reject', props.data)} >Reject</Link>
            //     <Link title="Resolve" className="dropdown-item" onClick={() => this.rejectResolve('resolve', props.data)} >Resolve</Link>
            //   </div>
            // </div>
            //    )
          },
        }}
        columns={[
          { title: "ID", field: "id" },
          { title: "Delivery ID", field: "delivery" },
          {
            title: "Dispute Status",
            field: "status",
            render: (data) => <span class="badge-soft">{data.status}</span>,
          },
          {
            title: "Date Opened",
            field: "createdAt",
            render: (data) => {
              return new Date(data.createdAt).toDateString();
            },
          },
        ]}
        data={this.state.openDisputes}
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
            icon: "view2",
            tooltip: "Select Delivery",
            onClick: (event, rowData) => {
              // Do save operation
            },
          },
          {
            icon: "view3",
            tooltip: "Select Delivery",
            onClick: (event, rowData) => {
              // Do save operation
            },
          },
          {
            icon: "view4",
            tooltip: "Select Delivery",
            onClick: (event, rowData) => {
              // Do save operation
            },
          },
          //   {
          //     icon: "view5",
          //     tooltip: "Select Delivery",
          //     onClick: (event, rowData) => {
          //       // Do save operation
          //     },
          //   },
        ]}
      />
    </div>
  );
  rejectResolve = (action, data) => {
    this.setState(
      {
        action,
        selectedDispute: data,
      },
      () => window.$("#exampleModal").modal("show")
    );
  };
  viewDispute = (data) => {
    console.log("data: ", data);
    this.setState({
      selectedDispute: data,
      images: [data.img1, data.img2],
    });
    window.$("#exampleModal2").modal("show");
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
                  <Link to="/store/orders/disputes">Manage Disputes</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Disputes
                </li>
              </ol>
            </div>
          </nav>

          <div className="container">
            {/* <div className="row mt-3">
              <div className="col-lg-12">
                <span
                  onClick={() => this.setState({ disputeState: "all" })}
                  className={`tag ${
                    this.state.disputeState === "all" ? "activeTag" : ""
                  }  mr-3`}
                >
                  All
                </span>
                <span
                  onClick={() => this.setState({ disputeState: "pending" })}
                  className={`tag ${
                    this.state.disputeState === "pending" ? "activeTag" : ""
                  }  mr-3`}
                >
                  Pending
                </span>
                <span
                  onClick={() => this.setState({ disputeState: "closed" })}
                  className={`tag ${
                    this.state.disputeState === "closed" ? "activeTag" : ""
                  }  mr-3`}
                >
                  Closed
                </span>
              </div>
            </div> */}
            <div className="row mt-3">
              {/* <div className="col-lg-4">
                            <div class="">
                                
                                <div class="card-body">
                                    <ul class="list-group">
                                        <li onClick={() => this.setState({disputeState: 'all'})} className={`list-group-item ${this.state.disputeState === 'all' ? 'active': ''} cursor-pointer`}>All Disputes</li>
                                        <li onClick={() => this.setState({disputeState: 'pending'})}  className={`list-group-item ${this.state.disputeState === 'pending' ? 'active': ''} cursor-pointer`}>Pending Disputes</li>
                                        <li onClick={() => this.selectBox('box1')} class="list-group-item cursor-pointer">Order not yet delivered</li>
                                    </ul>
                                </div>
                                </div>
                            </div> */}
              <div className="col-lg-12">{this.renderTableComponent()}</div>
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
                  {this.state.action === "reject" ? "Reject" : "Resolve"}{" "}
                  Dispute
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
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      maxLength="800"
                      rows="1"
                    ></textarea>
                    <small id="emailHelp" class="form-text text-muted">
                      Maximum of 1000 characters
                    </small>
                  </div>
                  <div class="form-group">
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
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-primary btn-lg"
                >
                  {" "}
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal2"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                {/* <h5 className="modal-title" id="exampleModalLabel"></h5> */}
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
                <div className="container-fluid">
                  <div className="row mb-3">
                    <div className="col-md-12 d-flex">
                      <div className="msg-img"></div>
                      <div className="msg-bubble">
                        <div className="msg-info">
                          <div className="msg-info-name"></div>
                          <div className="msg-info-time">
                            {this.convertToDateTime(
                              this.state.selectedDispute &&
                                this.state.selectedDispute.messages[0] &&
                                this.state.selectedDispute.messages[0].createdAt
                            )}
                          </div>
                        </div>
                        <div className="msg-text">
                          {this.state.selectedDispute &&
                            this.state.selectedDispute.messages[0] &&
                            this.state.selectedDispute.messages[0].text}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div
                        className="d-flex mt-3"
                        onClick={() => this.setState({ isOpen: true })}
                      >
                        <img
                          src={attachement}
                          className="mr-3 checkmark-delivery cursor-pointer"
                          alt="attachment"
                        />{" "}
                        <span className="attachment cursor-pointer">
                          View attachemd images
                        </span>
                      </div>
                    </div>
                  </div>
                  {this.state.selectedDispute &&
                  this.state.selectedDispute.damaged ? (
                    <div className="row mb-2">
                      <div className="col-md-12">
                        <div className="d-flex">
                          <img
                            src={check}
                            alt="check"
                            className="checkmark-delivery mr-3"
                          />{" "}
                          <span className="delivery-status">
                            Damaged Parcel
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {this.state.selectedDispute &&
                  this.state.selectedDispute.different ? (
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex">
                          <img
                            src={check}
                            alt="check"
                            className="checkmark-delivery mr-3"
                          />{" "}
                          <span className="delivery-status">
                            Different Package
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {/* <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Log Dispute</button> */}
              </div>
            </div>
          </div>
        </div>
        {this.state.isOpen ? (
          <Lightbox
            mainSrc={this.state.images[this.state.photoIndex]}
            nextSrc={
              this.state.images[
                (this.state.photoIndex + 1) % this.state.images.length
              ]
            }
            prevSrc={
              this.state.images[
                (this.state.photoIndex + this.state.images.length - 1) %
                  this.state.images.length
              ]
            }
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (this.state.photoIndex + this.state.images.length - 1) %
                  this.state.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex:
                  (this.state.photoIndex + 1) % this.state.images.length,
              })
            }
          />
        ) : null}
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

                        <DisputeOrderDataTable handleRowClick={this.handleRowClick} data={this.props.orders} />

*/
