import React, { Component } from 'react';
import PrdoctImage from "../css/images/products/product-4.jpg";
import { Link } from "react-router-dom";

class ProductRow extends Component {
    state = { qty: "", sum: 0 }
    componentDidMount() {
        this.setState({ sum: this.props.calSum })
        console.log("aza", this.props)
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
    handleCheckout = () => {

    }
    render() {
        let { id, name, finalPrice, mainImageUrl } = this.props
        return (
            <div class="body" key={id}>
                <tr className="product-row">
                    <td className="product-col">
                        <figure className="product-image-container">
                            <Link to="/products" className="product-image">
                                <img src={mainImageUrl} alt="product" />
                            </Link>
                        </figure>
                        <h2 className="product-title">
                            <Link to="/product">{name}</Link>
                        </h2>
                    </td>
                    <td>${finalPrice}</td>
                    <td>
                        <div className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
                            <input className="vertical-quantity form-control" value={1} type="number" onChange={this.handleChange} />
                            <span className="input-group-btn-vertical">
                                <button className="btn btn-outline bootstrap-touchspin-up icon-up-dir" type="button" onClick={this.handleIncreaseQty}></button>
                                <button className="btn btn-outline bootstrap-touchspin-down icon-down-dir" type="button" onClick={this.handleDecreaseQty}></button></span>
                        </div>

                    </td>
                    <td>${this.state.sum}</td>
                </tr>
            </div>
        );
    }
}

export default ProductRow;