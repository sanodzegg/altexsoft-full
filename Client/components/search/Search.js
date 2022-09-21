import classes from './Search.module.css';
import { useState, useEffect, Fragment, useRef } from 'react';
import Results from './Results/Results';
import { useDispatch, useSelector } from 'react-redux';
import { searchApartments } from '../../store/actions/search-actions';
import { searchActions } from '../../store/search-slice';
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';
import { authenticateUser } from '../../store/actions/auth-actions';
import { authActions } from '../../store/auth-slice';

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const fromRef = useRef();
  const toRef = useRef();
  const locationRef = useRef();

  //JWT auth

  const [userData, setUserData] = useState({});

  const isAuth = Cookies.get('user');

  const profile = useSelector(state => state.auth.profile);

  useEffect(() => {
      if (isAuth) {
        setUserData(JSON.parse(isAuth));
      }
  }, [isAuth]);

  useEffect(() => {
    if (!isAuth) {
      dispatch(authActions.LogOut());
      router.push('/accounts/signin');
    } else {
      if (!profile) {
        dispatch(authenticateUser(userData.ID, userData.JWT));
      }
      router.push('/search');
    }
  }, [userData]);

  const [isSearched, setIsSearched] = useState(false);

  const [locationTouched, setLocationTouched] = useState(false);

  const [fromTouched, setFromTouched] = useState(false);

  const [toTouched, setToTouched] = useState(false);

  const [locationValid, setLocationValid] = useState(false);

  const [fromValid, setFromValid] = useState(false);

  const [toValid, setToValid] = useState(false);

  const onLocationChangeHandler = (event) => {
    event.preventDefault();

    if (!locationTouched) {
      setLocationTouched(true);
    }

    if (locationRef.current.value.trim() !== '') {
      setLocationValid(true);
      dispatch(searchActions.changeCity(event.target.value));
    } else {
      setLocationValid(false);
    }
  };

  const onFromChangeHandler = (event) => {
    event.preventDefault();

    if (!fromTouched) {
      setFromTouched(true);
    }

    const date = new Date(fromRef.current.value);

    if (date.toString() !== 'Invalid Date') {
      if (toValid && new Date(toRef.current.value) < date) {
        setFromValid(false);
        return;
      }
      dispatch(searchActions.changeFrom(event.target.value));
      setFromValid(true);
    } else {
      setFromValid(false);
    }
  };

  const onToChangeHandler = (event) => {
    event.preventDefault();

    if (!toTouched) {
      setToTouched(true);
    }

    const date = new Date(toRef.current.value);

    if (date.toString() !== 'Invalid Date') {
      if (fromValid && new Date(fromRef.current.value) > date) {
        setToValid(false);
        return;
      }
      dispatch(searchActions.changeTo(event.target.value));
      setToValid(true);
    } else {
      setToValid(false);
    }
  };

  const { from, to, city } = useSelector((state) => {
    return state.search;
  });

  const token = useSelector((state) => state.auth.jwtToken);

  const onSearchClick = (event) => {
    event.preventDefault();

    if (!(locationValid && fromValid && toValid)) {
      return;
    }

    setIsSearched(true);

    const credentials = { city, from, to };

    dispatch(searchApartments(credentials, token));
  };

  if (profile) {
    return (
      <Fragment>
        <h4>Find apartments</h4>
        <div className="row">
          <form className={classes.form}>
            <div className={classes.input}>
              <input
                placeholder="Search location"
                ref={locationRef}
                onChange={onLocationChangeHandler}
              ></input>
            </div>
            <div className={classes.input}>
              <input
                placeholder="Check in"
                onFocus={(e) => (e.target.type = 'date')}
                onChange={onFromChangeHandler}
                onBlur={(e) => (e.target.type = 'text')}
                ref={fromRef}
              ></input>
            </div>
            <div className={classes.input}>
              <input
                ref={toRef}
                placeholder="Check out"
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => (e.target.type = 'text')}
                onChange={onToChangeHandler}
              ></input>
            </div>
            <div className={classes.input}>
              <button
                className={classes.searchButton}
                onClick={onSearchClick}
                disabled={!(locationValid && fromValid && toValid)}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {isSearched && <Results />}
      </Fragment>
    );
  }
};

export default Search;
