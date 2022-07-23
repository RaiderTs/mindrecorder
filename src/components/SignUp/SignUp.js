import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
// import authSlice, { login, register } from '../../features/auth/authSlice';
import { Checkbox } from '@chakra-ui/react';
import Link from 'next/link';
// import { toast } from 'react-toastify';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { authOperation } from '../../features/auth';
import { authSelectors } from '../../features/auth';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Eye from '../svg/eye.svg';

export default function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/sign-in');
    }
  }, [isLoggedIn, router]);

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

  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordShown = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  const validationSchema = Yup.object({
    email: Yup.string()
      .max(60, 'Must be 30 characters or less')
      .email('Invalid email address')
      .required('Please enter your email'),
    password: Yup.string().required('Please enter your password').min(6),
    passwordConfirm: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    fullname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  return (
    <>
      <div className='h-[104px] w-full flex items-center pl-8 border-b-[1px] border-my-border-color '>
        <Image src={'/logo.svg'} alt='logo' width={250} height={34} />
      </div>
      <div className='mt-[118px] w-[328px] h-[579px]  m-auto'>
        <h1 className='font-bold text-[32px] flex items-center justify-center mb-8'>
          {t().sign_up}
        </h1>
        {/* formik */}
        <div className='flex flex-col max-w-[328px]'>
          <Formik
            initialValues={{
              email: '',
              username: '',
              fullname: '',
              password: '',
              passwordConfirm: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              const user = new FormData();
              user.append('email', values.email);
              user.append('username', values.username);
              user.append('fullname', values.fullname);
              user.append('password', values.password);

              // const loginUser = new FormData();
              // loginUser.append('login', values.username);
              // loginUser.append('password', values.password);

              // await dispatch(authOperation.register(user)).then(() =>
              //   dispatch(authOperation.logIn(loginUser)).then(() =>
              //     router.push('/screenshot')
              //   )
              // );

              dispatch(
                authOperation.register({
                  email: values.email,
                  password: values.password,
                  username: values.username,
                  fullname: values.fullname,
                })
              );
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
                <input
                  className='border-[1px] border-[#E7E7E7] mb-4  placeholder:text-lg  placeholder:text-[#C4C4C4] w-[328px] p-2 leading-tight text-gray-700   rounded-[5px] appearance-none focus:outline-none'
                  type='email'
                  name='email'
                  placeholder={`${t().email}`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                <div className='flex items-center justify-between'>
                  <div>
                    <p className='mb-2 ml-2 font-semibold'>
                      {t().name} ({t().nickname})
                    </p>
                    <input
                      className='border-[1px] border-[#E7E7E7] mb-4  placeholder:text-lg  placeholder:text-[#C4C4C4] w-[156px] p-2 leading-tight text-gray-700   rounded-[5px] appearance-none focus:outline-none'
                      type='text'
                      name='username'
                      placeholder='John'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                  </div>
                  <div>
                    <p className='mb-2 ml-2 font-semibold'>{t().fullname}</p>
                    <input
                      className='border-[1px] border-[#E7E7E7] mb-4  placeholder:text-lg  placeholder:text-[#C4C4C4] w-[156px] p-2 leading-tight text-gray-700   rounded-[5px] appearance-none focus:outline-none'
                      type='text'
                      name='fullname'
                      placeholder='John Doe'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullname}
                    />
                  </div>
                </div>

                <div className='relative mb-4'>
                  <p className='mb-2 ml-2 font-semibold'>{t().password}</p>
                  <input
                    className='border-[1px] border-[#E7E7E7]   placeholder:text-lg  placeholder:text-[#C4C4C4] w-[328px] p-2 leading-tight text-gray-700   rounded-[5px] appearance-none focus:outline-none'
                    type={passwordShown ? 'text' : 'password'}
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='***************'
                    value={values.password}
                  />
                  <button
                    type='button'
                    onClick={togglePasswordShown}
                    className='absolute right-[10px] text-my-border-sidebar-color top-[40px] hover:text-my-accent-color hover:animate-pulse'
                  >
                    <Eye />
                  </button>
                </div>

                <div className='relative'>
                  <p className='mb-2 ml-2 font-semibold'>
                    {t().confirm__password}
                  </p>
                  <input
                    className='border-[1px] border-[#E7E7E7]   placeholder:text-lg  placeholder:text-[#C4C4C4] w-[328px] p-2 leading-tight text-gray-700   rounded-[5px] appearance-none focus:outline-none'
                    type={confirmPasswordShown ? 'text' : 'password'}
                    name='passwordConfirm'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='***************'
                    value={values.passwordConfirm}
                  />
                  <button
                    type='button'
                    onClick={toggleConfirmPasswordShown}
                    className='absolute right-[10px]  text-my-border-sidebar-color top-[40px] hover:text-my-accent-color hover:animate-pulse'
                  >
                    <Eye />
                  </button>
                </div>

                <div className='flex items-center justify-between mt-5'>
                  <Checkbox size='lg' colorScheme='brand'>
                    {t().privacy_policy}
                  </Checkbox>
                </div>

                <button
                  type='submit'
                  disabled={!isValid}
                  className=' bg-[#28A1FF] text-[18px] rounded-[5px]  p-2 text-white w-full text-[#FFFFFF] mt-5 cursor-pointer'
                >
                  {t().sign_in}
                </button>
                <p className='flex items-center justify-center mt-4'>
                  {t().have_an_account}
                  <Link href={'/sign-in'}>
                    <a className='font-bold text-[#28A1FF]'>
                      &nbsp; {t().sign_in}
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
