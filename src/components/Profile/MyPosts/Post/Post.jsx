import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
  return (
    <div className={styles.post}>
      {props.message}
      <div>
        {' '}
        <span>Лайков - </span>
        {props.likes}
      </div>
    </div>
  );
};

export default Post;
