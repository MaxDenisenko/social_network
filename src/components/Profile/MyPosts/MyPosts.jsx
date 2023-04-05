import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLength30ThunkCreator, minLength3, requiredField } from '../../common/validate/validate';
import { TextArea } from '../../common/FormsControl/FormControl';

const maxLength = maxLength30ThunkCreator(10);
let FormAddPost = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={styles.postsBlock}>
        <div>
          <Field name="newPostText" component={TextArea} validate={[requiredField, maxLength, minLength3]} />
        </div>
        <div>
          <button>Add Post</button>
        </div>
      </div>
    </form>
  );
};

FormAddPost = reduxForm({ form: 'ProfileFormAddPost' })(FormAddPost);

const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => <Post message={p.message} key={p.id} likes={p.likes} />);

  let AddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div>
      <FormAddPost onSubmit={AddPost} />
      <div>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
