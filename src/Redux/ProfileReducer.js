import { profileAPI, usersAPI } from '../components/api/Api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_STATUS = 'UPDATE_STATUS';
const SAVE_PHOTO = 'SAVE_PHOTO';

let initialState = {
  posts: [
    { id: 1, message: 'sldkjflsdkjfldskjfld', likes: 2 },
    { id: 2, message: 'sldkjflsdkjfldskjfld', likes: 2 },
    { id: 3, message: 'sldkjflsdkjfldskjfld', likes: 2 },
    { id: 4, message: 'sldkjflsdkjfldskjfld', likes: 2 },
  ],

  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likes: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: '',
      };
    }

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case UPDATE_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SAVE_PHOTO:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setProfileStatus = (status) => ({ type: SET_STATUS, status });
export const updateProfileStatus = (status) => ({ type: UPDATE_STATUS, status });
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO, photos });

export const getUserProfileThunkCreator = (userId) => async (dispatch) => {
  const data = await usersAPI.getProfileUsers(userId);
  dispatch(setUserProfile(data));
};

export const getProfileStatusThunkCreator = (userId) => {
  return (dispatch) => {
    profileAPI.getProfileStatus(userId).then((response) => {
      dispatch(setProfileStatus(response.data));
    });
  };
};
export const updateStatusThunkCreator = (status) => async (dispatch) => {
  const response = await profileAPI.updateProfileStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(updateProfileStatus(status));
  }
};

export const savePhotoThunkCreator = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export default profileReducer;
