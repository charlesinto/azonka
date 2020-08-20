import React, { Component } from 'react'
import Axios from 'axios'
import {connect} from 'react-redux'
import * as actions from '../actions'
import swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import StarRatingComponent from 'react-star-rating-component';
import moment from "moment";
// import * as $ from 'jquery';
class ReviewModal extends Component {
    constructor(props){
        super(props)
        this.state  = {
            product: '3',
            seller: '3',
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
            console.log(this.props.productId)
            const rating = (parseInt(this.state.seller) + parseInt(this.state.product)) / 2;
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
            window.$(`#${randomId}`).modal('hide')
            swal.fire('Review added successfully, thank you for your feedback')
        }catch(error){
            this.props.stopLoading()
            window.$(`#${randomId}`).modal('hide')
            swal.fire('Some error were encountered, please try again')
            console.log(error)
        }
    }
    componentDidMount(){}

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.rating !== this.props.rating || prevProps.reviews !== this.props.reviews) {
            //Perform some operation here
            this.setState({
                rating: this.props.rating,
                reviews: this.props.reviews,
            });
        }
    }
    onStarClick(nextValue, prevValue, name) {
        console.log('next value', nextValue)
        this.setState({[name]: nextValue});
      }
    render() {
        let randomId = uuidv4()
        return (
            <div>
            <div className="modal fade"  tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title d-flex" id="exampleModalLongTitle">
                                <div>Reviews</div>
                                <div className="mx-4">
                                    <button data-backdrop="static" data-keyboard="false" ref={(ref) => this.buttonClick = ref} onClick={() => {window.$(`#addReviewModal${randomId}`).modal('show')
                                        window.$(`#${this.props.name ? `${this.props.name}` : `reviewModal${this.props.productId}`}`).modal('hide')
                                    }}  className="btn-cm btn-primary shadow rounded p-3">
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
                                {
                                    this.state.reviews && this.state.reviews.length > 0 && !this.props.isReviewLoading ?
                                        (
                                            this.props.reviews.map(o => {
                                                let { comment, id, createdAt } = o
                                                return (
                                                    <div className="card" key={id}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-2 photo-time">
                                                                    <img alt="guyuss" src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                                                                    <p className="text-secondary text-center">{moment(createdAt).fromNow()}</p>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <p>
                                                                        <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html">
                                                                            <strong>Anonymous</strong></a>
                                                                        <span className="float-right">
                                                                            {/* <StarRatingComponent
                                                                                name="rate1"
                                                                                starCount={5}
                                                                                value={rating}
                                                                                editing={false}
                                                                            /> */}
                                                                        </span>

                                                                        {/* <span className="float-right"><i className="text-warning fa fa-star"></i></span> */}
                                                                    </p>
                                                                    <div className="clearfix"></div>
                                                                    <p>{comment}.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )
                                            })
                                        ) : this.props.isReviewLoading ? (
                                            <p className="text-center">Loading Review Data...</p>
                                        ) : !this.props.isReviewLoading && this.state.reviews && this.state.reviews.length === 0 ?
                                                (<h2 className="text-center">No Review Data</h2>) : null
                                }

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div ref={(ref) => this.addReviewModal = ref} className="modal fade" id={this.props.name ? `${this.props.name}` : `reviewModal${this.props.productId}`}
            // id={`addReviewModal${randomId}`}
            tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterReviewTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title d-flex"  id="exampleModalLongTitle">
                                <div>Add Review</div>
                            </h5>
                            <button type="button" className="close" onClick={() => {window.$(`#${this.props.name ? `${this.props.name}` : `reviewModal${this.props.productId}`}`).modal('hide')}} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ background: "rgba(202, 194, 194, 0.2)" }}>
                                <div className="container">
                                    <div className="row">

                                        <div className="col-md-6 col-lg-6">
                                            <h4>Product Quality</h4>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                        <StarRatingComponent 
                                            name="product" 
                                            starCount={5}
                                            value={this.state.product}
                                            onStarClick={this.onStarClick.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col-md-6 col-lg-6">
                                            <h4>Seller Performance</h4>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                        <StarRatingComponent 
                                            name="seller" 
                                            starCount={5}
                                            value={this.state.seller}
                                            onStarClick={this.onStarClick.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">

                                        <div className="col-md-6 col-lg-6">
                                            <h4>Comment</h4>
                                        </div>
                                        <div className="col-md-6 col-lg-6">
                                           <textarea name="comment" value={this.state.comment} onChange={(e) => this.setState({comment: e.target.value})} maxLength="150"></textarea>
                                           <div className="my-2 text-align-right">
                                                <span>
                                                    Maximum 150 characters
                                                </span>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" onClick={() => this.createReview(`${this.props.name ? `${this.props.name}` : `reviewModal${this.props.productId}`}`)}>Submit Review</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, actions)(ReviewModal)
