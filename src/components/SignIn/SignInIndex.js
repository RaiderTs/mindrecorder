import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { authOperation } from '../../features/auth';
import Image from 'next/image';
import NProgress from 'nprogress';

// import GoogleSignIn from './GoogleSignIn';
// import FacebookSignIn from './FacebookSignIn';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import { userSelector } from '../../selectors/auth';
import { Checkbox } from '@chakra-ui/react';
import Link from 'next/link';
import { authSelectors } from '../../features/auth';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Facebook from '../svg/facebook.svg';
import Google from '../svg/google.svg';
export default function SignIn() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const router = useRouter();

  const { locale } = router;

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  NProgress.done();
  console.log(isLoggedIn);

  useEffect(() => {
    isLoggedIn && router.push('/screenshots');
  }, [isLoggedIn, router]);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .max(60, 'Must be 60 characters or less')
      .email('Invalid email address')
      .required('Please enter your email'),
    password: Yup.string().required('Please enter your password'),
  });

  return (
    <>
      <div className='h-[104px] w-full flex items-center pl-8 border-b-[1px] border-my-border-color '>
        <Image src={'/logo.svg'} alt='logo' width={250} height={34} />
      </div>
      <div className='mt-[118px] w-[328px] h-[579px]  m-auto'>
        <h1 className='font-bold text-[32px] flex items-center justify-center'>
          {t().sign_in}
        </h1>
        <div className='flex-col w-full mt-16'>
          {/* Here are the components */}
          <button
            onClick={() => {
              dispatch(authOperation.facebookSignIn());
            }}
            className='py-2   border-[1px] border-[#F1F6F9] justify-center items-center rounded-md flex w-full'
          >
            <Facebook />
            <p className='ml-2 text-lg text-my-gray-color leading-[25px]'>
              {t().sign_in_with_facebook}
            </p>
          </button>
          <button
            onClick={() => dispatch(authOperation.googleSignIn())}
            className='mt-2 py-2 border-[1px] border-[#F1F6F9] justify-center flex items-center rounded-md w-full'
          >
            <Google />
            <p className='ml-2 text-lg text-my-gray-color leading-[25px]'>
              {t().sign_in_with_google}
            </p>
          </button>
        </div>
        <p className='flex items-center justify-center mt-6 mb-4 text-[#C4C4C4]'>
          {t().or_use}
        </p>
        {/* formik */}
        <div className='flex flex-col max-w-[328px]'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const user = new FormData();
              user.append('login', values.email);
              user.append('password', values.password);
              dispatch(authOperation.logIn(user));
              // NProgress.start();
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              isValid,
            }) => (
              <form method='post' onSubmit={handleSubmit}>
                <p className='mb-2 ml-2 font-semibold'>{t().email}</p>
                <Field
                  className='border-[1px] border-[#E7E7E7] mb-4  placeholder:text-lg  placeholder:text-[#C4C4C4] w-[328px] p-2 leading-tight text-gray-700   rounded-[5px] appearance-none focus:outline-none'
                  type='email'
                  name='email'
                  placeholder={`${t().email}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {console.log(errors)}
                <p className='mb-2 ml-2 font-semibold'>{t().password}</p>
                <Field
                  className='border-[1px] border-[#E7E7E7]   placeholder:text-lg  placeholder:text-[#C4C4C4] w-[328px] p-2 leading-tight text-gray-700   rounded-[5px] appearance-none focus:outline-none'
                  type='password'
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={`${t().password}`}
                  value={values.password}
                />
                <div className='flex items-center justify-between mt-5'>
                  <Checkbox size='lg' colorScheme='brand'>
                    {t().remember_me}
                  </Checkbox>
                  <Link href='/'>
                    <a className='text-[#28A1FF]'>{t().forgot_password}</a>
                  </Link>
                </div>

                <button
                  type='submit'
                  disabled={!isValid}
                  className=' bg-[#28A1FF] text-[18px] rounded-[5px]  p-2 text-white w-full text-[#FFFFFF] mt-11 disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {t().sign_in}
                </button>
                <p className='flex items-center justify-center mt-4'>
                  {t().dont_have_account}
                  <Link href={'/sign-up'}>
                    <a className='font-bold text-[#28A1FF]'>
                      &nbsp;{t().sign_up}
                    </a>
                  </Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
