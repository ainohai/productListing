import React, { Component } from 'react';
import {default as ProductListItem} from './productListItem';
import {getActiveProductCatName} from "../util/categoryUtil";

const showCategory = (taxonomies, taxSelected, products) => {
    if (!taxonomies){
        return false;
    }
        return getActiveProductCatName(taxonomies, taxSelected);
};

const baseUrl = session.baseUrl;


export const sortProductsByName = (products) => {

    return products.sort(function(a, b) {
        var nameA = a.title.toUpperCase(); // ignore upper and lowercase
        var nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    });

};

const ProductList = ({ products, taxonomies, taxSelected, loading }) => (

    <div className="productListContainer">
        <h2>Tuotelista
            <span className="catTitle">-{!!showCategory(taxonomies, taxSelected, products) ?
              showCategory(taxonomies, taxSelected) : "Kaikki tuotekategoriat"}</span>
        </h2>

        {!!loading &&
        <div>
            <img src={baseUrl + "/assets/img/ajax-loader.gif"}/>
        </div>
        }


        {!!products && products.length > 0 &&
        <div>
            <ul className="products">

                { sortProductsByName(products).map((product, index) => (
                <ProductListItem key={product.id} product={product} even={index % 2 === 0}
                                 />
                ))}

            </ul>}
        </div>
        }
        {(!products || products.length === 0) && !showCategory(taxonomies, taxSelected) && showCategory(taxonomies, taxSelected) != null &&
            <div>Yhtään tuotetta ei löytynyt. </div>
        }
    </div>
);

export default ProductList