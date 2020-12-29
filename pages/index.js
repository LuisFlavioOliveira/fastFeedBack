/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */

import {
  Button,
  Head,
  ButtonGroup,
  Heading,
  Text,
  Code,
  Box,
  Flex,
} from '@chakra-ui/react';
import { FastFeedbackIcon } from 'public/icons';

import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';

export default function Home() {
  const auth = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      w="full"
      maxW="3OOpx"
      h="100vh"
    >
      <FastFeedbackIcon color="black.500" boxSize="64px" />

      {auth.user ? (
        <Button onClick={(e) => auth.signout()}>Sign Out</Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>
  );
}
