import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from '../../features/auth';
import Router, { useRouter } from 'next/router';

import {
  Box,
  Switch,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  // useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import NProgress from 'nprogress';

import Layout from '../../components/Layout';
import SharedModal from '../../components/Screenshots/SharedModal';
import MoveModal from '../../components/Screenshots/MoveModal';
import DeleteModal from '../../components/Screenshots/DeleteModal';
import {
  useGetMediaInfoByIdQuery,
  useDeleteMediaByIdMutation,
} from '../../features/mrQuery';
import preloaderMarkup from '../../components/helpers/itemPreloader';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Shared from '../../components/svg/screenshot/share.svg';
import CopyLink from '../../components/svg/screenshot/link-copy.svg';
import Rename from '../../components/svg/screenshot/rename.svg';
import Move from '../../components/svg/screenshot/move.svg';
import Download from '../../components/svg/screenshot/download.svg';
import Delete from '../../components/svg/screenshot/trash.svg';

function ScreenshotPage() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // share
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMove, setIsOpenMove] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const router = useRouter();
  const { locale } = router;
  const { id } = router?.query;
  const {
    data = [],
    error,
    refetch,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetMediaInfoByIdQuery(id);
  const [deleteMediaById] = useDeleteMediaByIdMutation();

  useEffect(() => {
    if (!isLoggedIn) Router.push('/sign-in');
  }, [isLoggedIn]);

  const { media } = data?.data || [];

  if (isLoading) NProgress.done();
  if (isError) NProgress.done();
  if (isLoading) NProgress.start();

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  const onOpen = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);
  //  move
  const onOpenMove = () => setIsOpenMove(!isOpen);
  const onCloseMove = () => setIsOpenMove(false);
  // delete
  const onOpenDelete = () => setIsOpenDelete(!isOpenDelete);
  const onClosDelete = () => setIsOpenDelete(false);

  const name = media?.name;

  const handleDelete = async (id) => {
    try {
      await deleteMediaById(id);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnError = (e) => {
    e.target.src = '/bigDefaultIcon.png';
  };

  return (
    <Layout title={t().screenshot_item} titlePage={t().screenshot_item}>
      <Box className='px-[31px] w-full h-full flex-auto'>
        {isLoading ? (
          preloaderMarkup
        ) : (
          <Box display='flex' justifyContent='space-between' h='100%' mt='34px'>
            <Box>
              <img
                className='w-[804px] h-[452px] '
                src={media?.publicUrl}
                onError={handleOnError}
                alt='screenshot'
              />
              <Box mt='21px' w='100%'>
                {/* <h2 className='text-2xl font-semibold'>Screenshot 02-02-2022</h2> */}
                <Editable
                  className='capitalize'
                  fontWeight='600'
                  fontSize='24px'
                  variant='changeName'
                  // defaultValue={name}
                  placeholder={name}
                  colorScheme='brand'
                >
                  <EditablePreview />
                  <EditableInput paddingLeft='15px' />
                </Editable>

                <Box my='16px'>
                  <Box display='flex'>
                    <div className='h-[56px] w-[56px] rounded-full bg-[#FAA859] flex items-center justify-center'>
                      <span className='text-[#fff]'>KN</span>
                    </div>
                    <div className='ml-[19px]'>
                      <p>Ketchup Nazvaniy</p>
                      <p className='text-my-gray-color'>21 feb 2022</p>
                    </div>
                  </Box>
                </Box>
                <Editable
                  defaultValue={`${t().add_description}`}
                  color='#747474'
                  mt='25px'
                >
                  <EditablePreview />
                  <EditableInput paddingLeft='10px' />
                </Editable>
                <Box mt='40px'>
                  <h2 className='text-lg font-semibold'>{t().comments} (0)</h2>
                  <Editable
                    defaultValue={`${t().new_comment}`}
                    color='#747474'
                    mt='25px'
                    colorScheme='brand'
                  >
                    <EditablePreview />
                    <EditableTextarea
                      padding='10px 10px'
                      h='100px'
                      colorScheme='brand'
                    />
                  </Editable>
                </Box>
              </Box>
            </Box>
            {/* right menu */}
            <Box w='252px' h='100%' marginLeft='24px'>
              <Box
                pt='23px'
                h='376px'
                borderBottom='1px'
                borderColor='#E7E7E7'
                display='flex'
                flexDirection='column'
              >
                <button
                  onClick={onOpen}
                  className='flex items-center hover:bg-my-border-sidebar-color px-[17px] py-[10px]'
                >
                  <Shared className='mr-[10px] ' />
                  <p>{t().shared}</p>
                  <SharedModal isOpen={isOpen} onClose={onClose} />
                </button>
                <button className='flex items-center hover:bg-my-border-sidebar-color px-[17px] py-[10px]'>
                  <CopyLink className='mr-[10px]' />
                  <p>{t().copy_link}</p>
                </button>
                <button className='flex items-center hover:bg-my-border-sidebar-color px-[17px] py-[10px]'>
                  <Rename className='mr-[10px]' />
                  <p>{t().rename}</p>
                </button>
                <button
                  onClick={onOpenMove}
                  className='flex items-center hover:bg-my-border-sidebar-color px-[17px] py-[10px]'
                >
                  <Move className='mr-[10px] ' />
                  <p>{t().move}</p>
                  <MoveModal isOpen={isOpenMove} onClose={onCloseMove} />
                </button>
                <button className='flex items-center hover:bg-my-border-sidebar-color px-[17px] py-[10px]'>
                  <Download className='mr-[10px]' />
                  <p>{t().download}</p>
                </button>
                <button
                  onClick={onOpenDelete}
                  className='flex items-center hover:bg-my-border-sidebar-color px-[17px] py-[10px]'
                >
                  <Delete className='mr-[10px]' />
                  {t().delete}
                  <DeleteModal
                    isOpen={isOpenDelete}
                    onClose={onClosDelete}
                    id={id}
                    itemDelete
                  />
                </button>
              </Box>
              <Box p='32px 16px 0 16px' display='flex' flexDirection='column'>
                <Box display='flex' justifyContent='space-between' width='100%'>
                  <p className='text-base font-semibold leading-[22px]'>
                    {t().comments}
                  </p>
                  <Switch
                    size='md'
                    colorScheme='brand'
                    className='chakra-switch__track'
                  />
                </Box>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  width='100%'
                  mt='24px'
                >
                  <p className='text-base font-semibold leading-[22px]'>
                    {t().viewers_can_download}
                  </p>
                  <Switch size='md' colorScheme='brand' />
                </Box>
                <Box
                  display='flex'
                  justifyContent='space-between'
                  width='100%'
                  mt='24px'
                >
                  <p className='text-base font-semibold leading-[22px]'>
                    {t().public_access}
                  </p>
                  <Switch size='md' colorScheme='brand' />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
}

export default ScreenshotPage;
