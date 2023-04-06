import { stopSubmit } from 'redux-form';
import { secureAPI, usersAPI } from '../components/api/Api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA = 'GET_CAPTCHA';

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const setAuthUserDataActionCreator = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

export const getCaptchaUrlActionCreator = (captchaUrl) => ({ type: GET_CAPTCHA, payload: { captchaUrl } });

export const getAuthUserDataThunkCreator = () => async (dispatch) => {
  let data = await usersAPI.getAuthDataUsers();

  if (data.resultCode === 0) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserDataActionCreator(id, email, login, true));
  }
};

export const loginThunkCreator = (email, password, rememberMe, captcha) => {
  return (dispatch) => {
    usersAPI.login(email, password, rememberMe, captcha).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataThunkCreator());
      } else {
        if (response.data.resultCode === 10) {
          dispatch(getCaptchaUrlThunkCreator());
        }
        let msg = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: msg }));
      }
    });
  };
};

export const getCaptchaUrlThunkCreator = () => async (dispatch) => {
  const response = await secureAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlActionCreator(captchaUrl));
};

export const logoutThunkCreator = () => async (dispatch) => {
  let response = await usersAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserDataActionCreator(null, null, null, false));
  }
};

export default authReducer;
