import { useState } from 'react';
import { useCheckbox, Flex, Box } from '@chakra-ui/react';

import Check from '../../components/svg/check.svg';

function CustomCheckbox({ props, color, id, handleSettings }) {
  const [changedColor, setChangedColor] = useState();
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <Box as='button'>
      <label {...htmlProps}>
        <input {...getInputProps()} hidden />
        <Flex
          id={id}
          alignItems='center'
          justifyContent='center'
          borderRadius='5px'
          _hover={{ cursor: 'pointer', transform: 'scale(1.1)' }}
          bg={color}
          w='24px'
          h='24px'
          transition='all 0.2s'
          onClick={() => handleSettings(id)}
          {...getCheckboxProps()}
        >
          {state.isChecked && <Check />}
        </Flex>
      </label>
    </Box>
  );
}

export default CustomCheckbox;
