import { useRouter } from 'next/router';
import { useState, useRef } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useRenameFolderMutation } from '../../features/mrQuery';
import WorkspaceDropDown from '../../components/Workspace/WorkspaceDropDown';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Triangle from '../../components/svg/workspace/triangle.svg';
import Video from '../../components/svg/workspace/video.svg';
import ImageIcon from '../../components/svg/image.svg';
import Link from '../../components/svg/workspace/link.svg';
import Router from 'next/router';

function WorkspacePage({
  listFolders,
  loadingFolders,
  errorLoadingFolders,
  workspaceId,
}) {
  const [activeFolder, setActiveFolder] = useState({ name: '', folderId: '' });
  const [disabled, setDisabled] = useState(true);
  const nameInput = useRef(null);
  const [renameFolder, { isLoading, isError }] = useRenameFolderMutation();

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

  const handleInputChange = () => {
    setDisabled(!disabled);
  };

  const handleFocus = () => {
    nameInput?.current?.focus();
  };

  const handleNameChange = (e) => {
    const { value, id } = e.target;
    setActiveFolder(() => {
      [{ name: value, folderId: id }];
    });
  };

  const handleBlur = async () => {
    try {
      const formData = new FormData();
      formData.append('folderName  ', activeFolder?.name);
      const res = await renameFolder({
        workspaceId,
        folderId: activeFolder?.folderId,
        body: formData,
      });
      const { data } = res;
      if (data.status) {
        Notify.success('Folder name changed', {
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
      handleInputChange();
      setActiveFolder({ name: '', folderId: '' });
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
    }
  };

  return (
    <>
      <Box w='100%' h='100%' mt='32px'>
        <ul className='flex flex-wrap gap-6'>
          {listFolders?.data?.folders
            ? listFolders?.data?.folders?.map((itemFolder) => {
                return (
                  <li key={itemFolder?.id}>
                    <Box
                      h='209px'
                      w='252px'
                      p='16px'
                      position='relative'
                      cursor='pointer'
                      border='1px solid #E7E7E7'
                      borderRadius='5px'
                      _hover={{ border: '1px solid #28A1FF' }}
                      display='flex'
                      flexDirection='column'
                    >
                      <Triangle className='absolute top-0 left-0' />

                      <input
                        type='text'
                        // value={itemFolder?.name}
                        placeholder={itemFolder?.name}
                        id={itemFolder?.id}
                        ref={nameInput}
                        name='folderName'
                        disabled={disabled}
                        // onBlurCapture={handleBlur}
                        onChange={handleNameChange}
                        className='text-lg leading-[25px] outline-none placeholder:text-[#262626] focus:bg-[#C7EEFF] px-[2px] rounded-[5px]'
                      />
                      {/* <button onClick={handleFocus}>Focus</button> */}
                      <Box
                        flexGrow='1'
                        onClick={() => Router.push('/workspace/1/folder/1')}
                      ></Box>
                      <Box display='flex' justifyContent='space-between'>
                        <Box display='flex'>
                          <Box display='flex' alignItems='center'>
                            <span className='mr-1'>3</span>
                            <Video />
                          </Box>
                          <Box display='flex' alignItems='center' ml='14px'>
                            <span className='mr-1'>3</span>
                            <ImageIcon />
                          </Box>
                        </Box>

                        <Box display='flex'>
                          <Box display='flex' alignItems='center'>
                            <button type='button'>
                              <Tooltip
                                label={t().copy_link}
                                placement='left'
                                hasArrow
                                borderRadius='5px'
                                bg='#28A1FF'
                                shouldWrapChildren
                              >
                                <Link />
                              </Tooltip>
                            </button>
                          </Box>
                          <Box display='flex' alignItems='center'>
                            <button type='button'>
                              <WorkspaceDropDown
                                handleInputChange={handleInputChange}
                                handleFocus={handleFocus}
                                workspaceId={workspaceId}
                                folderId={itemFolder?.id}
                              />
                            </button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </li>
                );
              })
            : null}
        </ul>
      </Box>
    </>
  );
}

export default WorkspacePage;
