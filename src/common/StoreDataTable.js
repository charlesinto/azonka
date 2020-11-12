import React, { Component } from "react";
// import "../css/dataTable.css";
const $ = require("jquery");

$.DataTable = require("datatables.net");
require("datatables.net-responsive");

class StoreDataTable extends Component {
  componentDidMount() {
    this.$el = $(this.el);
    console.log("this props", this.props.data);
    this.$el.DataTable({
      responsive: true,
      data: this.props.data, //country, state, address,name, createdAt
      columns: [
        {
          title: "Store ID",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return row.id;
            }
            return row.id;
          },
        },
        {
          title: "Store Name",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return row.name;
            }
            return row.name;
          },
        },
        {
          title: "Address",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return row.address;
            }
            return row.address;
          },
        },
        {
          title: "State",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return row.state;
            }
            return row.state;
          },
        },
        {
          title: "Country",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return row.country;
            }
            return row.country;
          },
        },
        {
          title: "Date Created",
          render: (data, type, row, meta) => {
            if (type === "display") {
              return this.converToDate(row.createdAt);
            }
            return this.converToDate(row.createdAt);
          },
        },
        {
          title: "Action",
          render: (data, type, row, meta) => {
            // if ( type === 'display' ) {
            //     return this.converToDate(row.createdAt)
            // }
            // return this.converToDate(row.createdAt)
            return `<a href="/view-products?shopId=${row.id}" target="_blank" class="btn btn-info" >View Products</a>`;
          },
        },
      ],
    });
  }
  componentWillUnmount() {
    this.$el = $(this.el);
    this.$el.DataTable().destroy(true);
  }
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
  reloadTableData(data, $el) {
    $el.DataTable().clear();
    $el.DataTable().rows.add(data);
    $el.DataTable().draw();
  }
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

export default StoreDataTable;
