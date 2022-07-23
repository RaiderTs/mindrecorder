import { useDispatch, useSelector } from 'react-redux';
import { authOperation } from '../../features/auth';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import ModalProfile from '../Profile/ModalProfile';
import { useGetCurrentUserInfoQuery } from '../../features/mrQuery';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Notifications from '../../components/svg/profile/notification.svg';
import ProfileImg from '../../components/svg/profile/profile.svg';
import LogOut from '../../components/svg/profile/logOut.svg';

// import { removeUser } from '../features/auth/authSlice';

const Profile = () => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const dispatch = useDispatch();
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

  const {
    data = [],
    error,
    refetch,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetCurrentUserInfoQuery();

  //  profile
  const onOpenProfile = () => setIsOpenProfile(!isOpenProfile);
  const onCloseProfile = () => setIsOpenProfile(false);

  return (
    <>
      <Menu>
        <Tooltip
          label={t().profile}
          borderRadius='5px'
          placement='bottom'
          hasArrow
          bg='#28A1FF'
          shouldWrapChildren
        >
          <MenuButton position='relative'>
            <Image src={'/ava.png'} alt='avatar' width={48} height={48} />
            <Box className='top-[30px] right-[-6px] absolute w-6 h-4 rounded-[5px] bg-my-accent-color flex items-center justify-center'>
              <span className='text-[#fff] text-xs'>99+</span>
            </Box>
          </MenuButton>
        </Tooltip>
        <MenuList pt='10px'>
          <MenuItem>
            <Notifications />
            <Text ml='12px'>{t().notifications} (99+)</Text>
          </MenuItem>
          <MenuItem onClick={onOpenProfile}>
            <ProfileImg />
            <Text ml='12px'>{t().profile}</Text>
            <ModalProfile
              isOpen={isOpenProfile}
              onClose={onCloseProfile}
              userInfo={data?.data?.user}
            />
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(authOperation.logOut());
              dispatch(authOperation.googleSignOut());
              router.push('/sign-in');
            }}
          >
            <LogOut />
            <Text ml='12px'>{t().log_out}</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Profile;
