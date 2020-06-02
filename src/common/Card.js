import React, { Component } from 'react';

class Card extends Component {
    renderFeatured(){
      return  this.props.feature ? (
            <span className="pin featured">Featured</span>
        ) : null
    }
    render() {
        return (
            <div>
                <div className="product-item column product-item-fr">
                        {this.renderFeatured()}
						<div className="product-preview-actions">
							<figure className="product-preview-image">
								<img src={this.props.image} alt="product"/>
							</figure>
							<div className="preview-actions">
								<div className="preview-action">
									<a href="item-v1.html">
										<div className="circle tiny primary">
                                            {/* s */}
                                            <span className="font-contianer"><i className="fas fa-tag font-icon"></i></span>
										</div>
									</a>
									<a href="item-v1.html">
										<p>Go to Item</p>
									</a>
								</div>
								<div className="preview-action">
									<a href="/">
										<div className="circle tiny secondary">
                                            <span className="font-contianer"><i className="far fa-heart font-icon"></i></span>
										</div>
									</a>
									<a href="/">
										<p>Favourites +</p>
									</a>
								</div>
							</div>
						</div>
						<div className="product-info">
							<a href="item-v1.html">
								<p className="text-header">Miniverse - Hero Image Composer</p>
							</a>
							<p className="product-description">Lorem ipsum dolor sit urarde...</p>
							<a href="shop-gridview-v1.html">
								<p className="category primary">Hero Images</p>
							</a>
							<p className="price"><span>&#8358;</span>12</p>
						</div>
						<hr className="line-separator" />
					</div>
            </div>
        );
    }
}

export default Card;