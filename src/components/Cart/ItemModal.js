import React, { Component } from 'react'
import * as actions from './../../actions';
import { connect } from 'react-redux';

class ItemModal extends Component {
    state = { modalData: {} }
    componentDidMount() {

        console.log("inside item", this.props)
    }
    componentWillReceiveProps = props => {
        console.log("new props feat", props)
        if (props.itemModalData !== this.props.itemModalData) {
            this.setState({ modalData: props && props.itemModalData[0] });
        }
    }
    render() {

        let { id, name, description, mainImageUrl, sellingPrice, finalPrice } = this.state.modalData
        console.log("inside stater", this.state.modalData)
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
                                            <h1 class="product-title">{name}</h1>

                                            <div class="ratings-container">
                                                <div class="product-ratings">
                                                    {/* <span class="ratings" style="width:60%"></span><!-- End .ratings --> */}
                                                </div>
                                                {/* <!-- End .product-ratings --> */}

                                                <a href="#" class="rating-link">( 6 Reviews )</a>
                                            </div>
                                            {/* <!-- End .product-container --> */}

                                            <div class="price-box">
                                                <span class="old-price">${finalPrice}</span>
                                                <span class="product-price">${sellingPrice}</span>
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

                                                <a href="cart.html" class="paction add-cart" title="Add to Cart">
                                                    <span>Add to Cart</span>
                                                </a>
                                                <a href="#" class="paction add-wishlist" title="Add to Wishlist">
                                                    <span>Add to Wishlist</span>
                                                </a>
                                                <a href="#" class="paction add-compare" title="Add to Compare">
                                                    <span>Add to Compare</span>
                                                </a>
                                            </div>
                                            {/* <!-- End .product-action --> */}

                                            <div class="product-single-share">
                                                <label>Share:</label>
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
                                <button type="button" class="btn btn-primary">Save changes</button>
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

