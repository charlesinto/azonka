import React, { Component } from 'react';
import { Link } from "react-router-dom";

class DropdownTotal extends Component {
    render() {
        return (
            <li className="dropdown-item">
                <p className="text-header tiny">Total</p>
                <p className="price"><span style={{paddingRight:5}}>&#8358;</span>108.00</p>
                <Link to="/users/cart" className="button primary half">Go to Cart</Link>
                <Link to="/users/checkout" className="button secondary half">Go to Checkout</Link>
            </li>
        );
    }
}

export default DropdownTotal;