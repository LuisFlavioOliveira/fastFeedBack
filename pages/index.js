/* eslint-disable react/no-danger */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import Head from 'next/head';
import { Button, Text, Flex } from '@chakra-ui/react';
import { FastFeedbackIcon } from 'public/icons';

import { useAuth } from '@/lib/auth';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      maxW="4OOpx"
      margin="0 auto"
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
        <title>Fast Feedback</title>
      </Head>
      <FastFeedbackIcon color="black.500" boxSize="64px" mb={2} />
      <Text mb={4}>
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>
        It's the easiest way to add comments or reviews to your static site.
        It's still a work-in-progress, but you can try it out by logging in.
      </Text>

      {auth.user ? (
        <Button as="a" size="sm" fontWeight="bold" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button
          mt={4}
          size="sm"
          fontWeight="bold"
          onClick={() => auth.signinWithGithub()}
        >
          Sign In
        </Button>
      )}
    </Flex>
  );
}
