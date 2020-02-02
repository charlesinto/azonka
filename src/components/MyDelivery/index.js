import React, { Component} from 'react';
import StoreDashboard from "../HOC/StoreDashboard";
import { connect } from "react-redux";
import * as actions from "../../actions";

import DeliveryDataTable  from "../../common/DeliveryDataTable";
import ProductDetailModal from '../../common/ProductDetailModal';

class MyDelivery extends Component{
    INITIAL_STATE = {product: [], quantity: 0, updateDt: false}
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
                const index = this.props.delivery.findIndex(element => element.id === parseInt(selectedId));
                this.props.initiateRegistration()
                return this.setState({
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
            default:
                return;
        }
    }
    removeItemsFromTable = () => {
        this.setState({...this.INITIAL_STATE, updateDt: true})
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
                <ProductDetailModal removeItemsFromTable={this.removeItemsFromTable} updateDt={this.state.updateDt} quantity={this.state.quantity} product={this.state.product} />
        </StoreDashboard>)
    }
}
const mapStateToProps = state => {
    const {inventory: {delivery}} = state;
    return {delivery}
}
export default connect(mapStateToProps, actions)(MyDelivery);