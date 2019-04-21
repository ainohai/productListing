// Import and export EVERY saga here
import { all } from 'redux-saga/effects';
import {productSagas} from './product';
import {settingsSagas} from './settings';
import {searchSagas} from './search'


export default function* rootSaga() {
    yield all([
        productSagas(),
        settingsSagas(),
        searchSagas()
    ]);
}
