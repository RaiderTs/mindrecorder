import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useGetMediaQuery } from '../../features/mrQuery';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import Downshift from 'downshift';
import NProgress from 'nprogress';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';
import useDebounce from '../../components/hooks/useDebounce';

import Search from '../../components/svg/search.svg';

export default function SearchIndex() {
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 1000);
  const {
    data = [],
    error,
    refetch,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetMediaQuery();

  const { media } = data?.data || [];

  const searchMedia = (searchTerm) => {
    const searchResult = media?.filter((itemMedia) => {
      return itemMedia.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return !searchTerm ? [] : searchResult;
  };

  const searchQuery = searchMedia(debouncedSearchTerm);

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

  const handleSearch = (e) => {
    // e.target.value && getMedia();
    const query = e.target.value;
    setQuery(query);
  };

  if (isLoading) {
    NProgress.start();
  } else NProgress.done();

  const handleOnError = (e) => {
    e.target.src = '/defaultIcon1.png';
  };

  const getHighlightedText = (title = '', textToSearch = '') => {
    if (!textToSearch.trim()) {
      return <span>{title}</span>;
    }
    const regex = new RegExp(`(${textToSearch})`, 'gi');
    const parts = title.split(regex);
    return (
      <span>
        {parts.filter(String).map((part, i) => {
          return regex.test(part) ? (
            <b key={i}>{part}</b>
          ) : (
            <span key={i}>{part}</span>
          );
        })}
      </span>
    );
  };

  return (
    <Downshift
      id='Screenshot-switcher'
      itemToString={(item) => (item ? item.name : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
        itemCount,
      }) => (
        <div className='relative mx-auto text-gray-600 '>
          <div
            className='max-w-[528px]'
            {...getRootProps({}, { suppressRefError: true })}
          >
            <InputGroup size='sm'>
              <InputLeftElement pointerEvents='none' top={'15%'} left={'7px'}>
                <Search />
              </InputLeftElement>
              <Input
                {...getInputProps({
                  type: 'text',
                  pl: '40px',
                  h: '41px',
                  minWidth: '528px',
                  borderRadius: '5px',
                  onChange: handleSearch,
                  placeholder: `${t().search}`,
                  border: '1px',
                  borderColor: '#E7E7E7',
                  _focus: { boxShadow: 'transparent' },
                  name: 'search',
                })}
              />
            </InputGroup>
          </div>
          <ul
            {...getMenuProps({
              style: {
                borderRadius: '5px',
              },
              className: 'absolute z-10 w-full mt-2 bg-red shadow-2xl ',
            })}
          >
            {isOpen
              ? searchQuery &&
                searchQuery.map((item, index) => (
                  <li
                    key={item.id}
                    {...getItemProps({
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',

                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                      className: 'p-[16px] hover:bg-[#F5F5F5]',
                    })}
                  >
                    <Link href={`/screenshots/${item.id}`}>
                      <a>
                        <div className='flex items-center gap-[8px]'>
                          <div className='w-[16px] h-[16px] '>
                            <img
                              src='/camera.svg'
                              alt={item.name}
                              width={16}
                              onError={handleOnError}
                            />
                          </div>
                          <span className='pb-[3px]'>
                            {getHighlightedText(item.name, query)}
                          </span>
                        </div>
                      </a>
                    </Link>
                  </li>
                ))
              : null}
            {/*
            {searchQuery?.length === 0 && inputValue && (
              <div className=' p-4 text-[red] rounded-md text-center bg-[#E7E7E7]'>
                Unfortunately we couldn&#39;t find anything
              </div>
            )} */}
          </ul>
        </div>
      )}
    </Downshift>
  );
}
