import React from 'react';
import Preloader from '../../common/preloader/preloader';
import styles from './ProfileInfo.module.css';
// import ProfileStatus from './ProfileStatus';
import ProfileStatusHooks from './ProfileStatusHooks';

const ProfileInfo = (props) => {
  if (props.profile === null) {
    return <Preloader />;
  }

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
          <img src={props.profile.photos.large} alt="large" />

          <span>
            <div>{props.profile.fullName}</div>
            <div>{props.profile.aboutMe}</div>
            <div>Мои контакты :</div>
            <div>{props.profile.contacts.vk}</div>
          </span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
