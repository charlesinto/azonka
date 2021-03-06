import React, { Component } from 'react';
const $ = require('jquery')

$.DataTable = require('datatables.net')
require( 'datatables.net-responsive' )

class ItemListDataTable extends Component {
    componentDidMount(){
        this.$el = $(this.el)
        this.$el.DataTable({
            responsive: true,
            data:this.props.data,// name, brandname, mainImageUrl,model, sellingPrice, finalPrice
            autoWidth: true,
            
            columns: [
                {title:'Item Image',
                 render: (data, type, row, meta ) => {
                    if ( type === 'display' ) {
                        return `<div style="display:flex;"><div class="item-dt-img" style="background-image:url(${row.mainImageUrl})"></div>
                            </div>`
                    }
                    return `<div style="display:flex;"><div class="item-dt-img" style="background-image:url(${row.mainImageUrl})"></div>
                                </div>`
                 },
                 responsivePriority: 1
                },
                {
                    title:"Item Name",
                    render: (data, type, row, meta) => {
                        return  `<span class="item-uploadedname dt-item">${row.name}</span>`
                    },
                    responsivePriority: 3
                }
                ,
                {title: 'Brand Name', 
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return `<span class="dt-item">${row.brandName}</span>`
                        }
                        return `<span class="dt-item">${row.brandName}</span>`   
                    },
                    
                },
                {title: 'Model',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return `<span class="dt-item">${row.model}</span>`
                        }  
                         return `<span class="dt-item">${row.model}</span>`
                        
                    },
                    
                },
                {title: 'Selling Price',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return `<span class="dt-item">&#8358; ${this.numberWithCommas(row.sellingPrice)}</span>`
                        }  
                         return `<span class="dt-item">&#8358; ${this.numberWithCommas(row.sellingPrice)}</span>`
                        
                    },
                    
                },
                {title: 'Discounted Price',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return `<span class="dt-item">&#8358; ${this.numberWithCommas(row.finalPrice)}</span>`
                        }  
                         return `<span class="dt-item">&#8358; ${this.numberWithCommas(row.finalPrice)}</span>`
                        
                    },
                    
                },
                {
                    title:' Action',
                    render: (data, type, row, meta) => {
                        return `<button type="button" data-id=${row.id} class="btn btn-outline-primary action-btn btn-xs dt-edit" style="margin-right:16px;">
                        <i class="fas fa-pen"></i></button>
                        <button type="button" data-id=${row.id} class="btn btn-outline-danger action-btn btn-xs dt-delete"><i class="fas fa-trash"></i></button>`
                    },
                    responsivePriority: 2
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
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        return (
                <table className="display table data-table-class table-striped table-bordered" style={{width:'100%',
                overflowX:'auto'}} ref={el => this.el = el}></table>
            
        );
    }
}

export default ItemListDataTable;