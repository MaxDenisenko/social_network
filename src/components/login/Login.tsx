import React, { FC } from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Input } from '../common/FormsControl/FormControl';
import { requiredField } from '../common/validate/validate';
import { connect } from 'react-redux';
import { loginThunkCreator } from '../../Redux/AuthReducer';
import { Navigate } from 'react-router-dom';
import styles from '../common/FormsControl/FormControl.module.css';
import { AppStateType } from '../../Redux/ReduxStore';

type MapsStateToPropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};

type LoginThunkCreatorType = {
  loginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha: null | undefined) => void;
};

type MyOwnPropsCaptcha = {
  capthaUrl: string | null;
};

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, MyOwnPropsCaptcha> & MyOwnPropsCaptcha> = (props, { captchaUrl }) => {
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

      {captchaUrl && <img src={captchaUrl} alt="" />}
      {captchaUrl && <Field name={'captcha'} placeholder={'Sumbols from image'} component={Input} validate={[requiredField]} />}

      {props.error && <div className={styles.form__summary_error}>{props.error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, MyOwnPropsCaptcha>({ form: 'login' })(LoginForm);

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: null | undefined;
};
const Login: FC<MapsStateToPropsType & LoginThunkCreatorType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };
  if (props.isAuth) {
    return <Navigate replace to="/profile" />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} capthaUrl={props.captchaUrl} />
    </div>
  );
};

const mapsStateToProps = (state: AppStateType): MapsStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapsStateToProps, { loginThunkCreator })(Login);
