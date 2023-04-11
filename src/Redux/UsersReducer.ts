import { usersAPI } from '../components/api/Api';
import { PhotosType } from './ProfileReducer';

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
const usersReducer = (state = initialState, action: any): initialStateType => {
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
export const setTotalUsersCount = (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const setIsFetching = (isFetching: boolean) => ({ type: TOOGLE_IS_FETCHING, isFetching });
export const setfollowingInProgress = (isFetching: boolean, userId: number) => ({ type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

export const getUsersThunkCreator = (page: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize);

    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

export const unFollowThunkCreator = (userId: number) => {
  return (dispatch: any) => {
    dispatch(setfollowingInProgress(true, userId));
    usersAPI.usersFollow(userId).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(unFollow(userId));
      }
      dispatch(setfollowingInProgress(false, userId));
    });
  };
};

export const followThunkCreator = (userId: number) => {
  return async (dispatch: any) => {
    dispatch(setfollowingInProgress(true, userId));
    const response = await usersAPI.usersUnFollow(userId);

    if (response.data.resultCode === 0) {
      dispatch(follow(userId));
    }
    dispatch(setfollowingInProgress(false, userId));
  };
};

export default usersReducer;
