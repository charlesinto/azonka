import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ProductRow extends Component {
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
    handleMoveWishList = (id) => {
        this.props.handleMoveWishList(id)
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
            <>
                <div className="row item-row py-3 my-4 bg-white" key={id}>
                    <div className=" col-md-6 border-right">
                        <div className="d-flex item-name-wrapper">
                            <img className="item-img rounded-circle"
                                src={mainImageUrl}
                                alt=".../"
                            />
                            <p className="pl-4 item-name text-dark"> {name}</p>
                        </div>
                        <div className="d-flex item-actions hide-mobile">
                            <div className="wishlist-wrap">
                                <span className="pointer" onClick={(e) => { this.handleMoveWishList(id) }}> <i className="fas fa-shopping-bag px-2"></i> Move to wishlist</span>
                            </div>
                            <div>
                                <Link to="#" className="btn-move action-order-fonts text-danger">
                                    <span className="text-danger"  > <i className="fas fa-pencil-alt px-2 text-primary"></i> </span>
                                    <span className="text-danger" onClick={(e) => { this.handleItemDelete(id) }}> <i className="fas fa-trash px-2 text-danger"></i></span>
                                </Link>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mobile-status-price my-4">
                            <span class="text-success">Created</span>
                            <p className="mobile-price badge badge-pill badge-primary float-right"> ₦ {finalPrice}</p>
                        </div>
                    </div>
                    <div className="item-price col-md-2 border-right text-center hide-mobile">
                        ₦ {finalPrice}
                    </div>
                    <div className="item-qty col-md-2 border-right text-center hide-mobile">
                        <div className="qty-div d-flex">
                            <div class="input-group-prepend" onClick={(e) => this.handleDecreaseQty(e, finalPrice, id)}
                                style={{ height: "40px", cursor: "pointer" }}
                            >
                                <span class="input-group-text qty-sub">-</span>
                            </div>
                            <input type="number" class="form-control p-0 text-center"
                                value={this.state.qty}
                                aria-label="Amount (to the nearest dollar)" />
                            <div class="input-group-append" onClick={(e) => this.handleIncreaseQty(e, finalPrice, id)}
                                style={{ height: "40px", cursor: "pointer" }}
                            >
                                <span class="input-group-text qty-add">+</span>
                            </div>
                        </div>
                    </div>
                    <div className="item-subtotal col-md-2 border-right text-center hide-mobile">
                        ₦ {finalPrice * this.state.qty}
                    </div>

                    <div className="mobile-item-details-wrapper">
                        <div className="container-fluid border-top py-5">
                            <div className="d-flex">
                                <div className="qty-div">
                                    <div class="input-group-prepend" onClick={(e) => this.handleDecreaseQty(e, finalPrice, id)}>
                                        <span class="input-group-text qty-sub">-</span>
                                    </div>
                                    <input type="number" class="form-control p-0 text-center"
                                        value={this.state.qty}
                                        aria-label="Amount (to the nearest dollar)" />
                                    <div class="input-group-append" onClick={(e) => this.handleIncreaseQty(e, finalPrice, id)}>
                                        <span class="input-group-text qty-add">+</span>
                                    </div>
                                </div>
                                <div className="d-flex calc-div">
                                    <div>   ₦ {finalPrice}</div>
                                    <span className="px-3">X</span>
                                    <div> {this.state.qty}</div>
                                </div>
                            </div>
                            <div className="d-flex my-5 justify-content-end">
                                <span className='px-3'>Total = </span>  <span className="mobile-item-subtotal text-primary"> ₦ {finalPrice * this.state.qty}</span>
                            </div>
                            <div className="d-flex item-actions justify-content-between">
                                <div className="wishlist-mobile-wrap" key={id}>
                                    <span> <i className="fas fa-shopping-bag px-2" onClick={(e) => { this.handleMoveWishList(id) }}></i> Move to wishlist</span>
                                </div>
                                <div>
                                    <span className="text-danger"> <i className="fas fa-pencil-alt px-2 text-primary"></i> </span>
                                    <span className="text-danger" onClick={(e) => { this.handleItemDelete(id) }}> <i className="fas fa-trash px-2 text-danger"></i></span>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </>







        );
    }
}


export default ProductRow;