

import React, { Component } from 'react';
import Dashboard from '../HOC/Dashboard';
import * as actions from '../../actions';
import {connect} from 'react-redux'
import dispute from '../../css/images/dispute.svg'
import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';

class HelpPage extends Component {
  state = { modal: false}
  componentDidMount(){
    this.props.setActiveLink('help')
  }
  renderModal = () => {
    if (this.state.modal) {
        return (

            <Drawer anchor="bottom" open={this.state.modal} onClose={() => this.toggleDrawer()}>
                <div
                    role="presentation"
                    anchor="bottom"
                    onClick={this.toggleDrawer}
                    onKeyDown={this.toggleDrawer}
                    className="modal-bottom-padding"
                >
                    <main className="container">
                        <div className="row">
                              <h3>Terms</h3>
                              
                        </div>
                        <hr className=" mb-2" />
                        <div className="row">
                            <div className="col-12">
                                <div
                                    style={{
                                        display: 'flex', margin: "10px 0px",
                                        justifyContent: 'flex-end'
                                    }}>

                                    <button onClick={this.toggleDrawer} style={{ marginRight: 10 }}
                                        className="btn btn-lg btn-outline-dark">
                                        Cancel
                                    </button>
                                    <Link to="/user/order/disputes" className="btn btn-lg btn-success" >
                                        Continue</Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </Drawer>
        )
    }
  }
  toggleDrawer = () => {
    this.setState({
      modal: false
    })
  }

  showTerms = () => {
    this.setState({
      modal: true
    })
  }

  render() {
    return (
      <Dashboard>
          <div>
            <h4 className="popup-title verify-email" style={{
                fontWeight: 'normal',
                fontFamily: 'Roboto, sans-serif',
                marginLeft: 20
            }}>Help</h4>
            <hr className="line-separator mb-3" />
            <div className="container-fluid">
                <div className="row">
                  <div onClick={this.showTerms} className="d-flex  align-items-center col-md-6 colxs-12 shadow p-3 mb-5 bg-white cursor-pointer" >
                      
                          <img src={dispute} className="mx-4" style={{width: 40 , height: 40}} alt="dispute"/>
                          {/* <span className="mx-3 big-font text-primary"><i className="fas fa-headset"></i></span> */}
                          <span className="big-font black-color">Dispute Management</span>
                      
                  </div>
                </div>
            </div>
            {
              this.renderModal()
            }
          </div>
      </Dashboard>
    );
  }
}

export default connect(null, actions)(HelpPage);
