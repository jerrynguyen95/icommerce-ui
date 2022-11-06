import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {storeReducer} from './redux/store.reducer';
import {compose, createStore} from 'redux';
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

// Use the Redux dev tool
const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const initalState = {
  userInfo: {},
  carts: [],
  productObject: {
    rows: [],
    pageNumber: 0,
    pageSize: 20,
    totalElements: 100,
    s: ''
  },
  toastObject: {
    show: false,
    content: '',
    type: ''
  }
};

export const store = createStore(storeReducer, initalState,enhancers);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
