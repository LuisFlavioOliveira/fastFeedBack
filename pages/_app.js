/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import PlausibleProvider from 'next-plausible';
import theme from '@/styles/theme';

import { AuthProvider } from '@/lib/auth';

import { QueryClient, QueryClientProvider } from 'react-query';
import { DefaultSeo } from 'next-seo';

import SEO from '../next-seo.config';

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <PlausibleProvider domain="fastfeedback-kohl-three.vercel.app">
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
