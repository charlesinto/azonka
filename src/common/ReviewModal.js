import React, { Component } from 'react'

class ReviewModal extends Component {
    render() {
        return (
            <div className="modal fade" id="reviewModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                {/* <h2 className="text-center">Bootstrap 4 User Rating Form / Comment Form</h2> */}
                                <div className="card">
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

                                <div className="card">
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
        )
    }
}

export default ReviewModal
