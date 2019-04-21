import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { parseQueryParams, urlWithQueryParams } from "../util/urlUtils";

// Constants - action names
export const CHANGE_TAXONOMY_FILTER = 'search/CHANGE_TAXONOMY_FILTER';
export const CATEGORY_DATA_FETCHED = 'search/CATEGORY_DATA_FETCHED';
export const CHANGE_NAME_FILTER = 'search/CHANGE_NAME_FILTER';
export const INIT_SEARCH_PARAMS = 'search/INIT_SEARCH_PARAMS';
export const CHANGE_CAT_FILTER = 'search/CHANGE_CAT_FILTER';

const initialState = {
    taxonomyFilters: {
            kukan_vari: [],
            vyohyke: [],
            valon_tarve: [],//todo: remove need for this
            product_cat: [],
            erityista: [],

    },
    nameFilter : "",
    categoryDataFetched:false


};
//;
// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case CHANGE_TAXONOMY_FILTER:
            let taxObj = {};
            taxObj[action.taxonomyName] = action.taxonomyFilter;

            let taxFilters = Object.assign({}, state.taxonomyFilters, taxObj);

            if (action.clearOthers) {
                Object.keys(taxFilters).forEach(taxKey => {if (taxKey !== action.taxonomyName) {taxFilters[taxKey] = [] }});
            }

            return Object.assign({}, state, {taxonomyFilters : taxFilters});

        case CATEGORY_DATA_FETCHED:
            return Object.assign( {}, state, {categoryDataFetched: true });
        case CHANGE_NAME_FILTER:
            return Object.assign( {}, state, {nameFilter: action.nameFilter });
        default:
            return state;
    }
}

// Actions
export function changeTaxonomyFilter(taxonomyFilter, taxonomyName, clearOthers=false) { return {type: CHANGE_TAXONOMY_FILTER, taxonomyFilter: taxonomyFilter, taxonomyName: taxonomyName, clearOthers:clearOthers}; }
export function categoryDataFetched() { return {type: CATEGORY_DATA_FETCHED}; }
export function changeNameFilterAction (nameFilter) {return {type:CHANGE_NAME_FILTER, nameFilter:nameFilter}};
export function initSearchParamsAction() { return {type:INIT_SEARCH_PARAMS}}

//Saga Selectors
export const getTaxDataSelector = (state) => state.search.taxonomyFilters;
export const getNameFilterSelector = (state) => state.search.nameFilter;

// Sagas
function* initSearchParamsSaga() {

    const params = parseQueryParams();


    if (params['nameFilter']) {
        yield put(changeNameFilterAction(params['nameFilter'][0]));
        delete params.nameFilter;
    }

    if (params) {
        let keys = Object.keys(params)

        for (var i = 0; i< keys.length ; i++) {
            let key = keys[i];
            yield put(changeTaxonomyFilter(params[key], key));

        }
    }

}

function* setUrlParams()  {

    let taxData = yield select(getTaxDataSelector);
    let nameFilter = yield select(getNameFilterSelector);

    let url = urlWithQueryParams(taxData, nameFilter);

    console.log(url);

    history.replaceState({}, "Tuotteet", url);
}

function* changeSagaWatch() {
    yield takeEvery(INIT_SEARCH_PARAMS, initSearchParamsSaga);
    yield takeEvery(CHANGE_TAXONOMY_FILTER, setUrlParams);
    yield takeEvery(CHANGE_NAME_FILTER, setUrlParams);
    }

export function* searchSagas() {
    yield all([
        changeSagaWatch()
    ]);
}
