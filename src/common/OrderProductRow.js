import React, { Component } from 'react';
import PrdoctImage from "../css/images/products/product-4.jpg";
import { Link } from "react-router-dom";

class OrderProductRow extends Component {
    state = { qty: 0, sum: 0 }
    componentDidMount() {
        this.setState({ sum: this.props.finalPrice * (this.props.quantity || 1), qty: this.props.quantity ? 
                this.props.quantity : 1 })
        
    }
    static getDerivedStateFromProps(nextProps, state){
        if(state.qty !== nextProps.quantity){
            
            return {...state, sum: nextProps.finalPrice * (nextProps.quantity || 1), qty: nextProps.quantity ? 
                nextProps.quantity : 1 }
        }
        return {...state}
    }
    handleChange = (e, finalPrice, id) => {
        const newQuantity = e.target.value < 0 ? -1 * e.target.value : e.target.value === 0
             ? 1 : e.target.value ;
        this.props.calSums(finalPrice * this.state.qty, id, newQuantity )
        this.setState({ qty: e.target.value < 0 ? -1 * e.target.value : e.target.value },
            () => this.props.calSums(finalPrice * this.state.qty, id, this.state.qty))
        
    }
    handleIncreaseQty = (e, finalPrice, id) => {
        let { qty } = this.state;
        this.props.calSums(finalPrice * (qty + 1), id, qty + 1)
        
    }
    handleDecreaseQty = (e, finalPrice, id) => {
        let { qty } = this.state;
        let newQuantity =  qty > 1 ? qty - 1 : 1;
        this.props.calSums(finalPrice * newQuantity, id, newQuantity)
        
    }
    handleCheckout = () => {

    }
    handleItemDelete = id => {
        this.props.handleItemDelete(id)
    }
    handleItemEdit = id => {

    }
    calculateSum = (finalPrice, qty, id) => {
        
        return this.numberWithCommas(finalPrice * qty);
    }
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    renderRow = () => {
        
        return this.props.data.products.map((data) => {
            console.log('datata', data)
            const { id, name, finalPrice, mainImageUrl } = data
            return (
                <tr style={{display:"contents"}} key={id}>

                
                <tr  className="product-row" >
                    <td >
                         <Link to="/product">{this.props.data.id}</Link>
                    </td>
                    <td className="product-col" colSpan={4}>
                        <figure className="product-image-container">
                            <Link to="/products" className="product-image">
                                <img src={mainImageUrl} alt="product" />
                            </Link>
                        </figure>
                        <h2 className="product-title" >
                            <Link to="/product">{name}</Link>
                        </h2>
                    </td>
                    <td>&#8358; {finalPrice}</td>
                    <td>
                        <div className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
                            <input disabled className="vertical-quantity form-control" value={this.state.qty} type="number" onChange={(e) => this.handleChange(e, finalPrice, id)} />
                            
                        </div>

                    </td>
                    <td><span className="my-order-status">{this.props.data.status}</span></td>
                    <td></td>
                    <td>&#8358; {this.calculateSum(finalPrice, this.state.qty, id)}</td>
                </tr>
                 <tr className="product-action-row">
                <td colspan="7" className="clearfix">
                    <div className="float-left">
                        <Link to="#" className="btn-move">Move to Wishlist</Link>
                    </div>

                    <div className="float-right">
                        <span onClick={() => this.handleItemEdit(id)} style={{cursor:'pointer'}} title="Edit product" className="btn-edit"><span className="sr-only">Edit</span><i className="icon-pencil"></i></span>
                        <span onClick={() => this.handleItemDelete(id)} style={{cursor:'pointer'}} title="Remove product" className="btn-remove"><span className="sr-only">Remove</span></span>
                    </div>
                </td>
            </tr>
            </tr>
            )
        })
    }
    render() {
        console.log('here o', this.props.data) 
        return this.renderRow()
    }
}


export default OrderProductRow;