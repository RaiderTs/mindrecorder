import { useRouter } from 'next/router';
import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

import {
  useDeleteFolderByIdMutation,
  useUnpinFolderMutation,
} from '../../features/mrQuery';
import WorkspaceDeleteModal from '../../components/Workspace/WorkspaceDeleteModal';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Dots from '../../components/svg/workspace/dots.svg';
import Rename from '../../components/svg/screenshot/rename.svg';
import Unpin from '../../components/svg/workspace/unpin.svg';

import Delete from '../../components/svg/screenshot/trash.svg';

const WorkspaceDropDown = ({
  handleInputChange,
  handleFocus,
  workspaceId,
  folderId,
}) => {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [
    deleteFolderById,
    { isLoading: isDeletedLoading, isError: isDeletedError },
  ] = useDeleteFolderByIdMutation();

  const [unpinFolder, result] = useUnpinFolderMutation();

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

  // delete
  const onOpenDelete = () => setIsOpenDelete(!isOpenDelete);
  const onClosDelete = () => setIsOpenDelete(false);

  const handleDelete = async () => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const res = await deleteFolderById({
        workspaceId,
        folderId,
      });
      const { data } = res;
      if (data.status) {
        Notify.success('Folder deleted', {
          borderRadius: '24px',
          backOverlay: true,
          position: 'center-bottom',
          distance: '55px',
          timeout: 500,
          clickToClose: true,
        });

        onClosDelete();
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

  const handleUnpinFolder = async () => {
    console.log('click');
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const formData = new FormData();
      formData.append('pin', false);
      const res = await unpinFolder(
        {
          workspaceId,
          folderId,
        },
        formData
      );
      const { data } = res;
      if (data.status) {
        Notify.success('Folder deleted', {
          borderRadius: '24px',
          backOverlay: true,
          position: 'center-bottom',
          distance: '55px',
          timeout: 500,
          clickToClose: true,
        });

        onClosDelete();
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
      <Menu>
        <MenuButton>
          <Button bg='transparent' borderRadius='50%' size='sm'>
            <Dots />
          </Button>
        </MenuButton>
        <MenuList pt='10px'>
          <MenuItem
            onClick={() => {
              handleInputChange();
              handleFocus();
            }}
          >
            <Rename className='mr-[10px] text-sm  text-my-gray-color' />
            {t().rename}
          </MenuItem>
          <MenuItem onClick={handleUnpinFolder}>
            <Unpin className='mr-[10px] text-sm  text-my-gray-color' />
            {t().unpin}
          </MenuItem>
          <MenuItem onClick={onOpenDelete}>
            <Delete className='mr-[10px] text-sm  text-my-gray-color' />
            {t().delete}
            <WorkspaceDeleteModal
              isOpen={isOpenDelete}
              onClose={onClosDelete}
              handleDelete={handleDelete}
            />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default WorkspaceDropDown;
