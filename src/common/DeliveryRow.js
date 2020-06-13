import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import '../assets/Order.css'
import DeliveryMore from './DeliveryMoreOrder';
import { Dropdown } from "react-bootstrap";
import SweetAlert from "react-bootstrap-sweetalert";

class DeiveryRow extends Component {
    
    constructor(props){
        super(props);
        this.state = { qty: 0, sum: 0,selectedOrder: null,order: null, showConfirmDialog: false,deliveryCode: '', products: [], deliveryId: null }
    }
    componentDidMount() {
        // this.setState({
        //     sum: this.props.finalPrice * (this.props.quantity || 1), qty: this.props.quantity ?
        //         this.props.quantity : 1,selectedOrder: null
        // })

    }
    static getDerivedStateFromProps(nextProps, state) {
        console.log('called here no')
        if (state.qty !== nextProps.quantity) {
            return {
                ...state, sum: nextProps.finalPrice * (nextProps.quantity || 1), qty: nextProps.quantity ?
                    nextProps.quantity : 1
            }
        }
        return null;
    }
    handleCheckout = () => {

    }
    handleItemChange = (e) => {
        
        const {target: {name, value}} = e;

        this.setState({
            [name]: value
        })
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
    // handleModal = (id) => {
    //     this.setState({ _products: this.props.data.products })
    // }
    acceptAllOrder = async (data) => {
        console.log(data.id)
        this.props.initiateRegistration()
        await this.props.markOrderAsAccepted(data.id)
        this.props.initiateRegistration()
        this.props.getSellerDeliveries(0, 1000)
    }
    selectCompleteOrder = async (data) => {
        console.log(data)
        window.orderMade = data
       await  this.setState({
            selectedOrder: {...data}
        },)
    }
    completeDelivery = async () => {
        console.log(window.orderMade)
        if(this.state.deliveryCode.trim() === '') return ;
        // console.log(this.order)
            this.props.initiateRegistration()
            await  this.props.completeOrder({orderId: window.orderMade.id, deliveryCode: this.state.deliveryCode})
            this.setState({
                deliveryCode: ''
            })
            this.props.initiateRegistration()
            this.props.getSellerDeliveries(0, 1000)
            window.orderMade = null
    }
    rejectAllOrder = (data) => {
        const deliveryId = data.id;
        // this.props.initiateRegistration()
        const products = [];
        console.log(data)
        data.products.forEach((item) => {
            products.push(item.id) 
        })
        // this.props.rejectProducts(deliveryId, products);
        this.setState({
            showConfirmDialog: true,
            products,
            deliveryId
        })
    }
    onConfirm = async () => {
        this.props.initiateRegistration()
        console.log(this.state.products)
        await this.props.rejectProducts(this.state.deliveryId, this.state.products);
        this.setState({
            products: [],
            deliveryId: null,
            showConfirmDialog: false
        })
        this.props.initiateRegistration()
        this.props.getSellerDeliveries(0, 1000)
    }
    onCancel = () => {
        this.setState({
            showConfirmDialog: false
        })
    }
    render() {
        if (!this.props.data.products[0]) return null;
        const {  id, } = this.props.data.products[0];
        return (
            <>
                <div className="row item-row py-3 my-4 mx-4 bg-white effect5" key={id}>
                    <div className="item-orderId col-md-1 mobile-hide">
                        {this.props.data.order}
                    </div>
                    <div class="mobile-order-no my-3 container-fluid">
                        <div className="row d-flex justify-content-between w-100">
                            <div className="mx-3">
                                <span>Order No:</span>
                                <span className="">{this.props.data.order}</span>
                            </div>
                            <div>
                                <span
                                    className="pointer" data-toggle="modal"
                                    data-target={`#exampleModalCenter${this.props.data.id}`}
                                >View All</span>
                            </div>
                        </div>
                    </div>
                    <div className=" col-md-4 border-right">
                        <div className="d-flex item-name-wrapper">
                            
                        </div>
                        <div className="d-flex flex-column justify-content-center py-3  item-actions hide-mobile">
                            
                            <div className="d-flex  wishlist-wrap no-padding-side">
                                {
                                    this.props.data.products && this.props.data.products.length >= 1 ?
                                        (
                                            <span className="pointer" data-toggle="modal"
                                                data-target={`#exampleModalCenter${this.props.data.id}`}
                                                id={this.props.data.id}
                                                style={{fontSize: '12px !important'}}
                                            >
                                                <i className="fas fa-shopping-bag px-2"></i>
                                                View All <b>{this.props.data.products && this.props.data.products.length}</b>  Product
                                             </span>
                                        ) : null
                                }

                            </div>
                            <div className=" d-flex py-2">
                                <span style={{fontSize: '12px'}}>
                                    {new Date(this.props.data.createdAt).toLocaleString()}
                                </span>
                            </div>
                            {/* <div className="wishlist-wrap">
                                <span className="pointer" id={id} onClick={this.handleMoveWishList}> <i className="fas fa-shopping-bag px-2"></i> Move to wishlist</span>
                            </div> */}
                            {/* <div>
                                <Link to="#" className="btn-move action-order-fonts text-danger"

                                >
                                    
                                    <span className="text-danger" data-toggle="modal"
                                        data-target="#raiseDispute"
                                        title="Raise a dispute"><i className=" far fa-flag"></i></span>
                                    <span className="text-danger" onClick={(e) => { this.handleItemDelete(id) }}> <i className="fas fa-trash px-2 text-danger"></i></span>
                                </Link>
                            </div> */}
                        </div>
                        <div className="d-flex justify-content-between mobile-status-price">
                            <span class="badge badge-pill badge-primary float-right">{this.props.data.status}</span>
                           {/* <p className="mobile-price badge badge-pill badge-primary float-right"> ₦ {this.numberWithCommas(finalPrice)}</p> */}
                        </div>
                    </div>
                    <div className="text-success item-price col-md-2 border-right text-center hide-mobile">
                        {/* ₦ {this.numberWithCommas(finalPrice)} */}
                        {this.props.data.status.toUpperCase()}
                    </div>
                    <div className="item-qty col-md-5 border-right text-center hide-mobile">
                        {/* <input type="number" class="form-control p-0 text-center"
                            value={this.state.qty}
                            disabled={true}
                            id="" placeholder="Qty" /> */}
                            <div className="d-flex justify-content-center">
                            <button disabled={this.props.data.status !== 'created'} onClick={() => this.acceptAllOrder(this.props.data)} className="btn-cm mx-2 btn-primary" type="submit">Accept Order</button>
                            <button disabled={this.props.data.status !== 'created'} onClick={() => this.rejectAllOrder(this.props.data)} className="btn-cm mx-2 btn-danger" type="submit">Reject All</button>
                            <button  onClick={() => this.selectCompleteOrder(this.props.data)} className="btn-cm mx-2 btn-success" data-toggle="modal" data-target="#exampleModalCenterDelivery">Complete Order</button>
                        </div>
                        
                    </div>
                    {/* <div className="item-subtotal col-md-2 border-right text-center hide-mobile">
                    </div> */}
                    {/* <div className="item-subtotal col-md-2 border-right text-center text-success hide-mobile">
                        
                    </div> */}

                    <div className="mobile-item-details-wrapper">
                        <div className="container-fluid py-3">
                            <div className="d-flex">
                                <span>{new Date(this.props.data.createdAt).toLocaleString()}</span>
                            </div>
                            <div className="d-flex">
                                <span>Hi</span>
                                <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    Action
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.acceptAllOrder(this.props.data)}>Accept Order</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.rejectAllOrder(this.props.data)}>Reject Order</Dropdown.Item>
                                    <Dropdown.Item  data-toggle="modal" data-target="#exampleModalCenterDelivery" onClick={() => this.selectCompleteOrder(this.props.data)}>Complete Order</Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                                {/* <span className='px-3'>Total = </span>  <span className="mobile-item-subtotal text-primary"> ₦ {finalPrice * this.state.qty}</span> */}
                            </div>
                            <div className="d-flex item-actions justify-content-between">
                                {/* <div className="wishlist-mobile-wrap">
                                    <span> <i className="fas fa-shopping-bag px-2"></i> Move to wishlist</span>
                                </div> */}
                                
                            </div>
                        </div>
                    </div>
                </div>


                <DeliveryMore
                    qty={this.state.qty}
                    order={this.props.data.order}
                    id={this.props.data.id}
                    data={this.props.data}
                    orderData={this.props.data.products}
                    status={this.props.data.status.toUpperCase()}
                />
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
                <div class="modal fade" id="exampleModalCenterDelivery" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-sm modal-dialog-centered" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Complete Delivery</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <label>Delivery Code</label>
                            <input name="deliveryCode" className="form-control" value={this.state.deliveryCode} onChange={this.handleItemChange} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn-cm btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" data-dismiss="modal" onClick={() => this.completeDelivery()} className="btn-cm btn-primary">Complete</button>
                        </div>
                        </div>
                    </div>
                    </div>
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



export default connect(mapStateToProps, actions)(DeiveryRow)