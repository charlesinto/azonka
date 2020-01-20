import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import { connect } from "react-redux";
import * as actions from "../../actions";

class StoreDashboard extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="router-container">
                    <main className="main">
                        <nav aria-label="breadcrumb" className="breadcrumb-nav">
                            <div className="container-fluid list-breadcrumbs">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page"><Link to="/users/profile">Dashboard</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">My Business</li>
                                    <li className="breadcrumb-item active" aria-current="page">{this.props.dashboardActiveLink}</li>
                                </ol>

                            </div>

                        </nav>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-9 order-lg-last dashboard-content">
                                    {this.props.children}
                                </div>

                                <aside className="sidebar col-lg-3">
                                    <div className="widget widget-dashboard list-breadcrumbs">
                                        <ul className="list">
                                            <li style={{ position: 'relative' }} className={this.props.dashboardActiveLink === 'Company Detail' ?
                                                'active' : ''}><Link to="/users/store">Company</Link>
                                            </li>
                                            <li className={this.props.dashboardActiveLink === 'Manage Store' ? 'active' : ''}><Link to="/users/create/shop">Manage Store</Link></li>
                                            {/* <li className={this.props.dashboardActiveLink === 'Create Item' ? 'active' : ''}><Link to="/users/items/upload">Create Item</Link></li> */}
                                            <li className={this.props.dashboardActiveLink === 'Manage Items' || this.props.dashboardActiveLink === 'Create Item'
                                                 ? 'active' : ''}><Link to="/users/items/manage">Manage Items</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Product Review' ? 'active' : ''}><Link to="#">Product Reviews</Link></li>
                                            <li className={this.props.dashboardActiveLink === 'Sales Statement' ? 'active' : ''}><Link to="#">Statement</Link></li>


                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="mb-5"></div>
                    </main>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { home: { dashboardActiveLink } } = state;
    return {
        dashboardActiveLink
    }

}

export default connect(mapStateToProps, actions)(StoreDashboard);