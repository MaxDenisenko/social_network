import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfileThunkCreator, getProfileStatusThunkCreator, updateStatusThunkCreator, savePhotoThunkCreator } from '../../Redux/ProfileReducer';
import { useParams } from 'react-router-dom';
import { WithAuthNavigate } from '../../HOC/WithAuthNavigate';
import { compose } from 'redux';

let withRouter = (Component) => {
  return (props) => {
    const match = { params: useParams() };
    return <Component {...props} match={match} />;
  };
};

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
    }
    this.props.getUserProfileThunkCreator(userId);
    this.props.getProfileStatusThunkCreator(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }
  render() {
    return (
      <div>
        <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatusThunkCreator={this.props.updateStatusThunkCreator} isOwner={!this.props.match.params.userId} savePhoto={this.props.savePhotoThunkCreator} />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({ profile: state.profilePage.profile, status: state.profilePage.status, authUserId: state.auth.userId, isAuth: state.auth.isAuth });

export default compose(connect(mapStateToProps, { getUserProfileThunkCreator, getProfileStatusThunkCreator, updateStatusThunkCreator, savePhotoThunkCreator }), withRouter, WithAuthNavigate)(ProfileContainer);
