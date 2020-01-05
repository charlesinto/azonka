import React, { Component } from 'react';

class BankListItem extends Component {
    _handleRowClick = (id, action = '') => {
        this.props.handleRowClick(id, action)
    }
    render() {
        return (
            <tr>
                <td>{this.props.bank}</td>
                <td>{this.props.accountName}</td>
                <td>{this.props.accountNumber}</td>
                <td>{this.props.createdAt}</td>
                <td>
                    <div className="x-delete">
                        <span className="badge action-icon badge-warning" onClick={() => this._handleRowClick(this.props.id, 'edit')}>
                            <i className="fas fa-pen"></i>
                        </span>
                        <span className="badge action-icon badge-danger" onClick={() => this._handleRowClick(this.props.id, 'delete')}>
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                    
                </td>
                <td onClick={() => this._handleRowClick(this.props.id, 'delete')}>
                    
                </td>
            </tr>
        );
    }
}

export default BankListItem;