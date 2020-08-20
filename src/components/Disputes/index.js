import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import * as actions from "../../actions";
import DisputeOrderDataTable from '../../common/DisputeOrderDatable';
import { Typography } from '@material-ui/core';

class Disputes extends Component {
    state = {selected: '',orderId:'', files: null,message:"", 
    exampleCheck2: false, exampleCheck1:false, notDelivered: false, orderDelivered: false }
    async componentDidMount(){
        this.props.setActiveLink('')
        this.props.initiateRegistration()
        await this.props.fetchOrders();
        this.props.stopLoading()
        window.$("input[type='file']").change(function(){
            var $fileUpload = window.$("input[type='file']");
            if (parseInt($fileUpload.get(0).files.length)>5){
                $fileUpload.val(''); 
             alert("You can only upload a maximum of 5 files");
            }
        }); 
    }
     componentWillUnmount(){
        
        window.$("input[type='file']").unbind()
    }
    handleClose = () => {
        this.setState({
            selected: ''
        }, () => window.$("#notDelivered").prop("checked", false))
    }
    handleChange = e => {
        const {target: {name, value}} = e;
        if(name === 'message'){
            return this.setState({
                [name]: value
            })
        }
        if(name === 'exampleCheck1'){
            return this.setState({
                [name]: !this.state.exampleCheck1
            })
        }
        if(name === 'exampleCheck2'){
            return this.setState({
                [name]: !this.state.exampleCheck2
            })
        }
        
    }
    renderAlert = () => {
        if(this.state.selected === 'box1'){
            return (
                <Dialog
                open={this.state.selected === 'box1'}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                    <Typography variant="h5">
                       Order in Progress
                    </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Typography variant="subtitle1">
                        The process cannot be continued as the order is still being processed
                    </Typography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button  onClick={this.handleClose} color="primary">
                      Ok
                  </Button>
                </DialogActions>
              </Dialog>
            )
        }
        return null;
    }
    selectBox = async (box) => {
        switch(box){
            case 'box1':
                this.setState({selected:'box1'})
            break;
            case 'box2':
                this.setState({selected:'box2'})
                this.props.initiateRegistration()
                await this.props.fetchOrders();
                this.props.stopLoading()
            break;
            default:
                break;
        }
    }
    handleRowClick = (orderId) => {
        window.$('#exampleModal').modal('show')
        this.setState({
            orderId
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        var $fileUpload = window.$("input[type='file']");
       // $fileUpload.get(0).files.length
       const {message, } = this.state;
        if($fileUpload.get(0).files.length === 0 ){
            return alert('Upload atleast one image')
        }
        if(message.trim() === ''){
            return alert('Please enter complaint')
        }

    }
    agreeTotermsChange = (event) => {
        const {name} = event.target;
        console.log(this.state)
        if(name === 'notDelivered'){

            return this.setState({
                notDelivered: !this.state.notDelivered
            }, () => {
                if(this.state.notDelivered){
                    window.$("#orderDelivered").prop("checked", false);
                    this.selectBox('box1')
                }
            })
            
        }
        return this.setState({
            orderDelivered: !this.state.orderDelivered
        }, () => {
            if(this.state.orderDelivered){
                window.$("#notDelivered").prop("checked", false);
                this.selectBox('box2')
            }
        })
    }
  render() {
    return (
      <div>
            <div className="router-container">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><i className="icon-home"></i></Link></li>
                                <li className="breadcrumb-item"><Link to="/users/profile">Dashboard</Link></li>
                                <li className="breadcrumb-item"><Link to="/user/dasboard/help">Help</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Disputes</li>
                            </ol>
                        </div>
                    </nav>

               <div className="container-fluid">
                    <div className="row">
                            <div className="col-lg-4">
                            <div class="">
                                
                                <div class="card-body">
                                    <ul class="list-group">
                                        <li class="list-group-item active cursor-pointer">Orders delivered</li>
                                        <li onClick={() => this.selectBox('box1')} class="list-group-item cursor-pointer">Orders not yet delivered</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <DisputeOrderDataTable handleRowClick={this.handleRowClick} data={this.props.orders} />
                            </div>
                        </div>
               </div>
                    
            </div>
            {
                this.renderAlert()
            }
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Open Dispute</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit} >
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Enter your Complaint</label>
                                <textarea value={this.state.message} onClick={this.handleChange} name="message" class="form-control" id="exampleFormControlTextarea1" maxLength="1000" rows="2"></textarea>
                                <small id="emailHelp" class="form-text text-muted">Maximum of 1000 characters</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlFile1">Upload Images</label>
                                <input min="1" max="5" name="files" onClick={this.handleChange} accept="image/*" type="file" multiple class="form-control-file" id="exampleFormControlFile1" />
                                <small id="emailHelp" class="form-text text-muted">maximum of 5 Images</small>
                            </div>
                            <div class="form-check"style={{display:'flex'}}>
                                <input onClick={this.handleChange} type="checkbox" class="mx-3" style={{display:'block', marginTop:5}} id="exampleCheck1" />
                                <label class="form-check-label" for="exampleCheck1" style={{marginTop:'0px !important'}}>Damaged and Defective Item</label>
                            </div>
                            <div class="form-check" style={{display:'flex'}}>
                                <input onClick={this.handleChange} type="checkbox" class=" mx-3" style={{display:'block', marginTop:5}} id="exampleCheck2" />
                                <label class="" for="exampleCheck2" style={{marginTop:'0px !important'}}>Entirely Different Item</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Log Dispute</button>
                    </div>
                    </div>
                </div>
                </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
    let {  orders } = state.inventory
    console.log(orders)
    return {orders}
}

export default connect(mapStateToProps, actions)(Disputes);

/*
<div className="container mt-3">
                        <div className="row mb-3 ">
                            <span className="dispute-type">Choose Dispute Type</span>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-4 col-xs-12 d-flex">
                            <input onClick={this.agreeTotermsChange} id="notDelivered" name="notDelivered" type="checkbox" class="mx-3" style={{display:'block', marginTop:5}}  />
                                <label class="form-check-label" htmlFor="notDelivered" style={{marginTop:'0px !important'}}>Order has not been delivered</label>
                            {/* <label class="label">
                                <input type="checkbox" name="checkbox" class="checkbox" checked="" />
                                <div class="checkDiv">
                                    <div class="lineOne"></div>
                                    <div class="lineTwo"></div>
                                </div>
                            </label> 

                                {/* <div onClick={() => this.selectBox('box1')} className={`shadow-sm custom-box p-3 mb-5 bg-white cursor-pointer ${this.state.selected === 'box1'? 'selectedBox': ''}`}>
                                   Order has not been delivered
                                </div> 
                                </div>
                                <div className="col-md-4 col-xs-12 d-flex">
                                    
                                <input onClick={this.agreeTotermsChange} name="orderDelivered" type="checkbox" class="mx-3" style={{display:'block', marginTop:5}} id="orderDelivered" />
                                    <label class="form-check-label" htmlFor="orderDelivered" style={{marginTop:'0px !important'}}>Order has been delivered</label>
                                    {/* <div onClick={() => this.selectBox('box2')} className={`shadow-sm custom-box p-3 mb-5 bg-white cursor-pointer ${this.state.selected === 'box2'? 'selectedBox': ''}`}>
                                        Order has been delivered
                                    </div> 
                                </div>
                            </div>
                            {
                                this.state.selected === 'box2' ? (
                                    <div className="row mt-5">
                                        <DisputeOrderDataTable handleRowClick={this.handleRowClick} data={this.props.orders} />
                                    </div>
                                ): null
                            }
                        </div>

*/
