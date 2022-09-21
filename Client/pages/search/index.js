import Search from '../../components/search/Search';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Cookies from 'js-cookie';
import { authActions } from '../../store/auth-slice';

const Index = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [display, setDisplay] = useState(false);
  
  const isAuth = Cookies.get("user");

  useEffect(() => {
    if (!isAuth) {
      dispatch(authActions.LogOut());
      router.push('/accounts/signin');
    } else {
      setDisplay(true);
    }
  }, [router, isAuth]);

  if (!display) {
    return;
  }

  return (
    <section className="container">
      <Search />
    </section>
  );
};

export default Index;
