/* eslint-disable import/no-unresolved */

import React from 'react';
import NextLink from 'next/link';

import { Box, Button, Flex, Link, Avatar } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { FastFeedbackIcon } from '../public/icons';

// eslint-disable-next-line react/prop-types
const DashboardShell = ({ children }) => {
  const { user, signout } = useAuth();
  const router = useRouter();
  const title =
    router.pathname.charAt(1).toUpperCase() + router.pathname.slice(2);
  const pageTitle = `Fast Feedback - ${title}`;
  const url = `https://fastfeedback-kohl-three.vercel.app${router.pathname}`;

  return (
    <>
      <NextSeo
        title={pageTitle}
        canonical={url}
        openGraph={{ url, title: pageTitle }}
      />
      <Box backgroundColor="gray.100" h="100vh">
        <Flex
          backgroundColor="white"
          mb={[8, 16]}
          w="full"
          borderTop="5px solid #0AF5F4"
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            pt={4}
            pb={4}
            maxW="1250px"
            margin="0 auto"
            w="full"
            px={8}
            h="60px"
          >
            <Flex>
              <NextLink href="/" passHref>
                <FastFeedbackIcon boxSize="24px" mr={8} />
              </NextLink>
              <NextLink href="/sites" passHref>
                <Link mr={4}>Sites</Link>
              </NextLink>
              <NextLink href="/feedback" passHref>
                <Link>Feedback</Link>
              </NextLink>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              {user && (
                <NextLink href="/account" passHref>
                  <Button as="a" variant="ghost">
                    Account
                  </Button>
                </NextLink>
              )}
              <Avatar size="sm" src={user ? user.photoUrl : null} />
            </Flex>
          </Flex>
        </Flex>
        <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
          {children}
        </Flex>
      </Box>
    </>
  );
};

export default DashboardShell;
