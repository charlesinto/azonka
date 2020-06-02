import React, { Component } from 'react';

class NoRecordFound extends Component {
    render() {
        return (
            <div style={{ width: '100%', display: 'flex',marginBottom: 10, marginTop: 10,
             justifyContent: 'center', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontFamily: 'Roboto' }} >No Records Found</span>
            </div>
        );
    }
}

export default NoRecordFound;