import React, {Component} from 'react';
import { connect } from "react-redux";

import * as actions from "../../actions";
import Dashboard from '../HOC/Dashboard';
import LineChart from '../../common/LineChart';
import AzonkaCreditDataTable from '../../common/AzonkaCreditDataTable';


class MyAzonkaCredits extends Component{
    INITIAL_STATE = {
        title: "Categories",
        data: [
          {
            type: "Product Review",
            value: 46,
            createdAt: new Date()
          },
          {
            type: "Mobile App Download",
            value: 87,
            createdAt: new Date()
          },
          {
            type: "Rejection of Sale",
            value: -10,
            createdAt: new Date()
          },
          {
            type: "Successful Transaction",
            value: 4,
            createdAt: new Date()
          },
          {
            type: "Social Media Follows",
            value: 32,
            createdAt: new Date()
          },
          {
            type: "Account verfication",
            value: 16,
            createdAt: new Date()
          }

          
        ]
      }
      constructor(props){
          super(props);
          this.state = {...this.INITIAL_STATE}
      }
    componentDidMount(){
        this.props.setActiveLink('My Azonka Credits')
    }
    numberWithCommas = (number = '') => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render(){
        return (
            <Dashboard>
                <div className="container">
                    <div className="row">
                        <div className="current-balance mt-card">
                            <span>Total Credits</span>
                            <span className="text-default"> {this.numberWithCommas(1500)}</span>
                        </div>
                    </div>
                    <div className="row">
                        <LineChart title={this.state.title} data={this.state.data}/>
                    </div>
                    <div className="row">
                        <div style={{margin: '16px 0px', width:'100%'}}>
                            <AzonkaCreditDataTable data={this.state.data} />
                        </div>
                        
                    </div>
                </div>
            </Dashboard>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(MyAzonkaCredits)