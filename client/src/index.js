import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css';
import 'font-awesome/css/font-awesome.min.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import logger from 'redux-logger';

import App from './components/App';
import reducer from './reducer';

const persistConfig = { key: 'root', storage, stateReconciler: autoMergeLevel2 }

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk, logger));
const persistor = persistStore(store);
// persistor.purge();
// persistor.flush();

export default class Preloader extends Component {
  constructor() {
    super()
    this.state = { rehydrated: false }
  }
  componentWillMount(){
    persistStore(this.props.store, {}, () => {
      this.setState({ rehydrated: true });
    })
  }
  render() {
    if(!this.state.rehydrated){
      return <div>Loading...</div>;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
    document.querySelector('#root'));
