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

        return this.props.data.products && this.props.data.products.map((data) => {
            console.log('datata', data)
            const { id, name, finalPrice, mainImageUrl } = data
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
                            <div className="d-flex item-actions hide-mobile">
                                <div className="wishlist-wrap">
                                    <Link to="#" className="btn-move action-order-fonts">
                                        <span> <i className="fas fa-shopping-bag px-2"></i> Move to wishlist</span>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="#" className="btn-move action-order-fonts text-danger">
                                        <span className="text-danger"> <i className="fas fa-shopping-bag px-2 text-danger"></i> Remove</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mobile-status-price">
                                <span class="text-success">Created</span>
                                <p className="mobile-price badge badge-pill badge-primary float-right"> ₦ {finalPrice}</p>
                            </div>
                        </div>
                        <div className="item-price col-md-2 border-right text-center hide-mobile">
                            ₦ {finalPrice}
                        </div>
                        <div className="item-qty col-md-1 border-right text-center hide-mobile">
                            <input type="number" class="form-control"
                                value={this.state.qty}
                                disabled={true}
                                id="" placeholder="Qty" />
                        </div>
                        <div className="item-subtotal col-md-2 border-right text-center hide-mobile">
                            ₦ {finalPrice}
                        </div>
                        <div className="item-subtotal col-md-2 border-right text-center text-success hide-mobile">
                            Created
                                            </div>

                        <div className="mobile-item-details-wrapper">
                            <div className="container-fluid border-top py-3">
                                <div className="d-flex">
                                    <div className="qty-div">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text qty-sub">-</span>
                                        </div>
                                        <input type="number" class="form-control"
                                            value={this.state.qty}
                                            aria-label="Amount (to the nearest dollar)" />
                                        <div class="input-group-append">
                                            <span class="input-group-text qty-add">+</span>
                                        </div>
                                    </div>
                                    <div className="d-flex calc-div">
                                        <div> ₦ 235,000</div>
                                        <span className="px-3">X</span>
                                        <div> 1</div>
                                    </div>
                                </div>
                                <div className="d-flex my-5 justify-content-end">
                                    <span className='px-3'>Total = </span>  <span className="mobile-item-subtotal text-primary">₦ {finalPrice}</span>
                                </div>
                                <div className="d-flex item-actions justify-content-between">
                                    <div className="wishlist-mobile-wrap">
                                        <span> <i className="fas fa-shopping-bag px-2"></i> Move to wishlist</span>
                                    </div>
                                    <div>
                                        <span> <i className="fas fa-shopping-bag px-2"></i> Remove</span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </>

                // <tr className="tr-head" style={{ display: "contents", margin: "30px 0" }} key={id}>
                //     <tr className="product-row shadow bg-white border-none">
                //         <td >
                //             <Link to="/product" className="action-order-fonts">{this.props.data.id}</Link>
                //         </td>
                //         <td className="product-col" colSpan={4}>
                //             <figure className="product-image-container order-product-image">
                //                 <Link to="/products" className="product-image ">
                //                     <img src={mainImageUrl} alt="product" />
                //                 </Link>
                //             </figure>
                //             <h2 className="product-title" >
                //                 <Link to="/product" className="action-order-fonts">{name}</Link>
                //             </h2>
                //         </td>
                //         <td className="action-order-fonts text-primary">&#8358; {finalPrice}</td>
                //         <td>
                //             <div className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
                //                 <input disabled className="vertical-quantity form-control" value={this.state.qty} type="number" onChange={(e) => this.handleChange(e, finalPrice, id)} />
                //             </div>

                //         </td>
                //         <td>
                //             <span className="my-order-status text-success">
                //                 {this.props.data.status}
                //             </span>
                //         </td>
                //         {/* <td></td> */}
                //         <td className="action-order-fonts text-primary">&#8358; {this.calculateSum(finalPrice, this.state.qty, id)}</td>
                //     </tr>
                //     <tr className="product-action-row  bg-white border-none">
                //         <td colspan="7" className="clearfix">
                //             <div className="action-order mx-auto">
                //                 <div className="">
                //                     <Link to="#" className="btn-move action-order-fonts">Move to Wishlist</Link>
                //                 </div>

                //                 <div className="">
                //                     <span onClick={() => this.handleItemEdit(id)} style={{ cursor: 'pointer' }} title="Edit product" className="btn-edit action-order-fonts">
                //                         <span className="sr-only">Edit</span><i className="icon-pencil"></i>
                //                     </span>
                //                     <span onClick={() => this.handleItemDelete(id)} style={{ cursor: 'pointer' }} title="Remove product" className="btn-remove action-order-fonts">
                //                         <span className="sr-only">Remove</span><i className="icon-trash"></i>
                //                     </span>
                //                 </div>
                //             </div>

                //         </td>
                //     </tr>

                // </tr>


            )
        })
    }
    render() {
        console.log('here o', this.props.data)
        return this.renderRow()
    }
}


export default OrderProductRow;