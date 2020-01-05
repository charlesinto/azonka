import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import pixel_s from "../images/items/monsters_s.jpg";

class DropdownItem extends Component {
    render() {
        return (
            <li className="dropdown-item">
                {/* <Link to="/item-v1.html" className="link-to"></Link> */}
                <div className="dropdown-triangle"></div>
                <figure className="product-preview-image tiny">
                    <img src={pixel_s} alt="pixels" />
                </figure>
                <p className="text-header tiny">Pixel Diamond Gaming Shop</p>
                <p className="category tiny primary">Shopify</p>
                <p className="price tiny"><span style={{paddingRight:5}}>&#8358;</span>86</p>
            </li>
        );
    }
}

export default DropdownItem;