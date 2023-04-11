import React from 'react';
import styles from './Users.module.css';
import avatar from '../../assets/img/avatar.jpg';
import { NavLink } from 'react-router-dom';
import Paginator from './Paginator';
import { UserType } from '../../Redux/UsersReducer';

let Users = (props: {
  onPageChanged: (pageNumber: number) => void;
  currentPage: number;
  totalUsersCount: number;
  pageSize: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  unFollowThunkCreator: (arg0: any) => void;
  followThunkCreator: (arg0: any) => void;
}) => {
  return (
    <div>
      <Paginator onPageChanged={props.onPageChanged} currentPage={props.currentPage} totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} portionSize={10} />
      {props.users.map((users) => (
        <div key={users.id}>
          <span>
            <div>
              <NavLink to={'/profile/' + users.id}>
                <img className={styles.avatar} src={users.photos.small !== null ? users.photos.small : avatar} alt="avatar" />
              </NavLink>
            </div>
            <div>
              {users.followed ? (
                <button
                  disabled={props.followingInProgress.some((id) => id === users.id)}
                  onClick={() => {
                    props.unFollowThunkCreator(users.id);
                  }}
                >
                  Отписаться
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === users.id)}
                  onClick={() => {
                    props.followThunkCreator(users.id);
                  }}
                >
                  Подписаться
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{users.name}</div>
              <div>{users.status}</div>
            </span>
            <span>
              {/* <div>{users.location.country}</div>
              <div>{users.location.city}</div> */}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Users;
