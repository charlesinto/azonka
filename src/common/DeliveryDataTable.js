import React, { Component } from 'react';

const $ = require('jquery')

$.DataTable = require('datatables.net')
require( 'datatables.net-responsive' )

class DeliveryDataTable extends Component {
    componentDidMount(){
        this.$el = $(this.el)
        console.log('this props', this.props.data)
        this.$el.DataTable({
            responsive: true,
            data:this.props.data,//id, name, accountName, accountNumber, createdAt
            columnDefs: [{"defaultContent": "<button>Click!</button>"}],
            columns: [
                {title:'Order Number',
                 render: (data, type, row, meta ) => {
                    if ( type === 'display' ) {
                        return `<button
                            type="button" data-id=${row.id} class="order-number text-primary dt-view-product-detail" data-toggle="modal" data-target="#exampleModalLong"
                        >${row.id}</button>`
                    }
                    return `<button 
                                type="button" data-id=${row.id} class="order-number text-primary dt-view-product-detail" data-toggle="modal" data-target="#exampleModalLong"
                            >${row.id}</button>`
                 },
                 responsivePriority: 3
                },
                {title: 'Total Amount', 
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.totalAmount
                        }
                        return row.totalAmount   
                    },
                    responsivePriority: 2
                },
                {title: 'Order Status',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.status
                        }  
                         return row.status
                        
                    },
                    responsivePriority: 4
                },
                {title: 'Delivery Code',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.deliveryCode
                        } 
                        return row.deliveryCode
                    },
                    responsivePriority: 5
                },
                {title: 'Date Created',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return this.converToDate(row.createdAt)
                        } 
                        return this.converToDate(row.createdAt)
                    },
                    responsivePriority: 6
                },
                {
                    title:' Action',
                    render: (data, type, row, meta) => {
                        return `<div class="data-table-action-wrapper"><button type="button" data-id=${row.id} data-toggle="modal" data-target="#exampleModalLong" data-controls-modal="#exampleModalLong" data-backdrop="static" data-keyboard="false" class="btn btn-outline-primary action-btn btn-xs dt-view-product-detail" style="margin-right:16px;">
                        <i class="far fa-eye"></i> View</button>
                        `
                    },
                    responsivePriority: 1
                }
            ]
        })
        const $this = this;
        $(this.el).on('click', 'button', function(){
            console.log('called')
            //console.log('clicked', this.classList)
            if(this.classList.contains('dt-edit')){
                console.log('here o is edit')
                const selectedId = this.dataset.id
                $this.props.handleRowClick(selectedId, 'edit')
            }
            if(this.classList.contains('dt-view-product-detail')){
                console.log('here o is view')
                const selectedId = this.dataset.id
                $this.props.handleRowClick(selectedId, 'view')
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
            
            <table className="display table data-table-class data-table table-striped table-bordered" style={{width:'100%',
            overflowX:'auto'}} ref={el => this.el = el}></table>
        
    );
    }
}

export default DeliveryDataTable;

//<button type="button" data-id=${row.id} class="btn btn-outline-danger action-btn btn-xs dt-delete"><i class="fas fa-times"></i> Reject</button></div>