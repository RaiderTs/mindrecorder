import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { Select, chakraComponents } from 'chakra-react-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import Layout from '../../../components/Layout';
import WorkspacePage from '../../../components/Workspace/WorkspacePage';
import WorkspaceMembers from '../../../components/Workspace/WorkspaceMembers';
import NewFolderModal from '../../../components/Workspace/NewFolderModal';
import NewMemberModal from '../../../components/Workspace/NewMemberModal';
import WorkspaceSettings from '../../../components/Workspace/WorkspaceSettings';
import {
  useGetWorkspaceInfoQuery,
  useGetListOfFoldersInWorkspaceQuery,
  useAddNewMemberToWorkspaceMutation,
} from '../../../features/mrQuery';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Plus from '../../../components/svg/plus.svg';
import Navigation from '../../../components/svg/navigation.svg';

function Workspace() {
  const router = useRouter();
  const { query, locale } = router;
  const { workspaceId } = query;
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isRender, setIsRender] = useState(true);
  const {
    data = [],
    isLoading,
    isError,
  } = useGetWorkspaceInfoQuery(workspaceId, { skip: !workspaceId });

  const {
    data: listFolders,
    isLoading: loadingFolders,
    isError: errorLoadingFolders,
  } = useGetListOfFoldersInWorkspaceQuery(workspaceId, { skip: !workspaceId });

  const [addNewMemberToWorkspace, result] =
    useAddNewMemberToWorkspaceMutation();

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  const onOpen = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);
  // memberModal

  const onOpenModal = () => setIsOpenModal(!isOpenModal);
  const onCloseModal = () => setIsOpenModal(false);

  const selectOptions = [
    { value: 'name', label: `${t().name}` },
    { value: 'date', label: `${t().date}` },
    { value: 'type', label: `${t().type}` },
    { value: 'user', label: `${t().user}` },
  ];

  const changeTab = (id) => {
    if (id !== 0) setIsRender(false);
    else setIsRender(true);
  };

  const customIconSelect = {
    DropdownIndicator: (props) => (
      <chakraComponents.DropdownIndicator {...props}>
        <Icon as={Navigation} />
      </chakraComponents.DropdownIndicator>
    ),
  };

  const customStyles = {
    dropdownIndicator: (provided) => ({
      ...provided,
      bg: 'transparent',
      px: 2,
      pt: '15px',
      cursor: 'inherit',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    container: (provided) => ({
      ...provided,
      border: 'transparent',
      cursor: 'pointer',
    }),
    control: (provided) => ({
      ...provided,
      border: 'transparent',
    }),
    menu: (provided) => ({
      ...provided,
      width: '250px',
    }),
  };

  const handleSubmit = async (
    workspaceId,
    emails,
    setSelectedWorkspace,
    setEmails
  ) => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const formData = new FormData();
      formData.append('emails', emails);

      const res = await addNewMemberToWorkspace({
        workspaceId,
        emails: formData,
      });
      const { data } = res;
      if (data.status === 'success') {
        Notify.success('Member added', {
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
          timeout: 1500,
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
    setEmails([]);
  };

  return (
    <Layout
      title={data?.data?.workspace?.name}
      titlePage={data?.data?.workspace?.name}
    >
      <Box className='px-[31px] w-full h-full flex-auto mt-8'>
        <Tabs colorScheme='grey' onChange={changeTab}>
          <TabList display='flex' justifyContent='space-between'>
            <Box display='flex' alignItems='center'>
              <Tab
                color='#747474'
                _focus={{ boxShadow: 'transparent' }}
                _selected={{
                  borderBottom: '2px solid',
                  borderBottomColor: '#28A1FF',
                  color: 'currentColor',
                }}
              >
                {t().workspace}
              </Tab>
              <Tab
                color='#747474'
                _focus={{ boxShadow: 'transparent' }}
                _selected={{
                  borderBottom: '2px solid',
                  borderBottomColor: '#28A1FF',
                  color: 'currentColor',
                }}
                id='tab-2'
              >
                {t().members}
              </Tab>
              <Tab
                color='#747474'
                _focus={{ boxShadow: 'transparent' }}
                _selected={{
                  borderBottom: '2px solid',
                  borderBottomColor: '#28A1FF',
                  color: 'currentColor',
                }}
                id='tab-3'
              >
                {t().settings}
              </Tab>
            </Box>

            {isRender ? (
              <Box display='flex' alignItems='center'>
                <Select
                  focusBorderColor='none'
                  name='sort'
                  className='w-[100px]'
                  classNamePrefix='chakra-react-select'
                  options={selectOptions}
                  placeholder={`${t().date}`}
                  selectedOptionStyle='check'
                  chakraStyles={customStyles}
                  components={customIconSelect}
                />
                <Button
                  color='#28A1FF'
                  bg='none'
                  onClick={onOpen}
                  _hover={{ backgroundColor: 'transparent' }}
                  _focus={{
                    boxShadow: 'transparent',
                  }}
                >
                  <Plus fill='#28A1FF' />
                  <span className='ml-[13px]'>{t().new_folder}</span>
                  <NewFolderModal
                    isOpen={isOpen}
                    onClose={onClose}
                    currentWorkspaceName={data?.data?.workspace?.name}
                  />
                </Button>
              </Box>
            ) : (
              <Button
                color='#28A1FF'
                bg='none'
                onClick={onOpenModal}
                _hover={{ backgroundColor: 'transparent' }}
                _focus={{
                  boxShadow: 'transparent',
                }}
              >
                <Plus fill='#28A1FF' />
                <span className='ml-[13px]'>{t().new_member}</span>
                <NewMemberModal
                  isOpen={isOpenModal}
                  onClose={onCloseModal}
                  onSubmit={handleSubmit}
                />
              </Button>
            )}
          </TabList>

          <TabPanels>
            <TabPanel p='0'>
              <WorkspacePage
                listFolders={listFolders}
                loadingFolders={loadingFolders}
                errorLoadingFolders={errorLoadingFolders}
                workspaceId={workspaceId}
              />
            </TabPanel>
            <TabPanel p='0'>
              <WorkspaceMembers />
            </TabPanel>
            <TabPanel p='0'>
              <WorkspaceSettings nameWorkspace={data?.data?.workspace?.name} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  );
}

export default Workspace;
