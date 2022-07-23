import React from 'react';
import { useRouter } from 'next/router';
import { Box, Input, Switch, Checkbox } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';

import Layout from '../../components/Layout';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Hotmind from '../../components/svg/settings/hotmind.svg';
import Asana from '../../components/svg/settings/asana.svg';
import Slack from '../../components/svg/settings/slack.svg';
import SlackColor from '../../components/svg/settings/slack_color.svg';
import Trello from '../../components/svg/settings/trello.svg';
import TrelloColor from '../../components/svg/settings/trello_color.svg';
import Github from '../../components/svg/settings/git.svg';

function Settings() {
  const router = useRouter();
  const { locale } = router;

  const changeLanguage = (e) => {
    const locale = e.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  const t =
    locale === 'en-US'
      ? translationEn
      : locale === 'ru-RU'
      ? translationRu
      : locale === 'uk-UA'
      ? translationUa
      : '';

  const selectOptions = [
    { value: 'en-US', label: 'English' },
    { value: 'ru-RU', label: 'Русский' },
    { value: 'uk-UA', label: 'Українська' },
  ];

  const categoryTitle = [
    { id: 1, title: `${t().view_on_my_videos}` },
    { id: 2, title: `${t().new_comment_on_my_posts}` },
    { id: 3, title: `${t().new_answer_on_my_comment}` },
    { id: 4, title: `${t().someone_is_sharing_my_content}` },
    { id: 5, title: `${t().folder_updates}` },
  ];
  return (
    <Layout title={t().settings} titlePage={t().settings}>
      <Box className='px-[31px] w-full h-full flex-auto'>
        <Box w='75%' h='100%' mt='37px'>
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
                <p className='mt-8 font-semibold'>{t().language}</p>
                <Select
                  onChange={changeLanguage}
                  focusBorderColor='#28A1FF'
                  name='invite'
                  className='w-[100%] mt-2'
                  classNamePrefix='chakra-react-select'
                  options={selectOptions}
                  placeholder={`${t().select_language}`}
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

                <p className='mt-6 font-semibold'>{t().quick_save}</p>
                <Select
                  focusBorderColor='#28A1FF'
                  name='invite'
                  className='w-[100%] mt-2'
                  classNamePrefix='chakra-react-select'
                  // options={selectOptions}
                  placeholder='Cloud storage'
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

                <p className='mt-8 font-semibold'>{t().connect_account}</p>
                <Input
                  disabled
                  placeholder='examplemal@mail.com'
                  _placeholder={{ color: 'black' }}
                  marginTop='8px'
                  w='352px'
                  // position='absolute'
                  // left='-15px'
                />

                {/*  */}
                <ul className='mt-[25px]'>
                  <li className='flex items-center justify-between'>
                    <Box display='flex' alignItems='center'>
                      <Hotmind />
                      <p className='ml-2 text-my-gray-color'>Hotmind</p>
                    </Box>
                    <Switch size='md' colorScheme='brand' />
                  </li>

                  <li className='flex items-center justify-between mt-[26px]'>
                    <Box display='flex' alignItems='center'>
                      <Asana />
                      <p className='ml-2 text-my-gray-color'>Asana</p>
                    </Box>
                    <Switch size='md' colorScheme='brand' />
                  </li>

                  <li className='flex items-center justify-between mt-[26px]'>
                    <Box display='flex' alignItems='center'>
                      <Slack />
                      <p className='ml-2 text-my-gray-color'>Slack</p>
                    </Box>
                    <p className='text-my-accent-color'>Pro</p>
                  </li>

                  <li className='flex items-center justify-between mt-[26px]'>
                    <Box display='flex' alignItems='center'>
                      <Trello />
                      <p className='ml-2 text-my-gray-color'>Trello</p>
                    </Box>
                    <p className='text-my-accent-color'>Pro</p>
                  </li>

                  <li className='flex items-center justify-between mt-[26px]'>
                    <Box display='flex' alignItems='center'>
                      <Github />
                      <p className='ml-2 text-my-gray-color'>Github</p>
                    </Box>
                    <p className='text-my-accent-color'>Pro</p>
                  </li>
                </ul>
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
                  {t().notifications}
                </p>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  mt='32px'
                >
                  <p className='font-semibold'>{t().email_notifications}</p>
                  <Switch size='md' colorScheme='brand' />
                </Box>
                <p className='text-my-gray-color'>
                  {t().email_notifications_sub}
                </p>
                <p className='mt-8 font-semibold'>
                  {t().category_notification}
                </p>
                <ul>
                  {categoryTitle.map(({ id, title }) => (
                    <li
                      className='flex items-center justify-between mt-4'
                      key={id}
                    >
                      <p>{title}</p>
                      <Checkbox
                        _focus={'boxShadow: none'}
                        borderColor='#747474'
                        size='lg'
                        id={id}
                        colorScheme='brand'
                        // value={1}
                        checked={false}
                        // onChange={handleChangeImg}
                      />
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Settings;
