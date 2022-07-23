import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';

import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Share from '../../components/svg/screenshot/share.svg';
import Gmail from '../../components/svg/screenshot/gmailColor.svg';
import Skype from '../../components/svg/screenshot/skypeColor.svg';
import Viber from '../../components/svg/screenshot/viberColor.svg';
import Telegram from '../../components/svg/screenshot/telegramColor.svg';
import CopyLink from '../../components/svg/screenshot/linkCopy.svg';
import Arrows from '../../components/svg/screenshot/arrows.svg';

function SharedModal({ isOpen, onClose }) {
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p='24px 32px 19px 32px' h='600px' maxW='715px'>
          <ModalHeader p={'0'}>
            <Box display='flex' alignItems='center'>
              <Share />
              <h3 className='pl-[11px]'>{t().shared}</h3>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={'0'} mt='32px'>
            <p className='font-semibold'>{t().send_by_email}</p>
            <Box display='flex' alignItems='center' mt='16px'>
              <Input placeholder={`${t().email_comma_separated}`} w={'480px'} />
              <Button w='160px' h='41px' ml='8px' color='#C4C4C4' bg='#E7E7E7'>
                {t().send}
              </Button>
            </Box>
            <Box className='mt-9'>
              <Box className='flex items-center justify-between'>
                <Box display='flex' alignItems='center'>
                  <Gmail />
                  <p className='ml-[25px] text-lg'>Gmail</p>
                </Box>
                <Button
                  w='160px'
                  h='41px'
                  ml='8px'
                  color='#C4C4C4'
                  bg='transparent'
                >
                  {t().shared}
                </Button>
              </Box>

              <Box className='flex items-center justify-between mt-[49px]'>
                <Box display='flex' alignItems='center'>
                  <Skype />
                  <p className='ml-[25px] text-lg'>Skype</p>
                </Box>
                <Button
                  w='160px'
                  h='41px'
                  ml='8px'
                  color='#C4C4C4'
                  bg='transparent'
                >
                  {t().shared}
                </Button>
              </Box>

              <Box className='flex items-center justify-between  mt-[49px]'>
                <Box display='flex' alignItems='center'>
                  <Viber />
                  <p className='ml-[25px] text-lg'>Viber</p>
                </Box>
                <Button
                  w='160px'
                  h='41px'
                  ml='8px'
                  color='#C4C4C4'
                  bg='transparent'
                >
                  {t().shared}
                </Button>
              </Box>

              <Box className='flex items-center justify-between mt-[49px]'>
                <Box display='flex' alignItems='center'>
                  <Telegram />
                  <p className='ml-[25px] text-lg'>Telegram</p>
                </Box>
                <Button
                  w='160px'
                  h='41px'
                  ml='8px'
                  color='#C4C4C4'
                  bg='transparent'
                >
                  {t().shared}
                </Button>
              </Box>

              <Box display='flex' alignItems='center' mt='51px'>
                <Box display='flex' alignItems='center' cursor='pointer'>
                  <CopyLink />
                  <p className='text-my-accent-color ml-[9px]'>
                    {t().copy_link}
                  </p>
                </Box>
                <Box
                  display='flex'
                  alignItems='center'
                  cursor='pointer'
                  ml='25px'
                >
                  <Arrows />
                  <p className='text-my-accent-color ml-[9px]'>
                    {t().get_embed_code}
                  </p>
                </Box>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SharedModal;
