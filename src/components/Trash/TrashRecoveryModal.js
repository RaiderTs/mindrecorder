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
import NProgress from 'nprogress';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { useRecoveryMediaFromTrashMutation } from '../../features/mrQuery';

import MoveIcon from '../svg/trash/move.svg';

function RecoveryModal({ isOpen, onClose, id }) {
  const [recoveryMediaFromTrash, isLoading] =
    useRecoveryMediaFromTrashMutation();

  const router = useRouter();

  const handleRestoreFileFromTrash = async () => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const res = await recoveryMediaFromTrash(id);
      const { data } = res;
      if (data.status) {
        Notify.success('File restored successfully', {
          borderRadius: '24px',
          backOverlay: true,
          position: 'center-bottom',
          distance: '55px',
          timeout: 500,
          clickToClose: true,
        });
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
      onClose();
    } catch (error) {
      Notify.failure('Something went wrong. Please try again', {
        borderRadius: '24px',
        backOverlay: true,
        position: 'center-bottom',
        distance: '55px',
        timeout: 700,
        clickToClose: true,
      });
      Loading.remove();
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p='34px 13px 40px 34px' maxW='616px'>
          <ModalHeader>
            <Box display='flex' alignItems='center'>
              <MoveIcon />
              <p className='ml-2'>File recovery</p>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            mt='49px'
          >
            <p className='text-lg'>
              Are you sure you want to restore the selected file?
            </p>
          </ModalBody>
          <ModalFooter
            display='flex'
            alignItems='center'
            mt='32px'
            justifyContent='center'
          >
            <Button
              w='136px'
              h='41px'
              backgroundColor='#E7E7E7'
              _hover={{ backgroundColor: '#28A1FF', color: 'white' }}
              onClick={handleRestoreFileFromTrash}
            >
              Yes
            </Button>
            <Button
              w='136px'
              h='41px'
              ml='16px'
              backgroundColor='#E7E7E7'
              _hover={{ backgroundColor: '#28A1FF', color: 'white' }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecoveryModal;
