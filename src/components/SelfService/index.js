import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import suppport from '../../assets/technical-support.svg';

class SelfService extends Component{
    state = {
        stage: 0,
        name: 'Awesome Customer'
    }
    componentDidMount(){
        if(localStorage.getItem('azonta-user')){
            const name = JSON.parse(localStorage.getItem('azonta-user'))['firstName']
            this.setState({
                name
            })
        }
    }
    viewOrderDispute = () => {
        Swal.fire('Order Disputes', '','info').then(() => {
            this.props.history.push('/user/order/disputes')
        })
    }
    renderStage = () => {
         switch(this.state.stage){
            case 0:
                return this.greetings()
                
            default:
                this.greetings()
        }
    }
    greetings = () => {
        return (
            <div className="w-100 p-5 bg-white">
                <div className="row">
                    <div className="d-flex justify-content-center p-2 w-100">
                        <img alt="support" src={suppport} style={{width: 120, height: 120, borderRadius: '50%'}} />
                    </div>
                    <p className="d-flex justify-content-center w-100 p-3">
                        <h5 className="greetings-text ">Hello {this.state.name}, how can we help you?</h5>
                    </p>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div className="app-wrapper-container container-fluid">
                <div className="row">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i> Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><Link to="#">Self Service</Link></li>
                        
                    </ol>
                </div>
                <div className="row">
                        <div className="col-md-4 col-xs-12">
                        <div class="card-body">
                                    <ul class="list-group">
                                        <li class="list-group-item cursor-pointer">
                                            <a  className=" no-underline" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                                <b>Manage your orders</b>
                                            </a>
                                            <div class="collapse" id="collapseExample">
                                            <div class="">
                                                <ul>
                                                    <li className=" custom-list-item cursor-pointer">
                                                        Create an Order
                                                    </li>
                                                    <li onClick={this.viewOrderDispute} className=" custom-list-item cursor-pointer">
                                                       Order Dispute
                                                    </li>
                                                </ul>
                                            </div>
                                            </div>
                                        </li>
                                        <li  class="list-group-item cursor-pointer">
                                        <a  className=" no-underline" data-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample2">
                                            <b>Browse help topics and popular solutions</b>
                                            </a>
                                            
                                            <div class="collapse" id="collapseExample2">
                                            <div class="">
                                                <ul>
                                                <li className=" custom-list-item cursor-pointer">
                                                Shipping & delivery 

                                                    </li>
                                                <li className=" custom-list-item cursor-pointer">
                                                Azonka wallet
                                                    </li>
                                                <li className=" custom-list-item cursor-pointer">
                                                Azonka Referral Bonus System
                                                    </li>
                                                    <li className=" custom-list-item cursor-pointer">
                                                    Refunds 
                                                    </li>
                                                    <li className=" custom-list-item cursor-pointer">
                                                    Payment, Pricing and Promotions
                                                    </li>
                                                </ul>
                                            </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item cursor-pointer">
                                        <a  className=" no-underline" data-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample3">
                                            <b>Contact Us</b>
                                            </a>
                                            
                                            <div class="collapse" id="collapseExample3">
                                            <div class="">
                                                <ul>
                                                <li className=" custom-list-item cursor-pointer">
                                                Email Customer Service

                                                    </li>
                                                <li className=" custom-list-item cursor-pointer">
                                                Call Customer Service
                                                    </li>
                                                
                                                </ul>
                                            </div>
                                            </div>    
                                         </li>
                                    </ul>
                                </div>
                        </div>
                        <div className="col-md-8 col-xs-12">
                                {this.renderStage()}
                        </div>
                </div>
            </div>
        )
    }
}

export default SelfService;