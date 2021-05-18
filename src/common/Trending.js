import React, { Component } from "react";
import { Link } from "react-router-dom";
import imagePlaceHolder from "../css/images/image_loader.png";
import LazyLoad from "react-lazyload";

class Trending extends Component {
  render() {
    console.log("this.props.image.url: ", this.props.image);
    return (
      <div className="col-lg-3  col-sm-3" key={this.props.index}>
        <div className="banner  banner-image ">
          <Link to="#featured">
            <LazyLoad
              // height={200}
              once={true}
              placeholder={
                <img
                  className="d-block w-100"
                  alt="banner"
                  src={imagePlaceHolder}
                  // style={{ width: "200px", height: "200px" }}
                />
              }
            >
              <img
                className="d-block w-100"
                alt="banner"
                src={this.props.image ? this.props.image.url : imagePlaceHolder}

                // style={{ width: "200px", height: "200px" }}
              />
            </LazyLoad>
          </Link>
        </div>
      </div>
    );
  }
}

export default Trending;
