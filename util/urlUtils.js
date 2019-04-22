const getUrl = () => {
  return window.location.href;
};

const getQueryParamValue = (value, arr) => {
    if (arr && Array.isArray(arr)) {
        arr.push(value);
        return arr;
    }
    if (arr) {
        return [value, arr];
    }
    return [value];
};
const getQueryParams = (queryObj, queryPart) => {
    queryObj[queryPart[0]] = getQueryParamValue(queryPart[1], queryObj[queryPart[0]]);
    return queryObj;
};

export const parseQueryParams = () => {

    const locationArr = getUrl().split('?');
    const queryPart = locationArr.length >1 ? locationArr[locationArr.length -1] : null;

    let queryObj = {};

    if (queryPart) {
        const params = queryPart.split('&');

        params.forEach(param => getQueryParams(queryObj, param.split('=')));
    }
    return queryObj;
};

export const urlWithQueryParams = (taxFilters, nameFilter) => {

    let url = getUrl();
    let baseUrl = getUrl().split('?')[0];

    return baseUrl +'?' + taxFiltersIntoQueryString(taxFilters, nameFilter);


};

const taxFiltersIntoQueryString = (taxFilters, nameFilter) => {
   let queryString = '';

   if (nameFilter !== "") {
       queryString += "nameFilter=" + nameFilter + "&";
   }

   Object.keys(taxFilters).forEach(taxName => queryString += addTaxFilterIntoQueryString(taxFilters[taxName], taxName));

    return queryString;
};

const addTaxFilterIntoQueryString = (taxArr, taxName) => {

    let queryString = "";

    if (!!taxArr && taxArr.length > 0) {
        taxArr.forEach(tax => queryString = queryString + taxName + "=" + tax + "&");
    }
    return queryString
};


