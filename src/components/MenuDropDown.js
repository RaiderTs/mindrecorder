import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  ButtonGroup,
  IconButton,
  // useDisclosure,
  useEditableControls,
  Flex,
} from '@chakra-ui/react';

import MoveModal from './Screenshots/MoveModal';
import SharedModal from './Screenshots/SharedModal';
import DeleteModal from './Screenshots/DeleteModal';
import translationRu from '/locales/ru';
import translationEn from '/locales/en';
import translationUa from '/locales/ua';

import Dots from '../components/svg/screenshot/dots.svg';
import Shared from '../components/svg/screenshot/share.svg';
import Download from '../components/svg/screenshot/download.svg';
import Move from '../components/svg/screenshot/move.svg';
import Rename from '../components/svg/screenshot/rename.svg';
import Delete from '../components/svg/screenshot/trash.svg';

function MenuDropDown({ id }) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMove, setIsOpenMove] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

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

  const onOpen = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  //  move
  const onOpenMove = () => setIsOpenMove(!isOpen);
  const onCloseMove = () => setIsOpenMove(false);

  // delete
  const onOpenDelete = () => setIsOpenDelete(!isOpenDelete);
  const onClosDelete = () => setIsOpenDelete(false);

  //
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<Rename />} {...getSubmitButtonProps()} />
        <IconButton icon={<Delete />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<Rename />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <>
      <Menu>
        <MenuButton>
          <Dots />
        </MenuButton>
        <MenuList pt='10px'>
          <MenuItem onClick={onOpen}>
            <Shared className='mr-[10px] text-sm  text-my-gray-color' />
            {t().shared}
            <SharedModal isOpen={isOpen} onClose={onClose} />
          </MenuItem>
          <MenuItem>
            <Download className='mr-[10px] text-sm  text-my-gray-color' />
            {t().download}
          </MenuItem>
          <MenuItem onClick={onOpenMove}>
            <Move className='mr-[10px] text-sm  text-my-gray-color' />
            {t().move}
            <MoveModal isOpen={isOpenMove} onClose={onCloseMove} />
          </MenuItem>
          <MenuItem>
            <Rename className='mr-[10px] text-sm  text-my-gray-color' />
            {t().rename}
          </MenuItem>
          <MenuItem onClick={onOpenDelete}>
            <Delete className='mr-[10px] text-sm  text-my-gray-color' />
            {t().delete}
            <DeleteModal isOpen={isOpenDelete} onClose={onClosDelete} id={id} />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default MenuDropDown;
