import { useState } from 'react';
import { useRouter } from 'next/router';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { Flex, Button, Box, Text, Input } from '@chakra-ui/react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';
import { useCreateNewWorkspaceMutation } from '../../features/mrQuery';

import NewWorkspace from '../svg/workspace/newWorkspace.svg';
import Arrow from '../svg/screenshot/arrow.svg';
import NewFolder from '../svg/workspace/newFolder.svg';

function CustomSteps({ onClose }) {
  const [createNewWorkspace, isLoading, isError] =
    useCreateNewWorkspaceMutation();

  const [createWorkspace, setCreateWorkspace] = useState({
    workspaceName: '',
    folderName: '',
    emails: '',
  });

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

  const handleSubmit = async () => {
    try {
      Loading.pulse({
        clickToClose: true,
        backgroundColor: 'rgba(0,0,0,0.4)',
      });
      const formData = new FormData();
      formData.append('workspaceName', createWorkspace.workspaceName);
      formData.append('folderName', createWorkspace.folderName);

      const res = await createNewWorkspace(formData);
      const { data } = res;
      if (data.status === 'success') {
        Notify.success('Workspace created', {
          borderRadius: '24px',
          backOverlay: true,
          position: 'center-bottom',
          distance: '55px',
          timeout: 500,
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
      router.push(`/workspace/${data?.data?.workspace?.id}`);
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
    setCreateWorkspace({
      workspaceName: '',
      folderName: '',
      emails: '',
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'workspace':
        return setCreateWorkspace((prev) => ({
          ...prev,
          workspaceName: value,
        }));
      case 'folder':
        return setCreateWorkspace((prev) => ({
          ...prev,
          folderName: value,
        }));
      case 'emails':
        return setCreateWorkspace((prev) => ({
          ...prev,
          emails: value,
        }));
      default:
        return;
    }
  };

  const contentStepOne = (
    <>
      <Text color='#747474' textAlign='center' mt='24px'>
        {t().create_workspace}
      </Text>
      <Box display='flex' alignItems='center' mt='32px'>
        <NewWorkspace />
        <Input
          ml='19px'
          onChange={handleChange}
          name='workspace'
          // _focus={{ boxShadow: 'transparent' }}

          placeholder={`${t().enter_workspace_name}`}
        />
      </Box>
    </>
  );

  const contentStepTwo = (
    <>
      <Text color='#747474' textAlign='center' mt='24px'>
        {t().create_first_folder}
      </Text>
      <Box display='flex' alignItems='center' mt='32px'>
        <NewFolder width={26} />
        <Input
          ml='15px'
          width='100%'
          onChange={handleChange}
          name='folder'
          // _focus={{ boxShadow: 'transparent' }}
          placeholder={`${t().enter_folder_name}`}
        />
      </Box>
    </>
  );

  const contentStepThree = (
    <>
      <Text color='#747474' textAlign='center' mt='24px'>
        {t().add_members}
      </Text>
      <Box display='flex' alignItems='center' mt='32px'>
        <Input
          colorScheme='brand'
          onChange={handleChange}
          name='emails'
          type='email'
          mr='8px'
          placeholder={`${t().email_comma_separated}`}
        />
        <Button
          w='160px'
          _hover={{ bg: '#28A1FF', color: '#fff' }}
          color='#C4C4C4'
          bg='#E7E7E7'
        >
          {t().send}
        </Button>
      </Box>
    </>
  );

  const steps = [
    { key: '1', content: contentStepOne },
    { key: '2', content: contentStepTwo },
    { key: '3', content: contentStepThree },
  ];

  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <div className='flex items-center justify-center mt-6'>
      <Flex flexDir='column' width='100%'>
        <Steps
          // checkIcon={CheckStep}
          activeStep={activeStep}
          colorScheme={'brand'}
          size='sm'
          width='250px'
          margin='0 auto'
        >
          {steps.map(({ key, content }) => (
            <Step key={key}>{content}</Step>
          ))}
        </Steps>
        {activeStep === steps.length ? (
          <Flex p={4} mt='20px'>
            <Button
              mx='auto'
              size='sm'
              _hover={{ bg: '#28A1FF', color: '#fff' }}
              color='#28A1FF'
              onClick={handleSubmit}
              width='150px'
              height='40px'
            >
              {t().create}
            </Button>
          </Flex>
        ) : (
          <Flex width='100%' justify='flex-end' mt='32px'>
            <Button
              _hover={{ bg: '#28A1FF', color: '#fff' }}
              isDisabled={createWorkspace.workspaceName === ''}
              color='#C4C4C4'
              size='sm'
              onClick={nextStep}
              width='127px'
              position='relative'
            >
              {activeStep === 0
                ? t().next
                : activeStep === 1 && createWorkspace.folderName !== ''
                ? t().next
                : activeStep === 2 && createWorkspace.emails !== ''
                ? t().next
                : t().skip}
              <Arrow className='ml-[17px]' />
            </Button>
          </Flex>
        )}
      </Flex>
    </div>
  );
}

export default CustomSteps;
