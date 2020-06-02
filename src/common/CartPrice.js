import React, { Component } from 'react';

class CartPrice extends Component {
    render() {
        return (
            <div>
                <div className="cart-total">
                    <p className="price"><span>&#8358;</span>112</p>
                    <p className="text-header subtotal">Cart Subtotal</p>
                </div>
                <div className="cart-total">
                    <p className="price"><span>&#8358;</span>25</p>
                    <p className="text-header subtotal">Shipping</p>
                </div>
                <div className="cart-total">
                    <p className="price medium"><span>&#8358;</span>127</p>
                    <p className="text-header total">Cart Total</p>
                </div>
            </div>
        );
    }
}

export default CartPrice;