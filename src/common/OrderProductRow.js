import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../assets/Order.css'

class OrderProductRow extends Component {
    state = { qty: 0, sum: 0 }
    componentDidMount() {
        this.setState({
            sum: this.props.finalPrice * (this.props.quantity || 1), qty: this.props.quantity ?
                this.props.quantity : 1
        })

    }
    static getDerivedStateFromProps(nextProps, state) {
        if (state.qty !== nextProps.quantity) {

            return {
                ...state, sum: nextProps.finalPrice * (nextProps.quantity || 1), qty: nextProps.quantity ?
                    nextProps.quantity : 1
            }
        }
        return { ...state }
    }
    handleChange = (e, finalPrice, id) => {
        const newQuantity = e.target.value < 0 ? -1 * e.target.value : e.target.value === 0
            ? 1 : e.target.value;
        this.props.calSums(finalPrice * this.state.qty, id, newQuantity)
        this.setState({ qty: e.target.value < 0 ? -1 * e.target.value : e.target.value },
            () => this.props.calSums(finalPrice * this.state.qty, id, this.state.qty))

    }
    handleIncreaseQty = (e, finalPrice, id) => {
        let { qty } = this.state;
        this.props.calSums(finalPrice * (qty + 1), id, qty + 1)

    }
    handleDecreaseQty = (e, finalPrice, id) => {
        let { qty } = this.state;
        let newQuantity = qty > 1 ? qty - 1 : 1;
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
                <tr className="tr-head" style={{ display: "contents", margin: "30px 0" }} key={id}>
                    <tr className="product-row shadow bg-white border-none">
                        <td >
                            <Link to="/product" className="action-order-fonts">{this.props.data.id}</Link>
                        </td>
                        <td className="product-col" colSpan={4}>
                            <figure className="product-image-container order-product-image">
                                <Link to="/products" className="product-image ">
                                    <img src={mainImageUrl} alt="product" />
                                </Link>
                            </figure>
                            <h2 className="product-title" >
                                <Link to="/product" className="action-order-fonts">{name}</Link>
                            </h2>
                        </td>
                        <td className="action-order-fonts text-primary">&#8358; {finalPrice}</td>
                        <td>
                            <div className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
                                <input disabled className="vertical-quantity form-control" value={this.state.qty} type="number" onChange={(e) => this.handleChange(e, finalPrice, id)} />
                            </div>

                        </td>
                        <td>
                            <span className="my-order-status text-success">
                                {this.props.data.status}
                            </span>
                        </td>
                        {/* <td></td> */}
                        <td className="action-order-fonts text-primary">&#8358; {this.calculateSum(finalPrice, this.state.qty, id)}</td>
                    </tr>
                    <tr className="product-action-row  bg-white border-none">
                        <td colspan="7" className="clearfix">
                            <div className="action-order mx-auto">
                                <div className="">
                                    <Link to="#" className="btn-move action-order-fonts">Move to Wishlist</Link>
                                </div>

                                <div className="">
                                    <span onClick={() => this.handleItemEdit(id)} style={{ cursor: 'pointer' }} title="Edit product" className="btn-edit action-order-fonts">
                                        <span className="sr-only">Edit</span><i className="icon-pencil"></i>
                                    </span>
                                    <span onClick={() => this.handleItemDelete(id)} style={{ cursor: 'pointer' }} title="Remove product" className="btn-remove action-order-fonts">
                                        <span className="sr-only">Remove</span><i className="icon-trash"></i>
                                    </span>
                                </div>
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