import React, { Component } from 'react';
import {getCategoryDataAction, getProductsAction} from './ducks/product';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {default as VisibleProductList } from './containers/visibleProducts';
import NavBar from "./components/navigation/navBar";
import {default as VisibleCategoryInfo } from './containers/visibleCategoryInfo'
import NavAccordion from "./components/navigation/navAccordion";
import {initSearchParamsAction} from "./ducks/search";
import {setError} from "./ducks/settings";
import texts from "./i18n"

class App extends React.Component {

  constructor(props) {
     super(props);
     this.props.getProducts();
    if (!this.props.categoryDataFetched) {
      this.props.getCategoryData();
    }
     this.props.initSearchParams();

  }

  componentDidCatch() {

    this.props.setError(texts.messages["error.componentFailed"]);
  }

  render() {

    return (
      <div>
        {!!this.props.error &&
        <div class="noScript" dangerouslySetInnerHTML={ {__html:this.props.error} }></div>
        }
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      categoryDataFetched: state.search.categoryDataFetched,
      catIsOpen: state.settings.categoryAccordionIsOpen,
      error: state.settings.errorMessage,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getProducts: () => getProductsAction(false),
    getCategoryData: () => getCategoryDataAction(),
    initSearchParams: () => initSearchParamsAction(),
    setError: (message) => setError(message)
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);



