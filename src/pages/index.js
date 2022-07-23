import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authOperation } from '../features/auth';
import { authSelectors } from '../features/auth';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';

export default function Main() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const router = useRouter();
  useEffect(() => {
    router.push('/screenshots');
  });

  useEffect(() => {
    isLoggedIn
      ? router.push('/screenshots')
      : !isLoggedIn && router.push('/sign-in');
  }, [isLoggedIn, router]);

  return (
    <>
      <Layout></Layout>
    </>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  };
}
