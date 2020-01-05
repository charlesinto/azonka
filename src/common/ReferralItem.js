import React, { Component } from 'react';

class ReferralItem extends Component {
    render() {
        return (
            <div className="transaction-list-item">
                <div className="transaction-list-item-date" style={{width:'25%'}}>
                    <p>{this.props.date}</p>
                </div>
                <div className="transaction-list-item-author" style={{width:'30%'}}>
                    <p className="text-header">{this.props.fullName}</p>
                </div>
                <div className="transaction-list-item-item" style={{width:'30%'}}>
                    <p className="category primary">{this.props.email}</p>
                </div>
                <div className="transaction-list-item-detail" style={{width:'15%'}}>
                    <p>{this.props.type}</p>
                </div>
                {/* <div className="transaction-list-item-icon">
                </div> */}
            </div>
        );
    }
}

export default ReferralItem;