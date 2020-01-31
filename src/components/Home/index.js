import React, { Component } from 'react';
import notifCloseIcon from "../../images/dashboard/notif-close-icon.png";
import Zoom from 'react-reveal/Zoom';
import logoHeader from "../../images/logo_header.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../HeaderFooter/Header";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Footer from '../HeaderFooter/Footer';

import FeatureProductItem from "../../common/FeatureProductItem";
import HotProduct from "../../common/HotProduct";
import Testimonial from "../../common/Testimonial";
import Banner from '../../common/Banner';
import Trending from '../../common/Trending';

import slide1 from "../../css/images/products/product-8-white.jpg";//product-2-white
import slide2 from "../../css/images/products/home-featured-3.jpg";
import HomeSlide from '../../common/HomeSlide';
import FlashSales from '../../common/FlashSales';
import ItemModal from '../Cart/ItemModal';

class Home extends Component {
    state = { showPopUp: true }
    closePopup = (event) => {
        event.preventDefault();
        this.setState({
            showPopUp: false
        })
    }
    componentDidMount() {
        this.props.initiateRegistration()
        this.props.getProductCategorySubcategory()
        this.loadFeaturedItems()
        console.log('called ')
        //remove popup after 5secs
        setTimeout(() => {
            this.setState({
                showPopUp: false
            })
        }, 5000)
    }
    loadFeaturedItems = async () => {
        let token = localStorage.getItem("x-access-token");
        if (token) {
            await this.props.fetchFeaturedItems()
            this.setState({ products: this.props.products })
        } else {
            //await this.props.fetchLocalShop()
            await this.props.fetchFeaturedItems()
            this.setState({ products: this.props.products })

        }
    }
    handleAddToCart = async (id) => {
        let productId = id;
        let quanity = "1";
        let obj = { productId, quanity }
        let token = (localStorage.getItem("x-access-token"));
        await this.props.addToCart(obj)
    }
    formatMoney(amount) {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }


