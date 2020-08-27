import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CartPrice from "../../common/CartPrice";
import CartItem from "../../common/CartItem";
import CartActions from "../../common/CartActions";
import Drawer from '@material-ui/core/Drawer';
import OrderProductRow from '../../common/OrderProductRow';
import Footer from '../HeaderFooter/Footer';
import nodataImg from '../../assets/nodatafound.png'
import MaterialTable from 'material-table'
import Pages from '../../config/pages';
import Positions from '../../config/position';
import axios from 'axios'
import Zoom from 'react-reveal/Zoom';
import notifCloseIcon from "../../images/dashboard/notif-close-icon.png";

class Cart extends Component {
    state = {
        data: [], sum: 0, cartData: [], cartLength: 0, quantity: {},
        deletedCartItems: [], changeItems: [], modal: false,
        order: null,
        showPopUp: true,
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
    }
    async componentDidMount() {
        this.props.switchActiveLink('My Orders')
        await this.loadCart()
        this.calSum()
        await this.getFeaturedCategoriesImages()
        setTimeout(() => this.setState({showPopUp: false}), 20000)
        

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
    getFeaturedCategoriesImages = async () => {
        const responseAds = await axios.get('/api/v1/ad/get-ads/0/1000')

        const ads = responseAds.data.ads.filter(item => item.page ===  Pages.ORDERS_PAGE )
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
    renderAuthDashboard = () => (
        <div className="router-container">
            <div className="row">

                <div className="col-sm-pull-12 col-md-12 col-sm-12">
                    <div className="cart">
                        <div className="cart-header">
                            <div className="cart-header-product">
                                <p className="text-header small">Product Details</p>
                            </div>
                            <div className="cart-header-category">
                                <p className="text-header small">Category</p>
                            </div>
                            <div className="cart-header-price">
                                <p className="text-header small">Price</p>
                            </div>
                            <div className="cart-header-actions">
                                <p className="text-header small">Remove</p>
                            </div>
                        </div>
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartItem />
                        <CartPrice />
                        <CartActions />
                    </div>
                </div>
            </div>
        </div>
    )
    noAuthDashboard = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-push-12 col-md-4 col-sm-12">
                        <div className="sidebar-item">
                            <h4>Redeem Code</h4>
                            <hr className="line-separator" />
                            <form id="coupon-code-form">
                                <input type="text" name="coupon_code" placeholder="Enter your coupon code..." />
                                <button className="button mid secondary">Apply Coupon Code</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-pull-12 col-md-8">
                        <div className="cart">
                            <div className="cart-header">
                                <div className="cart-header-product">
                                    <p className="text-header small">Product Details</p>
                                </div>
                                <div className="cart-header-category">
                                    <p className="text-header small">Category</p>
                                </div>
                                <div className="cart-header-price">
                                    <p className="text-header small">Price</p>
                                </div>
                                <div className="cart-header-actions">
                                    <p className="text-header small">Remove</p>
                                </div>
                            </div>
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartItem />
                            <CartPrice />
                            <CartActions />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentWillReceiveProps = props => {
        if (props.cartData !== this.props.cartData) {
            this.setState({
                cartData: props && props.cartData,
                cartLength: props.cartData ? props.cartData.length : 0
            });
        }
        else if (props.cartItems !== this.props.cartItems) {
            console.log('cart Items', props.cartItems)
            this.setState({
                quantity: props.cartItems.quantity,
                cartData: props.cartItems.products
            }, () => this.calSum())
        }
    }
    componentWillUnmount() {

        if (this.state.changeItems.length > 0) {
            this.props.initiateRegistration()
            this.props.updateCartItems(this.state.cartData, this.state.quantity, this.state.changeItems)
        }

    }
    calSum = () => {
        console.log('/>?', this.state.quantity)
        const { cartData } = this.state;
        let amountOrdered = cartData ? cartData.reduce((a, b) => {
            return a + (b.finalPrice * (this.state.quantity[b.id] || 1))
        }, 0) : 0
        this.setState({ sum: amountOrdered })
        return amountOrdered
    }
    removeFromCart = async (e) => {
        let { cartData } = this.state;
        let id = e.target.id;
        let newItems = cartData.filter(data => data.id !== id);
        localStorage.setItem("cart", JSON.stringify(newItems));
        let newCartData = JSON.parse(localStorage.getItem("cart"))
        return this.setState({ cartData: newCartData })
    }

    loadCart = async () => {

        // setInterval(async () => {
        let token = localStorage.getItem("x-access-token");
        if (token) {
            await this.props.fetchOrders();
            this.setState({
                cartData: this.props.cartItems.products,
                quantity: this.props.cartItems.quantity
            })
        }

    }

    calSums = (sum, productId, qty) => {
        console.log(qty, sum)
        const { changeItems } = this.state;
        this.setState({
            quantity:
                { ...this.state.quantity, [productId]: qty }
        }, () => {
            const { cartData } = this.state;
            cartData.forEach(element => {

                if (element.id === productId) {
                    element.amountOrdered = sum;
                } else {
                    element.amountOrdered = element.finalPrice * this.state.quantity[element.id];
                }
            })
            let amountOrdered = cartData ? cartData.reduce((a, b) => {
                return a + b.amountOrdered
            }, 0) : 0
            if (!changeItems.includes(productId)) {
                changeItems.push(productId)
            }
            this.props.setCartDropDownTotalPrice(this.state.quantity)
            this.setState({ sum: amountOrdered, changeItems: [...changeItems] })
        })

    }

    handleItemDelete = async (id) => {
        //const { cartData} = this.state;
        if (localStorage.getItem('x-access-token')) {
            this.props.initiateRegistration()
            await this.props.removeCartItem(id)
            return console.log('vvv', this.props.cartItems.products)
        }
        // const index = cartData.findIndex(element => element.id === id)
        // const deletedItems = this.state.deletedCartItems;
        // if(index !== -1){
        //     if(!deletedItems.includes(id)){
        //         deletedItems.push(id)
        //     }
        //     cartData.splice(index, 1)
        // }
        // return this.setState({
        //     cartData: [...cartData],
        //     deletedCartItems: [...deletedItems]
        // }, () => this.calSum())
    }


    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    toggleDrawer = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    payNowClickHandler = e => {
        e.preventDefault()
        if (localStorage.getItem('x-access-token')) {
            this.props.setAmount(this.state.sum)
            if (this.state.cartData.length > 0) {
                return this.props.history.push("/users/checkout")
            } else {
                return this.props.renderError('Please add 1 or more items to cart')
            }

        }
        return this.setState({ modal: true })
    }
    renderModal = () => {
        if (this.state.modal) {
            return (

                <Drawer anchor="bottom" open={this.state.modal} onClose={() => this.toggleDrawer()}>
                    <div
                        role="presentation"
                        anchor="bottom"
                        onClick={this.toggleDrawer}
                        onKeyDown={this.toggleDrawer}
                        className="modal-bottom-padding"
                    >
                        <main className="container">
                            <div className="row">
                                <div className="col-12">
                                    <article className="default-font article-header">
                                        Hello, Awesome User
                                    </article>
                                    <p className="default-font article-body" >
                                        Thank you for shopping through Azonka, please kindly <strong style={{
                                            color: '#000',
                                            textTransform: 'capitalize'
                                        }}>
                                            login or create account </strong>
                                        to make purchases and enjoy the full benefits provided for you
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div
                                        style={{
                                            display: 'flex', margin: "10px 0px",
                                            justifyContent: 'flex-end'
                                        }}>

                                        <button onClick={this.toggleDrawer} style={{ marginRight: 10 }}
                                            className="btn btn-sm btn-outline-dark">
                                            Thanks, Later
                                        </button>
                                        <Link to="/users/login" className="btn btn-sm btn-success" >
                                            Login</Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </Drawer>
            )
        }
    }

    onView = data => {
        console.log(data)
        this.setState({
            order: data
        }, () => window.$('#order-detail').modal('show'))
        
    }
    renderRows = () => {
        let orders = this.props.orders;
        orders.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
         return orders.map(data => {
                                           
            return (
                <OrderProductRow
                    calSums={(sum, productId, qty) =>
                        this.calSums(sum, productId, qty)}
                    calSum={this.calSum}
                    // quantity={this.state.quantity[data.id]}
                    handleItemDelete={this.handleItemDelete}
                    onView={this.onView}
                    
                    data={data}
                    fullData={data}
                />
            )
        })
    }
    convertToDate = data => new Date(data).toDateString()
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    deliveryAddress = () => {
        if(this.state.order && this.state.order.addressString && this.state.order.addressString.trim() !== ''){
            return this.state.order.addressString
        }
        return `${this.state.order.address.address1}, ${this.state.order.address.state}, ${this.state.order.address.country}`
    }
    render() {
        return (
            <div >
                {/* <Header /> */}
                <div className="router-container">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                                <li className="breadcrumb-item" aria-current="page"><Link to="/users/profile">Dashboard</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">My Orders</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="container-fluid" >
                        <div className="row">

                            <div className="col-lg-11 mx-auto  my-5">
                                <div className="cart-table-container container">
                                    <div className="row item-header">
                                        <div className="header-item-orderId col-md-1 ">
                                            ORDER
                                        </div>
                                        <div className="header-item-name col-md-4 ">
                                            ITEM
                                            </div>
                                        <div className="header-item-price col-md-2  text-center">
                                            UNIT PRICE
                                            </div>
                                        <div className="header-item-quantity col-md-1  text-center">
                                            QUANTITY
                                            </div>

                                        <div className="header-item-subtotal col-md-2  text-center">
                                            SUBTOTAL
                                            </div>
                                        <div className="header-item-subtotal col-md-1  text-center">
                                            STATUS
                                            </div>
                                            <div className="header-item-subtotal col-md-1  text-center">
                                            Action
                                            </div>
                                    </div>

                                    {/* TABLE DETAILS START */}

                                    {

                                        this.props.orders && this.props.orders.length > 0 ? this.renderRows() : (
                                                <div className="row d-flex justify-content-center my-5">
                                                    <img src={nodataImg} alt="Empty state" className="img-empty-state" />
                                                </div>
                                            )
                                    }

                                    {/* TABLE DETAILS END */}

                                </div>

                                {/* <div className="cart-discount">
                                    <h4>Apply Discount Code</h4>
                                    <form action="#">
                                        <div className="input-group">
                                            <input type="text" className="form-control form-control-sm" placeholder="Enter discount code" />
                                            <div className="input-group-append">
                                                <button className="btn btn-sm btn-primary" type="submit">Apply Discount</button>
                                            </div>
                                        </div>
                                    </form>
                                </div> */}
                            </div>


                        </div>
                    </div>

                    <div className="mb-6"></div>
                </div>
                {
                    this.renderModal()
                }
                <div class="modal fade" id="order-detail" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Order Number: {this.state.order && this.state.order.id}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body orders container-fluid">
                            <p className="row"><h4 className="col-md-4 col-xs-12">Date Created</h4> <span className="col-md-8 col-xs-12">{this.state.order && this.convertToDate(this.state.order.createdAt)}</span></p>
                            <p className="row"><h4 className="col-md-4 col-xs-12">Payment Mode</h4> <span style={{width:'fit-contents'}} className="col-md-8 col-xs-12 "><span className="payment-type-wrapper"><span className="payment-type">{this.state.order && this.state.order.paymentType}</span></span></span></p>
                            <p className="row"><h4 className="col-md-4 col-xs-12">Total Amount Paid</h4> <span className=" col-md-8 col-xs-12 money"><span>&#8358; {this.state.order && this.numberWithCommas(this.state.order.totalAmount)}</span></span></p>
                            <p className="row"><h4 className="col-md-4 col-xs-12">Delivery Status</h4> <span className=" col-md-8 col-xs-12 text-transform-upper"><span>{this.state.order && this.state.order.status}</span></span></p>
                            <p className="row"><h4 className="col-md-4 col-xs-12">Delivery Address</h4> <span className=" col-md-8 col-xs-12"><span>{this.state.order && this.deliveryAddress()}</span></span></p>
                            <div className="order-table">
                            <MaterialTable
                                components={{
                                    Action: (props) => {
                                        console.log(props)
                                        if(props.action.icon === 'save'){
                                            return <a target="_blank" rel="noopener noreferrer"  href={`/store/qrcode-generate/${props.data.deliveryCode}`}  className="btn btn-lg btn-primary">Generate Qr Code</a>
                                        }
                                        return <button>Hello</button>
                                    }
                                }}
                                columns={[
                                    { title: 'Delivery Id', field: 'id' },
                                    { title: 'Payment Mode', field: 'paymentType' },
                                    { title: 'Delivery Code', field: 'deliveryCode'},
                                    { title: 'Delivery Days', field: 'deliveryDays'},
                                    {title: 'Total Amount(NGN)', field: 'totalAmount'}
                                ]}
                                data={this.state.order ? this.state.order.delivery : []}
                                title=""
                                options={{
                                    headerStyle: {
                                        background: '#FA6400',
                                        color: '#FFF',
                                        fontFamily: '"Open Sans", sans-serif',
                                        fontWeight: 'bold',
                                        zIndex:1,
                                        
                                    },
                                    searchFieldStyle:{
                                        
                                    },
                                    actionsColumnIndex: -1
                                    
                                  }}
                                actions={[
                                    {
                                      icon: 'save',
                                      tooltip: 'Save User',
                                      onClick: (event, rowData) => {
                                        // Do save operation
                                      },
                                    },
                                    
                                  ]}
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Close</button>
                            
                        </div>
                        </div>
                    </div>
                </div>
                <div className=" bottom-banner mt-3">
                                        <img alt="bottom" src={`${this.state.bottomBanner ? this.state.bottomBanner.url : "https://ng.jumia.is/cms/Homepage/2020/W34/DontMissTheAction_1424x768_Slider-min.jpg"}`} />
                            </div>
                {this.renderPopup()}
                <Footer />
            </div>
        )
    }
}

/*
style={{ background: "#cac2c233" }}
*/

const mapStateToProps = state => {

    let { categories, cartItems, cartData, orders } = state.inventory
    // console.log('cartData', cartData, orders)
    return {
        categories, cartItems, cartData, orders
    }
}



export default connect(mapStateToProps, actions)(Cart)