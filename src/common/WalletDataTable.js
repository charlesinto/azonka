import React, { Component } from "react";
// import "../css/dataTable.css";
// import MaterialTable from "material-table";
const $ = require("jquery");

$.DataTable = require("datatables.net");
require("datatables.net-responsive");

class WalletDataTable extends Component {
  componentDidMount() {
    this.$el = $(this.el);
    console.log("this props", this.props.data);
    const table = this.$el.DataTable({
      order: [[0, "desc"]],
      responsive: true,
      data: this.props.data,
      columnDefs: [
        {
          targets: 0,
          visible: false,
        },
      ],
      //country, state, address,name, createdAt
      columns: [
        {
          title: "CreatedAt",
          render: (data, type, row, meta) => {
            return row.createdAt;
          },
          // responsivePriority: 3
        },
        {
          title: "Type",
          render: (data, type, row, meta) => {
            return `<span class="wallet-text">${row.type.toUpperCase()}</span>`;
          },
          // responsivePriority: 3
        },
        {
          title: "Amount",
          render: (data, type, row, meta) => {
            return `<span class="wallet-text wallet-amount text-primary">&#8358; ${this.numberWithCommas(
              row.amount / 100
            )}</span>`;
          },
          // responsivePriority: 1
        },
        {
          title: "Description",
          render: (data, type, row, meta) => {
            return `<span class="wallet-tex">${row.desc}</span>`;
          },
        },
        {
          title: "Status",
          render: (data, type, row, meta) => {
            if (row.status === "completed") {
              return `<span class="wallet-text text-success">${row.status}</span>`;
            }
            return `<span class="wallet-text text-warning">${row.status}</span>`;
          },
          // responsivePriority: 2
        },
        {
          title: "Date",
          render: (data, type, row, meta) => {
            return `<span class="wallet-text">${this.converToDate(
              row.createdAt
            )}</span>`;
          },
        },
      ],
    });
    console.log(table);
  }
  componentWillUnmount() {
    this.$el = $(this.el);
    this.$el.DataTable().destroy(true);
  }
  converToDate = (timestamp) => {
    // const MONTHS = ['January','February', 'March', 'April', 'May', 'June', 'July'
    //     ,'August','September', 'October', 'November', 'Decemeber']
    const date = new Date(timestamp);
    // return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
    return date.toLocaleString();
  };
  reloadTableData(data, $el) {
    $el.DataTable().clear();
    $el.DataTable().rows.add(data);
    $el.DataTable().draw();
  }
  numberWithCommas = (number = "") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  shouldComponentUpdate(nextProps) {
    // console.log('called o', nextProps, this.props)
    // if (nextProps.data.length !== this.props.data.length) {
    //     console.log('called o')
    //     this.reloadTableData(nextProps.data, $(this.el));
    // }
    this.reloadTableData(nextProps.data, $(this.el));
    return false;
  }
  render() {
    return (
      <div>
        <table
          className="display table table-striped table-bordered"
          style={{ width: "100%", overflowX: "auto" }}
          ref={(el) => (this.el = el)}
        ></table>
      </div>
    );
  }
}

export default WalletDataTable;

/*
const table = this.$el.DataTable({
      order: [[4, "desc"]],
      responsive: true,
      data: this.props.data,
      columnDefs: [
        {
          type: "datetime-moment",
          targets: 4,
        },
      ],
      //country, state, address,name, createdAt
      columns: [
        {
          title: "Type",
          render: (data, type, row, meta) => {
            return `<span class="wallet-text">${row.type.toUpperCase()}</span>`;
          },
          // responsivePriority: 3
        },
        {
          title: "Amount",
          render: (data, type, row, meta) => {
            return `<span class="wallet-text wallet-amount text-primary">&#8358; ${this.numberWithCommas(
              row.amount / 100
            )}</span>`;
          },
          // responsivePriority: 1
        },
        {
          title: "Description",
          render: (data, type, row, meta) => {
            return `<span class="wallet-tex">${row.desc}</span>`;
          },
        },
        {
          title: "Status",
          render: (data, type, row, meta) => {
            if (row.status === "completed") {
              return `<span class="wallet-text text-success">${row.status}</span>`;
            }
            return `<span class="wallet-text text-warning">${row.status}</span>`;
          },
          // responsivePriority: 2
        },
        {
          title: "Date",
          render: (data, type, row, meta) => {
            return `<span class="wallet-text">${this.converToDate(
              row.createdAt
            )}</span>`;
          },
        },
      ],
    });
    console.log(table);

*/
