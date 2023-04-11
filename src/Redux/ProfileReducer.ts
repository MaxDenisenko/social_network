import { profileAPI, usersAPI } from '../components/api/Api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_STATUS = 'UPDATE_STATUS';
const SAVE_PHOTO = 'SAVE_PHOTO';

type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
};
type PhotosType = {
  small: string | null;
  large: string | null;
};
type PostsType = {
  id: number;
  message: string;
  likes: number;
};

let initialState = {
  posts: [
    { id: 1, message: 'sldkjflsdkjfldskjfld', likes: 2 },
    { id: 2, message: 'sldkjflsdkjfldskjfld', likes: 2 },
    { id: 3, message: 'sldkjflsdkjfldskjfld', likes: 2 },
    { id: 4, message: 'sldkjflsdkjfldskjfld', likes: 2 },
  ] as Array<PostsType>,

  profile: null as ProfileType | null,
  status: '',
  newPostText: '',
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
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
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    default:
      return state;
  }
};
type addPostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};
export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => ({ type: ADD_POST, newPostText });

type setUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType;
};
export const setUserProfile = (profile: ProfileType): setUserProfileType => ({ type: SET_USER_PROFILE, profile });

type setProfileStatusType = {
  type: typeof SET_STATUS;
  status: string;
};

export const setProfileStatus = (status: string): setProfileStatusType => ({ type: SET_STATUS, status });

type updateProfileStatusType = {
  type: typeof UPDATE_STATUS;
  status: string;
};
export const updateProfileStatus = (status: string): updateProfileStatusType => ({ type: UPDATE_STATUS, status });

type savePhotoSuccessType = {
  type: typeof SAVE_PHOTO;
  photos: PhotosType;
};
export const savePhotoSuccess = (photos: string) => ({ type: SAVE_PHOTO, photos });

export const getUserProfileThunkCreator = (userId: number) => async (dispatch: any) => {
  const data = await usersAPI.getProfileUsers(userId);
  dispatch(setUserProfile(data));
};

export const getProfileStatusThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getProfileStatus(userId).then((response) => {
      dispatch(setProfileStatus(response.data));
    });
  };
};
export const updateStatusThunkCreator = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateProfileStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(updateProfileStatus(status));
  }
};

export const savePhotoThunkCreator = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file);
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};

export default profileReducer;
