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
import {
  useDeleteMediaByIdFromTrashMutation,
  useDeleteAllMediaFromTrashMutation,
} from '../../features/mrQuery';

import Delete from '../../components/svg/trash.svg';

function DeleteModal({ isOpen, onClose, id, deleteAllTrash = false, media }) {
  const [deleteMediaByIdFromTrash, { isLoading, isError }] =
    useDeleteMediaByIdFromTrashMutation();
  const [
    deleteAllMediaFromTrash,
    { isLoading: emptyingTrash, isError: errorEmptyingTrash },
  ] = useDeleteAllMediaFromTrashMutation();

  const router = useRouter();

  const handleEmptyTrash = async () => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const res = await deleteAllMediaFromTrash();
      const { data } = res;
      if (data.status) {
        Notify.success('Trash is empty', {
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
      router.push('/screenshots');
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

  const handleDeleteFileFromTrash = async () => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const res = await deleteMediaByIdFromTrash(id);
      const { data } = res;
      if (data.status) {
        Notify.success('File deleted successfully', {
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
      media?.length === 0 && router.push('/screenshots');
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
              <Delete />
              <p className='ml-2'>
                {deleteAllTrash ? 'Empty entire trash' : 'Delete selected file'}
              </p>
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
              {deleteAllTrash
                ? 'Are you sure you want to empty the entire trash?'
                : 'Are you sure you want to delete this file ?'}
            </p>
            <p className='mt-2 text-sm text-my-gray-color'>
              {deleteAllTrash
                ? 'All files will be permanently deleted'
                : '(it will be permanently deleted)'}
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
              onClick={
                !deleteAllTrash ? handleDeleteFileFromTrash : handleEmptyTrash
              }
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

export default DeleteModal;
