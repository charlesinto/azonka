import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ProductRowActions extends Component {
    render() {
        return (
            <tr className="product-action-row">
                <td colspan="4" className="clearfix">
                    <div className="float-left">
                        <Link to="#" className="btn-move">Move to Wishlist</Link>
                    </div>

                    <div className="float-right">
                        <Link to="#" title="Edit product" className="btn-edit"><span className="sr-only">Edit</span><i className="icon-pencil"></i></Link>
                        <Link to="#" title="Remove product" className="btn-remove"><span className="sr-only">Remove</span></Link>
                    </div>
                </td>
            </tr>
        );
    }
}

export default ProductRowActions;