import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControl/FormControl';
import { requiredField } from '../common/validate/validate';
import { connect } from 'react-redux';
import { loginThunkCreator } from '../../Redux/AuthReducer';
import { Navigate } from 'react-router-dom';
import styles from '../common/FormsControl/FormControl.module.css';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'email'} placeholder={'Email'} component={Input} validate={[requiredField]} />
      </div>
      <div>
        <Field name={'password'} placeholder={'Password'} component={Input} validate={[requiredField]} type={'password'} />
      </div>
      <div>
        <Field name={'rememberMe'} type={'checkbox'} component={'input'} />
        Запомнить меня
      </div>
      {props.error && <div className={styles.form__summary_error}>{props.error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.loginThunkCreator(formData.email, formData.password, formData.rememberMe);
  };
  if (props.isAuth) {
    return <Navigate replace to="/profile" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapsStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapsStateToProps, { loginThunkCreator })(Login);
