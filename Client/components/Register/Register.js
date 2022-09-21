import classes from './Register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { register } from '../../store/actions/auth-actions';
import { useState, useEffect, useRef } from 'react';

const Register = () => {
  const dispatch = useDispatch();

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [firstNameValid, setFirstNameValid] = useState(false);
  const [lastNameValid, setLastNameValid] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);

  const notif = useSelector(state => state.ui.notification);

  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const registerBtn = useRef();

  const onEmailChangeHandler = (event) => {
    if (!emailTouched) {
      setEmailTouched(true);
    }

    validateEmail();
  };

  const validateEmail = (event) => {
    function isEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    const email = emailRef.current.value;

    if (isEmail(email)) {
      if (!emailValid) {
        setEmailValid(true);
      }
      return;
    }
    if (emailValid) {
      setEmailValid(false);
    }
  };

  const onEmailBlurHandler = () => {
    if (!emailValid) {
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

  const onPasswordBlurHandler = () => {
    if (!firstNameValid) {
    }
  };

  const onFirstNameChangeHandler = (event) => {
    if (!firstNameTouched) {
      setFirstNameTouched(true);
    }

    validateFirstName();
  };

  const validateFirstName = (event) => {
    const firstName = firstNameRef.current.value;

    if (firstName.trim() !== '' && firstName.length >= 6) {
      if (!firstNameValid) {
        setFirstNameValid(true);
      }
      return;
    }
    if (lastNameValid) {
      setLastNameValid(false);
    }
  };

  const onFirstNameBlurHandler = () => {
    if (!firstNameValid) {
    }
  };

  const onLastNameChangeHandler = (event) => {
    if (!lastNameTouched) {
      setLastNameTouched(true);
    }

    validateLastName();
  };

  const validateLastName = (event) => {
    const lastName = lastNameRef.current.value;

    if (lastName.trim() !== '' && lastName.length >= 6) {
      if (!lastNameValid) {
        setLastNameValid(true);
      }
      return;
    }
    if (lastNameValid) {
      setLastNameValid(false);
    }
  };

  const onLastNameBlurHandler = () => {
    if (!lastNameValid) {
    }
  };

  const onLoginClick = () => {
    router.push('/accounts/signin');
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    if (!(emailValid && passwordValid && firstNameValid && lastNameValid)) {
      return;
    }

    registerBtn.current.style.backgroundColor = "#a0c2d4"
    registerBtn.current.value = "Registering"
    
    const registerData = {
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      firstName: firstNameRef.current.value.trim(),
      lastName: lastNameRef.current.value.trim(),
    };

    dispatch(register(registerData));
    firstNameRef.current.value = '';
    lastNameRef.current.value = '';
    passwordRef.current.value = '';
    emailRef.current.value = '';
  };

  useEffect(() => {
    if (notif && notif.status === "success") {
      router.push("/accounts/signin");
    } else {
      registerBtn.current.style.backgroundColor = "#00A6FF"
      registerBtn.current.value = "Register"
    }
  }, [notif]);

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className={classes.loginDiv}>
          <div className={classes.loginForm}>
            <div className={classes.heading}>
              <h4>Sign up</h4>
            </div>
            <form>
              <div className={classes.inputDiv}>
                <div className={classes.inputs}>
                  <input
                    type="text"
                    placeholder="First name"
                    required={true}
                    ref={firstNameRef}
                    onChange={onFirstNameChangeHandler}
                    onBlur={onFirstNameBlurHandler}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    required={true}
                    ref={lastNameRef}
                    onChange={onLastNameChangeHandler}
                    onBlur={onLastNameBlurHandler}
                  />
                </div>
              </div>
              <div className={classes.inputDiv}>
                <input
                  type="text"
                  placeholder="E-mail"
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
                  ref={registerBtn}
                  disabled={
                    !(
                      emailValid &&
                      passwordValid &&
                      firstNameValid &&
                      lastNameValid
                    )
                  }
                />
                <input
                  className={classes.loginButton}
                  type="button"
                  value="Login"
                  onClick={onLoginClick}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
