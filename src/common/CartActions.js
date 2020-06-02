import React, { Component } from 'react';

class CartActions extends Component {
    render() {
        return (
            <div className="cart-actions">
                <a href="/checkout" className="button mid secondary">Proceed to Checkout</a>
                <a href="/" className="button mid primary spaced">Continue Browsing</a>
            </div>
        );
    }
}

export default CartActions;