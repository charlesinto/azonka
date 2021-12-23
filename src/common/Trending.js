import React, { Component } from "react";
import { Link } from "react-router-dom";
import imagePlaceHolder from "../css/images/image_loader.png";
import LazyLoad from "react-lazyload";

class Trending extends Component {
  render() {
    console.log("this.props.image.url: ", this.props.image);
    return (
      <div className="col-lg-3  col-sm-3" key={this.props.index}>
        <div style={{ height: "245px" }} className="banner  banner-image ">
          <Link style={{ height: "100%" }} to="#featured">
            <LazyLoad
              // height={200}
              style={{ height: "100%" }}
              once={true}
              placeholder={
                <img
                  className="d-block w-100 h-100"
                  alt="banner"
                  src={imagePlaceHolder}
                  style={{ objectFit: "cover" }}
                  // style={{ width: "200px", height: "200px" }}
                />
              }
            >
              <img
                className="d-block w-100 h-100"
                alt="banner"
                style={{ objectFit: "cover" }}
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
