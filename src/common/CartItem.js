import React, { Component } from 'react';
import { red } from '@material-ui/core/colors';
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from '@material-ui/core/Icon';
import item from "../images/items/westeros_s.jpg";

class CartItem extends Component {
    render() {
        const {classes} = this.props
        return (
            <div>
                <div className="cart-item">
						<div className="cart-item-product">
							<div className="item-preview">
								<a href="item-v1.html">
									<figure className="product-preview-image small liquid">
										<img src={item} alt="item to buy" />
									</figure>
								</a>
								<a href="item-v1.html" className="normalize-style-cart-item"><p className="text-header small">Westeros Custom Clothing</p></a>
								<p  className="description normalize-style-cart-item">Lorem ipsum dolor sit urarde adipisicing elit dem...</p>
							</div>
						</div>
						<div className="cart-item-category">
							<a href="shop-gridview-v1.html" className="category primary">PSD Templates</a>
						</div>
						<div className="cart-item-price">
							<p className="price"><span>&#8358;</span>14</p>
						</div>
						<div className="cart-item-actions">
							{/* <a href="/" className="button dark-light rmv">
								+<i class="fas fa-minus-circle"></i>
                            </a> */}
                            <Icon
                                className={`${classes.iconHover} fas fa-minus-circle`}
                                color="error"
                                style={{ fontSize: 30 }}
                            />
						</div>
					</div>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        '& > .fa': {
          margin: theme.spacing(2),
          
        },
      },
      iconHover: {
        margin: theme.spacing(2),
        '&:hover': {
          color: red[800],
          cursor: 'pointer'
        },
      }
})

export default withStyles(styles)((CartItem));