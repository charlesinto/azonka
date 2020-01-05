import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";
class StoreHeader extends Component {
    toggleViewType = viewType => {
        this.props.toggleViewType(viewType)
    }
    render() {
        const {title, viewType} = this.props;
        return (
            <div className="headline buttons primary">
					<h4>{title}</h4>
                    <div className="view-selectors" id="view-selectors">
						<div  className={`view-selector grid ${viewType === 'grid' ? 'active': ''}`} onClick={() => this.toggleViewType('grid')}></div>
						<div  className={`view-selector list ${viewType === 'list' ? 'active': ''}`} onClick={() => this.toggleViewType('list')}></div>
					</div>
					
                    
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {home:{viewType}} = state
    return {viewType}
}

export default connect(mapStateToProps, actions)(StoreHeader);