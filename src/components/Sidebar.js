import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  VisuallyHidden,
  Box,
  Button,
  useDisclosure,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  Tooltip,
  useColorMode,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';

import { useGetListOfWorkspacesQuery } from '../features/mrQuery';
import { toggleSidebar } from '../features/sidebarSlice';
import NewWorkspaceModal from '../components/Workspace/NewWorkspaceModal';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Screenshots from './svg/screenshots.svg';
import Videos from './svg/videos.svg';
import Trash from './svg/trash.svg';
import Settings from './svg/settings.svg';
import Plus from './svg/plus.svg';
import CloudSync from './svg/cloudSync.svg';
import Logo from './svg/logo.svg';
import Folder from './svg/screenshot/move-sidebar.svg';
import Navigation from './svg/navigation.svg';

function Sidebar() {
  // const [toggleSidebar, setToggleSidebar] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname, locale } = useRouter();

  const { data = [], isLoading, isError } = useGetListOfWorkspacesQuery();

  const { workspaces } = data?.data || [];

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  const dispatch = useDispatch();
  const selected = useSelector((state) => {
    return state.sidebar.selected;
  });
  // array for loader
  const loaderArr = new Array(3).fill(0);

  return (
    <>
      <Box
        as='aside'
        className={`fixed bg-my-sidebar-color transition-[width] duration-700 ease-in-out shadow-2xl  border-r-[5px] border-my-border-sidebar-color  min-h-[100vh]          
          flex items-center flex-col  ${selected ? 'w-[72px]' : ' w-[296px] '}`}
      >
        <Box
          className='pt-[45px] cursor-pointer'
          // onClick={() => setToggleSidebar(!toggleSidebar)}
          onClick={() => dispatch(toggleSidebar())}
        >
          {/* <Link href='/screenshots'>
            <a> */}
          <Box display='flex' alignItems='center'>
            <Logo />
            <h1
              className={
                'uppercase  ml-3 font-bold text-my-accent-color leading-[22px] text-sm transition-opacity ease-in cursor-pointer ' +
                (selected
                  ? 'opacity-0 absolute right-[100%]'
                  : 'delay-200 opacity-1 ')
              }
            >
              MindRecorder
            </h1>
          </Box>
          {/* </a>
          </Link> */}
        </Box>
        <Box
          className={`  h-[297px] w-full border-b-[1px] border-b-my-border-sidebar-color pb-20 ${
            selected ? 'pl-[0px] ' : ' pl-[34px]'
          }`}
        >
          <ul className='mt-10 '>
            <li
              className={`${
                pathname === '/screenshots'
                  ? 'text-my-accent-color  '
                  : 'text-my-sidebar-text-color'
              } text-lg    hover:text-my-accent-color `}
            >
              <Link href='/screenshots'>
                <a
                  className={`flex items-center ${
                    selected && 'justify-center'
                  }`}
                >
                  <Tooltip
                    label={`${t().screenshots}`}
                    borderRadius='5px'
                    placement='right'
                    hasArrow
                    bg='#28A1FF'
                    shouldWrapChildren
                    isDisabled={!selected}
                  >
                    <Screenshots />
                  </Tooltip>

                  <span
                    className={
                      'ml-5  transition-opacity ease-in cursor-pointer  ' +
                      (selected
                        ? 'opacity-0 absolute right-[100%]'
                        : 'delay-200 opacity-1 ')
                    }
                  >
                    {t().screenshots}
                  </span>
                </a>
              </Link>
            </li>
            <li
              className={`${
                pathname === '/videos'
                  ? 'text-my-accent-color'
                  : 'text-my-sidebar-text-color'
              } text-lg    hover:text-my-accent-color mt-6`}
            >
              <Link href='/videos'>
                <a
                  className={`flex items-center ${
                    selected && 'justify-center'
                  }`}
                >
                  <Tooltip
                    label={`${t().videos}`}
                    borderRadius='5px'
                    placement='right'
                    hasArrow
                    bg='#28A1FF'
                    shouldWrapChildren
                    isDisabled={!selected}
                  >
                    <Videos />
                  </Tooltip>
                  <span
                    className={
                      'ml-5  transition-opacity ease-in cursor-pointer ' +
                      (selected
                        ? 'opacity-0 absolute right-[100%]'
                        : 'delay-200 opacity-1 ')
                    }
                  >
                    {t().videos}
                  </span>
                </a>
              </Link>
            </li>
            <li
              className={`${
                pathname === '/trash'
                  ? 'text-my-accent-color'
                  : 'text-my-sidebar-text-color'
              } text-lg  hover:text-my-accent-color mt-6`}
            >
              <Link href='/trash'>
                <a
                  className={`flex items-center ${
                    selected && 'justify-center'
                  }`}
                >
                  <Tooltip
                    label={`${t().trash}`}
                    borderRadius='5px'
                    placement='right'
                    hasArrow
                    bg='#28A1FF'
                    shouldWrapChildren
                    isDisabled={!selected}
                  >
                    <Trash />
                  </Tooltip>
                  <span
                    className={
                      'ml-5 transition-opacity ease-in cursor-pointer ' +
                      (selected
                        ? 'opacity-0 absolute right-[100%]'
                        : 'delay-200 opacity-1 ')
                    }
                  >
                    {t().trash}
                  </span>
                </a>
              </Link>
            </li>
            <li
              className={`${
                pathname === '/settings'
                  ? 'text-my-accent-color'
                  : 'text-my-sidebar-text-color'
              } text-lg   hover:text-my-accent-color mt-6`}
            >
              <Link href='/settings'>
                <a
                  className={`flex items-center ${
                    selected && 'justify-center'
                  }`}
                >
                  <Tooltip
                    label={`${t().settings}`}
                    borderRadius='5px'
                    placement='right'
                    hasArrow
                    bg='#28A1FF'
                    shouldWrapChildren
                    isDisabled={!selected}
                  >
                    <Settings />
                  </Tooltip>
                  <span
                    className={
                      'ml-5  transition-opacity ease-in cursor-pointer  ' +
                      (selected
                        ? 'opacity-0 absolute right-[100%]'
                        : 'delay-200 opacity-1 ')
                    }
                  >
                    {t().settings}
                  </span>
                </a>
              </Link>
            </li>
          </ul>
        </Box>
        <Box
          className={` w-full pt-6 border-b-[1px] border-b-my-border-sidebar-color  ${
            selected ? 'pl-[0px] pb-[200px]' : ' pb-[40px]'
          }`}
        >
          <Box
            className={`pl-[34px] ${selected && 'h-0'} h-6`}
            fontSize='14px'
            lineHeight='19px'
          >
            <p
              className={
                'text-sm transition-opacity ease-in  text-my-gray-color ' +
                (selected
                  ? 'opacity-0 absolute right-[100%]'
                  : 'delay-200 opacity-1 ')
              }
            >
              {t().workspace}
            </p>
          </Box>

          <ul className='max-h-[150px] hover:overflow-y-scroll overflow-hidden w-full'>
            {isLoading &&
              loaderArr.map(() => {
                return (
                  <>
                    <Box
                      display='flex'
                      alignItems='center'
                      ml={!selected ? '24px' : '6px'}
                      mt='21px'
                    >
                      <Skeleton
                        height='24px'
                        width='24px'
                        ml='16px'
                        borderRadius='5px'
                      />

                      {!selected && (
                        <Skeleton height='21px' width='175px' ml='16px' />
                      )}
                    </Box>
                  </>
                );
              })}
            {workspaces &&
              workspaces?.map((itemWorkspace) => {
                return (
                  <li className='mt-2' key={itemWorkspace?.id}>
                    <Box
                      className={`relative group flex w-full h-full items-center hover:bg-my-border-sidebar-color ${
                        selected && 'justify-center pl-[0] '
                      }  ${
                        pathname === `/workspace/${itemWorkspace.id}` &&
                        'bg-my-border-sidebar-color'
                      }`}
                    >
                      <Accordion
                        allowToggle
                        borderColor='transparent'
                        width='230px'
                      >
                        <AccordionItem>
                          {({ isExpanded }) => (
                            <>
                              <AccordionButton
                                paddingLeft={selected ? '16px' : '7px'}
                                _focus={{ boxShadow: 'transparent' }}
                                _hover={{ background: 'transparent' }}
                                _active={{ background: 'transparent' }}
                                // onClick={() => console.log('click')}
                              >
                                {itemWorkspace?.folders?.length !== 0 ? (
                                  isExpanded ? (
                                    <Box
                                      color='#747474'
                                      marginRight='11px'
                                      ml='6px'
                                      className={`duration-300 ease-linear rotate-180 ${
                                        selected && 'hidden'
                                      }`}
                                    >
                                      <Navigation />
                                    </Box>
                                  ) : (
                                    <Box
                                      color='#747474'
                                      marginRight='11px'
                                      ml='6px'
                                      className={`duration-300 ease-linear rotate-0 ${
                                        selected && 'hidden'
                                      }`}
                                    >
                                      <Navigation />
                                    </Box>
                                  )
                                ) : null}
                                <Box
                                  flex='1'
                                  textAlign='left'
                                  ml={
                                    itemWorkspace?.folders?.length === 0 &&
                                    !selected
                                      ? '34px'
                                      : selected
                                      ? '0px'
                                      : '7px'
                                  }
                                >
                                  <Link href={`/workspace/${itemWorkspace.id}`}>
                                    <a
                                      // ${selected && 'h-0'} h-6
                                      className={`flex items-center ${
                                        selected && 'justify-center '
                                      }`}
                                    >
                                      <Tooltip
                                        label='Pinta'
                                        borderRadius='5px'
                                        placement='right'
                                        hasArrow
                                        bg='#58C7DA'
                                        shouldWrapChildren
                                        isDisabled={!selected}
                                      >
                                        <Box
                                          background={
                                            itemWorkspace?.color?.hex
                                              ? itemWorkspace?.color?.hex.toString()
                                              : 'bg-[#58C7DA]'
                                          }
                                          className={`w-6 h-6 rounded-[5px]  mr-[18px] ${
                                            selected ? 'mr-0' : 'mr-[18px]'
                                          }`}
                                        >
                                          <span className='text-[#fff] flex items-center justify-center'>
                                            {itemWorkspace?.name
                                              ?.charAt(0)
                                              .toUpperCase()}
                                          </span>
                                        </Box>
                                      </Tooltip>
                                      <p
                                        className={
                                          ' transition-opacity ease-in cursor-pointer ' +
                                          (selected
                                            ? 'opacity-0 absolute right-[100%]'
                                            : 'delay-[350ms] opacity-1 ')
                                        }
                                      >
                                        {itemWorkspace?.name}
                                      </p>
                                      <button
                                        onClick={onOpen}
                                        className={`absolute right-[15px]  invisible group-hover:visible  h-9 w-9 flex items-center justify-center ${
                                          selected && 'hidden'
                                        }`}
                                      >
                                        <Plus fill='#747474' />
                                      </button>
                                    </a>
                                  </Link>
                                </Box>
                              </AccordionButton>

                              <AccordionPanel pb={4}>
                                <ul
                                  // className={`ml-[42px] pl-[34px] ${toggleSidebar && 'hidden'}`}
                                  className={
                                    'transition-opacity ease-in cursor-pointer ' +
                                    (selected
                                      ? 'opacity-0 absolute right-[100%]'
                                      : 'delay-300 opacity-1 ')
                                  }
                                >
                                  {itemWorkspace?.folders?.length !== 0 &&
                                    itemWorkspace?.folders?.map((folder) => (
                                      <li
                                        key={folder.id}
                                        className={`hover:bg-my-border-sidebar-color    flex w-full h-10 pl-[25px]  items-center  ${
                                          pathname ===
                                            `/workspace/${itemWorkspace.id}/folder/${folder.id}` &&
                                          'bg-my-border-sidebar-color'
                                        }`}
                                      >
                                        {/* {console.log(folder)} */}
                                        <Link
                                          href={`/workspace/${itemWorkspace.id}/folder/${folder.id}`}
                                        >
                                          <a className='flex items-center'>
                                            <Box marginRight='18px'>
                                              <Folder />
                                            </Box>
                                            Folder 1
                                          </a>
                                        </Link>
                                      </li>
                                    ))}
                                </ul>
                              </AccordionPanel>
                            </>
                          )}
                        </AccordionItem>
                      </Accordion>
                    </Box>
                  </li>
                );
              })}
          </ul>

          <div
            className={`mt-[16px]  ${
              selected
                ? 'mt-[30px] flex items-center justify-center '
                : 'mt-[16px] pl-[34px]'
            }`}
          >
            <Tooltip
              label={`${t().new_workspace}`}
              borderRadius='5px'
              placement='right'
              hasArrow
              bg='#28A1FF'
              shouldWrapChildren
              isDisabled={!selected}
            >
              <Button
                onClick={onOpen}
                bg='none'
                h='0'
                _focus={{ boxShadow: 'transparent' }}
                _hover={{ backgroundColor: 'transparent' }}
                _active={{ backgroundColor: 'transparent' }}
                className='text-lg text-my-accent-color'
                p='0'
              >
                <Plus fill='#28A1FF' />
                <span
                  className={
                    'ml-[13px] transition-opacity ease-in cursor-pointer ' +
                    (selected
                      ? 'opacity-0 absolute right-[400%]'
                      : 'delay-200 opacity-1 ')
                  }
                >
                  {t().new_workspace}
                </span>
              </Button>
            </Tooltip>
            <NewWorkspaceModal isOpen={isOpen} onClose={onClose} />
          </div>
        </Box>
        <Box
          className={`pt-8  w-full  ${
            selected
              ? 'p-0 flex items-center justify-center'
              : 'pl-[34px] pr-[30px]'
          }`}
        >
          <div
            className={`flex ${selected && 'cursor-pointer'} `}
            onClick={() => Router.push('/subscription')}
          >
            <Tooltip
              label={`${t().storage}`}
              borderRadius='5px'
              placement='right'
              hasArrow
              bg='#28A1FF'
              shouldWrapChildren
              isDisabled={!selected}
            >
              <CloudSync className={` ${selected ? 'mr-0 ' : 'mr-4'}`} />
            </Tooltip>
            <p className={`text-my-gray-color ${selected && 'hidden'}`}>
              {t().storage}
            </p>
          </div>
          <Box className={` ${selected && 'hidden'}`}>
            <RangeSlider isReadOnly defaultValue={[0, 50]}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
            </RangeSlider>

            <p
              className={
                ' mt-2 text-sm text-my-gray-color transition-opacity ease-in ' +
                (selected
                  ? 'opacity-0 absolute right-[100%]'
                  : 'delay-500 opacity-1 ')
              }
            >
              {t(25, 50).used}
            </p>

            {/*  */}
            <Button
              bg='none'
              borderRadius='5px'
              _focus={{ boxShadow: 'transparent' }}
              _active={{ backgroundColor: 'transparent' }}
              w='200px'
              h='49px'
              // p='12px 81px'
              className='mt-[25px] border border-my-accent-color mb-[76px]'
              onClick={() => Router.push('/subscription')}
            >
              <span className='text-lg text-my-accent-color '>
                {t().increase}
              </span>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Sidebar;
