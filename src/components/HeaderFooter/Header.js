import React, { Component } from 'react';
import { Link, withRouter, } from "react-router-dom";
import englishFlag from "../../css/images/flags/en.png";
import nigeriaFlag from "../../css/images/flags/nigeria.png";
import frenchFlag from "../../css/images/flags/fr.png";
import azonkaLogo from "../../images/logo_header.png";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CartDropdown from '../Cart/CartDropdown';
import queryString from "query-string";

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileMenu: false,
            showSearchBar: false,
            currentUser: null,
            cartData: [],
            name: "",
            selectedValue: "",
            categoryValue: ""
        }

    }
    async componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        const { category } = params;
        await this.setState({ selectedValue: category })
        document.querySelector('#category').addEventListener('change', function (e) {
            
            console.log(this.dataset.search)
        })
        const user = JSON.parse(localStorage.getItem('azonta-user'))
        let cartData = JSON.parse(localStorage.getItem("cart"));
        this.$select = React.createRef()
        this.setState({
            currentUser: user, cartData
        })
        this.loadSearchCategory()
        this.loadCart()

    }
    componentWillUnmount() {
        document.querySelector('#category').removeEventListener('change', () => { })
    }
    _toggleMenu = () => {
        this.setState({
            mobileMenu: !this.state.mobileMenu
        })
    }


    handleSideMenuClick = link => {
        switch (link) {
            case 'logout':
                this.props.logout()
                break;
            default:
                return;
        }
    }
    _showSearchBar = () => {
        this.setState({
            showSearchBar: !this.state.showSearchBar
        })
    }
    loadSearchCategory = async () => {
        await this.props.fetchSearchCategory()
        this.setState({ category: this.props.categories })
    }

    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.currentUser !== state.currentUser){
           
            return {...state, currentUser: nextProps.currentUser}
        }

        return null;
        
    }

    loadCart = async () => {
        let token = localStorage.getItem("x-access-token");
        if (token) {
            await this.props.fetchCart()
            this.setState({ cartData: this.props.cartItems })
        } else {
            await this.props.fetchLocalCart()
            let { cartData } = this.props;
            this.setState({ cartData })
        }
    }

    handleSearchChange = (e) => {
        console.log(e)
        this.setState({ name: e.target.value })
        this.setState({ category: this.props.categories })
    }
    handleSelectChange(e, $this) {
        $this.setState({ categoryValue: e.target.value, selectedValue: e.target.value })
    }
    handleSearchSubmit = async () => {
        let { name, categoryValue } = this.state
        let category = categoryValue;
        category = category === "Select category" || category === "" ? "0" : category;
        this.props.history.push(`/shop?name=${name}&category=${category}`);
    }
    handleEnterSubmit = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            return this.handleSearchSubmit()
        }
    }


    render() {
        const { currentUser } = this.state;
        let { category } = this.state;
        return (
            <div>
                <div className={`page-wrapper ${this.state.mobileMenu ? 'mmenu-active' : ''}`} style={{ position: 'fixed', zIndex: '1000', width: '100%' }}>
                    <header className="header" style={{ marginLeft: 0, marginRight: 0, width: '100%', maxWidth: '100%' }}>
                        <div className="header-top">
                            <div className="container-fluid">
                                <div className="header-left header-dropdowns">
                                    <div className="header-dropdown">
                                        <a href="#N">NGN</a>
                                        <div className="header-menu">
                                            <ul>
                                                <li><a href="#M">NGN</a></li>
                                                <li><a href="#N">USD</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="header-dropdown">
                                        <a href="#N"><img src={nigeriaFlag} alt="England flag" />NIGERIA</a>
                                        <div className="header-menu">
                                            <ul>
                                                <li><a href="#N"><img src={nigeriaFlag} alt="England flag" />NIGERIA</a></li>
                                                <li><a href="#N"><img src={englishFlag} alt="England flag" />ENGLISH</a></li>
                                                <li><a href="#N"><img src={frenchFlag} alt="France flag" />FRENCH</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <div className="dropdown compare-dropdown" style={{ border: 'none', zIndex: '900', backgroundColor: 'transparent', position: 'relative' }}>
                                        <a href="#N" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                            <i className="icon-retweet"></i> Compare (2)
                                        </a>

                                        <div className="dropdown-menu">
                                            <div className="dropdownmenu-wrapper">
                                                <ul className="compare-products">
                                                    <li className="product">
                                                        <a href="#N" className="btn-remove" title="Remove Product"><i className="icon-cancel"></i></a>
                                                        <h4 className="product-title"><a href="product.html">Lady White Top</a></h4>
                                                    </li>
                                                    <li className="product">
                                                        <a href="#N" className="btn-remove" title="Remove Product"><i className="icon-cancel"></i></a>
                                                        <h4 className="product-title"><a href="product.html">Blue Women Shirt</a></h4>
                                                    </li>
                                                </ul>

                                                <div className="compare-actions">
                                                    <a href="#N" className="action-link">Clear All</a>
                                                    <a href="#N" className="btn btn-primary">Compare</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="header-right">
                                    <p className="welcome-msg" style={{ color: '#bce1f4', fontSize: '1.1rem' }}>{
                                        currentUser ?
                                            `${currentUser.firstName} ${currentUser.lastName}`
                                            : `Welcome to Azonka`

                                    }</p>

                                    <div className="header-dropdown dropdown-expanded">
                                        <a href="#N">Links</a>
                                        <div className="header-menu">
                                            <ul>
                                                <li><Link to="/users/profile">MY ACCOUNT </Link></li>
                                                <li><Link to="/wishlist">MY WISHLIST </Link></li>
                                                <li><Link to="#">Contact</Link></li>
                                                {
                                                    currentUser ?
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
                                    <Link to="/" style={{ display: 'block' }} className="logo">
                                        <img src={azonkaLogo} alt="Porto Logo" />
                                    </Link>
                                </div>
                                <div className="header-center">
                                    <div className="header-search">
                                        <a href="#N" className="search-toggle"
                                            onClick={() => this._showSearchBar()} role="button"><i className="icon-magnifier"></i></a>
                                        <form action="#" method="get">
                                            <div className={`header-search-wrapper ${this.state.showSearchBar ? 'show' : ''}`}>
                                                <input type="text" className="form-control" id="name" placeholder="Search..." value={this.state.name} required={false} onChange={this.handleSearchChange}
                                                    onKeyPress={this.handleEnterSubmit} />
                                                <div className="select-custom">
                                                    <select value={this.state.selectedValue} id="category" onChange={(e) => this.handleSelectChange(e, this)} >
                                                        <option className=".option">Select category</option>
                                                        {
                                                            category ? (
                                                                category.map(_data => {
                                                                    let { id, name, owner } = _data;
                                                                    return (

                                                                        <option className=".option" value={id} key={id} id={id} data-search={name} data-owner={owner}>- {name}</option>
                                                                    )
                                                                })
                                                            ) : (
                                                                    <option className=".option" value="">- Loading...</option>
                                                                )
                                                        }
                                                    </select>
                                                </div>
                                                <button className="btn" type="button" onClick={this.handleSearchSubmit}><i className="icon-magnifier"></i></button>
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
                                        <a href="tel:#+234"><strong>+234</strong></a>
                                    </div>
                                    <CartDropdown />
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
                                    <li onClick={() => this._toggleMenu()}><Link to="/">Home</Link></li>
                                    
                                    <li onClick={() => this._toggleMenu()}>
                                        <Link to="/users/profile">Profile</Link>
                                        <ul>
                                            <li>
                                                <Link to="/users/cart">Cart</Link>
                                                {/* <ul>
                                                    <li><a href="product.html">Horizontal Thumbnails</a></li>
                                                    <li><a href="product-full-width.html">Vertical Thumbnails<span className="tip tip-hot">Hot!</span></a></li>
                                                    <li><a href="product.html">Inner Zoom</a></li>
                                                    <li><a href="product-addcart-sticky.html">Addtocart Sticky</a></li>
                                                    <li><a href="product-sidebar-left.html">Accordion Tabs</a></li>
                                                </ul> */}
                                            </li>
                                            <li onClick={() => this._toggleMenu()}>
                                                <Link to="/users/wishlist">WishList</Link>
                                                {/* <ul>
                                                    <li><a href="product-sticky-tab.html">Sticky Tabs</a></li>
                                                    <li><a href="product-simple.html">Simple Product</a></li>
                                                    <li><a href="product-sidebar-left.html">With Left Sidebar</a></li>
                                                </ul> */}
                                            </li>
                                            <li onClick={() => this._toggleMenu()}>
                                                <Link to="/users/placed-orders">Your Orders</Link>
                                                {/* <ul>
                                                    <li><a href="product.html">Default Layout</a></li>
                                                    <li><a href="product-extended-layout.html">Extended Layout</a></li>
                                                    <li><a href="product-full-width.html">Full Width Layout</a></li>
                                                    <li><a href="product-grid-layout.html">Grid Images Layout</a></li>
                                                    <li><a href="product-sticky-both.html">Sticky Both Side Info<span className="tip tip-hot">Hot!</span></a></li>
                                                    <li><a href="product-sticky-info.html">Sticky Right Side Info</a></li>
                                                </ul> */}
                                            </li>
                                        </ul>
                                    </li>
                                    {
                                        this.props.currentUser && this.props.currentUser.pinSet ? null
                                            : <li><Link to="/users/securityquestions">Set up wallet <span className="tip tip-hot"> Hot!</span></Link></li>
                                    }
                                    <li onClick={() => this._toggleMenu()} className=""><Link to="/users/banks">My Bank</Link></li>
                                    <li onClick={() => this._toggleMenu()} className=""><Link to="/users/azonkaPay">Azonka Pay</Link></li>
                                    <li onClick={() => this._toggleMenu()} className=""><Link to="/">Azonka Credit</Link></li>
                                    <li onClick={() => this._toggleMenu()} className=""><Link to="/users/referals">Referrals</Link></li>
                                    <li onClick={() => this._toggleMenu()} className=""><Link to="/users/create/shop">Store</Link></li>
                                    
                                    {
                                        currentUser ?
                                            <li className="" onClick={() => { this.handleSideMenuClick('logout') }}><Link to="#">Log Out</Link></li>

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
    let { categories, cartItems, cartData, products } = state.inventory

    const { home: { currentUser } } = state;
    return {
        currentUser, categories, cartItems, cartData, products
    }
}

export default withRouter(connect(mapStateToProps, actions)(Header));