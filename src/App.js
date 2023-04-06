import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import News from './components/News/News';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/Login';
import { connect } from 'react-redux';
import { initializeAppThunkCreator } from './Redux/AppReducer';
import { compose } from 'redux';
import Preloader from './components/common/preloader/preloader';

let withRouter = (Component) => {
  return (props) => {
    const match = { params: useParams() };
    return <Component {...props} match={match} />;
  };
};

class App extends React.Component {
  componentDidMount() {
    this.props.initializeAppThunkCreator();
  }
  render() {
    if (!this.props.initialized) return <Preloader />;
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="app-wrapper">
          <HeaderContainer />
          <NavBar />
          <div className="app-wrapper-content">
            <Routes>
              <Route path="/dialogs" element={<DialogsContainer />} />
              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<UsersContainer />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

let mapStateToProps = (state) => ({ initialized: state.app.initialized });

export default compose(withRouter, connect(mapStateToProps, { initializeAppThunkCreator }))(App);
