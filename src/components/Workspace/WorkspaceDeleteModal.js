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
} from '@chakra-ui/react';

import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Delete from '../../components/svg/trash.svg';

function WorkspaceDeleteModal({ isOpen, onClose, handleDelete }) {
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p='34px 13px 40px 34px' maxW='616px'>
          <ModalHeader>
            <Box display='flex' alignItems='center' justifyContent='center'>
              <Delete />
              <p className='ml-2'>{t().delete_workspace}</p>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            alignItems='center'
            justifyContent='center'
            mt='20px'
          >
            <p className='text-lg'>{t().want_delete_workspace}</p>
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
              onClick={() => handleDelete()}
              _hover={{ backgroundColor: '#28A1FF', color: 'white' }}
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

export default WorkspaceDeleteModal;
