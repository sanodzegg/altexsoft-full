import Search from '../components/search/Search';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const Index = () => {
  const router = useRouter();

  const profile = useSelector((state) => {
    return state.auth.profile;
  });

  useEffect(() => {
    if (profile == null) {
      router.push('/accounts/signup');
    } else {
      router.push('/accounts/signin')
    };
  }, [router, profile]);

  return;
};

export default Index;
