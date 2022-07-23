import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { StepsStyleConfig } from 'chakra-ui-steps';

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      iconLabel: {
        ...StepsStyleConfig.baseStyle(props).iconLabel,
        // your custom styles here
        color: '#28A1FF',
      },
      stepIconContainer: {
        ...StepsStyleConfig.baseStyle(props).stepIconContainer,
      },
    };
  },
};

const theme = extendTheme({
  colors: {
    brand: {
      500: '#28A1FF',
      200: '#28A1FF',
    },
  },
  components: {
    Steps: CustomSteps,
    Editable: {
      variants: {
        changeName: {
          preview: {},
        },
      },
    },
    Modal: {
      sizes: { xl: { Content: { maxWidth: '715px' } } },
    },
  },

  styles: {
    global: (props) => ({
      body: {
        bg: mode('whiteAlpha.900', '#0f2042')(props),
        color: mode('gray.900', 'whiteAlpha.900')(props),
      },
    }),
  },
});

export default theme;
