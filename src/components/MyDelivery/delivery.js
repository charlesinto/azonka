import React, { Component} from 'react';
import StoreDashboard from "../HOC/StoreDashboard";
import { connect } from "react-redux";
import * as actions from "../../actions";

import DeliveryDataTable  from "../../common/DeliveryDataTable";
import ProductDetailModal from '../../common/ProductDetailModal';

class MyDelivery extends Component{
    INITIAL_STATE = {product: [], quantity: 0, updateDt: false, selectedId: null, deliveryCode: ''}
    constructor(props){
        super(props);
        this.state = {...this.INITIAL_STATE}
    }
    componentDidMount(){
        this.props.initiateRegistration()
        this.props.setActiveLink('My Deliveries')
        this.props.getSellerDeliveries()
    }
    _handleRowClick = (selectedId, action) => {
        switch(action){
            case 'view':
                // console.log(this.props.delivery);
                console.log(selectedId)
                console.log('Delivery: ', this.props.delivery);
                const index = this.props.delivery.findIndex(element => element.id === parseInt(selectedId));
                // console.log('product', this.props.delivery[index]['products'], index)
                this.props.initiateRegistration()
                return this.setState({
                    selectedId,
                    product: this.props.delivery[index]['products'],
                    quantity: this.props.delivery[index]['quantity'],
                    updateDt: false,
                }, () => setTimeout(() => { 
                    this.setState({updateDt: true}, () => {
                        this.props.stopLoading()
                        setTimeout(() => {
                            this.setState({updateDt: false})
                        }, 1500)
                    })

                }, 2000))
            case 'approve': 
                this.setState({
                    selectedId
                })
            break;
            default:
                return;
        }
    }
    removeItemsFromTable = () => {
        this.setState({...this.INITIAL_STATE, updateDt: true})
    }
    handleInputChange = (event) => {
        const {target: {name, value}} = event;

        this.setState({
            [name]: value
        });
    }
    completeOrder = async () => {
        if(this.state.deliveryCode.trim() === ''){
           return  this.props.renderError('Please enter delivery code')
        }
        this.props.initiateRegistration()
        await this.props.completeOrder({orderId: this.state.selectedId, deliveryCode: this.state.deliveryCode})
        this.setState({
            selectedId: '', deliverCode: ''
        })
    }
    render(){
        return (<StoreDashboard>
                <h4 className="popup-title verify-email" style={{
                            fontWeight: 'bold',
                            fontFamily: 'Titillium web, sans-serif',
                            marginLeft: 20
                }}>My Deliveries</h4>
                <hr className="line-separator"/>
                <div className="container">
                    <DeliveryDataTable data={this.props.delivery}
                        handleRowClick={(id, action) => this._handleRowClick(id, action)}
                        
                    />
                </div>
                <ProductDetailModal selectedId={this.state.selectedId} removeItemsFromTable={this.removeItemsFromTable} updateDt={this.state.updateDt} quantity={this.state.quantity} product={this.state.product} />

                <div class="modal fade" id="deliverycode" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Complete Delivery</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <label>Delivery Code</label>
                                <input type="text"
                                 id="deliveryCode" value={this.state.deliverCode} onChange={this.handleInputChange} 
                                 name="deliveryCode" placeholder="Enter Delivery Code" />
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={this.completeOrder} type="button" class="btn btn-primary">Complete</button>
                        </div>
                        </div>
                    </div>
                    </div>
        </StoreDashboard>)
    }
}
const mapStateToProps = state => {
    const {inventory: {delivery}} = state;
    return {delivery}
}
export default connect(mapStateToProps, actions)(MyDelivery);