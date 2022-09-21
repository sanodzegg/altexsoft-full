import classes from './Login.module.css';
import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToken } from '../../store/actions/auth-actions';
import { useRouter } from 'next/dist/client/router';

const Login = () => {
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const notif = useSelector(state => state.ui.notification);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const key = useSelector(state => state.auth.key);

  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();

  const loginBtn = useRef();

  const onEmailChangeHandler = (event) => {
    if (!emailTouched) {
      setEmailTouched(true);
    }
    validateEmail();
  };

  const validateEmail = (event) => {
    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    const email = emailRef.current.value;

    if (validateEmail(email)) {
      if (!emailValid) {
        setEmailValid(true);
      }
      return;
    }
    if (emailValid) {
      setEmailValid(false);
    }
  };

  const onPasswordChangeHandler = (event) => {
    if (!passwordTouched) {
      setPasswordTouched(true);
    }

    validatePassword();
  };

  const validatePassword = (event) => {
    const password = passwordRef.current.value;

    if (password.trim() !== '' && password.length >= 6) {
      if (!passwordValid) {
        setPasswordValid(true);
      }
      return;
    }
    if (passwordValid) {
      setPasswordValid(false);
    }
  };

  const onEmailBlurHandler = () => {
    if (!emailValid) {
    }
  };

  const onPasswordBlurHandler = () => {
    if (!passwordValid) {
    }
  };

  const dispatch = useDispatch();

  const onLoginClick = async (event) => {
    event.preventDefault();

    loginBtn.current.style.backgroundColor = "#a0c2d4";
    loginBtn.current.value = "Logging in";

    if (!(emailValid && passwordValid)) {
      return;
    }
    const loginData = {
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
    };
    dispatch(fetchToken(loginData, key));
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };

  useEffect(() => {
    if (notif && notif.status === "error") {
      loginBtn.current.style.backgroundColor = "#00A6FF";
      loginBtn.current.value = "Log in";
    }
  }, [notif]);

  const onRegisterClick = () => {
    router.push('/accounts/signup');
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className={classes.loginDiv}>
          <div className={classes.loginForm}>
            <div className={classes.heading}>
              <h4>Login</h4>
            </div>
            <form>
              <div className={classes.inputDiv}>
                <input
                  type="E-mail"
                  placeholder="Login"
                  required={true}
                  ref={emailRef}
                  onChange={onEmailChangeHandler}
                  onBlur={onEmailBlurHandler}
                />
              </div>
              <div className={classes.inputDiv}>
                <input
                  type="password"
                  placeholder="Password"
                  required={true}
                  autoComplete="true"
                  ref={passwordRef}
                  onChange={onPasswordChangeHandler}
                  onBlur={onPasswordBlurHandler}
                />
              </div>
              <div className={classes.buttons}>
                <input
                  className={classes.registerButton}
                  type="button"
                  value="Register"
                  onClick={onRegisterClick}
                />
                <input
                  className={classes.loginButton}
                  type="button"
                  value="Login"
                  ref={loginBtn}
                  onClick={onLoginClick}
                  disabled={!(emailValid && passwordValid)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
