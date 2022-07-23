import { useRouter } from 'next/router';
import { Box, Button } from '@chakra-ui/react';

import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Flag from '../../components/svg/flag.svg';
import Ellipse from '../../components/svg/ellipse.svg';

function Subscription({ premium, standart }) {
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

  return (
    <>
      <ul className='flex flex-wrap justify-between gap-6'>
        <li className='drop-shadow-lg group w-[344px] h-full px-[24px] pt-[51px] pb-[91px] border-[3px] border-my-border-sidebar-color rounded-[5px] hover:border-my-accent-color relative'>
          {/* <Flag className='absolute top-[-3px] right-[23px]  invisible group-hover:visible' /> */}
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            borderBottom='1px solid #E7E7E7'
            pb='56px'
          >
            <p className='text-[32px] font-semibold '>{t().free}</p>
            <p className='text-[32px] font-semibold '>$0</p>
            <Button
              width='193px'
              height='49px'
              mt='16px'
              disabled
              variant='ghost'
              border='1px solid #C4C4C4'
              borderRadius='5px'
            >
              <p className='text-lg'>{t().current_plan}</p>
            </Button>
            <p className='mt-[16px] text-center text-my-gray-color'>
              {t().get_25_additional_videos}
            </p>
          </Box>
          <Box mt='16px'>
            <p className='text-my-gray-color'>{t().screenshots}</p>
            <ul className='mt-2'>
              <li className='flex items-center justify-between'>
                <Ellipse fill=' #C4C4C4' />
                <p className='leading-[22px] ml-2'>
                  Donec tristique in libero id hendrerit.
                </p>
              </li>
              <li className='flex items-center justify-between'>
                <Ellipse fill=' #C4C4C4' />
                <p className='leading-[22px] mt-[13px] ml-2'>
                  Donec tristique in libero id hendrerit.
                </p>
              </li>
            </ul>
          </Box>
          <Box mt='16px'>
            <p className='text-my-gray-color'>{t().videos}</p>
            <ul className='mt-2'>
              <li className='flex items-center justify-between'>
                <Ellipse fill=' #C4C4C4' />
                <p className='leading-[22px] ml-2'>
                  Aenean maximus magna vitae libero <br /> porttitor consectetur
                </p>
              </li>
              <li className='flex items-center justify-between'>
                <Ellipse fill=' #C4C4C4' />
                <p className='leading-[22px] mt-[13px] ml-2 '>
                  Donec tristique in libero id hendrerit.
                </p>
              </li>
            </ul>
          </Box>
        </li>
        <li className='drop-shadow-lg group w-[344px] h-full px-[24px] pt-[16px] pb-[91px] border-[3px] border-my-border-sidebar-color rounded-[5px] hover:border-my-accent-color  relative'>
          <Flag className='absolute top-[-3px] right-[23px]  invisible group-hover:visible' />
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            borderBottom='1px solid #E7E7E7'
            pb='56px'
          >
            <p className='font-semibold'>{t().recommended}</p>
            <p className='text-[32px] font-semibold mt-4'>{t().premium}</p>
            <p className='text-[32px] font-semibold '>
              ${premium} /{t().user_subscription}
            </p>
            <Button
              width='193px'
              height='49px'
              mt='16px'
              borderRadius='5px'
              border='1px solid #28A1FF'
              bg='inherit'
              color='#28A1FF'
              _hover={{ bg: '#28A1FF', color: '#fff' }}
              _focus={{
                boxShadow: 'transparent',
              }}
              _active={{ bg: '#28A1FF', color: '#fff' }}
            >
              <p className='text-lg '>{t().active}</p>
            </Button>
            <p className='mt-[16px] text-my-gray-color text-center'>
              {t().pay_for_a_year}
            </p>
          </Box>
          <Box mt='16px'>
            <p className='text-my-gray-color'>{t().screenshots}</p>
            <ul className='mt-2'>
              <li className='flex items-center justify-between'>
                <Ellipse fill='#28A1FF' />
                <p className='leading-[22px] ml-2'>
                  Donec tristique in libero id hendrerit.
                </p>
              </li>
              <li className='flex items-center justify-between'>
                <Ellipse fill='#28A1FF' />
                <p className='leading-[22px] mt-[13px] ml-2'>
                  Donec tristique in libero id hendrerit.
                </p>
              </li>
            </ul>
          </Box>
          <Box mt='16px'>
            <p className='text-my-gray-color'>{t().videos}</p>
            <ul className='mt-2'>
              <li className='flex items-center justify-between'>
                <Ellipse fill='#28A1FF' />
                <p className='leading-[22px] ml-2'>
                  Aenean maximus magna vitae libero <br /> porttitor consectetur
                </p>
              </li>
              <li className='flex items-center justify-between'>
                <Ellipse fill='#28A1FF' />
                <p className='leading-[22px] mt-[13px] ml-2 '>
                  Donec tristique in libero id hendrerit.
                </p>
              </li>
            </ul>
          </Box>
        </li>
        <li className='drop-shadow-lg group w-[344px] h-full px-[24px] pt-[51px] pb-[91px] border-[3px] border-my-border-sidebar-color rounded-[5px] hover:border-my-accent-color relative'>
          {/* <Flag className='absolute top-[-3px] right-[23px]  invisible group-hover:visible' /> */}
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            borderBottom='1px solid #E7E7E7'
            pb='56px'
          >
            <p className='text-[32px] font-semibold '>{t().standart}</p>
            <p className='text-[32px] font-semibold '>
              ${standart} /{t().user_subscription}
            </p>
            <Button
              width='193px'
              height='49px'
              mt='16px'
              borderRadius='5px'
              border='1px solid #28A1FF'
              bg='inherit'
              color='#28A1FF'
              _hover={{ bg: '#28A1FF', color: '#fff' }}
              _focus={{
                boxShadow: 'transparent',
              }}
              _active={{ bg: '#28A1FF', color: '#fff' }}
            >
              <p className='text-lg '>{t().active}</p>
            </Button>

            <p className='mt-[16px] text-center text-my-gray-color '>
              {t().pay_for_a_year}
            </p>
          </Box>
          <Box mt='16px'>
            <p className='text-my-gray-color'>{t().screenshots}</p>
            <ul className='mt-2'>
              <li className='flex items-center justify-between'>
                <Ellipse fill='#28A1FF' />
                <p className='leading-[22px] ml-2'>
                  Donec tristique in libero id hendrerit.
                </p>
              </li>
              <li className='flex items-center justify-between'>
                <Ellipse fill='#28A1FF' />
                <p className='leading-[22px] mt-[13px] ml-2'>
                  Donec tristique in libero id hendrerit.
                </p>
              </li>
            </ul>
          </Box>
          <Box mt='16px'>
            <p className='text-my-gray-color'>{t().videos}</p>
            <ul className='mt-2'>
              <li className='flex items-center justify-between'>
                <Ellipse fill='#28A1FF' />
                <p className='leading-[22px] ml-2'>
                  Aenean maximus magna vitae libero <br /> porttitor consectetur
                </p>
              </li>
              <li className='flex items-center justify-between'>
                <Ellipse fill='#28A1FF' />
                <p className='leading-[22px] mt-[13px] ml-2 '>
                  Donec tristique in libero id hendrerit.
                </p>
              </li>
            </ul>
          </Box>
        </li>
      </ul>
    </>
  );
}

export default Subscription;
