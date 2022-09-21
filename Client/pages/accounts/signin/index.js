import Login from '../../../components/Login/Login';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const SignIn = () => {
  const router = useRouter();

  const [display, setDisplay] = useState(false);

  const profile = useSelector((state) => {
    return state.auth.profile;
  });

  useEffect(() => {
    if (profile !== null) {
      router.push('/search');
    } else {
      setDisplay(true);
    }
  }, [profile, router]);

  if (!display) {
    return;
  }

  return (
    <section className="container">
      <Login />
    </section>
  );
};

export default SignIn;
