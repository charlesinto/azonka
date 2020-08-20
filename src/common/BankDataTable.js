import React, { Component } from 'react';

const $ = require('jquery')

$.DataTable = require('datatables.net')
require( 'datatables.net-responsive' )

class BankDataTable extends Component {
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
                {title:'Bank Name',
                 render: (data, type, row, meta ) => {
                    if ( type === 'display' ) {
                        return row.name
                    }
                     return row.name
                 },
                 responsivePriority: 3
                },
                {title: 'Account Name', 
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.accountName
                        }
                        return row.accountName   
                    },
                    responsivePriority: 2
                },
                {title: 'Account Number',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.accountNumber
                        }  
                         return row.accountNumber
                        
                    },
                    responsivePriority: 4
                },
                {title: 'Date Created',
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
                        return `<button type="button" data-id=${row.id} class="btn btn-outline-primary action-btn btn-xs dt-edit" style="margin-right:16px;">
                        <i class="fas fa-pen"></i></button>
                        <button type="button" data-id=${row.id} class="btn btn-outline-danger action-btn btn-xs dt-delete"><i class="fas fa-trash"></i></button>`
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
                $this.props.handleRowClick(selectedId, 'edit')
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

export default BankDataTable;