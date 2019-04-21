import { connect } from 'react-redux';
import {changeNameFilterAction, changeTaxonomyFilter} from '../ducks/search';
import React from "react";
import {bindActionCreators} from "redux";
import TaxonomyCheckboxes from "../components/filters/taxonomyCheckboxes";
import NameSearch from "../components/filters/nameInput";


class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleNameFilterChange = this.handleNameFilterChange.bind(this);

    }

    handleCheckboxChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name; //taxonomySlug
        const id = target.id; //slug

        let taxonomyFilterArr = this.props.taxFilters[name];
        let newTaxonomyFilterArr = [];

        if (value) {
            taxonomyFilterArr.push(id);
            newTaxonomyFilterArr =taxonomyFilterArr;
        }
        else {
            newTaxonomyFilterArr = taxonomyFilterArr.filter(term => term !== id);
        }

        this.props.changeTaxonomyFilter(newTaxonomyFilterArr, name);
    }

    handleNameFilterChange(event) {
        this.props.changeNameFilter(event.target.value);
    }

    render() {

        const taxonomySlugs = this.props.usedTaxonomies;
        const taxFilters = this.props.taxFilters;
        const taxonomies = this.props.taxonomies;

        return (
            <div id="searchBox">
                <h3>Rajaa tuotteita</h3>
            <form className="searchCriteria" onSubmit = {(e) => (e.preventDefault())}>
                <NameSearch nameFilterChange = {(e) => {this.handleNameFilterChange(e)}}/>
                {!!taxonomySlugs &&
                !!taxonomies &&
                taxonomies.filter(taxonomy => taxonomySlugs.includes(taxonomy.taxonomySlug))
                          .map(taxonomy => (
                    <TaxonomyCheckboxes key= {taxonomy.taxonomySlug}
                                        onChangeFunction = {this.handleCheckboxChange}
                                        taxonomyTerms = {taxonomy.terms}
                                        taxonomySlug = {taxonomy.taxonomySlug}
                                        taxonomyName={taxonomy.taxonomyLabel}
                                        taxStates={taxFilters[taxonomy.taxonomySlug]}/>

                ))
                }
                </form>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        taxonomies: state.product.taxonomyTerms,
        usedTaxonomies: state.settings.usedTaxonomies,
        taxFilters: state.search.taxonomyFilters

    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    changeTaxonomyFilter: (taxonomyFilter, taxonomyName) => changeTaxonomyFilter(taxonomyFilter, taxonomyName),
    changeNameFilter: (nameFilter) => changeNameFilterAction(nameFilter)
}, dispatch);


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBar);
