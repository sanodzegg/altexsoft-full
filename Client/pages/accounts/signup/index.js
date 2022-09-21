import Register from '../../../components/Register/Register';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const SignUp = () => {

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
  }, [router, profile]);

  if (!display) {
    return;
  }

  return (
    <section className="container">
      <Register />
    </section>
  );
};

export default SignUp;
