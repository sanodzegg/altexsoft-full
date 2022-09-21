import MyGuests from '../../../../components/myGuests/MyGuests';
import classes from './myGuests.module.css';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { authenticateUser } from '../../../../store/actions/auth-actions';
import { authActions } from '../../../../store/auth-slice';

const MyGuestsIndex = () => {

  const router = useRouter();

  const dispatch = useDispatch();

  const [display, setDisplay] = useState(false);

  const profile = useSelector(state => state.auth.profile);

  const [userData, setUserData] = useState({});
  
  const isAuth = Cookies.get("user");

  useEffect(() => {
    if (isAuth) {
      setUserData(JSON.parse(isAuth));
    }
  }, [isAuth]);


  useEffect(() => {
    const handleAuth = async () => {
      if (!isAuth) {
        dispatch(authActions.LogOut());
        router.push("/accounts/signin");
      } else {
        if (!profile) {
          dispatch(authenticateUser(userData.ID, userData.JWT));
        }
        if (userData.ID !== undefined) {
          router.push(`/user/${userData.ID}/myGuests`);
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
        <h1 className={classes.pageTitle}>My guests</h1>
        <MyGuests />
      </div>
    );
  }
};

export default MyGuestsIndex;
