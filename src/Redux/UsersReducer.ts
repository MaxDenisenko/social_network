import { Dispatch } from 'redux';
import { usersAPI } from '../components/api/Api';
import { PhotosType } from './ProfileReducer';
import { AppStateType } from './ReduxStore';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING';
const TOOGLE_IS_FOLLOWING_PROGRESS = 'TOOGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

type initialStateType = typeof initialState;

export type UserType = {
  followed: boolean;
  id: number;
  name: string;
  status: string;
  photos: PhotosType;
};
const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        // users:[...state.users],
        users: state.users.map((users) => {
          if (users.id === action.userId) {
            return { ...users, followed: true };
          }
          return users;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        // users:[...state.users],
        users: state.users.map((users) => {
          if (users.id === action.userId) {
            return { ...users, followed: false };
          }
          return users;
        }),
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case TOOGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOOGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

type ActionsTypes = followType | unFollowType | setUsersType | setCurrentPageType | setTotalUsersCountType | setIsFetchingType | setfollowingInProgressType;

type followType = {
  type: typeof FOLLOW;
  userId: number;
};
export const follow = (userId: number): followType => ({ type: FOLLOW, userId });

type unFollowType = {
  type: typeof UNFOLLOW;
  userId: number;
};
export const unFollow = (userId: number): unFollowType => ({ type: UNFOLLOW, userId });

type setUsersType = {
  type: typeof SET_USERS;
  users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): setUsersType => ({ type: SET_USERS, users });

type setCurrentPageType = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
};
export const setCurrentPage = (currentPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currentPage });

type setTotalUsersCountType = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
};
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });

type setIsFetchingType = {
  type: typeof TOOGLE_IS_FETCHING;
  isFetching: boolean;
};
export const setIsFetching = (isFetching: boolean): setIsFetchingType => ({ type: TOOGLE_IS_FETCHING, isFetching });

type setfollowingInProgressType = {
  type: typeof TOOGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const setfollowingInProgress = (isFetching: boolean, userId: number): setfollowingInProgressType => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize);

    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

export const unFollowThunkCreator = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(setfollowingInProgress(true, userId));
    const response = await usersAPI.usersFollow(userId);

    if (response.data.resultCode === 0) {
      dispatch(unFollow(userId));
    }
    dispatch(setfollowingInProgress(false, userId));
  };
};

export const followThunkCreator = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(setfollowingInProgress(true, userId));
    const response = await usersAPI.usersUnFollow(userId);

    if (response.data.resultCode === 0) {
      dispatch(follow(userId));
    }
    dispatch(setfollowingInProgress(false, userId));
  };
};

export default usersReducer;
