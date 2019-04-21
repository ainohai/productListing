import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import ProductCategories from "../../containers/productCategories";
import SearchBar from "../../containers/searchBar";

const NavAccordion = ({ categories, search, catIsOpen }) => (
    <div id="navAccordion">
        {categories &&
        <Collapsible trigger="Tuotekategoriat">
            <ProductCategories/>
        </Collapsible>
        }
        {search &&
        <Collapsible trigger="Haku">
            <SearchBar/>
        </Collapsible>
        }
    </div>
    );

export default NavAccordion