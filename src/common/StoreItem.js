import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class StoreItem extends Component {
    state = { menu: false}
    toggleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
	}
	
	_itemClick = id => {
		this.props.initiateRegistration()
		this.props._itemClick(id)
	}
	_deleteItem = id => {

	}
    renderAvatar = () => {
        if(this.props.imageAvatar){
            return (
                <figure className="user-avatar small">
                    <img src={this.props.imageAvatar} alt="user-avatar" />
                </figure>
            )
        }
        return null
    }
    render() {
        const {name, price, description,id, category, onwer, image} = this.props
        return (
            <div className="product-item column">
					<div className="product-preview-actions">
						<figure className="product-preview-image">
							<img src={image} alt="product" />
						</figure>
						<div onClick={this.toggleMenu} className="product-settings primary dropdown-handle">
							{/* <span className="sl-icon icon-settings"></span> */}
                            <span style={{color:'#fff', fontSize: 20}}><i className="fas fa-cog"></i></span>
						</div>
						<ul className={`dropdown small hover-effect ${this.state.menu ? 'open': 'closed'}`}>
							<li className="dropdown-item" style={{padding:0}}>
								<div className="dp-triangle"></div>
								<Link to="/users/items/upload" onClick={() => this._itemClick(id) }>Edit Item</Link>
							</li>
							<li className="dropdown-item" style={{padding:0}}>
								<Link onClick={() => this._deleteItem(id)} to="#c">Delete</Link>
							</li>
						</ul>
					</div>
					<div className="product-info">
						<a href="item-v1.html">
							<p className="text-header">{name}</p>
						</a>
						<p className="product-description">{description.substr(0, 100)}</p>
						<a href="shop-gridview-v1.html">
							<p className="category primary">{category.toUpperCase()}</p>
						</a>
						<p className="price"><span>&#8358;</span>{price}</p>
					</div>
					<hr className="line-separator" />
					<div className="user-rating">
						<a href="author-profile.html">
							{this.renderAvatar()}
						</a>
						<a href="author-profile.html">
							<p className="text-header tiny">{onwer.toUpperCase()}</p>
						</a>
					</div>
				</div>
        );
    }
}

const mapStateToProps = state => {
	return {}
}

export default connect(mapStateToProps, actions)(StoreItem);