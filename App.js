import 'react-app-polyfill/ie9'
import "core-js/es7/array";
import "core-js/es7/object";
import React, { Component } from 'react';
import {getCategoryDataAction, getProductsAction} from './ducks/product';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {default as VisibleProductList } from './containers/visibleProducts';
import NavBar from "./components/navigation/navBar";
import {default as VisibleCategoryInfo } from './containers/visibleCategoryInfo'
import NavAccordion from "./components/navigation/navAccordion";
import {initSearchParamsAction} from "./ducks/search";

class App extends React.Component {

  constructor(props) {
     super(props);
     this.props.getProducts();
    if (!this.props.categoryDataFetched) {
      this.props.getCategoryData();
    }
     this.props.initSearchParams();

  }

  render() {

      return (
          <div id="productCat">
          <NavBar/>
      <div className="col-full">
        <div id="main" className="site-main" role="main">
            <NavAccordion categories={true} search={false} catIsOpen={this.props.catIsOpen}/>
            <VisibleCategoryInfo/>
            <NavAccordion categories={false} search={true}/>
            <VisibleProductList />
        </div>
      </div>
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      categoryDataFetched: state.search.categoryDataFetched,
      catIsOpen: state.settings.categoryAccordionIsOpen
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getProducts: () => getProductsAction(false),
    getCategoryData: () => getCategoryDataAction(),
    initSearchParams: () => initSearchParamsAction()
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);



