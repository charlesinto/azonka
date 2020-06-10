import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import '../assets/Order.css'
import MoreOrder from './MoreOrder';

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
    handleMoveWishList = async ({ target }) => {
        let id = target.id
        let localData = JSON.parse(localStorage.getItem("wishList"))
        if (localStorage.getItem('x-access-token')) {
            let data = this.props.data && this.props.data.products
            let filt = data.filter(o => +o.id === +target.id)[0]

            if (!localData) {
                localData = [filt]
                localStorage.setItem("wishList", JSON.stringify(localData))
                return this.props.successAlert('Item added successfully')
            } else {
                let _id = localData.some(o => +o.id === +id)
                if (_id) {
                    return this.props.successAlert('Item has already been moved to WishList')
                } else {
                    localData.push(filt)
                    localStorage.setItem("wishList", JSON.stringify(localData))
                    return this.props.successAlert('Item added successfully')
                }
            }
        }
    }

    handleViewMore = ({ target }) => {
        // console.log("john", this.props.data.products)
        let _products = this.props.data.products
        this.setState({ _products })
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
        //console.log("john", this.props.data.products && this.props.data.products[0])
    }
    handleModal = (id) => {
        this.setState({ _products: this.props.data.products })
    }
    render() {
        if (!this.props.data.products[0]) return <div>no products</div>;
        const { name, id, mainImageUrl, finalPrice } = this.props.data.products[0];
        return (
            <>
                <div className="row item-row py-3 my-4 bg-white" key={id}>
                    <div className="item-orderId col-md-1 mobile-hide">
                        {this.props.data.id}
                    </div>
                    <div class="mobile-order-no my-3 container-fluid">
                        <span>Order No:</span>
                        <span className="">{this.props.data.id}</span>
                    </div>
                    <div className=" col-md-4 border-right">
                        <div className="d-flex item-name-wrapper">
                            <img className="item-img"
                                src={mainImageUrl}
                                alt=".../"
                            />
                            <p className="pl-4 item-name text-dark"> {name}</p>
                        </div>
                        <div className="d-flex item-actions hide-mobile" style={{ fontSize: "12px" }}>
                            <div className="wishlist-wrap">
                                {
                                    this.props.data.products && this.props.data.products.length > 1 ?
                                        (
                                            <span className="pointer" data-toggle="modal"
                                                data-target={`#exampleModalCenter${this.props.data.id}`}
                                                id={this.props.data.id}
                                                style={{ fontSize: "11px" }}
                                            >
                                                <i className="fas fa-shopping-bag px-2"></i>
                                                View <b>{this.props.data.products && this.props.data.products.length}</b>  More
                                             </span>
                                        ) : null
                                }

                            </div>
                            <div className="wishlist-wrap">
                                <span className="pointer" id={id} onClick={this.handleMoveWishList}> <i className="fas fa-shopping-bag px-2"></i> Move to wishlist</span>
                            </div>
                            <div>
                                <Link to="#" className="btn-move action-order-fonts text-danger"   >
                                    {/* <div className="tooltip" style={{display:'inline-block'}}>
                                            <span title="Raise a dispute"><i className=" text-primary far fa-flag"></i></span>
                                            <span className="tooltiptext" > Raise a dispute </span>
                                        </div> */}
                                    <span className="text-danger" data-toggle="modal"
                                        data-target="#raiseDispute"
                                        title="Raise a dispute"><i className=" far fa-flag"></i></span>
                                    {/* <i className="fas fa-pencil-alt px-2 text-primary"></i> </span> */}
                                    <span className="text-danger" onClick={(e) => { this.handleItemDelete(id) }}> <i className="fas fa-trash px-2 text-danger"></i></span>
                                </Link>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mobile-status-price">
                                    <span class="text-success">{this.props.data.status}</span>
                            <p className="mobile-price badge badge-pill badge-primary float-right"> ₦ {this.numberWithCommas(finalPrice)}</p>
                        </div>
                    </div>
                    <div className="item-price col-md-2 border-right text-center hide-mobile">
                        ₦ {this.numberWithCommas(finalPrice)}
                    </div>
                    <div className="item-qty col-md-1 border-right text-center hide-mobile">
                        <input type="number" class="form-control p-0 text-center"
                            value={this.state.qty}
                            disabled={true}
                            id="" placeholder="Qty" />
                    </div>
                    <div className="item-subtotal col-md-2 border-right text-center hide-mobile">
                        ₦ {this.numberWithCommas(finalPrice * this.state.qty)}
                    </div>
                    <div className="item-subtotal col-md-2 border-right text-center text-success hide-mobile">
                        {this.props.data.status.toUpperCase()}
                    </div>

                    <div className="mobile-item-details-wrapper">
                        <div className="container-fluid border-top py-3">
                            <div className="d-flex">
                                <div className="qty-div">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text qty-sub">-</span>
                                    </div>
                                    <input type="number" class="form-control p-0 text-center"
                                        value={this.state.qty}
                                        aria-label="Amount (to the nearest dollar)" />
                                    <div class="input-group-append">
                                        <span class="input-group-text qty-add">+</span>
                                    </div>
                                </div>
                                <div className="d-flex calc-div">
                                    <div> ₦ {this.numberWithCommas(finalPrice)}</div>
                                    <span className="px-3">X</span>
                                    <div> {this.state.qty}</div>
                                </div>
                            </div>
                            <div className="d-flex my-5 justify-content-end">
                                <span className='px-3'>Total = </span>  <span className="mobile-item-subtotal text-primary"> ₦ {finalPrice * this.state.qty}</span>
                            </div>
                            <div className="d-flex item-actions justify-content-between">
                                <div className="wishlist-mobile-wrap">
                                    <span> <i className="fas fa-shopping-bag px-2"></i> Move to wishlist</span>
                                </div>
                                <div>
                                    <span className="text-danger" data-toggle="modal" data-target="#raiseDispute" title="Raise a dispute"
                                        onClick={this.handleModal}
                                    > <i className="far fa-flag"></i> </span>
                                    {/* <i className="fas fa-pencil-alt px-2 text-primary"></i>  */}
                                    <span className="text-danger" onClick={(e) => { this.handleItemDelete(id) }}> <i className="fas fa-trash px-2 text-danger"></i></span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <MoreOrder
                    qty={this.state.qty}
                    id={this.props.data.id}
                    orderData={this.props.data.products}
                    status={this.props.data.status.toUpperCase()}
                />

            </>
        )

    }
}


const mapStateToProps = state => {

    let { categories, cartItems, cartData, orders } = state.inventory
    // console.log('cartData', cartData, orders)
    return {
        categories, cartItems, cartData, orders
    }
}



export default connect(mapStateToProps, actions)(OrderProductRow)