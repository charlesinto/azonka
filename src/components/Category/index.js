import React, { Component } from "react";
import Footer from "../HeaderFooter/Footer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import axios from "axios";

class CategoryPage extends Component {
  state = {
    categories: [],
  };
  async componentDidMount() {
    try {
      this.props.initiateRegistration();
      const response = await axios.get(
        "/api/v1/category/get-categories/0/1000"
      );
      const categoriesDt = response.data.categories;

      const response2 = await axios.get(
        "/api/v1/sub-category/get-sub-categories/0/10000"
      );
      const subcategores = response2.data.subCategories;

      categoriesDt.forEach((item) => {
        let subItems = [];
        subcategores.forEach((subItem) => {
          if (subItem.parentCategory && subItem.parentCategory.id === item.id) {
            subItems.push(subItem);
          }
        });
        item.subCategories = subItems;
      });
      this.props.stopLoading();
      this.setState({
        categories: categoriesDt,
      });
    } catch (error) {
      console.error(error);
      this.props.stopLoading();
    }
  }

  renderCategories = () => {
    return this.state.categories.map((item) => {
      return (
        <li className="categories-menu">
          <Link
            to={`/shop?name=&category=${item.id}&categoryName=${item.name}`}
            className="sf-with-ul"
            style={{ fontSize: "2.0rem", paddingTop: 12, fontWeight: "bold" }}
          >
            <i className="icon-briefcase"></i>
            {item.name}
          </Link>

          <ul className="mobile-submenu">
            {item.subCategories.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    to={`/shop?name=&subCategory=${item.id}&category=&categoryName=${item.name}`}
                    className="sf-with-ul"
                    style={{
                      fontSize: "1.5rem",
                      paddingTop: 12,
                      color: "#000 !important",
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      );
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="router-container">
          <div className="h-100 w-100">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <ol className="breadcrumb py-4">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="icon-home"></i>
                      </Link>
                    </li>

                    <li
                      className="text-primary breadcrumb-item active"
                      aria-current="page"
                    >
                      Categories
                    </li>
                  </ol>
                  <div className="row">
                    <div className="col-md-10">
                      <div className="bg-white mb-4 pb-4">
                        <ul className="menu pt-2 menu-vertical sf-arrows">
                          {this.renderCategories()}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default connect(null, actions)(CategoryPage);
