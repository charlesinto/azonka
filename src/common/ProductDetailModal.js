import React, { Component} from 'react'
import OrderDetailDataTable  from "./OrderDetailDataTable";

class ProductDetailModal extends Component{

    render(){
        return (
        <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Product Detail</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <OrderDetailDataTable removeItemsFromTable={this.props.removeItemsFromTable} 
                        updateDt={this.props.updateDt} data={this.props.product} quantity={this.props.quantity} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                </div>
                </div>
            </div>
        </div>
        )
    }
}

export default ProductDetailModal;