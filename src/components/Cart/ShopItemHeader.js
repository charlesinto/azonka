import React from 'react'

export const ShopItemHeader = () => {
    return (
        <>
            <div className="banner banner-cat" >
                <div className="banner-content container">
                    <h2 className="banner-subtitle">check out over <span>200+</span></h2>
                    <h1 className="banner-title">
                        INCREDIBLE deals
</h1>
                    <a href="#" className="btn btn-dark">Shop Now</a>
                </div>
                {/* <!-- End .banner-content --> */}
            </div>
            {/* <!-- End .banner --> */}

            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html"><i className="icon-home"></i></a></li>
                        <li className="breadcrumb-item"><a href="#">Electronics</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Headsets</li>
                    </ol>
                </div>
                {/* <!-- End .container --> */}
            </nav>
        </>
    )
}
