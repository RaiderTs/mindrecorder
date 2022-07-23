import React from 'react';
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

import CustomSteps from './CustomSteps';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import NewWorkspaceIcon from '../svg/workspace/newWorkspace.svg';

function NewWorkspaceModal({ isOpen, onClose }) {
  const { locale } = useRouter();

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent p='23px 35px 24px 35px' maxW='608px'>
        <ModalHeader>
          <Box display='flex' alignItems='center'>
            <NewWorkspaceIcon />
            <h2 className='pl-[11px]'>{t().new_workspace}</h2>
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CustomSteps onClose={onClose} />
        </ModalBody>
        {/* <ModalFooter>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}

export default NewWorkspaceModal;
