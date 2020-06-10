import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
// import HotProduct from "../../common/HotProduct";
import Banner from '../../common/Banner';
import Trending from '../../common/Trending';

// import slide1 from "../../css/images/products/product-8-white.jpg";//product-2-white
// import slide2 from "../../css/images/products/home-featured-3.jpg";
// import HomeSlide from '../../common/HomeSlide';
import FlashSales from '../../common/FlashSales';

class Home extends Component {
    state = { showPopUp: true,
        topBanner: [
            'https://res.cloudinary.com/dnevwxinm/image/upload/v1591820922/present-1893642_1280.jpg',
            'https://res.cloudinary.com/dnevwxinm/image/upload/v1591820922/present-1893642_1280.jpg',
            'https://res.cloudinary.com/dnevwxinm/image/upload/v1591820922/present-1893642_1280.jpg',
            'https://res.cloudinary.com/dnevwxinm/image/upload/v1591820922/present-1893642_1280.jpg',
        ],
        lowerBanner: [
            'https://image.freepik.com/free-vector/christmas-new-year-s-day-red-gift-box-white-background-illustration_164911-157.jpg',
            'https://image.freepik.com/free-vector/christmas-new-year-s-day-red-gift-box-white-background-illustration_164911-157.jpg',
            'https://image.freepik.com/free-vector/christmas-new-year-s-day-red-gift-box-white-background-illustration_164911-157.jpg'
        ],
        leftBanner:[
            'https://image.freepik.com/free-vector/christmas-new-year-s-day-red-gift-box-white-background-illustration_164911-157.jpg',
            'https://image.freepik.com/free-vector/christmas-new-year-s-day-red-gift-box-white-background-illustration_164911-157.jpg',
            
        ]
    }
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
        this.props.getAdvertCategory()
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
            await this.props.fetchFeaturedItems()
            this.setState({ products: this.props.products })
        }
    }
    loadHomeItems = async () => {
        let token = localStorage.getItem("x-access-token");
        if (token) {
            await this.props.fetchFeaturedItems()
            this.setState({ products: this.props.products })
        } else {
            await this.props.fetchFeaturedItems()
            this.setState({ products: this.props.products })
        }
    }
    handleAddToCart = async (id) => {
        let productId = id;
        let quanity = "1";
        let obj = { productId, quanity }
        await this.props.addToCart(obj)
    }
    formatMoney(amount) {
        return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    renderAdverts = () => {
       return this.props.adverts.map(item => (
           item.products.length >= 3 ? <div className="border mb-2" key={item.id}>
                <div className="d-flex justify-content-between py-4 px-4">
                    <h3>{item.name}</h3>
                    <Link to={`/specials/${item.id}`}><span> see all > </span></Link>
                </div>
                <hr />
                <div className="container">
                    <div className="py-4 px-4">
                        <Slider {...settingsAdvert}>
                            {
                                item.products.map(product => {
                                    let { id, name, brandName, model, sellingPrice, mainImageUrl } = product
                                    return <FeatureProductItem id={id} name={name} 
                                    brandName={brandName} sellingPrice={this.formatMoney(sellingPrice)} 
                                    model={model} mainImageUrl={mainImageUrl} featArray={this.state.products} />
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
            : null
        ))
        
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
                                {/* <div className="info-box">
                                    <i className="icon-shipping"></i>

                                    <div className="info-box-content">
                                        <h4>FREE SHIPPING &amp; RETURN</h4>
                                        <p>Free shipping on all orders over $99.</p>
                                    </div>
                                </div> */}

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
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="bnk">{/*owl-carousel owl-carousel-lazy owl-theme owl-theme-light* */}
                                            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                                                <ol className="carousel-indicators">
                                                    {
                                                        this.state.topBanner.map((image, i) => {
                                                            return (
                                                                <li data-target="#carouselExampleIndicators" data-slide-to={i} className={`${i === 0 ? 'active': ''}`}></li>
                                                            )
                                                        })
                                                    }
                                                    
                                                </ol>
                                                <div className="carousel-inner">
                                                    {/* <div class="carousel-item active">
                                                    <img class="d-block w-100" src={this.state.topBanner[0]} alt="First slide" />
                                                    </div> */}
                                                    {
                                                        this.state.topBanner.map((image, i) => {
                                                            return (
                                                                <div className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                                                                <img className="d-block w-100" src={image} alt="Second slide" />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {/* <div class="carousel-item">
                                                    <img class="d-block w-100" src={this.state.topBanner[0]} alt="Third slide" />
                                                    </div> */}
                                                </div>
                                                </div>
                                                
                                                {/* <Slider
                                                    {...{ ...settings, slidesToShow: 1, arrows: true }}
                                                >
                                                    {
                                                        this.state.topBanner.map(image => {
                                                            return <HomeSlide
                                                                    image={image}
                                                                />
                                                        } )
                                                    }
                                                    
                                                </Slider> */}


                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3"></div>
                                    <div className="row">
                                        {
                                            this.state.lowerBanner.map((image) => {
                                                return <Trending image={image} />
                                            })
                                        }
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
                                                this.state.products.map((res, i) => {
                                                    let { id, name, brandName, model, sellingPrice, mainImageUrl } = res
                                                    return (

                                                        <FlashSales key={i} id={id} name={name} brandName={brandName} sellingPrice={this.formatMoney(sellingPrice)} model={model} mainImageUrl={mainImageUrl} featArray={this.state.products} />

                                                    )
                                                })
                                            ) : (
                                                    null
                                                )
                                        }


                                    </div>


                                    <div className="home-featured-products">
                                        {
                                            this.renderAdverts()
                                        }
                                    </div>

                                    <div className="mb-4"></div>



                                    <div className="row">
                                        {/* <div className="col-sm-12 col-md-4">
                                            <div className="product-column">
                                                <h3 className="title">New</h3>

                                                <HotProduct />
                                                <HotProduct />
                                                <HotProduct />
                                            </div>
                                        </div> */}

                                        {/* <div className="col-sm-12 col-md-4">
                                            <div className="product-column">
                                                <h3 className="title">Hot</h3>

                                                <HotProduct />

                                                <HotProduct />

                                                <HotProduct />
                                            </div>
                                        </div> */}

                                        {/* <div className="col-sm-12 col-md-4 ">
                                            <div className="product-column">
                                                <h3 className="title">Sale</h3>

                                                <HotProduct />

                                                <HotProduct />
                                                <HotProduct />
                                            </div>
                                        </div> */}
                                    </div>

                                    <div className="mb-3"></div>

                                    <div className="row">
                                        <div className="col-sm-6 col-md-6">
                                            <div className="feature-box feature-box-simple text-center">
                                                <i className="icon-star"></i>

                                                <div className="feature-box-content">
                                                    <h3>Dedicated Service</h3>
                                                    <p>Consult our specialists for help with an order</p>
                                                    <a href="#n" className="btn btn-outline-dark">Get in touch</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-md-6">
                                            <div className="feature-box feature-box-simple text-center">
                                                <i className="icon-reply"></i>

                                                <div className="feature-box-content">
                                                    <h3>Free Returns</h3>
                                                    <p>We stand behind our goods and services and want you to be satisfied with them.</p>
                                                    <a href="#n" className="btn btn-outline-dark">Return Policy</a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="col-sm-6 col-md-4">
                                            <div className="feature-box feature-box-simple text-center">
                                                <i className="icon-paper-plane"></i>

                                                <div className="feature-box-content">
                                                    <h3>International Shipping</h3>
                                                    <p>Currently over 50 countries qualify for express international shipping.</p>
                                                    <a href="#m" className="btn btn-outline-dark">Lear More</a>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                <aside className="sidebar-home col-lg-3 order-lg-first">
                                    <div className="side-menu-container">
                                        <h2>CATEGORIES</h2>

                                        <nav className="side-nav">
                                            <ul className="menu menu-vertical sf-arrows">
                                                <li className="active"><Link to="/"><i className="icon-home"></i>Home</Link></li>
                                                <li>
                                                    <a href="#n" className="sf-with-ul"><i className="icon-briefcase"></i>
                                                        Categories</a>
                                                    <div className="megamenu megamenu-fixed-width">
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        <div className="menu-title">
                                                                            
                                                                        </div>
                                                                        <ul>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <div className="menu-title">
                                                                            
                                                                        </div>
                                                                        <ul>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="banner">
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="megamenu-container">
                                                <a href="#n" className="sf-with-ul"><i className="icon-briefcase"></i>
                                                        Products</a>
                                                    <div className="megamenu">
                                                        <div className="row">
                                                            <div className="col-lg-8">
                                                                <div className="row">
                                                                    <div className="col-lg-4">
                                                                        <div className="menu-title">
                                                                            
                                                                        </div>
                                                                        <ul>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="menu-title">
                                                                            
                                                                        </div>
                                                                        <ul>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        <div className="menu-title">
                                                                            
                                                                        </div>
                                                                        <ul>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                            <li></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="banner">
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {/* <li>
                                                    <a href="#n" className="sf-with-ul"><i className="icon-docs-inv"></i>Pages</a>

                                                    <ul>
                                                        <li><a href="cart.html">Shopping Cart</a></li>
                                                        <li><a href="#n">Checkout</a>
                                                            <ul>
                                                                <li><a href="checkout-shipping.html">Checkout Shipping</a></li>
                                                                <li><a href="checkout-shipping-2.html">Checkout Shipping 2</a></li>
                                                                <li><a href="checkout-review.html">Checkout Review</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="#n">Dashboard</a>
                                                            <ul>
                                                                <li><a href="dashboard.html">Dashboard</a></li>
                                                                <li><a href="my-account.html">My Account</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="about.html">About Us</a></li>
                                                        <li><a href="#n">Blog</a>
                                                            <ul>
                                                                <li><a href="blog.html">Blog</a></li>
                                                                <li><a href="single.html">Blog Post</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a href="contact.html">Contact Us</a></li>
                                                        <li><a href="#n" className="login-link">Login</a></li>
                                                        <li><a href="forgot-password.html">Forgot Password</a></li>
                                                    </ul>
                                                </li> */}
                                                {/* <li><a href="#n" className="sf-with-ul"><i className="icon-sliders"></i>Features</a>
                                                    <ul>
                                                        <li><a href="#n">Header Types</a></li>
                                                        <li><a href="#n">Footer Types</a></li>
                                                    </ul>
                                                </li> */}
                                                {/* <li><a href="#n"><i className="icon-cat-gift"></i>Special Offer!</a></li>
                                                <li><a href="#n"><i className="icon-star-empty"></i>Buy Porto!</a></li> */}
                                            </ul>
                                        </nav>
                                    </div>
                                    <div className="widget widget-banners">
                                        <div className="widget-banners-slider">
                                            <Slider
                                                {...{ settings, slidesToShow: 1 }}
                                            >

                                               {
                                                   this.state.leftBanner.map(image => {
                                                       return  <Banner image={image} />
                                                   })
                                               }
                                            </Slider>

                                        </div>
                                    </div>

                                    {/* <div className="widget widget-newsletters">
                                        <h3 className="widget-title">Newsletter</h3>
                                        <p>Get all the latest information on Events, Sales and Offers. </p>
                                        <form action="#">
                                            <div className="form-group">
                                                <input type="email" className="form-control" id="wemail" />
                                                <label htmlFor="wemail"><i className="icon-envolope"></i>Email Address</label>
                                            </div>
                                            <input type="submit" className="btn btn-block" value="Subscribe Now" />
                                        </form>
                                    </div> */}

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
                                                <h4 className="post-title"><a href="#n">Fashion News</a></h4>
                                                <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non placerat mi. </p>
                                            </div>

                                            <div className="post">
                                                <span className="post-date">22- May -2018</span>
                                                <h4 className="post-title"><a href="#n">Shopping News</a></h4>
                                                <p>Lorem ipsum dolor sit amet, consectetur elitad adipiscing Cras non plasasyi. </p>
                                            </div>

                                            <div className="post">
                                                <span className="post-date">13- May -2018</span>
                                                <h4 className="post-title"><a href="#n">Fashion News</a></h4>
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
    const { home: { categories, subCategories, adverts } } = state;
    return {
        categories, subCategories, products, localProducts, adverts
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


const settingsAdvert = {
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