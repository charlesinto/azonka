
import React, { Component } from 'react'

class ShopItemAside extends Component {
    state = { priceRange: 0 }
    handleRange = (e) => {
        console.log(e.target.value)
        this.setState({ priceRange: e.target.value })
    }
    handleRangeSubmit = async () => {

    }
    render() {
        let { priceRange } = this.state
        return (
            <aside className="sidebar-shop col-lg-3 order-lg-first">
                <div className="sidebar-wrapper">
                    <div className="widget">
                        <h3 className="widget-title">
                            <a data-toggle="collapse" href="#widget-body-1" role="button" aria-expanded="true"
                                aria-controls="widget-body-1">electronics</a>
                        </h3>

                        <div className="collapse show" id="widget-body-1">
                            <div className="widget-body">
                                <ul className="cat-list">
                                    {/* {

                                    } */}
                                    <li><a href="#">Smart TVs</a></li>
                                    <li><a href="#">Cameras</a></li>
                                    <li><a href="#">Head Phones</a></li>
                                    <li><a href="#">Games</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="widget">
                        <h3 className="widget-title">
                            <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true"
                                aria-controls="widget-body-2">Price- ₦{priceRange ? priceRange : 100}</a>
                        </h3><br />

                        <input type="range" class="form-control-range"
                            name="points" min="100" max="1000000" onChange={this.handleRange} />

                        <div className="collapse show" id="widget-body-2">
                            <div className="widget-body">
                                <form action="#">
                                    <div className="price-slider-wrapper">
                                        <div id="price-slider"></div>
                                    </div>

                                    <div className="filter-price-action mx-auto">
                                        <button type="submit" className="btn btn-primary">Filter</button><br />
                                    </div>
                                </form>
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


export default ShopItemAside