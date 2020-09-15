import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
const $ = require("jquery");

$.DataTable = require("datatables.net");
require("datatables.net-responsive");

//confirmation Dialog
class OrderDe extends Component {
  INITIAL_STATE = { selectedOrders: [] };
  constructor(props) {
    super(props);
    this.state = { ...this.INITIAL_STATE };
  }
  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.resetState) {
      return { ...state, selectedOrders: [] };
    }
    return null;
  }
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.DataTable({
      responsive: true,
      data: this.props.data, // name, brandname, mainImageUrl,model, sellingPrice, finalPrice
      autoWidth: true,

      columns: [
        {
          title: "",
          render: (data, type, row, meta) => {
            return `<input type="checkbox"
                          data-id=${row.id} name=checkbox-${row.id} value="sellers" />
                            <label class="label-check">
                                    <span style="width:2.4rem;height:2.4rem;" data-id=${row.id} class="checkbox primary data-table primary"><span></span></span>
                            </label>
                          `;
          },
        },
        {
          title: "Item Image",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return `<div style="display:flex;"><div class="item-dt-img" style="background-image:url(${row.mainImageUrl})"></div>
                            </div>`;
            }
            return `<div style="display:flex;"><div class="item-dt-img" style="background-image:url(${row.mainImageUrl})"></div>
                                </div>`;
          },
          responsivePriority: 1,
        },
        {
          title: "Item Name",
          render: (data, type, row, meta) => {
            return `<span class="item-uploadedname dt-item">${row.name}</span>`;
          },
          responsivePriority: 3,
        },
        {
          title: "Brand Name",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return `<span class="dt-item">${row.brandName}</span>`;
            }
            return `<span class="dt-item">${row.brandName}</span>`;
          },
        },
        {
          title: "Model",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return `<span class="dt-item">${row.model}</span>`;
            }
            return `<span class="dt-item">${row.model}</span>`;
          },
        },
        {
          title: "Selling Price",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return `<span class="dt-item">&#8358; ${this.numberWithCommas(
                row.sellingPrice / 100
              )}</span>`;
            }
            return `<span class="dt-item">&#8358; ${this.numberWithCommas(
              row.sellingPrice / 100
            )}</span>`;
          },
        },
        {
          title: "Final Price",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return `<span class="dt-item">&#8358; ${this.numberWithCommas(
                row.finalPrice / 100
              )}</span>`;
            }
            return `<span class="dt-item">&#8358; ${this.numberWithCommas(
              row.finalPrice / 100
            )}</span>`;
          },
        },
        {
          title: "Quantity",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return `<span class="dt-item"> ${this.numberWithCommas(
                this.props.quantity[row.id]
              )}</span>`;
            }
            return `<span class="dt-item"> ${this.numberWithCommas(
              this.props.quantity[row.id]
            )}</span>`;
          },
        },
        {
          title: " Action",
          render: (data, type, row, meta) => {
            return `<button type="button" data-id=${row.id}
                        data-toggle="tooltip" data-placement="bottom" title="Accept Order"
                         class="btn btn-outline-primary action-btn btn-xs dt-edit" style="margin-right:16px;">
                        <i class="fas fa-clipboard-check"></i></button>
                        <button type="button" data-id=${row.id} 
                        data-toggle="tooltip" data-placement="bottom" title="Reject Order"
                        class="btn btn-outline-danger action-btn btn-xs dt-delete"><i class="fas fa-times"></i></button>`;
          },
          responsivePriority: 2,
        },
      ],
      buttons: [
        "colvis",
        "copyHtml5",
        "csvHtml5",
        "excelHtml5",
        "pdfHtml5",
        "print",
      ],
    });

    const $this = this;
    $(this.el).on("click", "button", function () {
      //console.log('clicked', this.classList)
      if (this.classList.contains("dt-edit")) {
        const selectedId = this.dataset.id;
        $this.props.handleRowClick(selectedId, "edit");
      } else if (this.classList.contains("dt-delete")) {
        const selectedId = this.dataset.id;
        $this.props.handleRowClick(selectedId, "delete");
      }
    });
    $(this.el).on("click", "span.data-table", function (e) {
      const inputfield = document.querySelector(
        `input[data-id="${this.dataset.id}"]`
      );
      const index = $this.state.selectedOrders.findIndex(
        (item) => item === this.dataset.id
      );
      if (index !== -1) {
        inputfield.removeAttribute("checked");
        const SelectedOrders = $this.state.selectedOrders;
        SelectedOrders.splice(index, 1);
        $this.resetState([...SelectedOrders]);
      } else {
        inputfield.setAttribute("checked", true);
        const newSelectedOrders = $this.state.selectedOrders;
        newSelectedOrders.push(this.dataset.id);
        $this.resetState([...newSelectedOrders]);
      }
    });
  }
  resetState = (newState) => {
    console.log("called", newState);
    this.setState(
      {
        selectedOrders: newState,
      },
      () => this.props.itemSelectedOrderDetailModal(this.state.selectedOrders)
    );
  };
  componentWillUnmount() {
    this.$el = $(this.el);
    this.setState({ ...this.INITIAL_STATE });
    this.$el.DataTable().destroy(true);
    this.props.removeItemsFromTable();
  }
  reloadTableData(data, $el) {
    // this.setState({selectedOrders: []})
    $el.DataTable().clear();
    $el.DataTable().rows.add(data);

    $el.DataTable().draw();
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.updateDt) {
      this.reloadTableData(nextProps.data, $(this.el));
    }
    return true;
  }
  numberWithCommas = (number = "") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  render() {
    return (
      <div className="container">
        {/* <div className="row">
                    {
                        this.state.selectedOrders.length > 0 ? 
                        (
                            <div className="row">
                                <div className="d-flex  bd-highlight">
                                <button type="button" style={{marginRight: 8}} className="btn btn-primary btn-small">
                                    Accept {this.state.selectedOrders.length}</button>
                                    <button type="button" className="btn btn-danger btn-small">
                                        Reject {this.state.selectedOrders.length}</button>
                                </div>
                            </div>
                        ) :

                        (
                            <div className="row">
                                <div className="d-flex  bd-highlight">
                                    <button type="button" style={{marginRight: 8}} className="btn btn-primary btn-small">
                                        Accept All</button>
                                    <button type="button" className="btn btn-danger btn-small">
                                        Reject All</button>
                                </div>
                            </div>
                        )
                    }
                </div> */}
        <div className="row">
          <table
            className="display table data-table-class table-striped table-bordered"
            style={{ width: "100%", overflowX: "auto" }}
            ref={(el) => (this.el = el)}
          ></table>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(OrderDe);
