import { stopSubmit } from 'redux-form';
import { ResultCodesEnum, secureAPI, usersAPI } from '../components/api/Api';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA = 'GET_CAPTCHA';

type initialState = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};

let initialState: initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: any): initialState => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export type setAuthUserDataActionCreatorTypePayload = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};

export type setAuthUserDataActionCreatorType = {
  type: typeof SET_USER_DATA;
  payload: setAuthUserDataActionCreatorTypePayload;
};

export const setAuthUserDataActionCreator = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionCreatorType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } });

type getCaptchaUrlActionCreatorTypePayloadType = {
  captchaUrl: string;
};
type getCaptchaUrlActionCreatorType = {
  type: typeof GET_CAPTCHA;
  payload: getCaptchaUrlActionCreatorTypePayloadType;
};

export const getCaptchaUrlActionCreator = (captchaUrl: string): getCaptchaUrlActionCreatorType => ({ type: GET_CAPTCHA, payload: { captchaUrl } });

export const getAuthUserDataThunkCreator = () => async (dispatch: any) => {
  let data = await usersAPI.getAuthDataUsers();

  if (data.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserDataActionCreator(id, email, login, true));
  }
};

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: null | undefined) => {
  return (dispatch: any) => {
    usersAPI.login(email, password, rememberMe, captcha).then((response) => {
      if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserDataThunkCreator());
      } else {
        if (response.data.resultCode === ResultCodesEnum.CaptchaIsRequired) {
          dispatch(getCaptchaUrlThunkCreator());
        }
        let msg = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: msg }));
      }
    });
  };
};

export const getCaptchaUrlThunkCreator = () => async (dispatch: any) => {
  const response = await secureAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlActionCreator(captchaUrl));
};

export const logoutThunkCreator = () => async (dispatch: any) => {
  let response = await usersAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserDataActionCreator(null, null, null, false));
  }
};

export default authReducer;
