import React from 'react';
import { render } from 'react-dom';
import {default as AdminApp} from './AdminApp';
//import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {default as store } from './store/storeConfig';

render(
  <Provider store={store}>
    <AdminApp />
  </Provider>,
    document.getElementById('aino_productList')
);

//registerServiceWorker();
