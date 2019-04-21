
export const getActiveProductCatName = (taxonomies, taxSelected) => {
    if (taxonomies.filter(tax => tax.taxonomySlug === 'product_cat').length === 0
        || taxSelected === null || taxSelected.length === 0) {
        return null;
    }

    let productCategories = taxonomies.filter(tax => tax.taxonomySlug === 'product_cat')[0].terms;
    if (!productCategories || productCategories.length === 0) {
        return null;
    }
    let cat = productCategories.filter(cat => cat.slug === taxSelected[0])[0];

    return cat.name

};

export const catsInProducts = (taxonomyData) => {

    let used = taxonomyData.map(taxdata => taxdata.taxonomies['product_cat']).reduce((acc, cur) => [...acc, ...cur], []);

    return [...new Set(used)];
};

export const justUsedCategories = (taxonomies, categoryInfos, taxonomyData) => {

    if (!taxonomies || !categoryInfos || !taxonomyData) {
        return [];
    }

    if (taxonomies.filter(tax => tax.taxonomySlug === 'product_cat').length === 0) {
        return [];
    }

    let productCategories = taxonomies.filter(tax => tax.taxonomySlug === 'product_cat')[0].terms;
    let usedCategories = catsInProducts(taxonomyData);

    //used in product or has cat info
    return productCategories.filter(cat => usedCategories.includes(cat.slug) || !!categoryInfos[cat.slug]);

};