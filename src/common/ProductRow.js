import React, { Component } from 'react';
import PrdoctImage from "../css/images/products/product-4.jpg";
import { Link } from "react-router-dom";

class ProductRow extends Component {
    state = { qty: 1, sum: 0 }
    componentDidMount() {
        this.setState({ sum: this.props.calSum, })
        console.log("aza", this.props)
    }

    handleChange = (e, finalPrice, id) => {
        let { qty } = this.state;
        this.setState({ qty: e.target.value < 0 ? -1 * e.target.value : e.target.value },
            () => this.props.calSums(finalPrice * this.state.qty, id))
        console.log(this.state)
    }
    handleIncreaseQty = (e, finalPrice, id) => {
        let { qty } = this.state;
        this.setState({ qty: qty + 1 }, 
            () => this.props.calSums(finalPrice * this.state.qty, id))
        console.log(this.state)
    }
    handleDecreaseQty = (e, finalPrice, id) => {
        let { qty } = this.state;
        
        this.setState({ qty: qty > 0 ? qty - 1 : 0 }, 
                () => this.props.calSums(finalPrice * this.state.qty, id))
        console.log(this.state)
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
    render() {
        let { id, name, finalPrice, mainImageUrl } = this.props
        return (
                <div style={{display:"contents"}} key={id}>

                
                <tr  className="product-row" >
                    <td className="product-col">
                        <figure className="product-image-container">
                            <Link to="/products" className="product-image">
                                <img src={mainImageUrl} alt="product" />
                            </Link>
                        </figure>
                        <h2 className="product-title">
                            <Link to="/product">{name}</Link>
                        </h2>
                    </td>
                    <td>&#8358; {finalPrice}</td>
                    <td>
                        <div className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
                            <input className="vertical-quantity form-control" value={this.state.qty} type="number" onChange={(e) => this.handleChange(e, finalPrice, id)} />
                            <span className="input-group-btn-vertical">
                                <button className="btn btn-outline bootstrap-touchspin-up icon-up-dir" type="button" onClick={(e) => this.handleIncreaseQty(e, finalPrice, id)}></button>
                                <button className="btn btn-outline bootstrap-touchspin-down icon-down-dir" type="button" onClick={(e) => this.handleDecreaseQty(e, finalPrice, id)}></button></span>
                        </div>

                    </td>
                    <td>&#8358; {this.calculateSum(finalPrice, this.state.qty, id)}</td>
                </tr>
                 <tr className="product-action-row">
                <td colspan="4" className="clearfix">
                    <div className="float-left">
                        <Link to="#" className="btn-move">Move to Wishlist</Link>
                    </div>

                    <div className="float-right">
                        <span onClick={() => this.handleItemEdit(id)} style={{cursor:'pointer'}} title="Edit product" className="btn-edit"><span className="sr-only">Edit</span><i className="icon-pencil"></i></span>
                        <span onClick={() => this.handleItemDelete(id)} style={{cursor:'pointer'}} title="Remove product" className="btn-remove"><span className="sr-only">Remove</span></span>
                    </div>
                </td>
            </tr>
            </div>
             
            
        );
    }
}


export default ProductRow;