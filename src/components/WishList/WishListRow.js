import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import '../../assets/Order.css'

class WishList extends Component {
    state = { qty: 0, sum: 0 }
    componentDidMount() {
        this.setState({
            sum: this.props.finalPrice * (this.props.quantity || 1), qty: this.props.quantity ?
                this.props.quantity : 1
        })

    }

    handleItemDelete = async id => {
        this.props.handleItemDelete(id)
    }


    calculateSum = (finalPrice, qty, id) => {
        return this.numberWithCommas(finalPrice * qty);
    }
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    handleAddCart = async (e, id) => {
        let token = (localStorage.getItem("x-access-token"));
        // return console.log(token)
        if (token) {
            // return console.log(token)
            let postObj = { productId: `${id}`, quantity: "1" };
            this.props.initiateRegistration()
            this.props.addToCart(postObj)

            //let { data } = this.props.cartItems
            // console.log("needs", data)
            // let {} 
            //  this.handleSetOnlineData()
            //this.props.("An error occured")
            // if (data.success) {
            //     this.setState({ cartData: data.cart.products })

            // } else {

            // }

        } else {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            this.setState({ cartData })
            let { products } = this.state
            let obj = products.filter(data => id === data.id)[0]

            //check if item is in cart

            if (cartData) { //item exists
                // return console.log("data", cartData)
                let isAdded = cartData.some(data => data.id === id); //check if clicked item exist in cart
                if (isAdded) {
                    return this.props.successAlert("Item has already been added")
                } else {
                    localStorage.setItem("cart", JSON.stringify([...cartData, obj]))
                    this.handleSetLocalData()
                    // return swal.fire("Response", "Item added to cart", "success")
                    return this.props.showSuccessALert("Item has already been added")
                }

            } else {
                //if cart is empty
                localStorage.setItem("cart", JSON.stringify([obj]))
                this.handleSetLocalData()

                // return swal.fire("Response", "Item added to cart", "success")
                return this.props.showSuccessALert("Item has already been added")
            }
        }

    }
    handleSetOnlineData = async () => {
        await this.props.fetchCart()
        let { products } = this.props.cartItems
        this.setState({ cartData: products })
    }
    handleSetLocalData = async () => {
        await this.props.fetchLocalCart()
        let { cartData } = this.props;
        this.setState({ cartData }, () => this.props.successAlert('Item added to cart successfully'))
    }
    renderRow = () => {
        const { id, name, finalPrice, mainImageUrl } = this.props.data
        return (
            <>

                <div className="row item-row py-3 my-4 bg-white" key={id}>
                    <div className=" col-md-4 border-right">
                        <div className="d-flex item-name-wrapper">
                            <img className="item-img"
                                src={mainImageUrl}
                                alt=".../"
                            />
                            <p className="pl-4 item-name text-dark"> {name}</p>
                        </div>
                        <div className="d-flex item-actions hide-mobile">
                            <div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mobile-status-price">
                            {/* <span className="text-success">Created</span> */}
                            <p className="mobile-price badge badge-pill badge-primary float-right"> ₦ {this.numberWithCommas(finalPrice)}</p>
                        </div>
                    </div>
                    <div className="item-price col-md-2 border-right text-center hide-mobile">
                        ₦ {this.numberWithCommas(finalPrice)}
                    </div>
                    <div className="item-qty col-md-2 border-right text-center hide-mobile">
                        <input type="number" className="form-control p-0 text-center"
                            value={this.state.qty}
                            disabled={true}
                            id="" placeholder="Qty" />
                    </div>
                    <div className="item-subtotal col-md-2 border-right text-center hide-mobile">
                        ₦ {this.numberWithCommas(finalPrice * this.state.qty)}
                    </div>
                    <div className="item-subtotal col-md-2 flex-column border-right text-center text-success hide-mobile "
                        style={{ justifyContent: "space-evenly" }}
                    >
                        <button type="button" className="btn btn-primary btn-buy-now" id={id} onClick={(e) => this.handleAddCart(e, id)} >
                            BUY NOW
                            </button>
                        <span className="text-danger font-13 pointer" onClick={(e) => { this.handleItemDelete(id) }}>
                            <i className="fas fa-trash px-2 text-danger"></i>
                            REMOVE
                            </span>

                    </div>

                    <div className="mobile-item-details-wrapper container">
                        <div className="container-fluid border-top py-3">
                            <div className="d-flex my-5 justify-content-end">
                                <span className='px-3'>Total = </span>  <span className="mobile-item-subtotal text-primary"> ₦ {this.numberWithCommas(finalPrice * this.state.qty)}</span>
                            </div>
                            <div className="d-flex item-actions justify-content-between">

                                <button type="button" className="btn btn-primary btn-buy-now">
                                    BUY NOW
                            </button>
                                <span className="text-danger font-17 pointer d-flex align-items-center" onClick={(e) => { this.handleItemDelete(id) }}>
                                    <i className="fas fa-trash px-2 text-danger"></i>
                                    REMOVE
                                    </span>
                                {/* <span className="text-danger"> <i className="fas fa-pencil-alt px-2 text-primary"></i> </span>
                                        <span className="text-danger" onClick={(e) => { this.handleItemDelete(id) }}> <i className="fas fa-trash px-2 text-danger"></i></span> */}
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )

    }
    render() {
        console.log('here o', this.props.data)
        return this.renderRow()
    }
}


const mapStateToProps = state => {

    let { categories, cartItems, cartData, orders, products } = state.inventory
    console.log('cartData', cartData, orders)
    return {
        categories, cartItems, cartData, orders, products
    }
}



export default connect(mapStateToProps, actions)(WishList)