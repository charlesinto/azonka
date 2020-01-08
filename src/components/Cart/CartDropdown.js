import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

export const CartDropdown = ({ localData }) => {
    console.log("props", localData)
    const [data, setData] = useState([])
    const [itemSum, setItemSum] = useState(0)

    let loadCartData = () => {
        setData(localData)
        console.log("props data", data)
    }
    let calSum = () => {
        let sum = data ? data.reduce((a, b) => {
            return a + b.finalPrice
        }, 0) : 0
        setItemSum(sum)
    }

    useEffect(() => {
        loadCartData()
        calSum()
    }, [data, itemSum])
    return (
        <>
            <div className="dropdown cart-dropdown" style={{
                background: 'transparent', border: 'none', position: 'relative',
                width: 'fit-content'
            }}>
                <Link to="/users/cart" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                    <span className="cart-count">2</span>
                </Link>

                <div className="dropdown-menu">
                    <div className="dropdownmenu-wrapper">
                        <div className="dropdown-cart-products">

                            {/* CART ITEMS START */}

                            {
                                data ? (
                                    data.map(_data => {
                                        console.log(_data)
                                        let { id, name, sellingPrice, mainImageUrl } = _data
                                        return (
                                            <div className="product" key={id}>
                                                <div className="product-details">
                                                    <h4 className="product-title">
                                                        <Link to="product.html">{name}</Link>
                                                    </h4>

                                                    <span className="cart-product-info">
                                                        <span className="cart-product-qty">1</span>
                                                        x &#8358; {sellingPrice}
                                                    </span>
                                                </div>
                                                <figure className="product-image-container">
                                                    <Link to="product.html" className="product-image">
                                                        <img src={mainImageUrl} alt="product" />
                                                    </Link>
                                                    <Link to="#" className="btn-remove" title="Remove Product"><i className="icon-cancel"></i></Link>
                                                </figure>
                                            </div>
                                        )
                                    })
                                ) : (
                                        <div>No data yet</div>
                                    )
                            }



                            {/* CART ITEMS END */}

                        </div>

                        <div className="dropdown-cart-total">
                            <span>Total</span>

                            <span className="cart-total-price">&#8358; {itemSum}</span>
                        </div>

                        <div className="dropdown-cart-action">
                            <Link to="/shop" className="btn">View Cart</Link>
                            <Link to="/shop" className="btn">Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
