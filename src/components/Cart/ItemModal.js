import React, { Component } from 'react'
import * as actions from './../../actions';
import { connect } from 'react-redux';

class ItemModal extends Component {
    state = { modalData: {} }
    componentDidMount() {

    }
    componentWillReceiveProps = props => {
        if (props.itemModalData !== this.props.itemModalData) {
            this.setState({ modalData: props && props.itemModalData[0] });
        }
    }
    handleAddCart = async (e) => {
        let id = e.target.id;
        // return console.log(id)
        let token = (localStorage.getItem("x-access-token"));
        // return console.log(token)
        if (token) {
            let postObj = { productId: id, quanity: "1" };

            await this.props.addToCart(postObj)
            // console.log("flash props", this.props)
            let { data } = this.props.cartItems;
            if (data.success) {
                this.setState({ cartData: data.cart.products })
                this.handleSetOnlineData()
            } else {
                alert("An error occured")
            }

        } else {
            let cartData = JSON.parse(localStorage.getItem("cart"));
            let localShop = JSON.parse(localStorage.getItem("shop"));
            this.setState({ cartData })
            let obj = localShop.filter(data => id == data.id)[0]

            //check if item is in cart

            if (cartData) { //item exists
                // return console.log("data", cartData)
                let isAdded = cartData.some(data => data.id == id); //check if clicked item exist in cart
                if (isAdded) {
                    return alert("Item has already been added")
                } else {
                    localStorage.setItem("cart", JSON.stringify([...cartData, obj]))
                    this.handleSetLocalData()
                }

            } else {
                //if cart is empty
                localStorage.setItem("cart", JSON.stringify([obj]))
                this.handleSetLocalData()
            }
        }

    }
    formatMoney(amount) {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    render() {

        let { id, name, model, mainImageUrl, sellingPrice, finalPrice } = this.state.modalData
        return (
            <>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">


                            <div class="product-single-container product-single-default product-quick-view container">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 product-single-gallery">
                                        {/* //slide areaa */}
                                        <img src={mainImageUrl} />
                                        <div class="prod-thumbnail row owl-dots" id='carousel-custom-dots'>
                                            <div class="col-3 owl-dot">
                                                <img rc={mainImageUrl} />
                                            </div>
                                            <div class="col-3 owl-dot">
                                                <img rc={mainImageUrl} />
                                            </div>
                                            <div class="col-3 owl-dot">
                                                <img rc={mainImageUrl} />
                                            </div>
                                            <div class="col-3 owl-dot">
                                                <img rc={mainImageUrl} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- End .col-lg-7 --> */}

                                    <div class="col-lg-6 col-md-6">
                                        <div class="product-single-details">
                                            <h1 class="product-title">{name} ({model})</h1>

                                            <div class="ratings-container">
                                                <div class="product-ratings">
                                                    {/* <span class="ratings" style="width:60%"></span><!-- End .ratings --> */}
                                                </div>
                                                {/* <!-- End .product-ratings --> */}

                                                <a href="#" class="rating-link">( 6 Reviews )</a>
                                            </div>
                                            {/* <!-- End .product-container --> */}

                                            <div class="price-box">
                                                <span class="old-price">₦{this.formatMoney(finalPrice ? finalPrice : 0)}</span>
                                                <span class="product-price">₦{this.formatMoney(sellingPrice ? sellingPrice : 0)}</span>
                                            </div>
                                            {/* <!-- End .price-box --> */}

                                            <div class="product-desc">
                                                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non.</p>
                                            </div>
                                            {/* <!-- End .product-desc --> */}

                                            <div class="product-filters-container">
                                                <div class="product-single-filter">
                                                    <label>Colors:</label>
                                                    <ul class="config-swatch-list">
                                                        <li class="active">
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
                                                </div>
                                                {/* <!-- End .product-single-filter --> */}
                                            </div>
                                            {/* <!-- End .product-filters-container --> */}

                                            <div class="product-action">
                                                {/* <div class="product-single-qty">
                                                    <input class="horizontal-quantity form-control" type="number" value={1} />
                                                </div> */}
                                                {/* <!-- End .product-single-qty --> */}

                                                <span class="paction add-cart" id={id} onClick={this.handleAddCart}>
                                                    Add to Cart
                                                </span>
                                                <a href="#" class="paction add-wishlist" title="Add to Wishlist">
                                                    <span>Add to Wishlist</span>
                                                </a>
                                                <a href="#" class="paction add-compare" title="Add to Compare">
                                                    <span>Add to Compare</span>
                                                </a>
                                            </div>
                                            {/* <!-- End .product-action --> */}

                                            <div class="product-single-share">
                                                {/* <label>Share:</label> */}
                                                {/* <!-- www.addthis.com share plugin--> */}
                                                <div class="addthis_inline_share_toolbox"></div>
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
    let { itemModalData } = state.inventory
    return {
        itemModalData
    }

}

export default connect(mapStateToProps, actions)(ItemModal);

