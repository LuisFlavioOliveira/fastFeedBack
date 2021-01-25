/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-danger */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import Head from 'next/head';
import { Button, Text, Flex, Heading, HStack, Box } from '@chakra-ui/react';
import { FastFeedbackIcon } from 'public/icons';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { useAuth } from '@/lib/auth';
import { getAllFeedback } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';

const SITE_ID = 'ye7nbR7FEGnLiPKrWYvr';

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: JSON.parse(JSON.stringify(feedback)),
    },
    revalidate: 1,
  };
}

export default function Home({ allFeedback }) {
  const auth = useAuth();
  return (
    <>
      <Box bg="white" py={16}>
        <Flex
          align="center"
          as="main"
          direction="column"
          maxW="7OOpx"
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
          <FastFeedbackIcon color="black.500" boxSize="48px" mb={2} />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Fast Feedback
            </Text>
          </Text>
          <Text mb={4} align="center" fontSize="lg" isTruncated p={8}>
            It's the easiest way to add comments or reviews to your static site.
            <br />
            It's still a work-in-progress, but you can try it out by logging in.
          </Text>

          {auth.user ? (
            <Button
              as="a"
              href="/dashboard"
              backgroundColor="gray.900"
              color="white"
              fontWeight="bold"
              mt={4}
              maxW="200px"
              variant="outline"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <HStack spacing="24px">
              <Button
                onClick={() => auth.signinWithGithub()}
                backgroundColor="gray.900"
                colorScheme="white"
                fontWeight="bold"
                leftIcon={<FaGithub />}
                _hover={{ bg: 'gray.700' }}
                _active={{
                  bg: 'gray.800',
                  transform: 'scale(0.95)',
                }}
              >
                Sign In with GitHub
              </Button>
              <Button
                onClick={() => auth.signinWithGoogle()}
                backgroundColor="white"
                colorScheme="gray.900"
                variant="outline"
                fontWeight="bold"
                leftIcon={<FcGoogle />}
                _hover={{ bg: 'blue.100' }}
                _active={{
                  bg: 'blue.100',
                  transform: 'scale(0.95)',
                }}
              >
                Sign In with Google
              </Button>
            </HStack>
          )}
        </Flex>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  );
}
