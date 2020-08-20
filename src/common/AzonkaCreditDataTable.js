import React, { Component } from 'react';

const $ = require('jquery')

$.DataTable = require('datatables.net')
require( 'datatables.net-responsive' )

class AzonkaCreditDataTable extends Component {
    componentDidMount(){
        this.$el = $(this.el)
        console.log('this props', this.props.data)
        this.$el.DataTable({
            responsive: true,
            data:this.props.data,//id, name, accountName, accountNumber, createdAt
            columnDefs: [{"defaultContent": "<button>Click!</button>"}],
            columns: [
                {title:'Transaction Type',
                 render: (data, type, row, meta ) => {
                    if ( type === 'display' ) {
                        return row.type.toUpperCase()
                    }
                     return row.type.toUpperCase()
                 },
                 responsivePriority: 2
                },
                {title:'Transaction Reason',
                 render: (data, type, row, meta ) => {
                    if ( type === 'display' ) {
                        return row.reason.toUpperCase()
                    }
                     return row.reason.toUpperCase()
                 },
                 responsivePriority: 2
                },
                {title: 'Credit Value', 
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.amount
                        }
                        return row.amount   
                    },
                    responsivePriority: 1
                },
                {title: 'Date Created',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return new Date(row.createdAt).toLocaleString()
                        } 
                        return new Date(row.createdAt).toLocaleString()
                    },
                    responsivePriority: 3
                },
            ]
        })
    }
    converToDate = timestamp => {
        const MONTHS = ['January','February', 'March', 'April', 'May', 'June', 'July'
            ,'August','September', 'October', 'November', 'Decemeber']
        const date = new Date(timestamp)
        return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
    }
    componentWillUnmount(){
        this.$el = $(this.el)
        this.$el.DataTable().destroy(true)
    }
    reloadTableData(data, $el){
        $el.DataTable().clear()
        $el.DataTable().rows.add(data)
        $el.DataTable().draw()
    }
    shouldComponentUpdate(nextProps) {
        this.reloadTableData(nextProps.data, $(this.el));
        return false;
    }
    render(){
        return (
            <table className="display table data-table-class table-striped table-bordered" style={{width:'100%',
            overflowX:'auto'}} ref={el => this.el = el}></table>
        
    );
    }
}

export default AzonkaCreditDataTable;