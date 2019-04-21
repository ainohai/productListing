import React from "react";


const colspan = (tax) => {
    return tax.terms.length;
};

const even = (index) => {
    return (index % 2 === 0 ? " even" : "");
};

const shrinked = (taxShown) => {
    return (taxShown ? "" : " shrinked");
}

export const topheader = (taxonomies, tax, taxSettings, toggleTax, taxShown, index) => {

    return (
        <th key={"topheader-"+index} className={"topheader" + shrinked(taxShown) + even(index)} onClick={e => toggleTax(e, tax.taxonomySlug, taxSettings)} colSpan={colspan(tax)}>
            <p>
                {tax.taxonomyLabel}
            </p>
        </th>
    );
};

export const subheaders = (tax, taxShown, index) => {
    return taxShown ? (
        tax.terms.map(x => <th key={"subheader-"+tax.taxonomySlug + "-" + x.name} className={"subheader" + shrinked(taxShown) + even(index)}>{x.name}</th>)
    ) : (
        <th key={"subheader-"+tax.taxonomySlug + "-shrinked"}className={"subheader" + shrinked(taxShown) + even(index)} colSpan={colspan(tax)} />
    );
};