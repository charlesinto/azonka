import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReviewModal from './ReviewModal'
import { v4 as uuidv4 } from 'uuid';


export class MoreOrder extends Component {
    state = {}
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
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        
        return (
            <>
                <div class="modal fade" id={`exampleModalCenter${this.props.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">ORDER: <span>#{this.props.id}</span></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="row item-header">

                                    <div className="header-item-name col-md-5 ">
                                        ITEM
                                            </div>
                                    <div className="header-item-price col-md-2  text-center">
                                        UNIT PRICE
                                            </div>
                                    <div className="header-item-quantity col-md-1  text-center">
                                        QUANTITY
                                            </div>

                                    <div className="header-item-subtotal col-md-2  text-center">
                                        SUBTOTAL
                                            </div>
                                    <div className="header-item-subtotal col-md-2  text-center">
                                        STATUS
                                            </div>
                                </div>
                                {
                                    this.props.orderData ?
                                        this.props.orderData.map(o => {
                                            let randomId = uuidv4()
                                            let { name, id, mainImageUrl, finalPrice } = o
                                            return (
                                                <>
                                                    <div className="row item-row py-3 my-4 bg-white" key={id}>

                                                        <div className=" col-md-5 border-right">
                                                            <div className="d-flex item-name-wrapper">
                                                                <img className="item-img"
                                                                    src={mainImageUrl}
                                                                    alt=".../"
                                                                />
                                                                <p className="pl-4 item-name text-dark"> {name}</p>
                                                            </div>
                                                            <div className="d-flex item-actions hide-mobile justify-content-between">
                                                                <div className="wishlist-wrap p-0">
                                                                    <span className="pointer" id={id} onClick={this.handleMoveWishList}> <i className="fas fa-shopping-bag px-2"></i> Move to wishlist</span>
                                                                </div>
                                                                <div>
                                                                    <Link to="#" className="btn-move action-order-fonts text-danger"

                                                                    >
                                                                        {/* <div className="tooltip" style={{display:'inline-block'}}>
                                            <span title="Raise a dispute"><i className=" text-primary far fa-flag"></i></span>
                                            <span className="tooltiptext" > Raise a dispute </span>
                                        </div> */}                       <span className="text-yellow font-15"
                                                                            data-toggle="modal" data-target={`#moreReview${randomId}`}
                                                                            data-backdrop="static" data-keyboard="false"
                                                                            onClick={(e) => {
                                                                                //  this.handleItemDelete(id) 
                                                                                // alert("hello")
                                                                            }} >
                                                                            <i className="fas fa-star px-2 text-yellow" style={{ color: "#e0c325" }}></i>
                                                                        </span>
                                                                        <span className="text-danger" data-toggle="modal"
                                                                            data-target="#raiseDispute"
                                                                            title="Raise a dispute"><i className=" far fa-flag"></i></span>
                                                                        {/* <i className="fas fa-pencil-alt px-2 text-primary"></i> </span> */}
                                                                        <span className="text-danger" onClick={(e) => { this.handleItemDelete(id) }}> <i className="fas fa-trash px-2 text-danger"></i></span>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex justify-content-between mobile-status-price">
                                                                <span class="text-success">{this.props.status}</span>
                                                                <p className="mobile-price badge badge-pill badge-primary float-right"> ₦ {this.numberWithCommas(finalPrice)}</p>
                                                            </div>
                                                        </div>
                                                        <div className="item-price col-md-2 border-right text-center hide-mobile">
                                                            ₦ {this.numberWithCommas(finalPrice)}
                                                        </div>
                                                        <div className="item-qty col-md-1 border-right text-center hide-mobile">
                                                            <input type="number" class="form-control p-0 text-center"
                                                                // value={this.props.qty}
                                                                value={this.props.data.quantity[id]}
                                                                disabled={true}
                                                                id="" placeholder="Qty" />
                                                        </div>
                                                        <div className="item-subtotal col-md-2 border-right text-center hide-mobile">
                                                            ₦ {this.numberWithCommas(finalPrice * this.props.data.quantity[id])}
                                                        </div>
                                                        <div className="item-subtotal col-md-2 border-right text-center text-success hide-mobile">
                                                            {this.props.status.toUpperCase()}
                                                        </div>

                                                        <div className="mobile-item-details-wrapper">
                                                            <div className="container-fluid border-top py-3">
                                                                <div className="d-flex">
                                                                    <div className="qty-div">
                                                                        <div class="input-group-prepend">
                                                                            <span class="input-group-text qty-sub">-</span>
                                                                        </div>
                                                                        <input type="number" class="form-control p-0 text-center"
                                                                            value={this.props.data.quantity[id]}
                                                                            aria-label="Amount (to the nearest dollar)" />
                                                                        <div class="input-group-append">
                                                                            <span class="input-group-text qty-add">+</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex calc-div">
                                                                        <div> ₦ {this.numberWithCommas(finalPrice)}</div>
                                                                        <span className="px-3">X</span>
                                                                        <div>{this.props.data.quantity[id]}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex my-5 justify-content-end">
                                                                    <span className='px-3'>Total = </span>  <span className="mobile-item-subtotal text-primary"> ₦ {finalPrice * this.props.qty}</span>
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
                                                    <ReviewModal name={`moreReview${randomId}`} productId={o.id} />
                                                </>
                                            )
                                        }) : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
                
                

            </>
        )
    }
}

export default MoreOrder
