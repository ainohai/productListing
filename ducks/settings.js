import { delay, call } from 'redux-saga/effects'

export const TOGGLE_TAXONOMY = 'wp/TOGGLE_TAXONOMY';
export const ERROR = 'wp/ERROR';
export const TOGGLE_CATEGORY_ACCORDION = 'wp/TOGGLE_CATEGORY_ACCORDION';
export const CLEAR_ERROR = 'wp/CLEAR_ERROR';

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
    errorMessage:null,
    categoryAccordionIsOpen:false
};
//;

// Reducer
export default function reducer(state = initialState, action = {}) {

    switch (action.type) {
        case TOGGLE_TAXONOMY:
            return Object.assign({}, state, {taxSettings : Object.assign({}, state.taxSettings, action.toggled)});
        case ERROR:
            return Object.assign({}, state, {errorMessage:action.message});
        case TOGGLE_CATEGORY_ACCORDION:
            return Object.assign({}, state,{categoryAccordionIsOpen: action.catIsOpen});
        case CLEAR_ERROR:
            return Object.assign({}, state, {errorMessage: null});
        default:
            return state;
    }
}

// Actions
export function getToggleTaxonomyAction(toggled) { return {type: TOGGLE_TAXONOMY, toggled: toggled}; }
export function setError(message) {return {type:ERROR, message:message};}
export function toggleCategoryAccordionAction(catIsOpen) {return {type:TOGGLE_CATEGORY_ACCORDION, catIsOpen:catIsOpen};}
export function clearErrorAction () {return {type:CLEAR_ERROR}}

function* errorTimeout() {
    yield call(delay, 60 * 1000);
    yield put(clearErrorAction());

}

function* changeSagaWatch() {
    yield takeEvery(ERROR, errorTimeout);
}

export function* productSagas() {
    yield all([
        changeSagaWatch()
    ]);
}
