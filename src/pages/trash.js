import { useRouter } from 'next/router';
import {
  Checkbox,
  Tooltip,
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';
import NProgress from 'nprogress';

import { useGetListOfTrashQuery } from '../features/mrQuery';
import Layout from '../components/Layout';
import TrashModal from '../components/Trash/TrashModal';
import DeleteTrashModal from '../components/Screenshots/DeleteModal';
import RecoveryModal from '../components/Trash/TrashRecoveryModal';
import preloaderMarkup from '../components/helpers/preloader';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Camera from '../components/svg/screenshot/camera.svg';
import Message from '../components/svg/screenshot/message.svg';
import Eye from '../components/svg/screenshot/eye.svg';
import Delete from '../components/svg/trash/delete.svg';
import MoveIcon from '../components/svg/trash/move.svg';

function Trash() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenRestore, setIsOpenRestore] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const [currentMedia, setCurrentMedia] = useState(null);
  const { data = {}, isLoading, isError } = useGetListOfTrashQuery();

  const { media } = data?.data || [];

  if (isLoading) NProgress.start();
  if (!isLoading) NProgress.done();
  if (isError) NProgress.done();

  const onOpen = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  const isOpenRecoveryModal = (id) => {
    setIsOpenRestore(!isOpenRestore);
    setCurrentMedia(id);
  };
  const onCloseRecoveryModal = () => setIsOpenRestore(false);

  // delete
  const onOpenDelete = (id) => {
    setIsOpenDelete(!isOpenDelete);
    setCurrentMedia(id);
  };

  const onClosDelete = () => setIsOpenDelete(false);

  const handleChange = (e) => {
    if (e.target.checked) {
      setIsSelected([...isSelected, e.target.id]);
    } else {
      setIsSelected(isSelected.filter((id) => id !== e.target.id));
    }
  };

  const handleOnError = (e) => {
    e.target.src = '/defaultIcon1.png';
  };

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
    <Layout title={t().trash} titlePage={t().trash}>
      <Box p='0 31px 0 31px' flex='1 1 auto' w='100%' h='100%'>
        <Box
          w='100%'
          h='48px'
          mt='36px'
          bg='#F5F5F5'
          p='11px 0 11px 16px'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          borderRadius='5px'
        >
          <p className='text-lg text-my-gray-color'>{t().items_are_stored}</p>
          <Button
            bg='transparent'
            color='#28A1FF'
            fontSize='16px'
            onClick={onOpen}
          >
            {t().empty_entire_trash}
            <TrashModal isOpen={isOpen} onClose={onClose} deleteAllTrash />
          </Button>
        </Box>

        <Box className='mt-6'>
          <ul className='flex flex-wrap gap-6'>
            {isLoading && preloaderMarkup}
            {media?.map((item) => (
              <li className='w-[252px]' key={item?.id}>
                <Box>
                  {/* photo */}
                  <Box
                    className={`group relative  border-[3px]  rounded-[5px] hover:border-my-accent-color 
                      ${
                        isSelected.includes(item?.id) &&
                        'border-my-accent-color'
                      }
                    `}
                  >
                    <Box>
                      <Link href={`/screenshots/${item?.id}`}>
                        <a>
                          <img
                            src={item?.publicUrl}
                            alt='img'
                            width='252'
                            height='183'
                            onError={handleOnError}
                          />
                        </a>
                      </Link>
                      <label
                        htmlFor='img'
                        className={`cursor-pointer group-hover:visible ${
                          isSelected.includes(item?.id)
                            ? 'visible'
                            : 'invisible'
                        }`}
                      >
                        <Box
                          position={'absolute'}
                          top={'8px'}
                          left={'8px'}
                          h={'24px'}
                          w={'24px'}
                          borderRadius={'50%'}
                          // backgroundColor={'#000'}
                          className={` cursor-pointer  ${
                            isSelected.includes(item?.id)
                              ? 'bg-[#fff]'
                              : 'bg-[#000]'
                          }`}
                        >
                          <Tooltip
                            label={t().check}
                            placement='right'
                            left={'12px'}
                            borderRadius='5px'
                            hasArrow
                            bg='#28A1FF'
                            shouldWrapChildren
                          >
                            <Checkbox
                              _focus={{ boxShadow: 'transparent' }}
                              _hover={{ backgroundColor: 'transparent' }}
                              _active={{ backgroundColor: 'transparent' }}
                              size={isSelected.includes(item?.id) ? 'md' : 'sm'}
                              top={'23.5%'}
                              left={'25%'}
                              id={item?.id}
                              name={'img'}
                              colorScheme='brand'
                              // value={1}
                              checked={isSelected.includes(item?.id)}
                              isChecked={isSelected.includes(item?.id)}
                              onChange={handleChange}
                            ></Checkbox>
                          </Tooltip>
                        </Box>
                      </label>
                    </Box>

                    {/*  */}

                    <button
                      className='absolute invisible right-2 top-2 group-hover:visible'
                      onClick={() => onOpenDelete(item?.id)}
                    >
                      <div className='relative'>
                        <Tooltip
                          label={t().delete}
                          placement='right'
                          borderRadius='5px'
                          hasArrow
                          bg='#28A1FF'
                          shouldWrapChildren
                        >
                          <Delete />
                        </Tooltip>
                      </div>
                    </button>

                    <button
                      className='absolute invisible right-2 top-10 group-hover:visible'
                      type='button'
                      onClick={() => isOpenRecoveryModal(item?.id)}
                    >
                      <div className='relative'>
                        <Tooltip
                          label={t().restore}
                          placement='right'
                          borderRadius='5px'
                          hasArrow
                          bg='#28A1FF'
                          shouldWrapChildren
                        >
                          <MoveIcon />
                        </Tooltip>
                      </div>
                    </button>
                  </Box>

                  <Editable
                    mt={'12px'}
                    h={'19px'}
                    fontWeight={600}
                    fontSize={'sm'}
                    // isPreviewFocusable={false}
                    defaultValue={item?.name}
                  >
                    <EditablePreview />
                    <EditableInput p={'0'} pl={'10px'} />
                  </Editable>

                  {/* footer */}
                  <Box className='flex items-center justify-between mt-2'>
                    <Box className='flex items-center'>
                      <Camera />
                      <p className='ml-2 text-xs text-my-gray-color'>
                        21 feb 2022
                      </p>
                    </Box>
                    <Box className='flex items-center '>
                      <Box className='flex items-center'>
                        <span className='mr-2 text-xs text-my-gray-color'>
                          0
                        </span>
                        <Message />
                      </Box>
                      <Box className='flex items-center ml-[17px]'>
                        <span className='mr-2 text-xs text-my-gray-color'>
                          0
                        </span>
                        <Eye />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
      <TrashModal
        isOpen={isOpenDelete}
        onClose={onClosDelete}
        id={currentMedia}
        media={media}
      />
      <RecoveryModal
        isOpen={isOpenRestore}
        onClose={onCloseRecoveryModal}
        id={currentMedia}
      />
    </Layout>
  );
}

export default Trash;
