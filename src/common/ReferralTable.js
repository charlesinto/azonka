import React, { Component } from 'react';
// import "../css/dataTable.css";
const $ = require('jquery')

$.DataTable = require('datatables.net')
require( 'datatables.net-responsive' )

class ReferralTable extends Component {
    componentDidMount(){
        this.$el = $(this.el)
        this.$el.DataTable({
            responsive: true,
            data:this.props.data,
            autoWidth: true,
            
            columns: [
                {title:'First Name',
                 render: (data, type, row, meta ) => {
                    if ( type === 'display' ) {
                        return row.firstName
                    }
                     return row.firstName
                 },
                 
                },
                {title: 'Last Name', 
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.lastName
                        }
                        return row.lastName   
                    },
                    
                },
                {title: 'Phone Number',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.phoneNumber
                        }  
                         return row.phoneNumber
                        
                    },
                    
                },
                {title: 'Email Address',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.emailAddress
                        } 
                        return row.emailAddress
                    },
                
                }
            ],
            buttons: [
				'colvis',
                'copyHtml5',
                'csvHtml5',
                'excelHtml5',
                'pdfHtml5',
                'print'
			]
        })
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
        if (nextProps.data.length !== this.props.data.length) {
            this.reloadTableData(nextProps.data, $(this.el));
        }
        return false;
    }
    render() {
        return (
                <table className="display table data-table-class table-striped table-bordered" style={{width:'100%',
                overflowX:'auto'}} ref={el => this.el = el}></table>
            
        );
    }
}

export default ReferralTable;