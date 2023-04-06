import React from 'react';
import Preloader from '../../common/preloader/preloader';
import styles from './ProfileInfo.module.css';
import avatar from './../../../assets/img/avatar.jpg';
// import ProfileStatus from './ProfileStatus';
import ProfileStatusHooks from './ProfileStatusHooks';

const ProfileInfo = (props) => {
  if (props.profile === null) {
    return <Preloader />;
  }
  const onFotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  return (
    <div>
      <div>
        <div>
          <img src="https://e7.pngegg.com/pngimages/592/884/png-clipart-programmer-computer-programming-computer-software-computer-icons-programming-language-avatar-heroes-computer.png" alt="imgage" />
        </div>
        <div>
          <ProfileStatusHooks status={props.status} updateStatusThunkCreator={props.updateStatusThunkCreator} />
        </div>
        <div className={styles.descriptionBlock}>
          <img src={props.profile.photos.large || avatar} alt="large" />
          <br />
          {props.isOwner && <input type="file" onChange={onFotoSelected} />}
          <span>
            <div>{props.profile.fullName}</div>
            <div>{props.profile.aboutMe}</div>
            <div>
              <b>Контактные данные</b>
            </div>
            <div>
              <b>Контак в ВК:</b>
              {props.profile.contacts.vk}
            </div>
          </span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
