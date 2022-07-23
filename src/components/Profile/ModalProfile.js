import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  ButtonGroup,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import ProfileImg from '../../components/svg/profile/profile.svg';
import Eye from '../../components/svg/eye.svg';
import EyeClose from '../../components/svg/eyeClose.svg';

function MoveModal({ isOpen, onClose, userInfo }) {
  const [show, setShow] = useState(false);
  const [photo, setPhoto] = useState();

  // useEffect(() => {
  //   const changePhoto = async () => {
  //     const data = new FormData();
  //     data.append('file', photo);
  //     await editGroupPhoto({
  //       data,
  //       contactGroupId: props?.groupe?.id,
  //     });
  //   };
  //   photo && changePhoto();
  // }, [photo]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Name is required'),
    email: Yup.string(),
    password: Yup.string(),
  });

  const onSubmit = async (values) => {
    console.log(values);
    // const { name, title } = values;
    // const formData = new FormData();
    // formData.append('name', title);
    // formData.append('singer', name);
    // const options = { stymId, body: formData };
    // if (access === 'owner') {
    //   try {
    //     const res = await editStymName(options);
    //     if (res.data.message === 'no edit access') {
    //       toast.error("You can't edit this stym", {
    //         position: 'bottom-center',
    //       });
    //     } else if (res.data.status === false) {
    //       toast.error(res.data.message, {
    //         position: 'bottom-center',
    //       });
    //     }
    //     // refetch();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  // if (isLoading) {
  //   NProgress.start();
  // } else {
  //   NProgress.done();
  // }

  const handlePhotoEdit = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handleClick = () => setShow(!show);
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

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent p='23px 32px 40px 32px' maxW='608px'>
          <ModalHeader p='0'>
            <Box display={'flex'} alignItems={'center'}>
              <ProfileImg />
              <h1 className='text-[32px] leading-[44px] pl-3'>
                {t().my_profile}
              </h1>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            p={'0'}
            mt='24px'
            display='flex'
            // justifyContent='space-between'
            // alignItems='center'
          >
            <Box display='flex' flexDirection='column'>
              <Image
                className='object-cover rounded-full aspect-square'
                src={photo ? URL.createObjectURL(photo) : '/avaC.jpg'}
                alt='avatar'
                width='160px'
                height='160px'
              />
              <label
                htmlFor='profilePic'
                className='mt-8 text-center cursor-pointer text-my-accent-color'
              >
                {t().change_photo}
              </label>
              <input
                type='file'
                accept='image/*'
                id='profilePic'
                name='profilePic'
                onChange={handlePhotoEdit}
              />
            </Box>
            <Box w='352px' ml='32px'>
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                }}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {({ handleValid, isValid }) => (
                  <form onSubmit={handleValid}>
                    <FormControl>
                      <FormLabel
                        margin='0 0 0 4px'
                        className='text-base font-semibold '
                        htmlFor='firstName'
                      >
                        {t().first_name}
                      </FormLabel>
                      <Field
                        id='firstName'
                        name='firstName'
                        type='text'
                        as={Input}
                        colorScheme='brand'
                        marginTop='8px'
                        w='100%'
                        placeholder={userInfo?.username}
                      />
                    </FormControl>
                    <FormControl mt='24px'>
                      <FormLabel
                        margin='0 0 0 4px'
                        className='text-base font-semibold'
                        htmlFor='lastName'
                      >
                        {t().last_name}
                      </FormLabel>
                      <Field
                        id='lastName'
                        name='lastName'
                        type='text'
                        as={Input}
                        colorScheme='brand'
                        marginTop='8px'
                        w='100%'
                        placeholder={userInfo?.fullname}
                      />
                    </FormControl>

                    <FormControl mt='24px'>
                      <FormLabel
                        margin='0 0 0 4px'
                        className='text-base font-semibold'
                        htmlFor='email'
                      >
                        {t().email}
                      </FormLabel>
                      <Field
                        id='email'
                        name='email'
                        type='text'
                        as={Input}
                        colorScheme='brand'
                        marginTop='8px'
                        w='100%'
                        placeholder={userInfo?.email}
                      />
                    </FormControl>

                    <FormControl mt='24px'>
                      <FormLabel
                        margin='0 0 0 4px'
                        className='text-base font-semibold '
                        htmlFor='password'
                      >
                        {t().password}
                      </FormLabel>
                      <InputGroup size='md' w='100%' mt='8px'>
                        <Input
                          colorScheme='brand'
                          pr='4.5rem'
                          type={show ? 'text' : 'password'}
                          placeholder={`${t().enter_password}`}
                          pattern='/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g'
                          title='Must contain at least one number, one uppercase and lowercase letter, and at least 6 characters'
                        />
                        <InputRightElement mr='8px'>
                          <button onClick={handleClick}>
                            {show ? (
                              <Eye className='fill-[#28A1FF]' />
                            ) : (
                              <EyeClose />
                            )}
                          </button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <ButtonGroup mt='8px' d='flex' justifyContent='flex-end'>
                      <Button
                        className='text-my-accent-color'
                        onClick={onClose}
                        fontWeight='normal'
                        mt='8px'
                        fontSize='14px'
                        lineHeight='19px'
                      >
                        {t().cancel}
                      </Button>

                      <Button
                        type='submit'
                        onClick={onClose}
                        className='text-my-accent-color'
                        isDisabled={!isValid}
                        mt='8px'
                        fontSize='14px'
                        lineHeight='19px'
                        fontWeight='400'
                      >
                        {t().change_password}
                      </Button>
                    </ButtonGroup>
                  </form>
                )}
              </Formik>
            </Box>
          </ModalBody>
          <ModalFooter p='0' mt='8px'></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MoveModal;
