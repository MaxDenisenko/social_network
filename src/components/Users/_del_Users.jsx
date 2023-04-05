import React from 'react';
import styles from './Users.module.css';
import axios from 'axios';
import avatar from '../../assets/img/avatar.jpg';

const Users = (props) => {
  // let user = [
  //   {
  //     id: 1,
  //     fullName: 'Max',
  //     status: 'first status',
  //     location: { city: 'New York', country: 'USA' },
  //     followed: true,
  //     photoUrl: 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg',
  //   },
  //   {
  //     id: 2,
  //     fullName: 'Ann',
  //     status: 'first status',
  //     location: { city: 'New York', country: 'USA' },
  //     followed: false,
  //     photoUrl: 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg',
  //   },
  //   {
  //     id: 3,
  //     fullName: 'Egor',
  //     status: 'first status',
  //     location: { city: 'New York', country: 'USA' },
  //     followed: true,
  //     photoUrl: 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg',
  //   },
  //   {
  //     id: 4,
  //     fullName: 'Gleb',
  //     status: 'first status',
  //     location: { city: 'New York', country: 'USA' },
  //     followed: false,
  //     photoUrl: 'https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg',
  //   },
  // ];

  let get_users = () => {
    if (props.users.length === 0) {
      axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response) => {
        props.setUsers(response.data.items);
      });
    }
  };
  return (
    <div>
      <button onClick={get_users}>Get</button>
      {props.users.map((users) => (
        <div key={users.id}>
          <span>
            <div>
              <img className={styles.avatar} src={users.photos.small !== null ? users.photos.small : avatar} />
            </div>
            <div>
              {users.followed ? (
                <button
                  onClick={() => {
                    props.unFollow(users.id);
                  }}
                >
                  Отписаться
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.follow(users.id);
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
