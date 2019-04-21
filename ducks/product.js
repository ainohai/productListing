import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import {getProducts, getTaxonomyData, getTaxonomyTerms, getCategoryData} from '../service/api';
import {categoryDataFetched} from './search';
import {toggleTaxonomyTerms} from "../service/api";

// Constants - action names
export const GET_PRODUCTS = 'wp/GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'wp/GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'wp/GET_PRODUCTS_FAILURE';
export const GET_TAXONOMY_TERMS = 'wp/GET_TAXONOMY_TERMS';
export const GET_TAXONOMY_TERMS_SUCCESS = 'wp/GET_TAXONOMY_TERMS_SUCCESS';
export const GET_TAXONOMY_TERMS_FAILURE = 'wp/GET_TAXONOMY_TERMS_FAILURE';
export const GET_TAXONOMY_DATA = 'wp/GET_TAXONOMY_DATA';
export const GET_TAXONOMY_DATA_SUCCESS = 'wp/GET_TAXONOMY_DATA_SUCCESS';
export const GET_TAXONOMY_DATA_FAILURE = 'wp/GET_TAXONOMY_DATA_FAILURE';
export const GET_CATEGORY_DATA = 'wp/GET_CATEGORY_DATA';
export const GET_CATEGORY_DATA_SUCCESS = 'wp/GET_CATEGORY_DATA_SUCCESS';
export const GET_CATEGORY_DATA_FAILURE = 'wp/GET_CATEGORY_DATA_FAILURE';
export const TOGGLE_TERMS = 'wp/TOGGLE_TERMS';
export const TOGGLE_TERMS_SUCCESS = 'wp/TOGGLE_TERMS_SUCCESS';
export const TOGGLE_TERMS_FAILURE = 'wp/TOGGLE_TERMS_FAILURE';


const initialState = {products: [],
                      taxonomyTerms: [],
                      taxonomyData:[],
                      categoryData: []
                     };
//;
// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case GET_PRODUCTS:
            return Object.assign( {}, state, {loading:true});
        case GET_PRODUCTS_SUCCESS:
        return Object.assign({}, state, {loading: false, products: [...action.input]});
      case GET_PRODUCTS_FAILURE:
         return state; //Todo: DECIDE WHAT TO DO IN ERROR CASES.
        case GET_TAXONOMY_TERMS_SUCCESS:
            return Object.assign({}, state, {loading:false, fetchProductError: true, taxonomyTerms: action.input});
        case GET_TAXONOMY_TERMS_FAILURE:
            return state; //Todo: DECIDE WHAT TO DO IN ERROR CASES.
        case GET_TAXONOMY_DATA_SUCCESS:
            return Object.assign({}, state, {taxonomyData: action.input});
        case GET_TAXONOMY_DATA_FAILURE:
            return state; //Todo: DECIDE WHAT TO DO IN ERROR CASES.
        case GET_CATEGORY_DATA_SUCCESS:
            return Object.assign({}, state, {categoryData: action.input});
        case GET_CATEGORY_DATA_FAILURE:
            return state; //Todo: DECIDE WHAT TO DO IN ERROR CASES.
        case TOGGLE_TERMS_SUCCESS:
            return Object.assign({}, state, {taxonomyData : Object.assign(
                    [], state.taxonomyData, state.taxonomyData.map(x => (x.id === action.productId ? action.productTaxData : x)))});
        case TOGGLE_TERMS_FAILURE:
            return Object.assign({}, state, {error: action.error});

        default:
            return state;
    }
}

// Actions
export function getProductsAction(showAll) { return {type: GET_PRODUCTS, showAll:showAll}; }
export function getProductsSuccessAction(data) { return {type: GET_PRODUCTS_SUCCESS, input: data}; }
export function getProductsFailureAction(data) { return {type: GET_PRODUCTS_FAILURE, input: data}; }

export function getTaxonomyTermsAction() { return {type: GET_TAXONOMY_TERMS}; }
export function getTaxonomyTermsSuccessAction(data) { return {type: GET_TAXONOMY_TERMS_SUCCESS, input: Object.values(data)}; }
export function getTaxonomyTermsFailureAction(data) { return {type: GET_TAXONOMY_TERMS_FAILURE, input: data}; }

export function getTaxonomyDataAction(showAll) { return {type: GET_TAXONOMY_DATA, showAll:showAll}; }
export function getTaxonomyDataSuccessAction(data) { return {type: GET_TAXONOMY_DATA_SUCCESS, input: data}; }
export function getTaxonomyDataFailureAction(data) { return {type: GET_TAXONOMY_DATA_FAILURE, input: data}; }

