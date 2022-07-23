import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  // Select,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Folder from '../svg/screenshot/folder.svg';
import AddFolder from '../svg/screenshot/folder-add.svg';
import Arrow from '../svg/screenshot/arrow.svg';
import Plus from '../svg/plus-modal.svg';

function MoveModal({ isOpen, onClose }) {
  const [addNewFolder, setAddNewFolder] = useState(false);

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

  const selectOptions = [
    { value: 'Pinta', label: 'Pinta' },
    { value: 'Team name', label: 'Team name' },
    { value: 'Workspace', label: 'Workspace' },
  ];

  const handleClick = () => {
    setAddNewFolder(!addNewFolder);
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent pt={'35px'} pb={'40px'} maxW='616px'>
          <ModalHeader p={0} pl={'32px'} pr={'13px'}>
            <Box display={'flex'} alignItems={'center'}>
              <Folder className='mr-4' />
              <span className='text-[32px] leading-[44px]'>
                {t().move_modal}
              </span>
            </Box>
            <Box className='flex items-center mt-2 text-lg text-my-border-color'>
              <p className='mr-[17px]'>Pinta</p>
              <Arrow className='mr-[15px]' />
              <p>Folder name #32857475</p>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={'0'}>
            <Box pl={'32px'} pr={'13px'}>
              <p className='mt-6 text-sm text-my-gray-color'>{t().workspace}</p>
              <Box className='flex items-center mt-6'>
                <div className='w-6 h-6 rounded-[5px] bg-[#58C7DA] mr-[16px] flex items-center justify-center'>
                  <span className='text-[#fff] '>P</span>
                </div>
                {/* <Select
                  fontSize='18px'
                  lineHeight={'25px'}
                  placeholder='Pinta'
                  variant='unstyled'
                  bg='none'
                >
                  <option value='option1'>Folder 1</option>
                  <option value='option2'>Folder 2</option>
                  <option value='option3'>Folder 3</option>
                </Select> */}

                <Select
                  focusBorderColor='#28A1FF'
                  name='change-folder'
                  className='w-[100%] '
                  classNamePrefix='chakra-react-select'
                  options={selectOptions}
                  placeholder='Pinta'
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
            <p className='pl-8 pr-[13px] mt-8 text-sm text-my-gray-color'>
              {t().folders}
            </p>
            <Box className='flex w-full px-8 py-4 mt-4 cursor-pointer hover:bg-my-border-color'>
              <Folder className='mr-4' />
              <p className='text-lg leading-[25px]'>Folder name #32857475</p>
            </Box>
            <Box className='flex w-full px-8 py-4 cursor-pointer hover:bg-my-border-color'>
              <Folder className='mr-4' />
              <p className='text-lg leading-[25px]'>Folder name #32857475</p>
            </Box>
            {!addNewFolder ? (
              <Box
                as='button'
                className='flex mt-4 pl-8 pr-[13px] items-center color-my-accent-color cursor-pointer'
                onClick={handleClick}
              >
                <Plus className='mr-[13px]' />
                <p className='text-lg text-my-accent-color'>{t().new_folder}</p>
              </Box>
            ) : (
              <Box className='flex w-full mt-2 pl-8 pr-[13px] items-center color-my-accent-color cursor-pointer'>
                <AddFolder />
                <Input
                  placeholder='Enter folder name'
                  marginLeft='16px'
                  width='94%'
                  _focus={{ borderColor: '#28A1FF' }}
                />
              </Box>
            )}
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
}

export default MoveModal;
