import React, {Component} from 'react';
import { connect } from "react-redux";

import * as actions from "../../actions";
import Dashboard from '../HOC/Dashboard';
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
        this.props.initiateRegistration()
        this.props.getUserCredits()
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
                            <span className="text-default"> {this.numberWithCommas(this.props.credits.balance)}</span>
                        </div>
                    </div>
                    {/* <div className="row">
                        {
                          this.props.credits && this.props.credits.history && this.props.credits.history.length > 0 ?
                          <LineChart title={this.state.title} data={this.props.credits.history}/> :
                          null
                        }
                    </div> */}
                    <div className="row my-4">
                        <div style={{margin: '16px 0px', width:'100%'}}>
                            {
                              this.props.credits && this.props.credits.history && this.props.credits.history.length > 0 ? 
                              <AzonkaCreditDataTable data={this.props.credits.history} />
                              :
                              <AzonkaCreditDataTable data={[]} />
                            }
                        </div>
                        
                    </div>
                </div>
            </Dashboard>
        )
    }
}

const mapStateToProps = state => {
    const {bank: {credits}} = state;
    return {credits}
}

export default connect(mapStateToProps, actions)(MyAzonkaCredits)