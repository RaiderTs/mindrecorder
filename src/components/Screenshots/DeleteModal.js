import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { useDeleteMediaByIdMutation } from '../../features/mrQuery';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Delete from '../../components/svg/trash.svg';

function DeleteModal({ isOpen, onClose, id, itemDelete = false }) {
  const [deleteMediaById, result] = useDeleteMediaByIdMutation();

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

  const handleDelete = async (id) => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const res = await deleteMediaById(id);
      const { data } = res;
      if (data.status) {
        Notify.success('Workspace deleted', {
          borderRadius: '24px',
          backOverlay: true,
          position: 'center-bottom',
          distance: '55px',
          timeout: 500,
          clickToClose: true,
        });
        onClose();
        router.push('/screenshots');
      } else if (!data.status) {
        Notify.failure('Something went wrong. Please try again', {
          borderRadius: '24px',
          backOverlay: true,
          position: 'center-bottom',
          distance: '55px',
          timeout: 700,
          clickToClose: true,
        });
      }
      Loading.remove();
    } catch (error) {
      Notify.failure('Something went wrong. Please try again', {
        borderRadius: '24px',
        backOverlay: true,
        position: 'center-bottom',
        distance: '55px',
        timeout: 700,
        clickToClose: true,
      });
      console.log(error);
      Loading.remove();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p='34px 13px 40px 34px' maxW='616px'>
          <ModalHeader>
            <Box display='flex' alignItems='center' justifyContent='center'>
              <Delete />
              <p className='ml-2'>{t().delete_screenshot}</p>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            alignItems='center'
            justifyContent='center'
            mt='20px'
          >
            <p className='text-lg'>{t().sure_delete_screenshot}</p>
          </ModalBody>
          <ModalFooter
            display='flex'
            alignItems='center'
            mt='42px'
            justifyContent='center'
          >
            <Button
              w='136px'
              h='41px'
              backgroundColor='#E7E7E7'
              _hover={{ backgroundColor: '#28A1FF', color: 'white' }}
              onClick={() => {
                handleDelete(id);
                // onClose();
              }}
            >
              {t().yes}
            </Button>
            <Button
              w='136px'
              h='41px'
              ml='16px'
              backgroundColor='#E7E7E7'
              _hover={{ backgroundColor: '#28A1FF', color: 'white' }}
              onClick={onClose}
            >
              {t().cancel}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DeleteModal;
