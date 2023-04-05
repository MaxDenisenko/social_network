import React from 'react';
import { connect } from 'react-redux';
import { follow, unFollow, setCurrentPage, setTotalUsersCount, setIsFetching, setfollowingInProgress, getUsersThunkCreator, followThunkCreator, unFollowThunkCreator } from '../../Redux/UsersReducer';
import Users from './Users';
import Preloader from '../common/preloader/preloader';
import { WithAuthNavigate } from '../../HOC/WithAuthNavigate';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../Redux/UsersSelectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = (page) => {
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
          follow={this.props.follow}
          unFollow={this.props.unFollow}
          setfollowingInProgress={this.props.setfollowingInProgress}
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

let mapStateToProps = (state) => {
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
    follow,
    unFollow,
    setCurrentPage,
    setTotalUsersCount,
    setIsFetching,
    setfollowingInProgress,
    getUsersThunkCreator,
    followThunkCreator,
    unFollowThunkCreator,
  })
)(UsersContainer);
