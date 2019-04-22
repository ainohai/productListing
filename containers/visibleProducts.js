import { connect } from 'react-redux';
import { toggleTodo } from '../ducks/product';
import {default as ProductList } from '../components/productList';
import ProductTable from "../../react/containers/productTable";

const nameFitsFilter = (product, nameFilter) => {

    if (nameFilter.length < 3) {
        return true;
    }

    let nameFilterLower = new RegExp(nameFilter.toLowerCase());

    if (!!product.title && product.title.toLowerCase().match(nameFilterLower)) {
        return true;
    }
    else if (!!product.latinalainen_nimi && product.latinalainen_nimi.toLowerCase().match(nameFilterLower)) {
        return true;
    }
    else if (!!product.lajikenimi && product.lajikenimi.toLowerCase().match(nameFilterLower)) {
        return true;
    }
    else if(!!product.tuotelista && product.tuotelista.toLowerCase().match(nameFilterLower)){
        return true;
    }

    return false;
};

const getVisibleProducts = (products, taxFilters, taxonomyData, nameFilter) => {

    let taxFilterKeys = Object.keys(taxFilters);
    let filtered = taxonomyData;

    if (taxonomyData.length === 0 || !taxFilters || taxFilterKeys.length === 0) {
        return products;
    }


    taxFilterKeys.forEach((taxKey) => {

            if (taxFilters[taxKey].length > 0)
                //filters more step by step
                filtered = filtered.filter(item => !item.taxonomies[taxKey] || item.taxonomies[taxKey].filter(x => taxFilters[taxKey].includes(x)).length > 0 );
        }
    );

    if (Array.isArray(filtered)) {

        let filteredIds = filtered.map(x => x.id);
        return products.filter(product => filteredIds.includes(product.id) && nameFitsFilter(product, nameFilter));
    }
    return [];

};

const mapStateToProps = (state) => {
    return {
        products: getVisibleProducts(state.product.products, state.search.taxonomyFilters, state.product.taxonomyData, state.search.nameFilter),
        taxonomies: state.product.taxonomyTerms,
        taxSelected: state.search.taxonomyFilters['product_cat'],
        loading: state.product.loading,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        }
};

const VisibleProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);

const AdminProductList = ({ products }) => (
    <div>
        <ProductTable products={products}/>
    </div>
);

export const VisibleAdminProductList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminProductList);


export default VisibleProductList