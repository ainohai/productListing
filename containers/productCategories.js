import { connect } from 'react-redux';
import {categoryDataFetched, changeTaxonomyFilter} from '../ducks/search';
import React from "react";
import {bindActionCreators} from "redux";
import {getCategoryDataAction, selectActiveProductCatName} from "../ducks/product";
import Drawer from 'react-motion-drawer';
import SearchBar from "./searchBar";
import {justUsedCategories} from "../util/categoryUtil";
import {toggleCategoryAccordionAction} from "../ducks/settings";


class ProductCategories extends React.Component {

    constructor(props) {
        super(props);

        this.handleCatClick = this.handleCatClick.bind(this);
    }

    handleCatClick(event, slug) {

        const taxName = 'product_cat';

        let taxonomyFilterArr = this.props.taxFilters[taxName];
        let newTaxonomyFilterArr = [];

        //only one category chosen at time
        if (!slug) {
          newTaxonomyFilterArr = [];
        }
        else if (!taxonomyFilterArr.includes(slug)) {
            newTaxonomyFilterArr = [slug];
        }

        this.props.changeTaxonomyFilter(newTaxonomyFilterArr, taxName);
        this.props.toggleCategoryAccordionAction(false);
    }

    render() {

        const categories = this.props.categories;

        return (
            <div className="categoryList">
                    <h3>Tuotekategoriat</h3>
                <ul id="categoryList">
                    <li className={this.props.taxFilters['product_cat'] == null || this.props.taxFilters['product_cat'].length < 1 ? 'selected': ''} onClick={(e) => this.handleCatClick(e, null)}>Kaikki</li>
                {!!categories && categories.map(category =>
                    <li className={Array.isArray(this.props.taxFilters['product_cat']) && this.props.taxFilters['product_cat'].includes(category.slug) ? 'selected' : ''}
                        key={category.slug} id={category.slug} onClick={(e) => this.handleCatClick(e, category.slug)}>{category.name}</li>
                )}
                </ul>
            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        categories: justUsedCategories(state.product.taxonomyTerms, state.product.categoryData, state.product.taxonomyData),//Array.isArray(state.product.taxonomyTerms) && state.product.taxonomyTerms.filter(term => term.taxonomySlug === 'product_cat').length > 0 ? state.product.taxonomyTerms.filter(term => term.taxonomySlug === 'product_cat')[0].terms : [],
        taxFilters: state.search.taxonomyFilters,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
        changeTaxonomyFilter: (taxonomyFilter, taxonomyName) => changeTaxonomyFilter(taxonomyFilter, taxonomyName, true),
        toggleCategoryAccordionAction: (isCatOpen) => toggleCategoryAccordionAction(isCatOpen)
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductCategories);
