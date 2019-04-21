import React, { Component } from 'react';
import { getProductsAction } from './ducks/product';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { default as ProductTable} from './containers/productTable'
import SearchBar from "./containers/searchBar";
import ProductTable from "../react/containers/productTable";
import {VisibleAdminProductList} from "./containers/visibleProducts";
import './styles/productTable.css';


class AdminApp extends React.Component {

  constructor(props) {
     super(props);
     this.props.getProducts();
  }


  render() {

      let error = this.props.error;

      return (
          <div id="productCat">
              {!!error && <div className="adminError">
                  {error}
              </div>
              }
              {!error &&
              <div className="col-full">
                  <main id="main" className="site-main" role="main">
                      <SearchBar/>
                      <VisibleAdminProductList/>
                  </main>
              </div>
              }
          </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
      error : state.product? state.product.error : null
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getProducts: () => getProductsAction(true),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminApp);



