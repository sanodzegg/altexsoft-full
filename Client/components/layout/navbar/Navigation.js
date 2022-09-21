import classes from './Navigation.module.css';
import Dropdown from '../buttons/dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../../store/auth-slice';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

const Navigation = () => {
  const dispatch = useDispatch();

  const router = useRouter();

  const [username, setUsername] = useState(null);

  const isAuth = useSelector((state) => {
    return state.auth.isAuthenticated;
  });

  const profile = useSelector((state) => {
    return state.auth.profile;
  });

  useEffect(() => {
    if (profile) {
      setUsername(<Link href={'/'}>{profile.firstName}</Link>);
    }
  }, [profile]);

  const onLogoutClick = () => {
    dispatch(authActions.LogOut());
    router.push('/accounts/signin');
  };

  return (
    <nav className={classes.navbar + ' container-fluid'}>
      <div className="row">
        <div className="col-md-4 mt-1">
          {isAuth && <div className={classes.logoHolder}>{username}</div>}
        </div>
        <div className={classes.buttonsDiv + ' col-md-8 mt-3'}>
          {isAuth && (
            <div className={classes.buttonsHolder}>
              <Dropdown />
              <button className={classes.logout} onClick={onLogoutClick}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;