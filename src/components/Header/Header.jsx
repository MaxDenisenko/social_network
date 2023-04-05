import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = (props) => {
  return (
    <header className="header">
      <img src="https://api.freelogodesign.org/assets/thumb/logo/6294672_400.png?t=637945524870000000" alt=""></img>
      <div className={styles.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logoutThunkCreator}>Logout</button>
          </div>
        ) : (
          <Link to={'/login'}>Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
