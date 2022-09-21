import MyBookings from '../../../../components/myBookings/MyBookings';
import classes from './myBookings.module.css';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'js-cookie';
import { authenticateUser } from '../../../../store/actions/auth-actions';
import { authActions } from '../../../../store/auth-slice';

const MyBookingsIndex = () => {

  const router = useRouter();

  const dispatch = useDispatch();

  const [display, setDisplay] = useState(false);

  const [userData, setUserData] = useState({});
  
  const isAuth = Cookies.get("user");

  const profile = useSelector(state => state.auth.profile);

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
          router.push(`/user/${userData.ID}/myBookings`);
          setDisplay(true);
        }
      }
    }
    handleAuth();
  }, [userData]);

  if (!display) {
    return;
  }

  if (profile) {
    return (
      <div className={classes.wrapper}>
        <h1 className={classes.pageTitle}>My bookings</h1>
        <MyBookings />
      </div>
    );
  }
};

export default MyBookingsIndex;
