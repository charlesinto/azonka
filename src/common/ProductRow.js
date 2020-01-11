import React, { Component } from 'react';
import PrdoctImage from "../css/images/products/product-4.jpg";
import { Link } from "react-router-dom";

class ProductRow extends Component {
    state = { qty: "" }
    componentDidMount() {

    }

    handleChange = (e) => {
        let { qty } = this.state;
        this.setState({ qty: e.target.value })
        console.log(this.state)
    }
    handleIncreaseQty = (e) => {
        let { qty } = this.state;

        this.setState({ qty: qty + 1 })
        console.log(this.state)
    }
    handleDecreaseQty = (e) => {

    }
    render() {
        return (
            <tr className="product-row">
                <td className="product-col">
                    <figure className="product-image-container">
                        <Link to="/products" className="product-image">
                            <img src={PrdoctImage} alt="product" />
                        </Link>
                    </figure>
                    <h2 className="product-title">
                        <Link to="/product">Men Watch</Link>
                    </h2>
                </td>
                <td>$17.90</td>
                <td>
                    <div className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
                        <input className="vertical-quantity form-control" type="number" onChange={this.handleChange} />
                        <span className="input-group-btn-vertical">
                            <button className="btn btn-outline bootstrap-touchspin-up icon-up-dir" type="button" onClick={this.handleIncreaseQty}></button>
                            <button className="btn btn-outline bootstrap-touchspin-down icon-down-dir" type="button" onClick={this.handleDecreaseQty}></button></span>
                    </div>

                </td>
                <td>$17.90</td>
            </tr>
        );
    }
}

export default ProductRow;