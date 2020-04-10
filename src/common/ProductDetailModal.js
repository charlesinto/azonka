import React, { Component} from 'react'
import OrderDetailDataTable  from "./OrderDetailDataTable";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import * as actions from "../actions";

class ProductDetailModal extends Component{
    state = {resetState: false, showConfirmDialog: false}
    closeModal = async () => {
        
       await this.setState({
           resetState: true
       })
       await this.setState({
            resetState: false
        })
       await this.props.itemSelectedOrderDetailModal([])
       console.log(this.props.selectedItems)
    }
    async componentWillUnmount(){
        await this.setState({
            resetState: false
        })
    }
    rejectProduct = e => {
        e.preventDefault();
        this.setState({
            showConfirmDialog: true
        })
        
    }
    onCancel = e => {
        this.setState({showConfirmDialog: false})
    }
    onConfirm = async (e) => {
        await this.setState({showConfirmDialog: false})
        this.props.initiateRegistration()
        this.props.rejectProducts(this.props.selectedId, this.props.selectedItems)

    }
    acceptOrder= async (e) => {
        e.preventDefault()
        // console.log(this.props.selectedId)
        this.props.initiateRegistration()
        await this.props.markOrderAsAccepted(this.props.selectedId)
        // window.location.reload()
    }
    render(){
        return (
        <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Product Order Details</h5>
                    <div className="mx-4 my-4">
                        <button type="button" style={{padding:'0.4rem 0.5rem'}}
                        onClick={this.acceptOrder}
                        className="btn btn-primary btn-sm">
                                <i class="fas fa-check"></i> Accept Order </button>
                    </div>
                    {
                        
                        this.props.selectedItems.length > 0 ? (
                            <div className="d-flex mx-2  bd-highlight">
                                
                                    <button onClick={this.rejectProduct} style={{padding:'0.4rem 0.5rem'}} type="button" className="btn btn-danger btn-sm">
                                        Reject ({this.props.selectedItems.length}) </button>
                            </div>
                        ) : (
                            <div className="d-flex mx-2 bd-highlight">
                                    {/* <button type="button" style={{padding:'0.4rem 0.5rem', marginRight: 8}} className="btn btn-primary btn-sm">
                                        Accept All</button> */}
                                    {/* <button onClick={this.rejectAllProduct} style={{padding:'0.4rem 0.5rem'}} type="button" className="btn btn-danger btn-sm">
                                        Reject All</button> */}
                                </div>
                        )
                    }
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span onClick={this.closeModal} aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <OrderDetailDataTable resetState={this.state.resetState} removeItemsFromTable={this.props.removeItemsFromTable} 
                        updateDt={this.props.updateDt} data={this.props.product} quantity={this.props.quantity} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={this.closeModal} type="button"  className="btn btn-secondary" data-dismiss="modal">Close</button>
                    {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                </div>
                </div>
            </div>
            {
                    this.state.showConfirmDialog ? <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Continue"
                    confirmBtnBsStyle="primary"
                    title="Are you sure?"
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    focusCancelBtn
                  >
                    You are about to reject the product(s), do you want to continue
                  </SweetAlert> : null
                }
        </div>
        )
    }
}

const mapStateToProps = state => {
    const {inventory: {selectedItems}} = state
    console.log('selected', selectedItems)
    return { selectedItems}
}

export default connect(mapStateToProps, actions)(ProductDetailModal);