import React, { Component } from 'react';
// import "../css/dataTable.css";
const $ = require('jquery')

$.DataTable = require('datatables.net')
require( 'datatables.net-responsive' )

class StoreDataTable extends Component {
    componentDidMount(){
        this.$el = $(this.el)
        console.log('this props', this.props.data)
        // this.$el.dataTable()
        this.$el.DataTable({
            responsive: true,
            data:this.props.data,//country, state, address,name, createdAt
            columns: [
                {title: 'Address', 
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.address1
                        }
                        return row.address1   
                    },
                    responsivePriority: 2
                },
                {title: 'State',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.state
                        }  
                         return row.state
                        
                    },
                    responsivePriority: 3
                },
                {title: 'Country',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.country
                        } 
                        return row.country
                    },
                    responsivePriority: 4
                },
                {title: 'Date Created',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return this.converToDate(row.createdAt)
                        } 
                        return this.converToDate(row.createdAt)
                    },
                
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
    componentWillUnmount(){
        this.$el = $(this.el)
        this.$el.DataTable().destroy(true)
    }
    converToDate = timestamp => {
        const MONTHS = ['January','February', 'March', 'April', 'May', 'June', 'July'
            ,'August','September', 'October', 'November', 'Decemeber']
        const date = new Date(timestamp)
        return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
    }
    reloadTableData(data, $el){
        $el.DataTable().clear()
        $el.DataTable().rows.add(data)
        $el.DataTable().draw()
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
                <table className="display table table-striped table-bordered" style={{width:'100%',
                    overflowX:'auto'}} ref={el => this.el = el}></table>
            </div>
        );
    }
}

export default StoreDataTable;