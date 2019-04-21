import { connect } from 'react-redux';
import { toggleTodo } from '../ducks/product';
import {default as CategoryInfo } from '../components/categoryInfo';

const getVisibleCategoryInfos = (categoryInfos, taxFilters) => {

    if(!taxFilters['product_cat'] || taxFilters['product_cat'].length === 0){
        return [];
    }

    let category = taxFilters['product_cat'][0];

    return categoryInfos[category];

};

const mapStateToProps = (state) => {
    return {
        categoryInfos: getVisibleCategoryInfos(state.product.categoryData, state.search.taxonomyFilters)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

const VisibleCategoryInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryInfo);

export default VisibleCategoryInfo