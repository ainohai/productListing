
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
