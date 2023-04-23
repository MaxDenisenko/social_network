import React from 'react';
import { Navigate } from 'react-router-dom';
import styles from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogsItem';
import MessageItem from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import { TextArea } from '../common/FormsControl/FormControl';
import { maxLength30ThunkCreator, minLength3, requiredField } from '../common/validate/validate';

const Dialogs = (props) => {
  let state = props.dialogsPage;
  let dialogData = state.dialogs;
  let messageData = state.messages;

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  if (!props.isAuth) return <Navigate to="/login" />;
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialog__items}>
        {dialogData.map((item) => (
          <DialogItem id={item.id} key={item.id} name={item.name} />
        ))}
      </div>
      <div className={styles.messages}>
        {messageData.map((item) => (
          <MessageItem message={item.message} key={item.id} />
        ))}
        <AddMessageFormReduxForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

const maxLength = maxLength30ThunkCreator(100);
const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={TextArea} name="newMessageBody" placeholder="Enter your message" validate={[requiredField, maxLength, minLength3]} />

        <br />
        <button>AddMsg!</button>
      </div>
    </form>
  );
};

const AddMessageFormReduxForm = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);

export default Dialogs;
