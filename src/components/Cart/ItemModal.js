import React, { Component } from 'react'
import * as actions from './../../actions';
import { connect } from 'react-redux';

class ItemModal extends Component {
    state = { modalData: {}, cartData: "", products:[] }
    componentDidMount() {

    }
    componentWillReceiveProps = props => {
        // console.log('props: ', props);zs
        // console.log(props.itemModalData)
        if (props.itemModalData.itemDetails !== this.props.itemModalData.itemDetails && props.itemModalData.itemDetails.length > 0) {
            this.setState({ modalData: props && props.itemModalData.itemDetails[0], products: props.itemModalData.products  });
            // console.log(props.itemModalData)
        }
    }
    handleSetLocalData = async () => {
        await this.props.fetchLocalCart()
        let { cartData } = this.props;
        this.setState({ cartData })
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
            // console.log(this.state.products)
            let obj = products ? products.filter(data => parseInt(id) === data.id)[0] : null;

            //check if item is in cart

            if (cartData) { //item exists
                // return console.log("data", cartData)
                let isAdded = cartData.some(data => data.id === id); //check if clicked item exist in cart
                if (isAdded) {
                    return this.props.successAlert("Item has already been added")
                } else {
                    if(obj){
                        localStorage.setItem("cart", JSON.stringify([...cartData, obj]))
                    }
                    
                    this.handleSetLocalData()
                    // return swal.fire("Response", "Item added to cart", "success")
                    return this.props.showSuccessALert("Item has been added to cart successfully")
                }

            } else {
                // console.log('called here o')
                //if cart is empty
                // console.log('data is', obj)
                localStorage.setItem("cart", JSON.stringify([obj]))
                this.handleSetLocalData()

                // return swal.fire("Response", "Item added to cart", "success")
                return this.props.showSuccessALert("Item has been added to cart successfully")
            }
        }
    }
    handleSetOnlineData = async () => {
        await this.props.fetchCart()
        let { products } = this.props.cartItems
        // console.log("firedata", cartData)
        this.setState({ cartData: products })
    }
    formatMoney(amount) {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    render() {
        // console.log(this.state)
        let { id, name,description, brandName, 
            mainImageUrl, sellingPrice, finalPrice, otherImageUrl1, otherImageUrl2,
            otherImageUrl3, otherImageUrl4 } = this.state.modalData
            // this.state.modalData
        return (
            <>
                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="product-single-container product-single-default product-quick-view container">
                                <div className="row">
                                    <div  className="col-lg-6 col-md-6 product-single-gallery">
                                        {/* //slide areaa */}
                                        <img src={mainImageUrl} classNameName="responsive-item-image" alt="main item" />
                                        <div style={{marginTop: '1.8rem'}} className="prod-thumbnail row owl-dots" id='carousel-custom-dots'>
                                            <div className="col-3 owl-dot">
                                               {
                                                  otherImageUrl1 && otherImageUrl1.trim() !== '' ?
                                                   <img src={otherImageUrl1} className="responsive-item-image" alt='additional images' />
                                                   : null
                                               } 
                                            </div>
                                            <div className="col-3 owl-dot">
                                            {
                                                  otherImageUrl2 && otherImageUrl2.trim() !== '' ?
                                                   <img src={otherImageUrl2} className="responsive-item-image" alt='additional images' />
                                                   : null
                                               }
                                            </div>
                                            <div className="col-3 owl-dot">
                                                {
                                                   otherImageUrl3 && otherImageUrl3.trim() !== '' ?
                                                   <img src={otherImageUrl3} className="responsive-item-image" alt='additional images' />
                                                   : null
                                               }
                                            </div>
                                            <div className="col-3 owl-dot">
                                                {
                                                  otherImageUrl4 && otherImageUrl4.trim() !== '' ?
                                                   <img src={otherImageUrl4} className="responsive-item-image" alt='additional images' />
                                                   : null
                                               }
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- End .col-lg-7 --> */}

                                    <div className="col-lg-6 col-md-6">
                                        <div className="product-single-details">
                                            <h1 className="product-title">{name} ({brandName})</h1>

                                            {/* <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{width:"60%"}}></span>
                                                </div>

                                                <span href="#" className="rating-link">( 6 Reviews )</span>
                                            </div> */}
                                            {/* <!-- End .product-container --> */}

                                            <div className="price-box">
                                                <span className="product-price">₦{this.formatMoney(finalPrice ? finalPrice : 0)}</span>
                                                <span className="old-price">₦{this.formatMoney(sellingPrice ? sellingPrice : 0)}</span>
                                            </div>
                                            {/* <!-- End .price-box --> */}

                                            <div className="product-desc">
                                                <p>{description}</p>
                                            </div>
                                            {/* <!-- End .product-desc --> */}

                                            <div className="product-filters-container">
                                                {/* <div className="product-single-filter">
                                                    <label>Colors:</label>
                                                    <ul className="config-swatch-list">
                                                        <li className="active">
                                                            <a href="#" style={{ backgroundColor: "#6085a5" }}  ></a>
                                                        </li>
                                                        <li>
                                                            <a href="#" style={{ backgroundColor: "#ab6e6e" }}  ></a>
                                                        </li>
                                                        <li>
                                                            <a href="#" style={{ backgroundColor: "#b19970" }}  ></a>
                                                        </li>
                                                        <li>
                                                            <a href="#" style={{ backgroundColor: "#11426b" }}  ></a>
                                                        </li>
                                                    </ul>
                                                </div> */}
                                                {/* <!-- End .product-single-filter --> */}
                                            </div>
                                            {/* <!-- End .product-filters-container --> */}

                                            <div className="product-action">
                                                {/* <div className="product-single-qty">
                                                    <input className="horizontal-quantity form-control" type="number" value={1} />
                                                </div> */}
                                                {/* <!-- End .product-single-qty --> */}

                                                <span className="paction add-cart" id={id} onClick={(e) => this.handleAddCart(e, id)}>
                                                    Add to Cart
                                                </span>
                                                {/* <span  className="paction add-wishlist" title="Add to Wishlist">
                                                    <span>Add to Wishlist</span>
                                                </span> */}
                                                {/* <span href="#" className="paction add-compare" title="Add to Compare">
                                                    <span>Add to Compare</span>
                                                </span> */}
                                            </div>
                                            {/* <!-- End .product-action --> */}

                                            <div className="product-single-share">
                                                {/* <label>Share:</label> */}
                                                {/* <!-- www.addthis.com share plugin--> */}
                                                <div className="addthis_inline_share_toolbox"></div>
                                            </div>
                                            {/* <!-- End .product single-share --> */}
                                        </div>
                                        {/* <!-- End .product-single-details --> */}
                                    </div>
                                    {/* <!-- End .col-lg-5 --> */}
                                </div>
                                {/* <!-- End .row --> */}
                            </div>
                            {/* <!-- End .product-single-container --> */}



                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => {
    let { itemModalData, cartItems } = state.inventory
    return {
        itemModalData,
        cartItems
    }

}

export default connect(mapStateToProps, actions)(ItemModal);

