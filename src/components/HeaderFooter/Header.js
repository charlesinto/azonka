import React, { Component } from 'react';
import { Link } from "react-router-dom";
import englishFlag from "../../css/images/flags/en.png";
import nigeriaFlag from "../../css/images/flags/nigeria.png";
import frenchFlag from "../../css/images/flags/fr.png";
import azonkaLogo from "../../images/logo_header.png";
import product1 from "../../css/images/products/cart/product-1.jpg";
import { connect } from "react-redux";
import * as actions from "../../actions";

class Header extends Component {
    state = {
        mobileMenu: false,
        showSearchBar: false,
        currentUser: null
    }
    componentDidMount(){
        const user = JSON.parse(localStorage.getItem('azonta-user'))
        this.setState({
            currentUser: user
        })
    }
    _toggleMenu = () => {
        this.setState({
            mobileMenu: !this.state.mobileMenu
        })
    }
    handleSideMenuClick = link => {
        switch(link){
            case 'logout':
                this.props.logout()
                break;
            default:
                return ;
        }
    }
    _showSearchBar = () => {
        this.setState({
            showSearchBar: !this.state.showSearchBar
        })
    }
    render() {
        const {currentUser} = this.state
        return (
            <div>
                <div className={`page-wrapper ${this.state.mobileMenu ? 'mmenu-active' : ''}`} style={{position:'fixed',zIndex:'1000', width:'100%'}}>
                    <header className="header" style={{marginLeft: 0, marginRight: 0, width:'100%', maxWidth:'100%'}}>
                        <div className="header-top">
                            <div className="container-fluid">
                                <div className="header-left header-dropdowns">
                                    <div className="header-dropdown">
                                        <a href="#">NGN</a>
                                        <div className="header-menu">
                                            <ul>
                                                <li><a href="#">NGN</a></li>
                                                <li><a href="#">USD</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="header-dropdown">
                                        <a href="#"><img src={nigeriaFlag} alt="England flag" />NIGERIA</a>
                                        <div className="header-menu">
                                            <ul>
                                                <li><a href="#"><img src={nigeriaFlag} alt="England flag" />NIGERIA</a></li>
                                                <li><a href="#"><img src={englishFlag} alt="England flag" />ENGLISH</a></li>
                                                <li><a href="#"><img src={frenchFlag} alt="France flag" />FRENCH</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="dropdown compare-dropdown" style={{border:'none',zIndex:'900', backgroundColor:'transparent', position:'relative'}}>
                                        <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                            <i className="icon-retweet"></i> Compare (2)
                                        </a>

                                        <div className="dropdown-menu">
                                            <div className="dropdownmenu-wrapper">
                                                <ul className="compare-products">
                                                    <li className="product">
                                                        <a href="#" className="btn-remove" title="Remove Product"><i className="icon-cancel"></i></a>
                                                        <h4 className="product-title"><a href="product.html">Lady White Top</a></h4>
                                                    </li>
                                                    <li className="product">
                                                        <a href="#" className="btn-remove" title="Remove Product"><i className="icon-cancel"></i></a>
                                                        <h4 className="product-title"><a href="product.html">Blue Women Shirt</a></h4>
                                                    </li>
                                                </ul>

                                                <div className="compare-actions">
                                                    <a href="#" className="action-link">Clear All</a>
                                                    <a href="#" className="btn btn-primary">Compare</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="header-right">
                                    <p className="welcome-msg" style={{color:'#bce1f4', fontSize:'1.1rem'}}>{
                                        currentUser ?
                                        `${currentUser.firstName} ${currentUser.lastName}`
                                        : `Welcome to Azonka` 

                                    }</p>

                                    <div className="header-dropdown dropdown-expanded">
                                        <a href="#">Links</a>
                                        <div className="header-menu">
                                            <ul>
                                                <li><Link to="/users/profile">MY ACCOUNT </Link></li>
                                                <li><Link to="#">MY WISHLIST </Link></li>
                                                <li><Link to="#">Contact</Link></li>
                                                {
                                                    currentUser  ? 
                                                    <li onClick={() => this.handleSideMenuClick('logout')}><Link to="#" className="login-link">Log Out</Link></li>
                                                    : <li><Link to="/users/login" className="login-link">Log In</Link></li>
                                                }
                                                {/* <li><a href="#" className="login-link">LOG IN</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div className="header-middle">
                            <div className="container">
                                <div className="header-left" >
                                    <Link to="/" style={{display:'block'}} className="logo">
                                        <img src={azonkaLogo} alt="Porto Logo"/>
                                    </Link>
                                </div>
                                <div className="header-center">
                                    <div className="header-search">
                                        <a href="#" className="search-toggle"
                                         onClick={() => this._showSearchBar()} role="button"><i className="icon-magnifier"></i></a>
                                        <form action="#" method="get">
                                            <div className={`header-search-wrapper ${this.state.showSearchBar ? 'show': ''}`}>
                                                <input type="search" className="form-control" name="q" id="q" placeholder="Search..." required="" />
                                                <div className="select-custom">
                                                    <select id="cat" name="cat">
                                                        <option value="">All Categories</option>
                                                        <option value="4">Fashion</option>
                                                        <option value="12">- Women</option>
                                                        <option value="13">- Men</option>
                                                        <option value="66">- Jewellery</option>
                                                        <option value="67">- Kids Fashion</option>
                                                        <option value="5">Electronics</option>
                                                        <option value="21">- Smart TVs</option>
                                                        <option value="22">- Cameras</option>
                                                        <option value="63">- Games</option>
                                                        <option value="7">Home &amp; Garden</option>
                                                        <option value="11">Motors</option>
                                                        <option value="31">- Cars and Trucks</option>
                                                        <option value="32">- Motorcycles &amp; Powersports</option>
                                                        <option value="33">- Parts &amp; Accessories</option>
                                                        <option value="34">- Boats</option>
                                                        <option value="57">- Auto Tools &amp; Supplies</option>
                                                    </select>
                                                </div>
                                                <button className="btn" type="submit"><i className="icon-magnifier"></i></button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="header-right">
                                    <button onClick={() => this._toggleMenu()} className="mobile-menu-toggler" type="button">
                                        <i className="icon-menu"></i>
                                    </button>
                                    <div className="header-contact">
                                        <span>Call us now</span>
                                        <a href="tel:#"><strong>+123 5678 890</strong></a>
                                    </div>
                                    
                                    <div className="dropdown cart-dropdown" style={{background:'transparent', border:'none',position:'relative',
                                         width:'fit-content'}}>
                                        <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                            <span className="cart-count">2</span>
                                        </a>

                                        <div className="dropdown-menu">
                                            <div className="dropdownmenu-wrapper">
                                                <div className="dropdown-cart-products">
                                                    <div className="product">
                                                        <div className="product-details">
                                                            <h4 className="product-title">
                                                                <a href="product.html">Woman Ring</a>
                                                            </h4>

                                                            <span className="cart-product-info">
                                                                <span className="cart-product-qty">1</span>
                                                                x &#8358; 99.00
                                                </span>
                                                        </div>

                                                        <figure className="product-image-container">
                                                            <a href="product.html" className="product-image">
                                                                <img src={product1} alt="product" />
                                                            </a>
                                                            <a href="#" className="btn-remove" title="Remove Product"><i className="icon-cancel"></i></a>
                                                        </figure>
                                                    </div>

                                                    <div className="product">
                                                        <div className="product-details">
                                                            <h4 className="product-title">
                                                                <a href="product.html">Woman Necklace</a>
                                                            </h4>

                                                            <span className="cart-product-info">
                                                                <span className="cart-product-qty">1</span>
                                                                x &#8358; 35.00
                                                </span>
                                                        </div>

                                                        <figure className="product-image-container">
                                                            <a href="product.html" className="product-image">
                                                                <img src={product1} alt="product" />
                                                            </a>
                                                            <a href="#" className="btn-remove" title="Remove Product"><i className="icon-cancel"></i></a>
                                                        </figure>
                                                    </div>
                                                </div>

                                                <div className="dropdown-cart-total">
                                                    <span>Total</span>

                                                    <span className="cart-total-price">&#8358;134.00</span>
                                                </div>

                                                <div className="dropdown-cart-action">
                                                    <a href="cart.html" className="btn">View Cart</a>
                                                    <a href="checkout-shipping.html" className="btn">Checkout</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="mobile-menu-overlay" onClick={() => this._toggleMenu()}></div>

                    <div className="mobile-menu-container">
                        <div className="mobile-menu-wrapper">
                            <span className="mobile-menu-close" onClick={() => this._toggleMenu()}>
                                <i className="icon-cancel"></i></span>
                            <nav className="mobile-nav">
                                <ul className="mobile-menu">
                                    <li className="active"><Link to="/users/profile">Home</Link></li>
                                    <li>
                                        <Link to="#">Products</Link>
                                        <ul>
                                            <li><a href="category.html">Full Width Banner</a></li>
                                            <li><a href="category-banner-boxed-slider.html">Boxed Slider Banner</a></li>
                                            <li><a href="category-banner-boxed-image.html">Boxed Image Banner</a></li>
                                            <li><a href="category.html">Left Sidebar</a></li>
                                            <li><a href="category-sidebar-right.html">Right Sidebar</a></li>
                                            <li><a href="category-flex-grid.html">Product Flex Grid</a></li>
                                            <li><a href="category-horizontal-filter1.html">Horizontal Filter 1</a></li>
                                            <li><a href="category-horizontal-filter2.html">Horizontal Filter 2</a></li>
                                            <li><a href="#">Product List Item Types</a></li>
                                            <li><a href="category-infinite-scroll.html">Ajax Infinite Scroll<span className="tip tip-new">New</span></a></li>
                                            <li><a href="category.html">3 Columns Products</a></li>
                                            <li><a href="category-4col.html">4 Columns Products</a></li>
                                            <li><a href="category-5col.html">5 Columns Products</a></li>
                                            <li><a href="category-6col.html">6 Columns Products</a></li>
                                            <li><a href="category-7col.html">7 Columns Products</a></li>
                                            <li><a href="category-8col.html">8 Columns Products</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/users/profile/account">Profile</Link>
                                        <ul>
                                            <li>
                                                <Link to="/users/cart">Cart</Link>
                                                <ul>
                                                    <li><a href="product.html">Horizontal Thumbnails</a></li>
                                                    <li><a href="product-full-width.html">Vertical Thumbnails<span className="tip tip-hot">Hot!</span></a></li>
                                                    <li><a href="product.html">Inner Zoom</a></li>
                                                    <li><a href="product-addcart-sticky.html">Addtocart Sticky</a></li>
                                                    <li><a href="product-sidebar-left.html">Accordion Tabs</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/users/wishlist">WishList</Link>
                                                <ul>
                                                    <li><a href="product-sticky-tab.html">Sticky Tabs</a></li>
                                                    <li><a href="product-simple.html">Simple Product</a></li>
                                                    <li><a href="product-sidebar-left.html">With Left Sidebar</a></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link to="/users/purchases">Your Orders</Link>
                                                <ul>
                                                    <li><a href="product.html">Default Layout</a></li>
                                                    <li><a href="product-extended-layout.html">Extended Layout</a></li>
                                                    <li><a href="product-full-width.html">Full Width Layout</a></li>
                                                    <li><a href="product-grid-layout.html">Grid Images Layout</a></li>
                                                    <li><a href="product-sticky-both.html">Sticky Both Side Info<span className="tip tip-hot">Hot!</span></a></li>
                                                    <li><a href="product-sticky-info.html">Sticky Right Side Info</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link to="/users/cart">Cart <span className="tip tip-hot"> Hot!</span></Link>
                                        <ul>
                                            <li><a href="cart.html">Shopping Cart</a></li>
                                            <li>
                                                <a href="#">Checkout</a>
                                                <ul>
                                                    <li><a href="checkout-shipping.html">Checkout Shipping</a></li>
                                                    <li><a href="checkout-shipping-2.html">Checkout Shipping 2</a></li>
                                                    <li><a href="checkout-review.html">Checkout Review</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="about.html">About</a></li>
                                            <li><a href="#" className="login-link">Login</a></li>
                                            <li><a href="forgot-password.html">Forgot Password</a></li>
                                        </ul>
                                    </li>
                                    <li> <Link to="/users/purchases">Your Orders</Link>
                                        <ul>
                                            <li><a href="single.html">Blog Post</a></li>
                                        </ul>
                                    </li>
                                    {
                                        this.props.currentUser && this.props.currentUser.pinSet ? null
                                        : <li><Link to="/users/securityquestions">Set up wallet <span className="tip tip-hot"> Hot!</span></Link></li>
                                    }
                                    <li className=""><Link to="/users/banks">My Bank</Link></li>
                                    <li className=""><Link to="/users/azonkaPay">Azonka Pay</Link></li>
                                    <li className=""><Link to="/">Azonka Credit</Link></li>
                                    <li className=""><Link to="/users/referals">Referrals</Link></li>
                                    <li className=""><Link to="/users/create/shop">Store</Link></li>
                                    <li><Link to="#">Special Offer!<span className="tip tip-hot">Hot!</span></Link></li>
                                    {
                                        currentUser ?
                                        <li className="" onClick={() => {this.handleSideMenuClick('logout')}}><Link to="#">Log Out</Link></li>

                                        :

                                        <li className=""><Link to="#">Log In</Link></li>
                                    }
                                </ul>
                            </nav>

                            <div className="social-icons">
                                <Link to="#" className="social-icon" target="_blank"><i className="icon-facebook"></i></Link>
                                <Link to="#" className="social-icon" target="_blank"><i className="icon-twitter"></i></Link>
                                <Link to="#" className="social-icon" target="_blank"><i className="icon-instagram"></i></Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {home: {currentUser}} = state;
    return {
        currentUser
    }
}

export default connect(mapStateToProps, actions)(Header);