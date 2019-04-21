import React from "react";


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

                        {getTaxTermsAsList(product, tax.taxonomySlug, taxData)}
                    </td>
                )
            )
    );
};