export function getCategoryDataAction() { return {type: GET_CATEGORY_DATA}; }
export function getCategoryDataSuccessAction(data) { return {type: GET_CATEGORY_DATA_SUCCESS, input: data}; }
export function getCategoryDataFailureAction(data) { return {type: GET_CATEGORY_DATA_FAILURE, input: data}; }

export function getToggleTermAction(productId, taxonomySlug, taxonomyTerm) {return  {type:TOGGLE_TERMS, productId:productId, taxonomySlug:taxonomySlug, taxonomyTerm: taxonomyTerm}; }
export function getToggleTermSuccessAction(productId, productTaxData) {return  {type:TOGGLE_TERMS_SUCCESS, productId : productId, productTaxData: productTaxData}; }
export function getToggleTermFailureAction(error) {return  {type:TOGGLE_TERMS_FAILURE, error: error}; }


//Saga Selector

// Sagas
function* getProductsSaga(action) {

    let data;
    let showAll = action.showAll;
    try {
       data = yield call(getProducts, showAll);
    }
    catch (e) {
      //Todo: Handle errors.
      yield put(getProductsFailureAction(data));
    }
    yield put(getProductsSuccessAction(data));

    yield put(getTaxonomyTermsAction());
    yield put(getTaxonomyDataAction(showAll));
}

function* getTaxonomyTermsSaga() {

    let data;
    try {
        data = yield call(getTaxonomyTerms);
    }
    catch (e) {
        //Todo: Handle errors.
        yield put(getTaxonomyTermsFailureAction(data));
    }

    yield put(getTaxonomyTermsSuccessAction(data));

}

function* getTaxonomyDataSaga(action) {

    let data;
    try {
        data = yield call(getTaxonomyData, action.showAll);
    }
    catch (e) {
        //Todo: Handle errors.
        yield put(getTaxonomyDataFailureAction(data));
    }

    yield put(getTaxonomyDataSuccessAction(data));

}

function* getCategoryDataSaga() {

    let data;
    try {
        data = yield call(getCategoryData);
    }
    catch (e) {
        //Todo: Handle errors.
        yield put(getCategoryDataFailureAction(data));
    }

    yield put(getCategoryDataSuccessAction(data));

}

function* getCategoryDataSuccessSaga() {
    yield put(categoryDataFetched());
}

const getTaxDataSelector = (state) => state.product.taxonomyData;

function* toggleTaxTermSaga(action)  {
    try {

        yield call(toggleTaxonomyTerms, action.productId, action.taxonomySlug, action.taxonomyTerm);

        let taxData = yield select(getTaxDataSelector);
        let productTaxData = taxData.filter(td => td.id === action.productId)[0];
        const isAlready = productTaxData.taxonomies[action.taxonomySlug].includes(action.taxonomyTerm);


        let added = productTaxData.taxonomies[action.taxonomySlug];
        added.push(action.taxonomyTerm);
        let termArray = isAlready
            ? productTaxData.taxonomies[action.taxonomySlug].filter(
                taxTerm => taxTerm !== action.taxonomyTerm
            )
            : added;
        productTaxData.taxonomies[action.taxonomySlug] = termArray;

        yield put(getToggleTermSuccessAction(action.productId, productTaxData))

    }
    catch (e) {
        yield put(getToggleTermFailureAction("Muutosta ei kyetty tallentamaan. Uudelleenlataa sivu"));
    }
}

function* getTaxonomyDataRefetchSaga() {
    yield put (getTaxonomyDataAction(true));
}

function* changeSagaWatch() {
    yield takeEvery(GET_PRODUCTS, getProductsSaga);
    yield takeEvery(GET_TAXONOMY_TERMS, getTaxonomyTermsSaga);
    yield takeEvery(GET_TAXONOMY_DATA, getTaxonomyDataSaga);
    yield takeEvery(GET_CATEGORY_DATA, getCategoryDataSaga);
    yield takeEvery(GET_CATEGORY_DATA_SUCCESS, getCategoryDataSuccessSaga);
    yield takeEvery(TOGGLE_TERMS, toggleTaxTermSaga);
    yield takeEvery(TOGGLE_TERMS_FAILURE, getTaxonomyDataRefetchSaga);
}

export function* productSagas() {
    yield all([
        changeSagaWatch()
    ]);
}
