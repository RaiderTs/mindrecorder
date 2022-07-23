import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { Box, Slider, SliderTrack, SliderFilledTrack } from '@chakra-ui/react';

import Sidebar from './Sidebar';
import SearchPanel from '../components/Search/SearchIndex';
import Profile from '../components/Profile';

export default function Layout({ title, children, titlePage }) {
  const selected = useSelector((state) => {
    return state.sidebar.selected;
  });

  return (
    <>
      <Head>
        <title>{titlePage}</title>
      </Head>
      <Box className='relative flex h-full min-h-[100vh] '>
        <Sidebar />
        {/* To change the indentation of the footer, change  min-h-full to h-[100vh] */}
        <Box
          className={`overflow-x-hidden flex flex-col h-screen w-full transition-ml duration-700  ease-in-out ${
            selected ? 'ml-[67px]' : 'ml-[291px]'
          } `}
        >
          <Box className='px-[31px] pt-[42px] w-full  flex-auto'>
            <Box className='md:flex md:justify-between'>
              <h1 className='sm:text-center text-2xl font-bold leading-[33px]'>
                {title}
              </h1>
              <Box className='mx-4'>
                <SearchPanel />
              </Box>
              <Box className='flex w-[172px]'>
                <Box className='group mr-6 w-[100px] h-[41px] mt-[3px] gap-1 flex items-center flex-col justify-start'>
                  <Box position='relative'>
                    <p className='absolute visible group-hover:invisible'>
                      25/50
                    </p>
                    <button
                      onClick={() => Router.push('/subscription')}
                      className='invisible group-hover:visible text-my-accent-color'
                    >
                      Increase
                    </button>
                  </Box>

                  <Slider aria-label='slider-ex-1' isReadOnly defaultValue={50}>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                  </Slider>
                </Box>
                <Profile />
              </Box>
            </Box>
          </Box>
          {children}
        </Box>
      </Box>
    </>
  );
}
