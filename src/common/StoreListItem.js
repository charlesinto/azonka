import React, { Component } from 'react';

class StoreListItem extends Component {
    _handleRowClick = (id) => {
        this.props.handleRowClick(id)
    }
    render() {
        return (
            <tr>
                <td>{this.props.country}</td>
                <td>{this.props.state}</td>
                <td>{this.props.address}</td>
                <td>{this.props.name}</td>
                <td>{this.props.date}</td>
                <td onClick={() => this._handleRowClick(this.props.id)}>
                    <div className="x-delete">
                        <span className="badge badge-danger">
                            <i className="fas fa-pen"></i>
                        </span>
                    </div>
                    
                </td>
            </tr>
            // <div className="transaction-list-item store-row" onClick={() => this._handleRowClick(this.props.id)}>
            //     <div className="transaction-list-item-date shop-list-item" style={{width:'15%'}}>
            //         <p>{this.props.country}</p>
            //     </div>
            //     <div className="transaction-list-item-author" style={{width:'15%'}}>
            //         <p className="text-header">{this.props.state}</p>
            //     </div>
            //     <div className="transaction-list-item-item shop-list-item" style={{width:'30%'}}>
            //         <p className="category primary">{this.props.address}</p>
            //     </div>
            //     <div className="transaction-list-item-detail shop-list-item" style={{width:'25%'}}>
            //         <p>{this.props.name}</p>
            //     </div>
            //     <div className="transaction-list-item-detail shop-list-item" style={{width:'15%'}}>
            //         <p>{this.props.date}</p>
            //     </div>
            //     {/* <div className="transaction-list-item-icon">
            //     </div> */}
            // </div>
        );
    }
}

export default StoreListItem;