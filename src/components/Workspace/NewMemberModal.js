import { useRouter } from 'next/router';
import { useState } from 'react';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
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

import { useGetListOfWorkspacesQuery } from '../../features/mrQuery';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import NewUser from '../svg/newUser.svg';
import Arrow from '../svg/screenshot/arrow.svg';
import Plus from '../svg/plus.svg';
import CopyLink from '../../components/svg/screenshot/linkCopy.svg';
import Arrows from '../../components/svg/screenshot/arrows.svg';

function NewMemberModal({ isOpen, onClose, onSubmit }) {
  const { data = [], isLoading, isError } = useGetListOfWorkspacesQuery();
  const { workspaces } = data?.data || [];

  const [emails, setEmails] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

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

  const selectOptions =
    data &&
    workspaces?.map((item) => {
      return { value: item?.name, label: item?.name, id: item?.id };
    });

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent pt={'23px'} pb={'19px'} pr='16px' maxW='712px'>
          <ModalHeader p={0} pl={'32px'} pr={'13px'}>
            <Box display={'flex'} alignItems={'center'}>
              <NewUser className='mr-2' />
              <span className='text-[32px] leading-[44px]'>
                {t().new_member}
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
                      : data?.data?.workspaces[0]?.name
                          ?.charAt(0)
                          .toUpperCase()}
                  </span>
                </div>
                <Select
                  focusBorderColor='#28A1FF'
                  name='change-folder'
                  className='w-[100%] '
                  classNamePrefix='chakra-react-select'
                  options={selectOptions}
                  placeholder={data?.data?.workspaces[0]?.name}
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
                  onChange={(e) =>
                    setSelectedWorkspace({
                      value: e?.value,
                      label: e?.label,
                      id: e?.id,
                    })
                  }
                />
              </Box>
              <p className='mt-6 font-semibold'>{t().send_by_email}</p>
              <Box mt='8px' display='flex' alignItems='center'>
                {/* multi-email */}

                <Box
                  width='100%'
                  height='45px'
                  border='2px solid #E7E7E7'
                  borderRadius='5px'
                  _hover={{ borderColor: '#28A1FF' }}
                  cursor='pointer'
                  display='flex'
                  alignItems='center'
                >
                  <ReactMultiEmail
                    style={
                      { border: 'none' }
                      // { outline: '#28A1FF' }
                    }
                    placeholder={`${t().email_comma_separated}`}
                    emails={emails}
                    onChange={(_emails) => {
                      setEmails(_emails);
                    }}
                    getLabel={(email, index, removeEmail) => {
                      return (
                        <div data-tag key={index}>
                          {email}
                          <span
                            data-tag-handle
                            onClick={() => removeEmail(index)}
                          >
                            ×
                          </span>
                        </div>
                      );
                    }}
                  />
                </Box>

                <Button
                  w='160px'
                  ml='8px'
                  _hover={{ bg: '#28A1FF', color: '#fff' }}
                  color='#C4C4C4'
                  bg='#E7E7E7'
                  onClick={() => {
                    onSubmit(
                      selectedWorkspace?.id,
                      emails,
                      setSelectedWorkspace,
                      setEmails
                    );
                  }}
                  isDisabled={emails.length === 0}
                >
                  {t().send}
                </Button>
              </Box>
            </Box>

            {/*  */}
          </ModalBody>
          <ModalFooter
            display='flex'
            alignItems='center'
            justifyContent='flex-start'
            mt='32\4px'
            pl='25px'
          >
            <Box display='flex' alignItems='center' mt='51px'>
              <Box display='flex' alignItems='center' cursor='pointer'>
                <CopyLink />
                <p className='text-my-accent-color ml-[9px]'>{t().copy_link}</p>
              </Box>
              <Box
                display='flex'
                alignItems='center'
                cursor='pointer'
                ml='25px'
              >
                <Arrows />
                <p className='text-my-accent-color ml-[9px]'>
                  {t().get_embed_code}
                </p>
              </Box>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewMemberModal;
