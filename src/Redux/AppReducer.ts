import { getAuthUserDataThunkCreator } from './AuthReducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

export type initialState = {
  initialized: boolean;
};
let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): initialState => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, initialized: true };
    default:
      return state;
  }
};
type initializedSuccess = {
  type: typeof SET_INITIALIZED;
};
export const initializedSuccess = (): initializedSuccess => ({ type: SET_INITIALIZED });

export const initializeAppThunkCreator = () => (dispatch: any) => {
  let propmise = dispatch(getAuthUserDataThunkCreator());

  propmise.then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
