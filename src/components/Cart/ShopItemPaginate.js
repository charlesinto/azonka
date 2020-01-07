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
                        <a className="page-link page-link-btn" href="#"><i className="icon-angle-left"></i></a>
                    </li>
                    <li className="page-item active">
                        <a className="page-link" href="#">1 <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#">4</a></li>
                    <li className="page-item"><span>...</span></li>
                    <li className="page-item"><a className="page-link" href="#">15</a></li>
                    <li className="page-item">
                        <a className="page-link page-link-btn" href="#"><i className="icon-angle-right"></i></a>
                    </li>
                </ul>
            </nav>
        </>
    )
}
