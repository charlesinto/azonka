import React from 'react';
import { Link } from "react-router-dom";

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
                        <Link className="page-link page-link-btn" to="#"><i className="icon-angle-left"></i></Link>
                    </li>
                    <li className="page-item active">
                        <Link className="page-link" to="#n">1 <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="page-item"><Link className="page-link" to="#n">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="#n">3</Link></li>
                    <li className="page-item"><Link className="page-link" to="#n">4</Link></li>
                    <li className="page-item"><span>...</span></li>
                    <li className="page-item"><Link className="page-link" to="#n">15</Link></li>
                    <li className="page-item">
                        <Link className="page-link page-link-btn" to="#n"><i className="icon-angle-right"></i></Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}