    renderPopup() {
        return (
            <Zoom right>
                <div className="survey xmalert alert-box" style={{
                    visibility: `${this.state.showPopUp ? 'visible' : 'hidden'}`, opacity: 1,
                    position: "fixed", zIindex: 100000, transition: "all 0.3s ease-in-out 0s",
                    top: "auto", bottom: "30px", left: "auto", right: "30px"
                }} >
                    <figure className="survey-img" >
                        <img src={logoHeader} alt="survey-img" />
                    </figure>
                    <p className="text-header">Alerts &amp; Notifications</p>
                    <p className="info">We added alerts &amp; notifications to the template!.<br />
                        Try our previewer and code generator and use them in your page!</p>
                    <p className="timestamp"></p>
                    <a href="alerts-notifications.html" className="button mid secondary">Check it <span className="primary">out!</span></a>
                    <img className="close-btn" src={notifCloseIcon} alt="close-icon" onClick={this.closePopup} />
                </div>
            </Zoom>
        )
    }
    render() {
        return (
            <div>
                <Header />
                <div style={{ minHeight: '100vh', paddingTop: '11.3rem' }}>
                    <main className="main">
                        <div className="info-boxes-container">
                            <div className="container">
                                <div className="info-box">
                                    <i className="icon-shipping"></i>

                                    <div className="info-box-content">
                                        <h4>FREE SHIPPING &amp; RETURN</h4>
                                        <p>Free shipping on all orders over $99.</p>
                                    </div>
                                </div>

                                <div className="info-box">
                                    <i className="icon-us-dollar"></i>

                                    <div className="info-box-content">
                                        <h4>MONEY BACK GUARANTEE</h4>
                                        <p>100% money back guarantee</p>
                                    </div>
                                </div>

                                <div className="info-box">
                                    <i className="icon-support"></i>

                                    <div className="info-box-content">
                                        <h4>ONLINE SUPPORT 24/7</h4>
                                        <p>Lorem ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9">
                                    <div className="home-slider">{/*owl-carousel owl-carousel-lazy owl-theme owl-theme-light* */}
                                        <Slider
                                            {...{ ...settings, slidesToShow: 1, arrows: false }}
                                        >

                                            <HomeSlide
                                                image={slide1}
                                            />
                                            <HomeSlide
                                                image={slide2}
                                            />
                                        </Slider>


                                    </div>

                                    <div className="row">
                                        <Trending />
                                        <Trending />
                                        <Trending />
                                    </div>

                                    <div className="mb-3"></div>

                                    <h2 className="carousel-title">Featured Products</h2>



                                    <div className="home-featured-products">
                                        <Slider
                                            {...settings}
                                        >
                                            {
                                                this.state.products ? (
                                                    this.state.products.map(res => {
                                                        let { id, name, brandName, model, sellingPrice, mainImageUrl } = res
                                                        return <FeatureProductItem id={id} name={name} brandName={brandName} sellingPrice={this.formatMoney(sellingPrice)} model={model} mainImageUrl={mainImageUrl} featArray={this.state.products} />
                                                    })
                                                ) : null
                                            }
                                        </Slider>


                                    </div>

                                    <div className="mb-6"></div>


                                    <h2 className="carousel-title">Flash sales</h2>
                                    {/* <h1 className="text-center font-weight-light">Flash sales</h1> */}
                                    <div className="row border" style={{ margin: "4vh 0px" }}>

                                        <br />
                                        {
                                            this.state.products ? (
                                                this.state.products.map(res => {
                                                    let { id, name, brandName, model, sellingPrice, mainImageUrl } = res
                                                    return (

                                                        <FlashSales id={id} name={name} brandName={brandName} sellingPrice={this.formatMoney(sellingPrice)} model={model} mainImageUrl={mainImageUrl} featArray={this.state.products} />

                                                    )
                                                })
                                            ) : (
                                                    null
                                                )
                                        }


                                    </div>






                                    <div className="row">
                                        <div className="col-sm-12 col-md-4">
                                            <div className="product-column">
                                                <h3 className="title">New</h3>

                                                <HotProduct />
                                                <HotProduct />
                                                <HotProduct />
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-4">
                                            <div className="product-column">
                                                <h3 className="title">Hot</h3>

                                                <HotProduct />

                                                <HotProduct />

                                                <HotProduct />
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-md-4 ">
                                            <div className="product-column">
                                                <h3 className="title">Sale</h3>

                                                <HotProduct />

                                                <HotProduct />
                                                <HotProduct />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3"></div>

                                    <div className="row">
                                        <div className="col-sm-6 col-md-4">
                                            <div className="feature-box feature-box-simple text-center">
                                                <i className="icon-star"></i>

                                                <div className="feature-box-content">
                                                    <h3>Dedicated Service</h3>
                                                    <p>Consult our specialists for help with an order, customization, or design advice</p>
                                                    <a href="#" className="btn btn-outline-dark">Get in touch</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-4">
                                            <div className="feature-box feature-box-simple text-center">
                                                <i className="icon-reply"></i>

                                                <div className="feature-box-content">
                                                    <h3>Free Returns</h3>
                                                    <p>We stand behind our goods and services and want you to be satisfied with them.</p>
                                                    <a href="#" className="btn btn-outline-dark">Return Policy</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-4">
                                            <div className="feature-box feature-box-simple text-center">
                                                <i className="icon-paper-plane"></i>

                                                <div className="feature-box-content">
                                                    <h3>International Shipping</h3>
                                                    <p>Currently over 50 countries qualify for express international shipping.</p>
                                                    <a href="#" className="btn btn-outline-dark">Lear More</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <aside className="sidebar-home col-lg-3 order-lg-first">
                                    <div className="side-menu-container">
                                        <h2>CATEGORIES</h2>

                                        <nav className="side-nav">
                                            <ul className="menu menu-vertical sf-arrows">
                                                <li className="active"><a href="index.html"><i className="icon-home"></i>Home</a></li>
                                                <li>
                                                    <a href="category.html" className="sf-with-ul"><i className="icon-briefcase"></i>
                                                        Categories</a>
                                                    <div className="megamenu megamenu-fixed-width">
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <div className="menu-title">
                                                                            <a href="#">Variations 1<span className="tip tip-new">New!</span></a>
                                                                        </div>
                                                                        <ul>
                                                                            <li><a href="category.html">Fullwidth Banner<span className="tip tip-hot">Hot!</span></a></li>
                                                                            <li><a href="category-banner-boxed-slider.html">Boxed Slider Banner</a></li>
                                                                            <li><a href="category-banner-boxed-image.html">Boxed Image Banner</a></li>
                                                                            <li><a href="category.html">Left Sidebar</a></li>
                                                                            <li><a href="category-sidebar-right.html">Right Sidebar</a></li>
                                                                            <li><a href="category-flex-grid.html">Product Flex Grid</a></li>
                                                                            <li><a href="category-horizontal-filter1.html">Horizontal Filter1</a></li>
                                                                            <li><a href="category-horizontal-filter2.html">Horizontal Filter2</a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <div className="menu-title">
                                                                            <a href="#">Variations 2</a>
                                                                        </div>
                                                                        <ul>
                                                                            <li><a href="#">Product List Item Types</a></li>
                                                                            <li><a href="category-infinite-scroll.html">Ajax Infinite Scroll</a></li>
                                                                            <li><a href="category.html">3 Columns Products</a></li>
                                                                            <li><a href="category-4col.html">4 Columns Products <span className="tip tip-new">New</span></a></li>
                                                                            <li><a href="category-5col.html">5 Columns Products</a></li>
                                                                            <li><a href="category-6col.html">6 Columns Products</a></li>
                                                                            <li><a href="category-7col.html">7 Columns Products</a></li>
                                                                            <li><a href="category-8col.html">8 Columns Products</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="banner">
                                                                    <a href="#">
                                                                        <img src="assets\images\menu-banner-2.jpg" alt="Menu banner" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="megamenu-container">
                                                    <a href="product.html" className="sf-with-ul"><i className="icon-video"></i>Products</a>
                                                    <div className="megamenu">
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <div className="row">
                                                                    <div className="col-lg-4">
                                                                        <div className="menu-title">
                                                                            <a href="#">Variations</a>
                                                                        </div>
                                                                        <ul>
                                                                            <li><a href="product.html">Horizontal Thumbnails</a></li>
                                                                            <li><a href="product-full-width.html">Vertical Thumbnails<span className="tip tip-hot">Hot!</span></a></li>
                                                                            <li><a href="product.html">Inner Zoom</a></li>
                                                                            <li><a href="product-addcart-sticky.html">Addtocart Sticky</a></li>
                                                                            <li><a href="product-sidebar-left.html">Accordion Tabs</a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="menu-title">
                                                                            <a href="#">Variations</a>
                                                                        </div>
                                                                        <ul>
                                                                            <li><a href="product-sticky-tab.html">Sticky Tabs</a></li>
                                                                            <li><a href="product-simple.html">Simple Product</a></li>
                                                                            <li><a href="product-sidebar-left.html">With Left Sidebar</a></li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="menu-title">
                                                                            <a href="#">Product Layout Types</a>
                                                                        </div>
                                                                        <ul>
                                                                            <li><a href="product.html">Default Layout</a></li>
                                                                            <li><a href="product-extended-layout.html">Extended Layout</a></li>
                                                                            <li><a href="product-full-width.html">Full Width Layout</a></li>
                                                                            <li><a href="product-grid-layout.html">Grid Images Layout</a></li>
                                                                            <li><a href="product-sticky-both.html">Sticky Both Side Info<span className="tip tip-hot">Hot!</span></a></li>
                                                                            <li><a href="product-sticky-info.html">Sticky Right Side Info</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="banner">
                                                                    <a href="#">
                                                                        <img src="assets\images\menu-banner.jpg" alt="Menu banner" className="product-promo" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <a href="#" className="sf-with-ul"><i className="icon-docs-inv"></i>Pages</a>

                                                    <ul>
                                                        <li><a href="cart.html">Shopping Cart</a></li>
                                                        <li><a href="#">Checkout</a>
                                                            <ul>
                                                                <li><a href="checkout-shipping.html">Checkout Shipping</a></li>
                                                                <li><a href="checkout-shipping-2.html">Checkout Shipping 2</a></li>
                                                                <li><a href="checkout-review.html">Checkout Review</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#">Dashboard</a>
                                                            <ul>
                                                                <li><a href="dashboard.html">Dashboard</a></li>
                                                                <li><a href="my-account.html">My Account</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="about.html">About Us</a></li>
                                                        <li><a href="#">Blog</a>
                                                            <ul>
                                                                <li><a href="blog.html">Blog</a></li>
                                                                <li><a href="single.html">Blog Post</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="contact.html">Contact Us</a></li>
                                                        <li><a href="#" className="login-link">Login</a></li>
                                                        <li><a href="forgot-password.html">Forgot Password</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#" className="sf-with-ul"><i className="icon-sliders"></i>Features</a>
                                                    <ul>
                                                        <li><a href="#">Header Types</a></li>
                                                        <li><a href="#">Footer Types</a></li>
                                                    </ul>
                                                </li>
                                                <li><a href="#"><i className="icon-cat-gift"></i>Special Offer!</a></li>
                                                <li><a href="#"><i className="icon-star-empty"></i>Buy Porto!</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="widget widget-banners">
                                        <div className="widget-banners-slider">
                                            <Slider
                                                {...{ settings, slidesToShow: 1 }}
                                            >

                                                <Banner />
                                                <Banner />
                                                <Banner />
                                            </Slider>

                                        </div>
                                    </div>

                                    <div className="widget widget-newsletters">
                                        <h3 className="widget-title">Newsletter</h3>
                                        <p>Get all the latest information on Events, Sales and Offers. </p>
                                        <form action="#">
                                            <div className="form-group">
                                                <input type="email" className="form-control" id="wemail" />
                                                <label htmlFor="wemail"><i className="icon-envolope"></i>Email Address</label>
                                            </div>
                                            <input type="submit" className="btn btn-block" value="Subscribe Now" />
                                        </form>
                                    </div>

                                    {/* <div className="widget widget-testimonials">
                                        <div className="widget-testimonials-slider">
                                            <Slider
                                                {...{...settings, slidesToShow: 1, arrows:false}}
                                            >

                                            
                                            

                                            <Testimonial />
                                            <Testimonial />
                                            <Testimonial />
                                        
                                            </Slider>
                                        </div>
                                    </div> */}

                                    <div className="widget">
                                        <div className="widget-posts-slider owl-carousel owl-theme">
                                            <div className="post">
                                                <span className="post-date">01- Jun -2018</span>
                                                <h4 className="post-title"><a href="#">Fashion News</a></h4>
                                                <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non placerat mi. </p>
                                            </div>

                                            <div className="post">
                                                <span className="post-date">22- May -2018</span>
                                                <h4 className="post-title"><a href="#">Shopping News</a></h4>
                                                <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non plasasyi. </p>
                                            </div>

                                            <div className="post">
                                                <span className="post-date">13- May -2018</span>
                                                <h4 className="post-title"><a href="#">Fashion News</a></h4>
                                                <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non placerat. </p>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>

                        <div className="mb-4"></div>

                    </main>
                </div>


                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {

    const { products, localProducts } = state.inventory;
    const { home: { categories, subCategories } } = state;
    return {
        categories, subCategories, products, localProducts
    }
}

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    arrows: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
}

export default connect(mapStateToProps, actions)(Home);