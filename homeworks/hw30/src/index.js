import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from "redux";
import { todoReducer } from './reducers'
import { thunk } from 'redux-thunk'


const store = createStore(todoReducer, applyMiddleware(thunk))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);

