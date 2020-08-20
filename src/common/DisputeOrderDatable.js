import React, { Component } from 'react';

const $ = require('jquery')

$.DataTable = require('datatables.net')
require( 'datatables.net-responsive' )

class DisputeOrderDataTable extends Component {
    componentDidMount(){
        this.$el = $(this.el)
        // window.$(document).ready(function() {
        //     window.$('#example').DataTable();
        // } );
        console.log('this props', this.props.data)
        this.$el.DataTable({
            responsive: true,
            data:this.props.data,//id, name, accountName, accountNumber, createdAt
            columnDefs: [{"defaultContent": "<button>Click!</button>"}],
            columns: [
                {title:'Order Number',
                 render: (data, type, row, meta ) => {
                    if ( type === 'display' ) {
                        return row.id
                    }
                     return row.id
                 },
                 responsivePriority: 3
                },
                {title: 'Date Ordered',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return new Date(row.createdAt).toLocaleString()
                        } 
                        return new Date(row.createdAt).toLocaleString()
                    },
                    responsivePriority: 5
                },
                {
                    title:' Action',
                    render: (data, type, row, meta) => {
                        return `<button type="button" data-id=${row.id} class="btn btn-primary dt-edit">
                            Dispute</button>`
                    },
                    responsivePriority: 1
                }
            ]
        })
        const $this = this;
        $(this.el).on('click', 'button', function(){
            //console.log('clicked', this.classList)
            if(this.classList.contains('dt-edit')){
                const selectedId = this.dataset.id
                $this.props.handleRowClick(selectedId)
            }
            else if(this.classList.contains('dt-delete')){
                const selectedId = this.dataset.id
                $this.props.handleRowClick(selectedId, 'delete')
            }
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

export default DisputeOrderDataTable;