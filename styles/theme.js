import React from 'react';
import { theme as extendTheme } from '@chakra-ui/react';

const theme = {
  ...extendTheme,
  styles: {
    global: {
      html: {
        minW: '360px',
        scrollBehavior: 'smooth',
        ...extendTheme.fonts,
        fontFamily: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
        fontWeights: {
          normal: 400,
          medium: 600,
          bold: 700,
        },
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
        minH: '100vh',
      },
    },
  },
};

export default theme;
