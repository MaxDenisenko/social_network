import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './Redux/ReduxStore';
// import StoreContext, { Provider } from './_del_StoreContext'; // Этотимпорт удален, так как помечен файл на удаление StoreContext
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
