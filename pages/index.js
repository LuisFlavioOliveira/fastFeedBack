/* eslint-disable react/no-danger */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import Head from 'next/head';
import { Button, Text, Flex, Heading, Stack } from '@chakra-ui/react';
import { FastFeedbackIcon } from 'public/icons';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

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
      <FastFeedbackIcon color="black.500" boxSize="84px" mb={2} />
      <Heading size="lg" my={4}>
        Fast Feedback
      </Heading>
      <Text mb={4} align="center" fontSize="lg" isTruncated p={8}>
        It's the easiest way to add comments or reviews to your static site.
        <br />
        It's still a work-in-progress, but you can try it out by logging in.
      </Text>

      {auth.user ? (
        <Button
          mt={4}
          size="lg"
          fontWeight="bold"
          as="a"
          href="/dashboard"
          backgroundColor="white"
          color="gray.900"
          variant="outline"
          _hover={{ bg: 'teal.300' }}
          _active={{
            bg: 'teal.300',
            transform: 'scale(0.95)',
          }}
        >
          View Dashboard
        </Button>
      ) : (
        <Stack>
          <Button
            leftIcon={<FaGithub />}
            mt={4}
            size="lg"
            fontWeight="bold"
            onClick={() => auth.signinWithGithub()}
            backgroundColor="gray.900"
            colorScheme="white"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            Sign In with GitHub
          </Button>
          <Button
            leftIcon={<FcGoogle />}
            mt={4}
            size="lg"
            fontWeight="bold"
            onClick={() => auth.signinWithGoogle()}
            backgroundColor="white"
            colorScheme="gray.900"
            variant="outline"
            _hover={{ bg: 'blue.100' }}
            _active={{
              bg: 'blue.100',
              transform: 'scale(0.95)',
            }}
          >
            Sign In with Google
          </Button>
        </Stack>
      )}
    </Flex>
  );
}
