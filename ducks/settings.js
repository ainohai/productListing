import { all, call, put, takeEvery, select } from 'redux-saga/effects';

// Constants - action names
export const TOGGLE_TAXONOMY = 'wp/TOGGLE_TAXONOMY';
export const ERROR = 'wp/ERROR';
export const TOGGLE_CATEGORY_ACCORDION = 'wp/TOGGLE_CATEGORY_ACCORDION';

const initialState = {
    usedTaxonomies: ['kukan_vari', 'valon_tarve', 'erityista'],
    taxSettings : {
        valon_tarve: {
            show: false
        },
        kukan_vari: {
            show: false
        },
        vyohyke: {
            show: false
        },
        erityista: {
            show: false
        },
        product_cat: {
            show: false
        }
    },
    error:false,
    categoryAccordionIsOpen:false
};
//;

// Reducer
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case TOGGLE_TAXONOMY:
            return Object.assign({}, state, {taxSettings : Object.assign({}, state.taxSettings, action.toggled)});
        case ERROR:
            return Object.assign({}, state, {error: true});
        case TOGGLE_CATEGORY_ACCORDION:
            return Object.assign({}, state,{categoryAccordionIsOpen: action.catIsOpen});
        default:
            return state;
    }
}

// Actions
export function getToggleTaxonomyAction(toggled) { return {type: TOGGLE_TAXONOMY, toggled: toggled}; }
export function setError() {return {type:ERROR};}
export function toggleCategoryAccordionAction(catIsOpen) {return {type:TOGGLE_CATEGORY_ACCORDION, catIsOpen:catIsOpen};
}


// Actions
/*export function getProductsAction() { return {type: GET_PRODUCTS}; }
*/

//Saga Selector

// Sagas
/*function* getProductsSaga() {

    console.log("In saga redux middleware");

    let data;
    try {
        data = yield call(getProducts);
    }
    catch (e) {
        //to do : Handle errors
        console.log("Something went wrong");
        console.log(e);
        yield put(getProductsFailureAction(data));
    }
    console.log("returned from product api call");

    yield put(getProductsSuccessAction(data));

    yield put(getTaxonomyTermsAction());
    yield put(getTaxonomyDataAction());
}*/


function* changeSagaWatch() {
    //yield takeEvery(GET_PRODUCTS, getProductsSaga);
}

export function* settingsSagas() {
    yield all([
        changeSagaWatch()
    ]);
}
