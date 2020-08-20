import React from 'react'

export const ShopItemPaginate = () => {
    return (
        <>
            <nav className="toolbox toolbox-pagination">
                <div className="toolbox-item toolbox-show">
                    <label>Showing 1–9 of 60 results</label>
                </div>
                {/* <!-- End .toolbox-item --> */}

                <ul className="pagination">
                    <li className="page-item disabled">
                        <a className="page-link page-link-btn" href="#n"><i className="icon-angle-left"></i></a>
                    </li>
                    <li className="page-item active">
                        <a className="page-link" href="#n">1 <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#n">2</a></li>
                    <li className="page-item"><a className="page-link" href="#n">3</a></li>
                    <li className="page-item"><a className="page-link" href="#n">4</a></li>
                    <li className="page-item"><span>...</span></li>
                    <li className="page-item"><a className="page-link" href="#n">15</a></li>
                    <li className="page-item">
                        <a className="page-link page-link-btn" href="#n"><i className="icon-angle-right"></i></a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
