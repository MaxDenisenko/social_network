import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, setTotalUsersCount, setIsFetching, setfollowingInProgress, getUsersThunkCreator, followThunkCreator, unFollowThunkCreator, UserType } from '../../Redux/UsersReducer';
import Users from './Users';
import Preloader from '../common/preloader/preloader';
import { WithAuthNavigate } from '../../HOC/WithAuthNavigate';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../Redux/UsersSelectors';
import { AppStateType } from '../../Redux/ReduxStore';
type PropsType = {
  currentPage: number;
  pageSize: number;
  getUsersThunkCreator: (currentPage: number, pageSize: number) => void;
  setCurrentPage: (page: number) => void;
  setIsFetching: (element: boolean) => void;
  isFetching: boolean;
  users: Array<UserType>;
  totalUsersCount: number;
  followingInProgress: Array<number>;
  unFollowThunkCreator: (arg0: any) => void;
  followThunkCreator: (arg0: any) => void;
};

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = (page: number) => {
    this.props.setCurrentPage(page);
    this.props.setIsFetching(true);
    this.props.getUsersThunkCreator(page, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          followingInProgress={this.props.followingInProgress}
          unFollowThunkCreator={this.props.unFollowThunkCreator}
          followThunkCreator={this.props.followThunkCreator}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };

let mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  WithAuthNavigate,
  connect(mapStateToProps, {
    setCurrentPage,
    setTotalUsersCount,
    setIsFetching,
    setfollowingInProgress,
    getUsersThunkCreator,
    followThunkCreator,
    unFollowThunkCreator,
  })
)(UsersContainer);
