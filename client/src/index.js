import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import logger from 'redux-logger';

import App from './components/App';
import reducer from './reducer';

const persistConfig = { key: 'root', storage, stateReconciler: hardSet }

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk, logger));
const persistor = persistStore(store);
persistor.purge();
// persistor.flush();
ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.querySelector('#root'));
