import { getAuthUserDataThunkCreator } from './AuthReducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: SET_INITIALIZED });

export const initializeAppThunkCreator = () => (dispatch) => {
  let propmise = dispatch(getAuthUserDataThunkCreator());

  propmise.then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
