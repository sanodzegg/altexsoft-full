import UserSettings from '../../../components/profileComps/userSettings/userSettings';
import UserApartment from '../../../components/profileComps/userApartment/userApartment';
import classes from './user.module.css';

import { useRouter } from 'next/dist/client/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addApartment, editProfile } from '../../../store/actions/profile-actions';
import { apartmentActions, userActions } from '../../../store/forms-slice';

import Cookies from 'js-cookie';
import { authenticateUser } from '../../../store/actions/auth-actions';

import { authActions } from '../../../store/auth-slice';

const UserProfile = () => {

  const dispatch = useDispatch();
  const router = useRouter();

  const [display, setDisplay] = useState(false);
  const [userData, setUserData] = useState({});
  const [displayMap, setDisplayMap] = useState(false);


  const profile = useSelector(state => state.auth.profile);
  const userToken = useSelector(state => state.auth.jwtToken);
  const userSelectors = useSelector(state => state.userChanges);
  const apartmentSelectors = useSelector(state => state.apartmentChanges);

  const apartmentSelector = {
    apartmentData: apartmentSelectors.dataObject,
    apartmentErrors: apartmentSelectors.errObj,
    profileEdited: apartmentSelectors.profileEdited
  }

  const userSelector = {
    userErrors: userSelectors.userErrors,
    userData: userSelectors.profileDataObject
  } 

  const isAuth = Cookies.get("user");

  useEffect(() => {
    if (isAuth) {
      setUserData(JSON.parse(isAuth));
    }
  }, [isAuth]);

  useEffect(() => {
    const handleAuth = () => {
      if (!isAuth) {
        dispatch(authActions.LogOut());
        router.push("/accounts/signin");
      } else {
        if (!profile) {
          dispatch(authenticateUser(userData.ID, userData.JWT));
        }
        if (userData.ID !== undefined) {
          router.push(`/user/${userData.ID}`);
          setDisplay(true);
        }
      }
    }
    handleAuth();
  }, [userData]);

  const host = useSelector(state => state.auth.profile);

  useEffect(() => {
    dispatch(apartmentActions.setHost(host?.userId));
  }, [apartmentSelector.apartmentData]);

  useEffect(() => {
    const {fromDefault, toDefault, ...obj} = apartmentSelector.apartmentData
    apartmentSelector.apartmentData = obj;
  }, [apartmentSelector.apartmentData]);

  const handleSaveAll = async (e) => {
    e.preventDefault();

    const noErrors = false;

    const sum = Object.values(apartmentSelector.apartmentErrors).filter(e => !e.valid);

    if (sum.length === 0) {
      noErrors = true;
    }

    if (apartmentSelector.profileEdited && noErrors && userSelector.userErrors.email.valid) {
      dispatch(editProfile(userSelector.userData, userToken));
      dispatch(addApartment(apartmentSelector.apartmentData, userToken));
      setDisplayMap(false);
    } else {
      dispatch(apartmentActions.showApartmentErrors(true));
    }

    if (!noErrors && userSelector.userErrors.email.valid && apartmentSelector.profileEdited) {
      dispatch(apartmentActions.showApartmentErrors(true));
      dispatch(editProfile(userSelector.userData, userToken));
    } else {
      dispatch(userActions.showUserErrors(true));
    }

    if (noErrors && !apartmentSelector.profileEdited) {
      dispatch(addApartment(apartmentSelector.apartmentData, userToken));
      setDisplayMap(false);
    }
  }

  if (!display) {
    return;
  }

  if (profile) {
    return (
      <div className={classes.userWrapper}>
        <h1 className={classes.userProfileHeading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore
        </h1>
        <UserSettings />
        <UserApartment display={displayMap} setDisplay={setDisplayMap} />
        <button className={classes.button} onClick={(e) => handleSaveAll(e)}>Save all changes</button>
      </div>
    )
  }
};

export default UserProfile;
