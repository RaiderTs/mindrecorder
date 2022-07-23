import {
  Checkbox,
  Icon,
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Tooltip,
} from '@chakra-ui/react';
import { Select, chakraComponents } from 'chakra-react-select';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../../../components/Layout';
import MenuDropDown from '../../../../components/MenuDropDown';
import SelectedPanel from '../../../../components/Screenshots/SelectedPanel';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import ArrowLeft from '../../../../components/svg/screenshot/arrowLeft.svg';
import Camera from '../../../../components/svg/screenshot/camera.svg';
import Message from '../../../../components/svg/screenshot/message.svg';
import Eye from '../../../../components/svg/screenshot/eye.svg';
import LinkImg from '../../../../components/svg/screenshot/link.svg';
import Navigation from '../../../../components/svg/navigation.svg';
function FoldersId() {
  const router = useRouter();
  const { locale, query } = router;
  // const { workspaceId } = query;

  const [isCheckedImg, setIsCheckedImg] = useState([]);

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  const handleChangeImg = (e) => {
    if (e.target.checked) {
      setIsCheckedImg([...isCheckedImg, e.target.value]);
    } else {
      setIsCheckedImg(isCheckedImg.filter((id) => id !== e.target.value));
    }
  };

  const selectOptions = [
    { value: 'Name', label: `${t().name}` },
    { value: 'Date', label: `${t().date}` },
  ];

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
      width: '200px',
    }),
  };

  return (
    <Layout title={'Pinta'} titlePage={'Pinta'}>
      <Box className='px-[31px] w-full h-full flex-auto'>
        {isCheckedImg.length > 0 && (
          <Box
            className=' mb-[38px]'
            position='fixed'
            bottom='0'
            w='83%'
            zIndex='1'
          >
            <SelectedPanel fileslength={isCheckedImg.length} />
          </Box>
        )}
        <Box
          marginTop='36px'
          width='100%'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box display='flex' alignItems='center'>
            <Link href={`/workspace/${1}`}>
              <a>
                <ArrowLeft />
              </a>
            </Link>
            <p className='text-lg leading-[25px] ml-3'>Title folder</p>
          </Box>

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
        </Box>

        {/* General markup */}
        <Box className='mt-8'>
          <ul className='flex flex-wrap gap-6'>
            <li className='w-[252px]'>
              <Box>
                {/* photo */}
                <Box className='group relative border-2 border-transparent rounded-[5px] hover:border-my-accent-color '>
                  <Box>
                    <Link href={`/screenshots/${1}`}>
                      <a>
                        <img
                          src='/img.jpg'
                          alt='img'
                          width='252'
                          height='183'
                        />
                      </a>
                    </Link>

                    <label
                      htmlFor='img'
                      className='invisible cursor-pointer group-hover:visible'
                    >
                      <Box
                        position={'absolute'}
                        top={'8px'}
                        left={'8px'}
                        h={'24px'}
                        w={'24px'}
                        borderRadius={'50%'}
                        backgroundColor={'#000'}
                      >
                        <Tooltip
                          label={t().check}
                          placement='right'
                          left={'12px'}
                          borderRadius='5px'
                          hasArrow
                          bg='#28A1FF'
                          shouldWrapChildren
                        >
                          <Checkbox
                            _focus={{ boxShadow: 'transparent' }}
                            _hover={{ backgroundColor: 'transparent' }}
                            _active={{ backgroundColor: 'transparent' }}
                            size='sm'
                            top={'25%'}
                            left={'25%'}
                            id={'img'}
                            value={1}
                            checked={false}
                            onChange={handleChangeImg}
                          ></Checkbox>
                        </Tooltip>
                      </Box>
                    </label>
                  </Box>

                  {/*  */}

                  <div className='absolute invisible right-2 top-2 group-hover:visible'>
                    <MenuDropDown />
                  </div>

                  <Tooltip
                    label={t().copy_link}
                    placement='right'
                    borderRadius='5px'
                    hasArrow
                    bg='#28A1FF'
                    top='0'
                  >
                    <button
                      className='absolute invisible right-2 top-10 group-hover:visible'
                      type='button'
                      onClick={() => {}}
                    >
                      <LinkImg />
                    </button>
                  </Tooltip>
                </Box>

                <Editable
                  mt={'12px'}
                  h={'19px'}
                  fontWeight={600}
                  fontSize={'sm'}
                  // isPreviewFocusable={false}
                  defaultValue='Screenshot name #4245983457937fs'
                >
                  <EditablePreview />
                  <EditableInput p={'0'} pl={'10px'} />
                </Editable>

                {/* footer */}
                <Box className='flex items-center justify-between mt-2'>
                  <Box className='flex items-center'>
                    <Camera />
                    <p className='ml-2 text-xs text-my-gray-color'>
                      21 feb 2022
                    </p>
                  </Box>
                  <Box className='flex items-center '>
                    <Box className='flex items-center'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Message />
                    </Box>
                    <Box className='flex items-center ml-[17px]'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Eye />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </li>
            {/* copy LI */}
            <li className='w-[252px]'>
              <Box>
                {/* photo */}
                <Box className='group relative border-2 border-transparent rounded-[5px] hover:border-my-accent-color '>
                  <Box>
                    <Link href={`/screenshots/${1}`}>
                      <a>
                        <img
                          src='/img.jpg'
                          alt='img'
                          width='252'
                          height='183'
                        />
                      </a>
                    </Link>

                    <label
                      htmlFor='img'
                      className='invisible cursor-pointer group-hover:visible'
                    >
                      <Box
                        position={'absolute'}
                        top={'8px'}
                        left={'8px'}
                        h={'24px'}
                        w={'24px'}
                        borderRadius={'50%'}
                        backgroundColor={'#000'}
                      >
                        <Tooltip
                          label='Check'
                          placement='bottom'
                          hasArrow
                          borderRadius='5px'
                          bg='#28A1FF'
                          shouldWrapChildren
                        >
                          <Checkbox
                            _focus={{ boxShadow: 'transparent' }}
                            _hover={{ backgroundColor: 'transparent' }}
                            _active={{ backgroundColor: 'transparent' }}
                            size='sm'
                            top={'25%'}
                            left={'25%'}
                            id={'img'}
                            value={1}
                            checked={false}
                            onChange={handleChangeImg}
                          ></Checkbox>
                        </Tooltip>
                      </Box>
                    </label>
                  </Box>

                  {/*  */}

                  <div className='absolute invisible right-2 top-2 group-hover:visible'>
                    <MenuDropDown />
                  </div>
                  <button
                    className='absolute invisible right-2 top-10 group-hover:visible'
                    type='button'
                    onClick={() => {}}
                  >
                    <Tooltip
                      label='Check'
                      placement='bottom'
                      hasArrow
                      borderRadius='5px'
                      bg='#28A1FF'
                      shouldWrapChildren
                    >
                      <LinkImg />
                    </Tooltip>
                  </button>
                </Box>

                <Editable
                  mt={'12px'}
                  h={'19px'}
                  fontWeight={600}
                  fontSize={'sm'}
                  // isPreviewFocusable={false}
                  defaultValue='Screenshot name #4245983457937fs'
                >
                  <EditablePreview />
                  <EditableInput p={'0'} pl={'10px'} />
                </Editable>

                {/* footer */}
                <Box className='flex items-center justify-between mt-2'>
                  <Box className='flex items-center'>
                    <Camera />
                    <p className='ml-2 text-xs text-my-gray-color'>
                      21 feb 2022
                    </p>
                  </Box>
                  <Box className='flex items-center '>
                    <Box className='flex items-center'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Message />
                    </Box>
                    <Box className='flex items-center ml-[17px]'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Eye />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </li>
            <li className='w-[252px]'>
              <Box>
                {/* photo */}
                <Box className='group relative border-2 border-transparent rounded-[5px] hover:border-my-accent-color '>
                  <Box>
                    <Link href={`/screenshots/${1}`}>
                      <a>
                        <img
                          src='/img.jpg'
                          alt='img'
                          width='252'
                          height='183'
                        />
                      </a>
                    </Link>

                    <label
                      htmlFor='img'
                      className='invisible cursor-pointer group-hover:visible'
                    >
                      <Box
                        position={'absolute'}
                        top={'8px'}
                        left={'8px'}
                        h={'24px'}
                        w={'24px'}
                        borderRadius={'50%'}
                        backgroundColor={'#000'}
                      >
                        <Tooltip
                          label='Check'
                          placement='bottom'
                          hasArrow
                          borderRadius='5px'
                          bg='#28A1FF'
                          shouldWrapChildren
                        >
                          <Checkbox
                            _focus={{ boxShadow: 'transparent' }}
                            _hover={{ backgroundColor: 'transparent' }}
                            _active={{ backgroundColor: 'transparent' }}
                            size='sm'
                            top={'25%'}
                            left={'25%'}
                            id={'img'}
                            value={1}
                            checked={false}
                            onChange={handleChangeImg}
                          ></Checkbox>
                        </Tooltip>
                      </Box>
                    </label>
                  </Box>

                  {/*  */}

                  <div className='absolute invisible right-2 top-2 group-hover:visible'>
                    <MenuDropDown />
                  </div>
                  <button
                    className='absolute invisible right-2 top-10 group-hover:visible'
                    type='button'
                    onClick={() => {}}
                  >
                    <Tooltip
                      label='Check'
                      placement='bottom'
                      hasArrow
                      borderRadius='5px'
                      bg='#28A1FF'
                      shouldWrapChildren
                    >
                      <LinkImg />
                    </Tooltip>
                  </button>
                </Box>

                <Editable
                  mt={'12px'}
                  h={'19px'}
                  fontWeight={600}
                  fontSize={'sm'}
                  // isPreviewFocusable={false}
                  defaultValue='Screenshot name #4245983457937fs'
                >
                  <EditablePreview />
                  <EditableInput p={'0'} pl={'10px'} />
                </Editable>

                {/* footer */}
                <Box className='flex items-center justify-between mt-2'>
                  <Box className='flex items-center'>
                    <Camera />
                    <p className='ml-2 text-xs text-my-gray-color'>
                      21 feb 2022
                    </p>
                  </Box>
                  <Box className='flex items-center '>
                    <Box className='flex items-center'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Message />
                    </Box>
                    <Box className='flex items-center ml-[17px]'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Eye />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </li>
            <li className='w-[252px]'>
              <Box>
                {/* photo */}
                <Box className='group relative border-2 border-transparent rounded-[5px] hover:border-my-accent-color '>
                  <Box>
                    <Link href={`/screenshots/${1}`}>
                      <a>
                        <img
                          src='/img.jpg'
                          alt='img'
                          width='252'
                          height='183'
                        />
                      </a>
                    </Link>

                    <label
                      htmlFor='img'
                      className='invisible cursor-pointer group-hover:visible'
                    >
                      <Box
                        position={'absolute'}
                        top={'8px'}
                        left={'8px'}
                        h={'24px'}
                        w={'24px'}
                        borderRadius={'50%'}
                        backgroundColor={'#000'}
                      >
                        <Tooltip
                          label='Check'
                          placement='bottom'
                          hasArrow
                          bg='#28A1FF'
                          borderRadius='5px'
                          shouldWrapChildren
                        >
                          <Checkbox
                            _focus={{ boxShadow: 'transparent' }}
                            _hover={{ backgroundColor: 'transparent' }}
                            _active={{ backgroundColor: 'transparent' }}
                            size='sm'
                            top={'25%'}
                            left={'25%'}
                            id={'img'}
                            value={1}
                            checked={false}
                            onChange={handleChangeImg}
                          ></Checkbox>
                        </Tooltip>
                      </Box>
                    </label>
                  </Box>

                  {/*  */}

                  <div className='absolute invisible right-2 top-2 group-hover:visible'>
                    <MenuDropDown />
                  </div>
                  <button
                    className='absolute invisible right-2 top-10 group-hover:visible'
                    type='button'
                    onClick={() => {}}
                  >
                    <Tooltip
                      label='Check'
                      placement='bottom'
                      hasArrow
                      borderRadius='5px'
                      bg='#28A1FF'
                      shouldWrapChildren
                    >
                      <LinkImg />
                    </Tooltip>
                  </button>
                </Box>

                <Editable
                  mt={'12px'}
                  h={'19px'}
                  fontWeight={600}
                  fontSize={'sm'}
                  // isPreviewFocusable={false}
                  defaultValue='Screenshot name #4245983457937fs'
                >
                  <EditablePreview />
                  <EditableInput p={'0'} pl={'10px'} />
                </Editable>

                {/* footer */}
                <Box className='flex items-center justify-between mt-2'>
                  <Box className='flex items-center'>
                    <Camera />
                    <p className='ml-2 text-xs text-my-gray-color'>
                      21 feb 2022
                    </p>
                  </Box>
                  <Box className='flex items-center '>
                    <Box className='flex items-center'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Message />
                    </Box>
                    <Box className='flex items-center ml-[17px]'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Eye />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </li>
            <li className='w-[252px]'>
              <Box>
                {/* photo */}
                <Box className='group relative border-2 border-transparent rounded-[5px] hover:border-my-accent-color '>
                  <Box>
                    <Link href={`/screenshots/${1}`}>
                      <a>
                        <img
                          src='/img.jpg'
                          alt='img'
                          width='252'
                          height='183'
                        />
                      </a>
                    </Link>

                    <label
                      htmlFor='img'
                      className='invisible cursor-pointer group-hover:visible'
                    >
                      <Box
                        position={'absolute'}
                        top={'8px'}
                        left={'8px'}
                        h={'24px'}
                        w={'24px'}
                        borderRadius={'50%'}
                        backgroundColor={'#000'}
                      >
                        <Tooltip
                          label='Check'
                          placement='bottom'
                          hasArrow
                          borderRadius='5px'
                          bg='#28A1FF'
                          shouldWrapChildren
                        >
                          <Checkbox
                            _focus={{ boxShadow: 'transparent' }}
                            _hover={{ backgroundColor: 'transparent' }}
                            _active={{ backgroundColor: 'transparent' }}
                            size='sm'
                            top={'25%'}
                            left={'25%'}
                            id={'img'}
                            value={1}
                            checked={false}
                            onChange={handleChangeImg}
                          ></Checkbox>
                        </Tooltip>
                      </Box>
                    </label>
                  </Box>

                  {/*  */}

                  <div className='absolute invisible right-2 top-2 group-hover:visible'>
                    <MenuDropDown />
                  </div>
                  <button
                    className='absolute invisible right-2 top-10 group-hover:visible'
                    type='button'
                    onClick={() => {}}
                  >
                    <Tooltip
                      label='Check'
                      placement='bottom'
                      hasArrow
                      borderRadius='5px'
                      bg='#28A1FF'
                      shouldWrapChildren
                    >
                      <LinkImg />
                    </Tooltip>
                  </button>
                </Box>

                <Editable
                  mt={'12px'}
                  h={'19px'}
                  fontWeight={600}
                  fontSize={'sm'}
                  // isPreviewFocusable={false}
                  defaultValue='Screenshot name #4245983457937fs'
                >
                  <EditablePreview />
                  <EditableInput p={'0'} pl={'10px'} />
                </Editable>

                {/* footer */}
                <Box className='flex items-center justify-between mt-2'>
                  <Box className='flex items-center'>
                    <Camera />
                    <p className='ml-2 text-xs text-my-gray-color'>
                      21 feb 2022
                    </p>
                  </Box>
                  <Box className='flex items-center '>
                    <Box className='flex items-center'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Message />
                    </Box>
                    <Box className='flex items-center ml-[17px]'>
                      <span className='mr-2 text-xs text-my-gray-color'>0</span>
                      <Eye />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </li>
          </ul>
        </Box>
      </Box>
    </Layout>
  );
}

export default FoldersId;
