import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import authReducer from './AuthReducer';
import dialogsReducer from './DialogsReducer';
import profileReducer from './ProfileReducer';
import sideBarReducer from './SideBarReducer';
import usersReducer from './UsersReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from './AppReducer';

let reducers = combineReducers({
  dialogsPage: dialogsReducer,
  profilePage: profileReducer,
  sidebar: sideBarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// let store = createStore(reducers, applyMiddleware());

window.store = store;

export default store;
