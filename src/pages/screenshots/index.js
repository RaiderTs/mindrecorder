import { useState, useEffect, useMemo } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {
  Checkbox,
  Tooltip,
  Icon,
  Box,
  Editable,
  EditableInput,
  EditablePreview,
} from '@chakra-ui/react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Select, chakraComponents } from 'chakra-react-select';
import { useSelector } from 'react-redux';
import NProgress from 'nprogress';

import Aos from 'aos';
import 'aos/dist/aos.css';

import Layout from '../../components/Layout';
import MenuDropDown from '../../components/MenuDropDown';
import SelectedPanel from '../../components/Screenshots/SelectedPanel';
import { useGetMediaQuery } from '../../features/mrQuery';
import { authSelectors } from '../../features/auth';
import preloaderMarkup from '../../components/helpers/preloader';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Navigation from '../../components/svg/navigation.svg';
import Camera from '../../components/svg/screenshot/camera.svg';
import Message from '../../components/svg/screenshot/message.svg';
import Eye from '../../components/svg/screenshot/eye.svg';
import LinkImg from '../../components/svg/screenshot/link.svg';

function Screenshots() {
  const [isSelected, setIsSelected] = useState([]);
  const [sort, setSort] = useState('default');

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const selected = useSelector((state) => {
    return state.sidebar.selected;
  });

  const router = useRouter();
  const { locale } = router;

  const {
    data = [],
    error,
    refetch,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetMediaQuery();

  // animation
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) Router.push('/sign-in');
  }, [isLoggedIn]);

  if (isLoading) NProgress.start();
  if (!isLoading) NProgress.done();
  if (isError) NProgress.done();

  const { media } = data?.data || [];

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  const handleChange = (e, item) => {
    if (e.target.checked) {
      setIsSelected([...isSelected, item]);
    } else {
      setIsSelected(isSelected.filter((itemMedia) => itemMedia.id !== item.id));
    }
  };

  console.log(isSelected);

  const selectOptions = [
    { value: 'name', label: `${t().name}` },
    { value: 'date', label: `${t().date}` },
  ];

  const onClosePanel = () => {
    setIsSelected([]);
  };

  const customIconSelect = {
    DropdownIndicator: (props) => (
      <chakraComponents.DropdownIndicator {...props}>
        <Icon as={Navigation} />
      </chakraComponents.DropdownIndicator>
    ),
  };

  const handleOnError = (e) => {
    e.target.src = '/defaultIcon1.png';
  };

  const selectPlaceholder = `${t().sort}`;
  const widthSelect = () =>
    selectPlaceholder.length === 11
      ? +150
      : selectPlaceholder.length === 9
      ? +87
      : selectPlaceholder.length === 4
      ? +100
      : 0;

  const customStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      bg: 'transparent',
      // px: 2,
      pt: '15px',
      cursor: 'inherit',
      // px: state.selectProps.menuIsOpen && 2,
      // transform: state.selectProps.menuIsOpen
      //   ? 'rotate(180deg)'
      //   : 'rotate(0deg)',
      // transition: state.selectProps.menuIsOpen
      //   ? 'all 0.4s ease-in-out'
      //   : 'all 0.4s ease-in-out',
      // transformOrigin: 'center',
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
      width: `${widthSelect()}px`,
    }),
    menu: (provided) => ({
      ...provided,
      width: '230px',
    }),
  };

  //  sort
  const sortedMedia = useMemo(() => {
    const filteredMedia = () => {
      const filteredMediaArr = [];
      media?.map((item) => {
        if (item?.type === 'IMAGE') {
          filteredMediaArr.push(item);
        }
      });
      return filteredMediaArr;
    };

    const sortedMedia = [].concat(filteredMedia());
    switch (sort) {
      case 'name':
        return sortedMedia.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sortedMedia;
    }
  }, [media, sort]);

  const handleSortChange = (e) => {
    setSort(e.value);
  };

  const styleNotifix = {
    backgroundColor: 'red',
  };

  return (
    <Layout title={t().screenshots} titlePage={t().screenshots}>
      <Box className='px-[31px] w-full h-full flex-auto '>
        {isSelected.length > 0 && (
          <Box
            className=' mb-[38px]'
            position='fixed'
            bottom='0'
            w='83%'
            zIndex='1'
          >
            <SelectedPanel
              fileslength={isSelected.length}
              onClose={onClosePanel}
              isSelected={isSelected}
            />
          </Box>
        )}
        <Select
          onChange={handleSortChange}
          focusBorderColor='none'
          mt='28px'
          name='sort'
          components={customIconSelect}
          display='inline-block'
          classNamePrefix='chakra-react-select'
          options={selectOptions}
          placeholder={selectPlaceholder}
          selectedOptionStyle='check'
          chakraStyles={customStyles}
        />
        {/* General markup */}
        <Box className='mt-6'>
          <ul
            className={`flex flex-wrap gap-6 ${
              !selected ? 'max-w-[1360px]' : 'max-w-[1635px] duration-200'
            }  m-auto`}
          >
            {isLoading && preloaderMarkup}

            {/* {!isError &&
              Notify.failure('Something went wrong. Please reload this page', {
                borderRadius: '5px',
                backOverlay: true,
              })} */}
            {media &&
              sortedMedia?.map((item) => (
                <li
                  // data-aos='zoom-out'
                  className='w-[252px]'
                  key={item?.id}
                >
                  <Box>
                    {/* photo */}
                    <Box
                      className={`group relative  border-[3px]  rounded-[5px] hover:border-my-accent-color 
                      ${
                        isSelected.find(
                          (itemMedia) => itemMedia.id === item.id
                        ) && 'border-my-accent-color'
                      }
                    `}
                    >
                      <Box>
                        <Link href={`/screenshots/${item?.id}`}>
                          <a>
                            <img
                              className='h-[183px] w-[252px]'
                              src={item?.publicUrl}
                              onError={handleOnError}
                              alt='img'
                              width='252'
                              height='183'
                            />
                          </a>
                        </Link>
                        <label
                          htmlFor='img'
                          className={`cursor-pointer group-hover:visible ${
                            isSelected.find(
                              (itemMedia) => itemMedia.id === item.id
                            )
                              ? 'visible'
                              : 'invisible'
                          }`}
                        >
                          <Box
                            position={'absolute'}
                            top={'8px'}
                            left={'8px'}
                            h={'24px'}
                            w={'24px'}
                            borderRadius={'50%'}
                            // backgroundColor={'#000'}
                            className={` cursor-pointer  ${
                              isSelected.find(
                                (itemMedia) => itemMedia.id === item.id
                              )
                                ? 'bg-transparent'
                                : 'bg-[#000]'
                            }`}
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
                                size={
                                  isSelected.find(
                                    (itemMedia) => itemMedia.id === item.id
                                  )
                                    ? 'md'
                                    : 'sm'
                                }
                                top={'23.5%'}
                                left={'25%'}
                                id={item?.id}
                                name={item?.name}
                                colorScheme='brand'
                                // value={1}
                                checked={isSelected?.forEach(
                                  (itemMedia) => itemMedia.id === item.id
                                )}
                                isChecked={isSelected?.forEach(
                                  (itemMedia) => itemMedia.id === item.id
                                )}
                                onChange={(e) => handleChange(e, item)}
                              ></Checkbox>
                            </Tooltip>
                          </Box>
                        </label>
                      </Box>

                      <div className='absolute invisible right-2 top-2 group-hover:visible'>
                        <MenuDropDown id={item?.id} />
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
                      defaultValue={item?.name}
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
                          <span className='mr-2 text-xs text-my-gray-color'>
                            0
                          </span>
                          <Message />
                        </Box>
                        <Box className='flex items-center ml-[17px]'>
                          <span className='mr-2 text-xs text-my-gray-color'>
                            0
                          </span>
                          <Eye />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </li>
              ))}
          </ul>
        </Box>
      </Box>
    </Layout>
  );
}

export default Screenshots;
// 1635
