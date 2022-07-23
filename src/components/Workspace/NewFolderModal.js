import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Input,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import {
  useGetListOfWorkspacesQuery,
  useCreateNewFolderMutation,
} from '../../features/mrQuery';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import NewFolder from '../svg/workspace/newFolder.svg';
import Arrow from '../svg/screenshot/arrow.svg';
import Plus from '../svg/plus.svg';

function NewFolderModal({ isOpen, onClose, currentWorkspaceName }) {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [nameOfCreateFolder, setNameOfCreateFolder] = useState('');
  const router = useRouter();
  const { locale, query } = router;
  const { workspaceId } = query;

  const { data = [], isLoading, isError } = useGetListOfWorkspacesQuery();
  const [createNewFolder, result] = useCreateNewFolderMutation();

  const { workspaces } = data?.data || [];

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  const selectOptions =
    data &&
    workspaces?.map((item) => {
      return { value: item?.name, label: item?.name, id: item?.id };
    });

  const customStyles = {
    dropdownIndicator: (provided) => ({
      ...provided,
      bg: 'transparent',
      px: 2,
      cursor: 'inherit',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
  };

  const handleChangeFolderName = (e) => {
    const { value } = e.target;
    setNameOfCreateFolder(value);
  };

  const handleSubmit = async () => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const formData = new FormData();
      formData.append('folderName', nameOfCreateFolder);
      const res = await createNewFolder({ workspaceId, body: formData });
      const { data } = res;
      if (data.status === 'success') {
        Notify.success('Workspace created', {
          borderRadius: '24px',
          backOverlay: true,
          position: 'center-bottom',
          distance: '55px',
          timeout: 300,
          clickToClose: true,
        });
      } else if (data.status === 'error') {
        Notify.failure(data.message, {
          borderRadius: '24px',
          backOverlay: true,
          position: 'center-bottom',
          distance: '55px',
          timeout: 700,
          clickToClose: true,
        });
      }
      onClose();
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
      Loading.remove();
      console.log(error);
    }
    setSelectedWorkspace(null);
    setNameOfCreateFolder('');
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent pt={'35px'} pb={'40px'} maxW='616px'>
          <ModalHeader p={0} pl={'32px'} pr={'13px'}>
            <Box display={'flex'} alignItems={'center'}>
              <NewFolder className='mr-2' />
              <span className='text-[32px] leading-[44px]'>
                {t().new_folder}
              </span>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={'0'}>
            <Box pl={'32px'} pr={'13px'}>
              <p className='mt-8 text-sm text-my-gray-color'>{t().workspace}</p>
              <Box className='flex items-center mt-6'>
                <div className='w-6 h-6 rounded-[5px] bg-[#58C7DA] mr-[16px] flex items-center justify-center'>
                  <span className='text-[#fff] '>
                    {selectedWorkspace
                      ? selectedWorkspace?.label?.charAt(0).toUpperCase()
                      : currentWorkspaceName?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <Select
                  focusBorderColor='#28A1FF'
                  name='change-folder'
                  className='w-[100%] '
                  classNamePrefix='chakra-react-select'
                  options={selectOptions}
                  placeholder={currentWorkspaceName}
                  selectedOptionStyle='check'
                  chakraStyles={customStyles}
                  onChange={(e) =>
                    setSelectedWorkspace({
                      value: e?.value,
                      label: e?.label,
                      id: e?.id,
                    })
                  }
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  // getOptionLabel={(e) => (
                  //   <Box display='flex' alignItems='center'>
                  //     <div className='w-6 h-6 rounded-[5px] bg-[#58C7DA] mr-[16px] flex items-center justify-center'>
                  //       <span className='text-[#fff] '>
                  //         {e.value?.charAt(0)}
                  //       </span>
                  //     </div>
                  //     <Box as='span' ml='5px' cursor='pointer'>
                  //       {e.label}
                  //     </Box>
                  //   </Box>
                  // )}
                />
              </Box>
              <Box mt='32px' display='flex' alignItems='center'>
                <NewFolder className='w-[27px]' />
                <Input
                  placeholder={`${t().enter_folder_name}`}
                  ml='14px'
                  focusBorderColor='#28A1FF'
                  _placeholder={{ color: '#C4C4C4' }}
                  onChange={handleChangeFolderName}
                />
              </Box>
            </Box>

            {/*  */}
          </ModalBody>
          <ModalFooter
            display='flex'
            alignItems='center'
            justifyContent='flex-end'
            mt='32px'
            p='0 13px 0 0'
          >
            <Button
              onClick={handleSubmit}
              w='136px'
              h='41px'
              backgroundColor='#E7E7E7'
              _hover={{ backgroundColor: '#28A1FF', color: 'white' }}
            >
              {t().save}
            </Button>
            <Button
              onClick={onClose}
              w='136px'
              h='41px'
              backgroundColor='#E7E7E7'
              _hover={{ backgroundColor: '#28A1FF', color: 'white' }}
              ml='16px'
            >
              {t().close}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewFolderModal;
