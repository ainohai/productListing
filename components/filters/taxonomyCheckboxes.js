import React, { Component } from 'react';
import {default as ProductListItem} from "../productListItem";

const isChecked = ({states, termSlug}) => {

    return !!states ? states.includes(termSlug) : false;
};

const Checkbox = ({id, inputName, checked, termName, handleInputChange}) => (
    <div className="taxCheckbox">
        <input
            type="checkbox"
            id={id}
            name={inputName}
            checked={checked}
            onChange={(e) => handleInputChange(e)}
        />
        <label htmlFor={id}>{termName}</label>
    </div>
);

const TaxonomyCheckboxes = ({ onChangeFunction, taxonomyTerms, taxonomySlug, taxonomyName, taxStates }) => (

    <fieldset>
        <legend>{taxonomyName}</legend>
        {
        taxonomyTerms.map(term => (
            <Checkbox key = {term.slug}
                      id={term.slug}
                      inputName = {taxonomySlug}
                      checked = {!!taxStates ? taxStates.includes(term.slug) : false}
                      termName = {term.name}
                      handleInputChange = {(e) => onChangeFunction(e)}
            />
        ))
        }
    </fieldset>

);


export default TaxonomyCheckboxes;