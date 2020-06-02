import React, { Component } from 'react';

class ListCard extends Component {

    renderRating = () => {
        const ratings = []
        for(let i = 0; i < this.props.rating; i++){
            ratings.push(
                
                    <span>
                        <i style={{color:'#ffc000'}} className="fas fa-star"></i>
                    </span>
            )
        }
        return ratings.map((element, i) => (
            <li className="rating-item" key={i}>
                {element}
            </li>
        ))
    }
    render() {
        const {image, feature} = this.props;
        return (
                <div className="list-product-item">
                    <div className="list-image" style={{position:'relative'}}>
                        <a href="item-v1.html">
                            <figure className="product-preview-image small">
                                <img src={image} alt="product" />
                            </figure>
                        </a>
                        { feature ? <span class="pin featured list-card-featured">Featured</span> : null}
                    </div>
                    
                <div className="list-product-info">
                    <a href="item-v1.html">
                        <p className="text-header">Miniverse - Hero Image Composer</p>
                    </a>
                    <p className="list-product-description">Lorem ipsum dolor sit urarde...</p>
                    <a href="shop-gridview-v1.html">
                        <p className="category primary">Hero Images</p>
                    </a>
                </div>
                <div className="list-author-data">
                    <p className="text-header tiny">Reviews</p>
                    <ul className="rating">
                        {this.renderRating()}
                    </ul>
                </div>
                <div className="list-item-actions">
                    <a href="/" data-toggle="list-tooltip" className="list-tooltip" title="Add to Favourites">
                        <div className="circle tiny">
                            <span>
                            <i class="far fa-heart" style={{color:'#fff'}}></i>
                            </span>
                        </div>
                        
                    </a>
                </div>
                <div className="list-price-info">
                    <p className="list-price medium"><span>&#8358;</span>12</p>
                </div>
            </div>
        );
    }
}

export default ListCard;