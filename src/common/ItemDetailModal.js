import React, { Component } from 'react'

export default class ItemDetailModal extends Component {
    render() {
        return (
            <>
                <div class="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ajax-product mfp-ready" tabindex="-1" style={{ overflow: "hidden auto" }}><div class="mfp-container mfp-ajax-holder"><div class="mfp-content">
                    <div class="product-single-container product-single-default product-quick-view container">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 product-single-gallery">
                                <div class="product-slider-container product-item">
                                    <div class="product-single-carousel owl-carousel owl-theme owl-loaded owl-drag">




                                        {/* <div class="owl-stage-outer"><div class="owl-stage" style="transform: translate3d(-802px, 0px, 0px); transition: all 0s ease 0s; width: 3208px"}}><div class="owl-item cloned" style="width: 401px"}}><div class="product-item">
                                        <img class="product-single-image" src="assets/images/products/zoom/product-3.jpg" data-zoom-image="assets/images/products/zoom/product-3-big.jpg" />
                                        <div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:0px;top:0px;height:401px;width:401px"}}><div class="zoomWindowContainer" style="width: 400px"}}><div style="z-index: 999; overflow: hidden; margin-left: 0px; margin-top: 0px; background-position: 0px 0px; width: 401px; height: 401px; float: left; display: none; cursor: grab; background-repeat: no-repeat; position: absolute; background-image: url(&quot;assets/images/products/zoom/product-3-big.jpg&quot;);" class="zoomWindow">&nbsp;</div></div></div></div></div><div class="owl-item cloned" style="width: 401px"}}><div class="product-item">
                                            <img class="product-single-image" src="assets/images/products/zoom/product-4.jpg" data-zoom-image="assets/images/products/zoom/product-4-big.jpg" />
                                        </div></div><div class="owl-item active" style="width: 401px"}}><div class="product-item">
                                            <img class="product-single-image" src="assets/images/products/zoom/product-1.jpg" data-zoom-image="assets/images/products/zoom/product-1-big.jpg" />
                                            <div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:0px;top:0px;height:401px;width:401px"}}><div class="zoomWindowContainer" style="width: 400px"}}><div style="z-index: 999; overflow: hidden; margin-left: 0px; margin-top: 0px; background-position: 0px 0px; width: 401px; height: 401px; float: left; display: none; cursor: grab; background-repeat: no-repeat; position: absolute; background-image: url(&quot;assets/images/products/zoom/product-1-big.jpg&quot;);" class="zoomWindow">&nbsp;</div></div></div></div></div><div class="owl-item" style="width: 401px"}}><div class="product-item">
                                                <img class="product-single-image" src="assets/images/products/zoom/product-2.jpg" data-zoom-image="assets/images/products/zoom/product-2-big.jpg" />
                                                <div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:0px;top:0px;height:401px;width:401px"}}><div class="zoomWindowContainer" style="width: 400px"}}><div style="z-index: 999; overflow: hidden; margin-left: 0px; margin-top: 0px; background-position: 0px 0px; width: 401px; height: 401px; float: left; display: none; cursor: grab; background-repeat: no-repeat; position: absolute; background-image: url(&quot;assets/images/products/zoom/product-2-big.jpg&quot;);" class="zoomWindow">&nbsp;</div></div></div></div></div><div class="owl-item" style="width: 401px"}}><div class="product-item">
                                                    <img class="product-single-image" src="assets/images/products/zoom/product-3.jpg" data-zoom-image="assets/images/products/zoom/product-3-big.jpg" />
                                                    <div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:0px;top:0px;height:401px;width:401px"}}><div class="zoomWindowContainer" style="width: 400px"}}><div style="z-index: 999; overflow: hidden; margin-left: 0px; margin-top: 0px; background-position: 0px 0px; width: 401px; height: 401px; float: left; display: none; cursor: grab; background-repeat: no-repeat; position: absolute; background-image: url(&quot;assets/images/products/zoom/product-3-big.jpg&quot;);" class="zoomWindow">&nbsp;</div></div></div></div></div><div class="owl-item" style="width: 401px"}}><div class="product-item">
                                                        <img class="product-single-image" src="assets/images/products/zoom/product-4.jpg" data-zoom-image="assets/images/products/zoom/product-4-big.jpg" />
                                                    </div></div><div class="owl-item cloned" style="width: 401px"}}><div class="product-item">
                                                        <img class="product-single-image" src="assets/images/products/zoom/product-1.jpg" data-zoom-image="assets/images/products/zoom/product-1-big.jpg" />
                                                        <div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:0px;top:0px;height:401px;width:401px"}}><div class="zoomWindowContainer" style="width: 400px"}}><div style="z-index: 999; overflow: hidden; margin-left: 0px; margin-top: 0px; background-position: 0px 0px; width: 401px; height: 401px; float: left; display: none; cursor: grab; background-repeat: no-repeat; position: absolute; background-image: url(&quot;assets/images/products/zoom/product-1-big.jpg&quot;);" class="zoomWindow">&nbsp;</div></div></div></div></div><div class="owl-item cloned" style="width: 401px"}}><div class="product-item">
                                                            <img class="product-single-image" src="assets/images/products/zoom/product-2.jpg" data-zoom-image="assets/images/products/zoom/product-2-big.jpg" />
                                                            <div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:0px;top:0px;height:401px;width:401px"}}><div class="zoomWindowContainer" style="width: 400px"}}><div style="z-index: 999; overflow: hidden; margin-left: 0px; margin-top: 0px; background-position: 0px 0px; width: 401px; height: 401px; float: left; display: none; cursor: grab; background-repeat: no-repeat; position: absolute; background-image: url(&quot;assets/images/products/zoom/product-2-big.jpg&quot;);" class="zoomWindow">&nbsp;</div></div></div></div></div></div></div><div class="owl-nav"><button type="button" role="presentation" class="owl-prev"><i class="icon-angle-left"></i></button><button type="button" role="presentation" class="owl-next"><i class="icon-angle-right"></i></button></div></div>
                          
                            </div> */} </div>
                                    <div class="prod-thumbnail row owl-dots" id="carousel-custom-dots">
                                        <div class="col-3 owl-dot active">
                                            <img src="assets/images/products/zoom/product-1.jpg" />
                                        </div>
                                        <div class="col-3 owl-dot">
                                            <img src="assets/images/products/zoom/product-2.jpg" />
                                        </div>
                                        <div class="col-3 owl-dot">
                                            <img src="assets/images/products/zoom/product-3.jpg" />
                                        </div>
                                        <div class="col-3 owl-dot">
                                            <img src="assets/images/products/zoom/product-4.jpg" />
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- End .col-lg-7 --> */}

                                <div class="col-lg-6 col-md-6">
                                    <div class="product-single-details">
                                        <h1 class="product-title">Silver Porto Headset</h1>

                                        <div class="ratings-container">
                                            <div class="product-ratings">
                                                <span class="ratings" style={{ width: "60%" }}></span>
                                                {/* <!-- End .ratings --> */}
                                            </div>
                                            {/* <!-- End .product-ratings --> */}

                                            <a href="#" class="rating-link">( 6 Reviews )</a>
                                        </div>
                                        {/* <!-- End .product-container --> */}

                                        <div class="price-box">
                                            <span class="old-price">$81.00</span>
                                            <span class="product-price">$101.00</span>
                                        </div>
                                        {/* <!-- End .price-box --> */}

                                        <div class="product-desc">
                                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.</p>
                                        </div>
                                        {/* <!-- End .product-desc --> */}

                                        <div class="product-filters-container">
                                            <div class="product-single-filter">
                                                <label>Colors:</label>
                                                <ul class="config-swatch-list">
                                                    <li class="active">
                                                        <a href="#" style={{ backgroundColor: "#6085a5" }}></a>
                                                    </li>
                                                    <li>
                                                        <a href="#" style={{ backgroundColor: "#ab6e6e" }}></a>
                                                    </li>
                                                    <li>
                                                        <a href="#" style={{ backgroundColor: "#b19970" }}></a>
                                                    </li>
                                                    <li>
                                                        <a href="#" style={{ backgroundColor: "#11426b" }}></a>
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <!-- End .product-single-filter --> */}
                                        </div>
                                        {/* <!-- End .product-filters-container --> */}

