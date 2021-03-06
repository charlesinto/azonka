
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from "react-redux";
import * as actions from "../../actions";

class ShopItemAside extends Component {
    state = { priceRange: 1000 }
    handleRange = (e) => {
        console.log(e.target.value)
        this.setState({ priceRange: e.target.value })
    }
    handleSearchSubmit = async () => {
        let {  priceRange } = this.state
        // let category = categoryValue
        let finalPrice = priceRange;
        this.props.history.push(`/shop?price=${finalPrice}`);
        // window.location.reload()
    }
    handleRangeSubmit = async (e) => {
        e.preventDefault();
        this.handleSearchSubmit()
    }
    render() {
        let { priceRange } = this.state
        return (
            <aside className="sidebar-shop col-lg-3 order-lg-first">
                <div className="sidebar-wrapper">
                    <div className="widget">
                        <h3 className="widget-title">
                            <Link data-toggle="collapse" to="#widget-body-1" role="button" aria-expanded="true"
                                    aria-controls="widget-body-1">{this.props.searchCategory}</Link>
                        </h3>

                        <div className="collapse show" id="widget-body-1">
                            <div className="widget-body">
                                <ul className="cat-list">
                                    {/* {

                                    } */}
                                    <li><Link to="#">Smart TVs</Link></li>
                                    <li><Link to="#">Cameras</Link></li>
                                    <li><Link to="#">Head Phones</Link></li>
                                    <li><Link to="#">Games</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="widget">
                        <h3 className="widget-title">
                            <Link data-toggle="collapse" to="#widget-body-2" role="button" aria-expanded="true"
                                aria-controls="widget-body-2">Price- ₦{priceRange ? priceRange : 1000}</Link>
                        </h3><br />

                        <input type="range" class="form-control-range"
                            name="points" min="1000" max="1000000" onChange={this.handleRange} />

                        <div className="collapse show" id="widget-body-2">
                            <div className="widget-body">
                                <div className="price-slider-wrapper">
                                    <div id="price-slider"></div>
                                </div>

                                <div className="filter-price-action mx-auto">
                                    <button type="button" className="btn btn-primary" onClick={this.handleRangeSubmit}>Filter</button><br />
                                </div>
                            </div>
                            {/* <!-- End .widget-body --> */}
                        </div>
                        {/* <!-- End .collapse --> */}
                    </div>
                </div>
                {/* <!-- End .sidebar-wrapper --> */}
            </aside>
        )
    }
}

const mapStateToProps = state => {
    const {search:{searchCategory}} = state;
    return {searchCategory}
}


export default connect(mapStateToProps, actions)(withRouter(ShopItemAside))