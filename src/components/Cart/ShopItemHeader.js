import React from 'react'
import { Link } from "react-router-dom";

export const ShopItemHeader = ({categoryName, productName}) => {
    return (
        <>
            <div className="banner banner-cat" >
                <div className="banner-content container">
                    <h2 className="banner-subtitle">check out over <span>200+</span></h2>
                    <h1 className="banner-title">
                        INCREDIBLE deals
</h1>
                    <a href="#n" className="btn btn-dark">Shop Now</a>
                </div>
                {/* <!-- End .banner-content --> */}
            </div>
            {/* <!-- End .banner --> */}

            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                        <li className="breadcrumb-item"><Link to="#n">{categoryName}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{productName}</li>
                    </ol>
                </div>
                {/* <!-- End .container --> */}
            </nav>

        </>
    )
}
