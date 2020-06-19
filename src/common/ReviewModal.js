import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import * as actions from '../actions'
import swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
// import * as $ from 'jquery';
class ReviewModal extends Component {
    constructor(props){
        super(props)
        this.state  = {
            productReview: '3',
            sellerReview: '3',
            comment: ''
        }
        this.addReviewModal = React.createRef()
    }
    
    handleChange = (e) => {
        const {target: {name, value}} = e;
        this.setState({
            [name]: value
        })
    }
    createReview = async (randomId) => {
        try{
            const rating = (parseInt(this.state.sellerReview) + parseInt(this.state.productReview)) / 2;
            // this.$el = $(this.addReviewModal)
            this.props.initiateRegistration()
             await Axios.post('/api/v1/user/review/create', {
                            "product": `${this.props.productId}`,
                            "rating": `${rating}`,
                            "comment": this.state.comment
                            }, {
                                headers:{
                            'x-access-token': localStorage.getItem('x-access-token')
                        }})
            this.props.stopLoading()
            window.$(`#addReviewModal${randomId}`).modal('hide')
            swal.fire('Review added successfully, thank you for your feedback')
        }catch(error){
            this.props.stopLoading()
            window.$(`#addReviewModal${randomId}`).modal('hide')
            swal.fire('Some error were encountered, please try again')
            console.log(error)
        }
    }
    componentDidMount(){

        console.log(this.props.productId)
    }
    render() {
        let randomId = uuidv4()
        return (
            <>
            <div className="modal fade" id={this.props.name ? `${this.props.name}` : `reviewModal${this.props.productId}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title d-flex" id="exampleModalLongTitle">
                                <div>Reviews</div>
                                <div className="mx-4">
                                    <button data-backdrop="static" data-keyboard="false" ref={(ref) => this.buttonClick = ref} onClick={() => {window.$(`#addReviewModal${randomId}`).modal('show')}}  className="btn-cm btn-primary shadow rounded p-3">
                                        Add Review
                                    </button>
                                </div>
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ background: "rgba(202, 194, 194, 0.2)" }}>

                            <div className="container">
                                {/* <h2 className="text-center">Bootstrap 4 User Rating Form / Comment Form</h2> */}
                                <div className="card shadow p-3 mb-2 bg-white rounded">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-2 photo-time">
                                                <img alt="avatar" src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                                                <p className="text-secondary text-center">15 Minutes Ago</p>
                                            </div>
                                            <div className="col-md-10">
                                                <p>
                                                    <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html">
                                                        <strong>Charles Odogwu</strong></a>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                </p>
                                                <div className="clearfix"></div>
                                                <p>Lorem Ipsum is simply dummy text of the pr make
                                                      but also the leap into electronic typesetting,
                                                       remaining essentially unchanged. It was popularised
                                                       in the 1960s with the release of Letraset sheets
                                                        containing Lorem Ipsum passages, and more recently
                                                     with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card shadow p-3 mb-2 bg-white rounded">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-2 photo-time">
                                                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" alt="avatar" className="img img-rounded img-fluid" />
                                                <p className="text-secondary text-center">15 Minutes Ago</p>
                                            </div>
                                            <div className="col-md-10">
                                                <p>
                                                    <a className="float-left"  href="https://maniruzzaman-akash.blogspot.com/p/contact.html">
                                                        <strong>Charles Odogwu</strong></a>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                    <span className="float-right"><i className="text-warning fa fa-star"></i></span>
                                                </p>
                                                <div className="clearfix"></div>
                                                <p>Lorem Ipsum is simply dummy text of the pr make
                                                      but also the leap into electronic typesetting,
                                                       remaining essentially unchanged. It was popularised
                                                       in the 1960s with the release of Letraset sheets
                                                        containing Lorem Ipsum passages, and more recently
                                                     with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div ref={(ref) => this.addReviewModal = ref} className="modal fade" id={`addReviewModal${randomId}`}tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterReviewTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title d-flex" id="exampleModalLongTitle">
                                <div>Add Review</div>
                            </h5>
                            <button type="button" className="close" onClick={() => {window.$(`#addReviewModal${randomId}`).modal('hide')}} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ background: "rgba(202, 194, 194, 0.2)" }}>

                            <div className="container-fluid">
                                <div className="shadow rounded bg-white mb-3 justify-contents-center py-5 px-3 row w-100">
                                    <div className="col-md-6 d-flex justify-contents-center">
                                        <h5>
                                            Product Acceptability
                                        </h5>
                                    </div>
                                    
                                    <div className="col-md-6 d-flex justify-contents-center">
                                       <span className="mx-2">1</span> <input value={this.state.productReview} type="range" step="1" class="form-control-range"
                                            name="productReview" onChange={this.handleChange} min="1" max="5"/>
                                            <span className="mx-2">5</span>
                                    </div>
                                </div>
                                <div className="shadow rounded mb-3 bg-white justify-contents-center py-5 px-3 row w-100">
                                    <div className="col-md-6 d-flex justify-contents-center">
                                        <h5>
                                            Seller Performance
                                        </h5>
                                    </div>
                                    
                                    <div className="col-md-6 d-flex justify-contents-center">
                                       <span className="mx-2">1</span> <input value={this.state.sellerReview} type="range" step="1" class="form-control-range"
                                            name="sellerReview" onChange={this.handleChange} min="1" max="5"/>
                                            <span className="mx-2">5</span>
                                    </div>
                                </div>
                                <div className="shadow rounded mb-3 bg-white justify-contents-center py-5 px-3 row w-100">
                                    <div className="col-md-6 d-flex justify-contents-center">
                                        <h5>
                                            Comments
                                        </h5>
                                    </div>
                                    
                                    <div className="col-md-6 d-flex justify-contents-center">
                                        <textarea value={this.state.comment} name="comment" onChange={this.handleChange}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => this.createReview(randomId)}>Submit</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default connect(null, actions)(ReviewModal)
