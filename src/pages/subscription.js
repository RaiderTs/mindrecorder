import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { Text, Box } from '@chakra-ui/react';

import Layout from '../components/Layout';
import Subscription from '../components/Subscription';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

function Screenshots() {
  const [monthlyCheck, setMonthlyCheck] = useState(true);
  const [annualCheck, setAnnualCheck] = useState(false);

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

  const togglePlanChange = () => {
    if (monthlyCheck) {
      setMonthlyCheck(false);
      setAnnualCheck(true);
    } else {
      setMonthlyCheck(true);
      setAnnualCheck(false);
    }
  };

  return (
    <Layout
      title={`${t().subscription_plan}`}
      titlePage={`${t().subscription_plan}`}
    >
      <Box className='px-[31px] w-full h-full flex-auto'>
        <Text textAlign='center' fontSize='24px' lineHeight='33px' mt='36px'>
          {t().choose_plan}
        </Text>
        <Box mt='24px'>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <Box className='flex items-center justify-between w-[155px] h-[40px]  border-my-border-color '>
              <Box
                as='button'
                className={` ${
                  monthlyCheck && 'border-b-2 border-my-accent-color h-[100%] '
                }`}
                onClick={() => {
                  togglePlanChange();
                }}
              >
                <Box as='span' fontSize='18px' lineHeight='25px'>
                  {t().monthly}
                </Box>
              </Box>
              <Box
                as='button'
                className={` ${
                  annualCheck && 'border-b-2 border-my-accent-color h-[100%]'
                }`}
                onClick={() => {
                  togglePlanChange();
                }}
              >
                <Box as='span' fontSize='18px' lineHeight='25px'>
                  {t().annual}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box maxWidth='1080px' margin='auto' mt='24px'>
            {monthlyCheck && <Subscription premium={8} standart={6} />}
            {annualCheck && <Subscription premium={16} standart={12} />}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export default Screenshots;
