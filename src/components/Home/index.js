import React, { Component } from 'react';
import { Link } from "react-router-dom";
import notifCloseIcon from "../../images/dashboard/notif-close-icon.png";
import Zoom from 'react-reveal/Zoom';
// import logoHeader from "../../images/logo_header.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Header from "../HeaderFooter/Header";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Footer from '../HeaderFooter/Footer';

import FeatureProductItem from "../../common/FeatureProductItem";
// import HotProduct from "../../common/HotProduct";
// import Banner from '../../common/Banner';
import Trending from '../../common/Trending';
import axios from "axios";

// import slide1 from "../../css/images/products/product-8-white.jpg";//product-2-white
// import slide2 from "../../css/images/products/home-featured-3.jpg";
// import HomeSlide from '../../common/HomeSlide';
import FlashSales from '../../common/FlashSales';
import Pages from '../../config/pages';
import Positions from '../../config/position';

class Home extends Component {
    state = {
        altImage: [{url:"https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"},
        {url: "https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"}],
        showPopUp: true,
        slidesToShow: 4,
        popUp: [
            'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg',
            'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg,'
        ],
        topBanner: [
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' },
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' },
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' }
        ],
        lowerBanner: [
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' },
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' },
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' },
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' }
        ],
        leftBanner: [
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' },
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' },
            { url: 'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg' }
        ],
        bottomBanner: null,
        categories: [],
        // services: [
        //     {id: 1, name: }
        // ]
    }
    closePopup = (event) => {
        event.preventDefault();
        this.setState({
            showPopUp: false
        })
    }
    async componentDidMount() {
        if (window.innerWidth < 768) {
            this.setState({
                slidesToShow: 1
            })
        }
        const $this = this;
        if (window.attachEvent) {
            window.attachEvent('onresize', function (e) {
                if (window.innerWidth > 768) {

                    return $this.setState({
                        slidesToShow: 4
                    })
                } else {
                    return $this.setState({
                        slidesToShow: 1
                    })
                }

            });
        }
        else if (window.addEventListener) {
            window.addEventListener('resize', function () {
                if (window.innerWidth > 768) {
                    // alert()
                    return $this.setState({
                        slidesToShow: 4
                    })
                }
                return $this.setState({
                    slidesToShow: 1
                })
            }, true);
        }
        this.props.initiateRegistration()
        this.props.getProductCategorySubcategory()
        this.loadFeaturedItems()
        console.log('called ')
        this.props.getAdvertCategory()
        const response = await axios.get('/api/v1/category/get-categories/0/12')
        // console.log(response)

        this.setState({
            categories: response.data.categories,
            // topBanner,
            // lowerBanner,
            // leftBanner
        }, () => this.getFeaturedCategoriesImages())
        //remove popup after 5secs
        setTimeout(() => this.setState({showPopUp: false}), 20000)

    }
    getFeaturedCategoriesImages = async () => {
        const responseAds = await axios.get('/api/v1/ad/get-ads/0/1000')

        const ads = responseAds.data.ads.filter(item => item.page === Pages.HOME_PAGE )
        console.log("ads", ads)
        const topBanner = ads.filter(item => item.position === Positions.TOP)
        const lowerBanner = ads.filter(item => item.position === Positions.LOWER)
        console.log(lowerBanner)
        const leftBanner = ads.filter(item => item.position === Positions.LEFT)
        const bottomBanner = ads.filter(item => item.position === Positions.BOTTOM)[0]
        const popUp = ads.filter(item => item.position === Positions.POP_UP);
        if (lowerBanner.length > 4) {
            lowerBanner.splice(4, lowerBanner.length)
        }
        else if (lowerBanner.length > 0 && lowerBanner.length < 4) {
            const remainingItem = 4 - lowerBanner.length;
            for (let i = 0; i < remainingItem; i++) {
                lowerBanner.push(lowerBanner[0])
            }
        }

        this.setState({
            topBanner,
            lowerBanner,
            leftBanner,
            bottomBanner,
            popUp: popUp.length > 0 ? popUp : this.state.popUp
           
        })
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
            item.products.length >= 3 ? 
            <>
            <div className="bg-white mb-4" key={item.id}>
                <div className="d-flex justify-content-between align-items-center px-4 header-row-special">
                    <h3 className="text-light py-3 m-0">{item.name}</h3>
                    <Link className="py-3 m-0" to={`/specials/${item.id}`}><h3 className="text-light py-3 m-0"> See all  </h3></Link>
                </div>
                <hr />
                <div className="container">
                    <div className="row p-4">
                        {
                            item.products.map((product, i) => {
                                let { id, name, finalPrice, brandName, model, sellingPrice, mainImageUrl } = product;
                                return (

                                    <FlashSales key={i} id={id} name={name}
                                        brandName={brandName}
                                        sellingPrice={this.formatMoney(sellingPrice)}
                                        model={model} mainImageUrl={mainImageUrl}
                                        finalPrice={finalPrice}
                                        featArray={this.state.products}
                                        handleMoveWishList={this.handleMoveWishList}
                                    />

                                )

                            })
                        }
                    </div>
                </div>
            </div>
            <div className="container-fluid mb-2 mt-0">
                <div className="row">
                    <div className=" bottom-banner mt-3">
                        <img alt="bottom" src={`${this.state.bottomBanner ? this.state.bottomBanner.url : "https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"}`} />
                    </div>
                </div>
            </div>
            </>
                : null
        ))

    }
    renderPopup() {
        const index = Math.floor((Math.random() * this.state.popUp.length))
        return (
            <Zoom right>
                <div className="survey xmalert alert-box" style={{
                    visibility: `${this.state.showPopUp ? 'visible' : 'hidden'}`, opacity: 1,
                    position: "fixed", zIindex: 10000000000, transition: "all 0.3s ease-in-out 0s",
                    top: "auto", bottom: "30px", left: "auto", right: "30px",
                }} >
                    <div
                        className="popup-alert"
                        style={{backgroundImage: `${this.state.topBanner[index] ? `url(${this.state.topBanner[index].url})` : 'url( "https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg")'}`}}
                    >
                        <div style={{position:'absolute', bottom: 0, width: '100%'}}>
                            {/* <Link to="#" className="button mid secondary">Check it <span className="primary">out!</span></Link> */}
                        </div>
                        <img className="close-btn" src={notifCloseIcon} alt="close-icon" onClick={this.closePopup} />
                    </div>
                    {/* <p className="text-header">Alerts &amp; Notifications</p>
                    <p className="info">We added alerts &amp; notifications to the template!.<br />
                        Try our previewer and code generator and use them in your page!</p>
                    <p className="timestamp"></p> */}
                    
                </div>
            </Zoom>
        )
    }
    handleMoveWishList = async (id) => {
        let localData = JSON.parse(localStorage.getItem("wishList"))
        if (localStorage.getItem('x-access-token')) {
            let data = this.state.products && this.state.products
            let filt = data.filter(o => +o.id === +id)[0]

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

    renderCategories = () => {
        return this.state.categories.map(item => {
            return (
                <li>
                    <a href={`${window.origin}/shop?name=&category=${item.id}&categoryName=${item.name}`} rel="noopener noreferrer" target="_blank" className="sf-with-ul"><i className="icon-briefcase"></i>
                        {item.name}</a>
                    {/* <div className="megamenu megamenu-fixed-width">
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
                    </div> */}
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                {/* <Header /> */}
                <div style={{ minHeight: '100vh', paddingTop: '11.3rem', background: '#f4f4f4' }}>
                    <main className="main">


                        <div className="container">
                            <div className="row mt-4">
                                <div className="col-md-4 col-lg-4">
                                    <aside className="sidebar-home">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-12 col-lg-12">
                                                <div className="side-menu-container bg-white shadow p-3">
                                                    <h2 className="bg-white rounded">CATEGORIES</h2>

                                                    <nav className="side-nav">
                                                        <ul className="menu menu-vertical sf-arrows">
                                                            {/* <li className="active"><Link to="/"><i className="icon-home"></i>Home</Link></li> */}
                                                            {
                                                                this.renderCategories()
                                                            }

                                                            {/* <li className="megamenu-container">
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
                                                </li> */}
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

                                            </div>
                                        </div>
                                        {/* <div className="row d-flex justify-content-center">
                                        <div className="">
                                                <div className="widget widget-banners">
                                                <div className="widget-banners-slider">
                                                    <Slider
                                                        {...{ settings, slidesToShow: 1 }}
                                                    >

                                                    {
                                                        this.state.leftBanner.map((item) => {
                                                            return  <Banner image={item.url} />
                                                        })
                                                    }
                                                    </Slider>

                                                </div>
                                            </div>
                                        </div>

                                    </div> */}

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
                                <div className="col-md-8 col-lg-8">
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-10">
                                            <div className="bnk">{/*owl-carousel owl-carousel-lazy owl-theme owl-theme-light* */}
                                                <div id="carouselExampleSlidesOnly" className="carousel slide  bg-white" data-ride="carousel">
                                                    <ol className="carousel-indicators">
                                                        {
                                                            this.state.topBanner.map((item, i) => {
                                                                return (
                                                                    <li data-target="#carouselExampleIndicators" key={i} data-slide-to={i} className={`${i === 0 ? 'active' : ''}`}></li>
                                                                )
                                                            })
                                                        }

                                                    </ol>
                                                    <div className="carousel-inner">
                                                        {/* <div class="carousel-item active">
                                                                <img class="d-block w-100" src={this.state.topBanner[0]} alt="First slide" />
                                                                </div> */}
                                                        {this.state.topBanner.length > 0 ?
                                                            this.state.topBanner.map((item, i) => {
                                                                return (
                                                                    <div key={i} className={`carousel-item banners-containers ${i === 0 ? 'active' : ''}`}>
                                                                        <img className="d-block w-100" src={item.url} alt="Second slide" />
                                                                        
                                                                         {/* <img className="d-block w-100" src={'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg'} alt="Second slide" /> */}
                                                                    </div>
                                                                )
                                                            })
                                                        
                                                        :
                                                        
                                                            this.state.altImage.map((item, i) => {
                                                                return (
                                                                    <div key={i} className={`carousel-item banners-containers ${i === 0 ? 'active' : ''}`}>
                                                                        <img className="d-block w-100" src={item.url} alt="Second slide" />
                                                                        
                                                                         {/* <img className="d-block w-100" src={'https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg'} alt="Second slide" /> */}
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
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">

                                    <div className="mb-3"></div>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-12">
                                            <div className="row d-flex justify-content-center">
                                                {
                                                    this.state.lowerBanner.map((item, i) => {
                                                        return <Trending index={i} image={item.url} />
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* ADDED SERVICES */}

                                    <div className="mb-3"></div>
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-lg-12">
                                            <div className="row d-flex justify-content-center">
                                                {
                                                    [1, 2, 3, 4].map(o => {
                                                        return (
                                                            <div className="col-lg-3  col-sm-3">
                                                                <div className="banner bg-white banner-image added-services">
                                                                    <span>
                                                                        <i className="icon-us-dollar"></i>
                                                                    </span>
                                                                    <div className="text">
                                                                        Azonka credits
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row my-4">
                                        <div className="col-md-12">

                                            <div className="info-boxes-container bg-white shadow">
                                                <div className="container justify-flex-start">


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

                                        </div>
                                    </div>

                                    <div className="mb-3"></div>

                                    <h2 className="carousel-title">Featured Products</h2>


                                    <hr className="my-4"></hr>


                                    <div className="bg-white  px-5 p-5">
                                        <Slider
                                            {...{ ...settings, slidesToShow: this.state.slidesToShow }}
                                        >
                                            {
                                                this.state.products ? (
                                                    this.state.products.map(res => {
                                                        let { id, name, brandName, model, finalPrice, sellingPrice, mainImageUrl } = res
                                                        return <FeatureProductItem finalPrice={finalPrice} id={id} name={name} brandName={brandName}
                                                            sellingPrice={this.formatMoney(sellingPrice)} model={model}
                                                            mainImageUrl={mainImageUrl} featArray={this.state.products}
                                                            handleMoveWishList={this.handleMoveWishList}
                                                        />
                                                    })
                                                ) : null
                                            }
                                        </Slider>


                                    </div>

                                    <div className="mb-6"></div>


                                    <h2 className="carousel-title">Flash sales</h2>

                                    <hr className="my-4"></hr>
                                    {/* <h1 className="text-center font-weight-light">Flash sales</h1> */}
                                    <div className="row p-5 bg-white" style={{ margin: "4vh 0px" }}>

                                        <br />
                                        {
                                            this.state.products ? (
                                                this.state.products.map((res, i) => {
                                                    let { id, name, finalPrice, brandName, model, sellingPrice, mainImageUrl } = res
                                                    return (

                                                        <FlashSales key={i} id={id} name={name}
                                                            brandName={brandName}
                                                            sellingPrice={this.formatMoney(sellingPrice)}
                                                            model={model} mainImageUrl={mainImageUrl}
                                                            finalPrice={finalPrice}
                                                            featArray={this.state.products}
                                                            handleMoveWishList={this.handleMoveWishList}
                                                        />

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

                            </div>
                        </div>
                        <div className=" bottom-banner mt-3">
                                        <img alt="bottom" src={`${this.state.bottomBanner ? this.state.bottomBanner.url : "https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"}`} />
                            </div>



                    </main>
                </div>
                {this.renderPopup()}

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
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
}


// const settingsAdvert = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 6,
//     arrows: false,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000
// }

export default connect(mapStateToProps, actions)(Home);

/*

<div className="info-boxes-container">
                            <div className="container justify-flex-start">


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

*/