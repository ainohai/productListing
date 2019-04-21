import React from "react";
import ReactDOM from "react-dom";
import {bindActionCreators} from "redux";
import {getToggleTaxonomyAction} from "../ducks/settings";
import connect from "react-redux/es/connect/connect";
import {getToggleTermAction} from "../ducks/product";
import {topheader, subheaders} from "../components/productTable/taxHeader";
import {getTaxData} from "../components/productTable/taxDataCells";
import ReactTableContainer from "react-table-container";
import {sortProductsByName} from "../components/productList";

const productTitle = product => {
    return <td><a href={product.product_url}>{product.title}</a><span style={{float: 'right'}}> <a href={product.edit_link}>Muokkaa</a></span></td>;
};

const productVisibility = product => {
    return <td style={{backgroundColor: product.visibility ? '#d2eeb1' : '#ffc485'}}>{product.visibility ? 'X' : ''}</td>;
};

const productPrice = product => {
    return <td>{product.regular_price}</td>
};

const salePrice = product => {
    return <td>{product.sale_price}</td>
};

const taxShown = (taxSettings, taxSlug) => {
    return taxSettings[taxSlug].show;
};

class ProductTable extends React.Component {

    toggleTax (event, taxSlug, taxSettings) {
        let toggled = {};
        toggled[taxSlug] = { show: !taxSettings[taxSlug].show };
        this.props.toggleTaxonomy(toggled);

    };

    render() {
        let taxonomies = this.props.taxonomies;
        let products = this.props.products;
        let taxData = this.props.taxData;
        let taxSettings = this.props.taxSettings;
        let error = this.props.error;

        return (
            <div className="productTable">
                {error && <div>Tietojen tallennus ei onnistunut. Lataa sivu uudelleen. </div>}
                {!error &&
                <ReactTableContainer width="auto" height="500px">
                <table>
                    <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Näkyy</th>
                        <th>Hinta</th>
                        <th>Ale</th>
                        {taxonomies.map((tax, index) => topheader(taxonomies, tax, taxSettings, this.toggleTax.bind(this), taxShown(taxSettings, tax.taxonomySlug), index))}
                    </tr>
                    <tr>
                        <th/>
                        <th/>
                        <th/>
                        <th/>
                        {taxonomies.map((tax, index) => subheaders(tax, taxShown(taxSettings, tax.taxonomySlug), index))}
                    </tr>
                    </thead>
                    <tbody>

                    {sortProductsByName(products).map((product, index) => (
                        <tr key={product.title + "-" + index}>
                            {productTitle(product)}
                            {productVisibility(product)}
                            {productPrice(product)}
                            {salePrice(product)}
                            {getTaxData(product, taxonomies, taxData, taxSettings, this.props.toggleTermAct, this.toggleTax.bind(this))}
                        </tr>
                    ))}
                    </tbody>
                </table>
                </ReactTableContainer> }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taxonomies : state.product.taxonomyTerms,
        taxData: state.product.taxonomyData,
        taxSettings: state.settings.taxSettings,
        error: state.settings.error

    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleTaxonomy: (toggled) => getToggleTaxonomyAction(toggled),
    toggleTermAct: (toggled, taxonomySlug, taxonomyTerm) => getToggleTermAction(toggled, taxonomySlug, taxonomyTerm),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductTable);