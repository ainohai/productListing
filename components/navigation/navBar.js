import { connect } from 'react-redux';
import React from "react";
import {bindActionCreators} from "redux";
import {selectActiveProductCatName} from "../../ducks/product";
import SearchBar from "../../containers/searchBar";
import ProductCategories from "../../containers/productCategories";


const NavBar = () => {

    return (
        <aside id="sidebar">
            <ProductCategories/>
            <SearchBar/>
        </aside>

    )
};


export default NavBar;
