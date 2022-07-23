import { useRouter } from 'next/router';
import { Select } from 'chakra-react-select';
import { Box, Button, Input, useDisclosure } from '@chakra-ui/react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import {
  useDeleteWorkspaceByIdMutation,
  useWorkspaceSettingsMutation,
} from '../../features/mrQuery';
import WorkspaceDeleteModal from './WorkspaceDeleteModal';
import CustomCheckbox from './CustomCheckbox';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Delete from '../svg/screenshot/trash.svg';

function WorkspaceSettings({ nameWorkspace }) {
  const [
    deleteWorkspaceById,
    { isLoading: isDeletedLoading, isError: isDeletedError },
  ] = useDeleteWorkspaceByIdMutation();

  const [
    workspaceSettings,
    { isLoading: isLoadingSettings, isError: isLoadingError },
  ] = useWorkspaceSettingsMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { workspaceId } = router?.query;
  const { locale } = router;

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  const colorsCheckbox = [
    { id: 1, color: '#58C7DA' },
    { id: 2, color: '#478ECC' },
    { id: 3, color: '#15499F' },
    { id: 4, color: '#913E98' },
    { id: 5, color: '#4C2E88' },
    { id: 6, color: '#EA1A65' },
    { id: 7, color: '#891951' },
    { id: 8, color: '#F04438' },
    { id: 9, color: '#B72025' },
    { id: 10, color: '#48B8AC' },
    { id: 11, color: '#1998A7' },
    { id: 12, color: '#ADD57F' },
    { id: 13, color: '#69A042' },
    { id: 14, color: '#FCC02A' },
    { id: 15, color: '#F58020' },
    { id: 16, color: '#FDB64E' },
    { id: 17, color: '#E65425' },
    { id: 18, color: '#000000' },
  ];

  const selectOptions = [
    { value: 'Only owner', label: `${t().only_owner}` },
    { value: 'All', label: `${t().all}` },
  ];

  //  handlers

  const handleDelete = async () => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const res = await deleteWorkspaceById(workspaceId);
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
        router.push('/screenshots');
        onClose();
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

  const handleSettings = async (id) => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const formData = new FormData();
      formData.append('name', nameWorkspace);
      formData.append('color', id);

      const options = { workspaceId, body: formData };
      const res = await workspaceSettings(options);
      const { data } = res;
      if (data.status) {
        Notify.success('Color changed', {
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
      <Box w='75%' h='100%' mt='82px'>
        <Box
          display='flex'
          alignItems='baseline'
          justifyContent='space-between'
        >
          <Box
            // width='50%'
            display='flex'
            alignItems='center'
            justifyContent='flex-start'
          >
            <Box width='352px' position='relative'>
              <p className='text-lg font-bold leading-[25px]'>
                {t().basic_settings}
              </p>
              <p className='mt-8 font-semibold'>{t().name}</p>
              <Input
                placeholder='Pinta'
                focusBorderColor='#28A1FF'
                _placeholder={{ color: 'inherit' }}
                marginTop='8px'
                w='352px'
                // position='absolute'
                // left='-15px'
              />
              <p className='mt-8 font-semibold'>{t().color}</p>
              <Box w='100%' display='flex' flexWrap='wrap'>
                {colorsCheckbox.map(({ id, color }) => (
                  <Box
                    key={id}
                    w='39px'
                    h='39px'
                    borderRadius='5px'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    marginTop='8px'
                    _hover={{ border: '1px solid #E7E7E7', cursor: 'pointer' }}
                  >
                    <CustomCheckbox
                      color={color}
                      id={id}
                      handleSettings={handleSettings}
                    />
                  </Box>
                ))}

                <CustomCheckbox />
              </Box>

              <Button
                leftIcon={<Delete />}
                variant='link'
                color='red'
                mt='20px'
                _focus={{ boxShadow: 'transparent' }}
                _active={{ background: 'transparent' }}
                onClick={onOpen}
              >
                Delete Workspase
                <WorkspaceDeleteModal
                  isOpen={isOpen}
                  onClose={onClose}
                  handleDelete={handleDelete}
                />
              </Button>
            </Box>
          </Box>
          <Box
            // width='50%'
            display='flex'
            alignItems='center'
            justifyContent='flex-start'
          >
            <Box width='352px'>
              <p className='text-lg font-bold leading-[25px]'>
                {t().confidentiality}
              </p>
              <p className='mt-8 text-base font-semibold'>
                {t().invite_new_members}
              </p>
              <Select
                focusBorderColor='#28A1FF'
                name='invite'
                className='w-[100%] mt-2'
                classNamePrefix='chakra-react-select'
                options={selectOptions}
                placeholder={`${t().only_owner}`}
                selectedOptionStyle='check'
                chakraStyles={{
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
                }}
              />
              {/*  */}
              <p className='mt-4 text-base font-semibold'>
                {t().download_files}
              </p>
              <Select
                focusBorderColor='#28A1FF'
                name='invite'
                className='w-[100%] mt-2'
                classNamePrefix='chakra-react-select'
                options={selectOptions}
                placeholder={`${t().all}`}
                selectedOptionStyle='check'
                chakraStyles={{
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
                }}
              />
              {/*  */}
              <p className='mt-4 text-base font-semibold'>{t().share_files}</p>
              <Select
                focusBorderColor='#28A1FF'
                name='invite'
                className='w-[100%] mt-2'
                classNamePrefix='chakra-react-select'
                options={selectOptions}
                placeholder={`${t().all}`}
                selectedOptionStyle='check'
                chakraStyles={{
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
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default WorkspaceSettings;