                                        <div class="product-action">
                                            <div class="product-single-qty">
                                                <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected"><span class="input-group-btn input-group-prepend"><button class="btn btn-outline btn-down-icon bootstrap-touchspin-down" type="button"></button></span><input class="horizontal-quantity form-control" type="text" /><span class="input-group-btn input-group-append"><button class="btn btn-outline btn-up-icon bootstrap-touchspin-up" type="button"></button></span></div>
                                            </div>
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
                                            {/* <div class="addthis_inline_share_toolbox" data-url="http://127.0.0.1:5500/index.html" data-title="Porto - Bootstrap eCommerce Template" style="clear: both"}}><div id="atstbx5" class="at-resp-share-element at-style-responsive addthis-smartlayers addthis-animated at4-show" aria-labelledby="at-2a8a43d0-7632-45a9-8ece-441c4cc474ee" role="region"><span id="at-2a8a43d0-7632-45a9-8ece-441c4cc474ee" class="at4-visually-hidden">AddThis Sharing Buttons</span><div class="at-share-btn-elements"><a role="button" tabindex="0" class="at-icon-wrapper at-share-btn at-svc-facebook" style={{backgroundColor: "rgb(76, 76, 76); border-radius: 26px"}}><span class="at4-visually-hidden">Share to Facebook</span><span class="at-icon-wrapper" style="line-height: 20px; height: 20px; width: 20px"}}><svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-facebook-13" class="at-icon at-icon-facebook" style="fill: rgb(255, 255, 255); width: 20px; height: 20px"}}><title id="at-svg-facebook-13">Facebook</title><g><path d="M22 5.16c-.406-.054-1.806-.16-3.43-.16-3.4 0-5.733 1.825-5.733 5.17v2.882H9v3.913h3.837V27h4.604V16.965h3.823l.587-3.913h-4.41v-2.5c0-1.123.347-1.903 2.198-1.903H22V5.16z" fill-rule="evenodd"></path></g></svg></span></a><a role="button" tabindex="0" class="at-icon-wrapper at-share-btn at-svc-twitter" style={{backgroundColor: "rgb(76, 76, 76); border-radius: 26px"}}><span class="at4-visually-hidden">Share to Twitter</span><span class="at-icon-wrapper" style="line-height: 20px; height: 20px; width: 20px"}}><svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-twitter-14" class="at-icon at-icon-twitter" style="fill: rgb(255, 255, 255); width: 20px; height: 20px"}}><title id="at-svg-twitter-14">Twitter</title><g><path d="M27.996 10.116c-.81.36-1.68.602-2.592.71a4.526 4.526 0 0 0 1.984-2.496 9.037 9.037 0 0 1-2.866 1.095 4.513 4.513 0 0 0-7.69 4.116 12.81 12.81 0 0 1-9.3-4.715 4.49 4.49 0 0 0-.612 2.27 4.51 4.51 0 0 0 2.008 3.755 4.495 4.495 0 0 1-2.044-.564v.057a4.515 4.515 0 0 0 3.62 4.425 4.52 4.52 0 0 1-2.04.077 4.517 4.517 0 0 0 4.217 3.134 9.055 9.055 0 0 1-5.604 1.93A9.18 9.18 0 0 1 6 23.85a12.773 12.773 0 0 0 6.918 2.027c8.3 0 12.84-6.876 12.84-12.84 0-.195-.005-.39-.014-.583a9.172 9.172 0 0 0 2.252-2.336" fill-rule="evenodd"></path></g></svg></span></a><a role="button" tabindex="0" class="at-icon-wrapper at-share-btn at-svc-compact" style={{backgroundColor: "rgb(76, 76, 76); border-radius: 26px"}}><span class="at4-visually-hidden">Share to More</span><span class="at-icon-wrapper" style="line-height: 20px; height: 20px; width: 20px"}}><svg xmlns="http://www.w3.org/2000/svg" xmlns: xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-addthis-15" class="at-icon at-icon-addthis" style="fill: rgb(255, 255, 255); width: 20px; height: 20px"}}><title id="at-svg-addthis-15">AddThis</title><g><path d="M18 14V8h-4v6H8v4h6v6h4v-6h6v-4h-6z" fill-rule="evenodd"></path></g></svg></span></a></div></div></div> */}
                                        </div>
                                        {/* <!-- End .product single-share --> */}
                                    </div>
                                    {/* <!-- End .product-single-details --> */}
                                </div>
                                {/* <!-- End .col-lg-5 --> */}
                            </div>
                            {/* <!-- End .row --> */}
                            <button title="Close (Esc)" type="button" class="mfp-close">×</button></div>
                        {/* <!-- End .product-single-container --></div></div></div>   */}
                    </div>
                </div > </div> </div>
            </>

        )
    }
}
