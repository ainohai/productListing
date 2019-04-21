// RootReducer - here we combine ALL the reducers
//import { i18nReducer } from 'react-redux-i18n';
import { combineReducers } from 'redux';
import { default as product } from './product';
import { default as settings } from './settings';
import {default as search } from './search';

const rootReducer = combineReducers({
    product, settings, search
});

export default rootReducer;
