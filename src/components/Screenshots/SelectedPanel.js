import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Download from '../svg/screenshot/download.svg';
import Share from '../svg/screenshot/share.svg';
import Move from '../svg/screenshot/move.svg';
import Trash from '../svg/screenshot/trash.svg';

function SelectedPanel({ fileslength, onClose }) {
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
      <Box
        h={'48px'}
        w={'100%'}
        bg={'#28A1FF'}
        borderRadius={'5px'}
        color={'white'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'12px 24px'}
      >
        <p>
          {`${t().selected_files}`}: {fileslength}
        </p>
        <Box
          display={'flex'}
          w={'195px'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <button>
            <Download className=' hover:stroke-my-border-color' />
          </button>

          <button>
            <Share className=' hover:stroke-my-border-color' />
          </button>

          <button>
            <Move className=' hover:stroke-my-border-color' />
          </button>

          <button>
            <Trash className=' hover:stroke-my-border-color' />
          </button>

          <button onClick={onClose}>{t().cancel}</button>
        </Box>
      </Box>
    </>
  );
}

export default SelectedPanel;
