import { stopSubmit } from 'redux-form';
import { usersAPI } from '../components/api/Api';

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const setAuthUserDataActionCreator = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

export const getAuthUserDataThunkCreator = () => async (dispatch) => {
  let data = await usersAPI.getAuthDataUsers();

  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserDataActionCreator(id, email, login, true));
  }
};

export const loginThunkCreator = (email, password, rememberMe) => {
  return (dispatch) => {
    usersAPI.login(email, password, rememberMe).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator());
      } else {
        let msg = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: msg }));
      }
    });
  };
};

export const logoutThunkCreator = () => async (dispatch) => {
  let response = await usersAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserDataActionCreator(null, null, null, false));
  }
};

export default authReducer;
