const API_ROOT = session.restUrl + 'puoti/v1/';

const defaultOptions = {
    nonce: !!session && !!session.nonce ? session.nonce : null,
    current_user_id: !!session && !!session.current_user_id ? session.current_user_id : null};

function status(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else if (response.status === 401) {
        throw Error(response.statusText);
    } else {
        throw Error(response.statusText);
    }
}

function json(response) {
    return response.text()
        .then(data => {
        try {
            return JSON.parse(data);
} catch (error) {
        // Response not json - returning as string
        return data;
    }
})
.catch(error => {
        console.error(error);
    return response.text();
});
}

function handleError(error) {
    return Promise.reject({message: error.message, stack: error.stack});
}

function addNonceHeader(headers = {}) {

    if(!!session && !!session.nonce) {
        return Object.assign({}, headers, {'X-WP-Nonce' : session.nonce})
    }
    return headers;
}

function requestWithBody(method, url, payload, options = {}) {
    let headerObj = addNonceHeader({'Content-Type': 'application/json'});

    options = Object.assign({
        method: method,
        body: JSON.stringify(payload),
        headers: new Headers(headerObj)
    }, options);

    return apiCall(url, options);
}

function requestWithoutBody(method, url, options = {}) {
    options = Object.assign({
        method: method,
        headers: new Headers(addNonceHeader())
    }, options);

    return apiCall(url, options);
}

function post(url, payload, options) {
    console.log("url: " +url);
    return requestWithBody('post', url, payload, options);
}

function objectIntoQueryParams(object) {
    return Object.keys(object).reduce((qs, key, index) => {
        return `${qs}${index > 0 ? '&' : ''}${key}=${object[key]}`;
}, '?');
}

function put(url, payload, options) {
    return requestWithBody('put', url, payload, options);
}

function get(url, options) {
    return requestWithoutBody('get', url, options);
}

function del(url, options) {
    return requestWithoutBody('delete', url, options);
}

function apiCall(endpoint, options = {}) {
    let fullUrl = (!~endpoint.indexOf(API_ROOT)) ? API_ROOT + endpoint : endpoint;


    options = Object.assign({}, options, {queryParams : Object.assign( {}, options.queryParams ? options.queryParams : {}, defaultOptions)});

    if (!!options.queryParams) {
        fullUrl += objectIntoQueryParams(options.queryParams);
    }

    console.log(fullUrl);
    return fetch(encodeURI(fullUrl), options)
        .then(status)
        .then(json)
        .catch(handleError);
}

export const customApiCall = (url, options) => apiCall(url, options);
export const getProducts = (showAll) => get('products', showAll ? {queryParams: {showAll : true}} : {} );
export const getTaxonomyTerms = () => get('taxonomies', {});
export const getTaxonomyData = (showAll) => get('taxonomydata', showAll ? {queryParams: {showAll : true}} : {} );
export const getCategoryData = () => get('categorydata', {});
export const toggleTaxonomyTerms = (productId, taxonomySlug, taxonomyTerm) => put('toggleTax/' + productId + '/' + taxonomySlug + '/' + taxonomyTerm, {});