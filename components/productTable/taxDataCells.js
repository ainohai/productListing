import React from "react";

const getProductTaxValue = (product, tax, termSlug, taxData) => {
    let productTaxData = taxData.filter(
        productData => productData.id === product.id
    )[0];
    return productTaxData && productTaxData.taxonomies[tax]
        ? productTaxData.taxonomies[tax].includes(termSlug)
        : false;
};


const getTaxTermsAsList = (product, taxSlug, taxData, taxonomies) => {
    let productTaxData = taxData.filter(
        taxProductData => taxProductData.id === product.id
    )[0];
    let taxTerms = taxonomies.filter(tax => tax.taxonomySlug === taxSlug)[0].terms;
    return productTaxData && productTaxData.taxonomies[taxSlug].length > 0
        ? productTaxData.taxonomies[taxSlug].map(x => taxTerms.filter(term =>  term.slug === x)[0].name).reduce(
            (accumulator, x) => accumulator + ", " + x
        )
        : "";
};

export const getTaxData = (product, taxonomies, taxData, taxSettings, toggleTermAct, toggleTax) => {

    return (
        taxonomies
        //.filter(taxonomy => taxSettings[taxonomy].show)
            .map((tax, taxindex) =>
                taxSettings[tax.taxonomySlug].show ? (
                    tax.terms.map((term, index)  => (
                        <td key={tax + index} className={"taxValue" + (index % 2 === 0 ? " even" : "") + (taxindex % 2 === 0 ? " taxEven" : "")} onClick={e => toggleTermAct(product.id, tax.taxonomySlug, term.slug)}>
                            {getProductTaxValue(product, tax.taxonomySlug, term.slug, taxData) ? term.name : ""}
                        </td>
                    ))
                ) : (
                    <td key={tax + taxindex} onClick={e => {toggleTax(e, tax.taxonomySlug, taxSettings)}} className="taxValue shrinked" colSpan={tax.terms.length} >

                        {getTaxTermsAsList(product, tax.taxonomySlug, taxData, taxonomies)}
                    </td>
                )
            )
    );
};
