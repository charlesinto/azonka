
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class ShopItemAside extends Component {
    state = { priceRange: 0 }
    handleRange = (e) => {
        console.log(e.target.value)
        this.setState({ priceRange: e.target.value })
    }
    handleSearchSubmit = async () => {
        let { name, categoryValue, priceRange } = this.state
        let category = categoryValue, finalPrice = priceRange;
        if (finalPrice <= 100) return null
        this.props.history.push(`/shop?price=${finalPrice}`);
        window.location.reload()
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
                                aria-controls="widget-body-1">electronics</Link>
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
                                aria-controls="widget-body-2">Price- ₦{priceRange ? priceRange : 100}</Link>
                        </h3><br />

                        <input type="range" class="form-control-range"
                            name="points" min="100" max="1000000" onChange={this.handleRange} />

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


export default withRouter(ShopItemAside)