import React from 'react';
import { render } from 'react-dom';
import {default as App} from './App';
//import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {default as store } from './store/storeConfig';

render(
  <Provider store={store}>
    <App />
  </Provider>,
    document.getElementById('tuotteet')
);

//registerServiceWorker();
