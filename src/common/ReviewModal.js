import React, { Component } from 'react'
import moment from 'moment'
import StarRatingComponent from 'react-star-rating-component';

class ReviewModal extends Component {
    state = { qty: 0, sum: 0, isLoading: false, rating: 0, reviews: [] }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.rating !== this.props.rating || prevProps.reviews !== this.props.reviews) {
            //Perform some operation here
            this.setState({
                rating: this.props.rating,
                reviews: this.props.reviews,
            });
        }
    }
    render() {
        return (
            <div className="modal fade" id={`reviewModal${this.props.id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Reviews</h5>
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
                                                let { comment, id, rating, createdAt } = o
                                                return (
                                                    <div className="card" key={id}>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-2 photo-time">
                                                                    <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid" />
                                                                    <p className="text-secondary text-center">{moment(createdAt).fromNow()}</p>
                                                                </div>
                                                                <div className="col-md-10">
                                                                    <p>
                                                                        <a className="float-left" href="https://maniruzzaman-akash.blogspot.com/p/contact.html">
                                                                            <strong>Anonymous</strong></a>
                                                                        <span className="float-right">
                                                                            <StarRatingComponent
                                                                                name="rate1"
                                                                                starCount={5}
                                                                                value={rating}
                                                                                editing={false}
                                                                            />
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
        )
    }
}

export default ReviewModal
