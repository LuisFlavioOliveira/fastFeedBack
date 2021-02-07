/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */

import React from 'react';

import { useAuth } from '@/lib/auth';

import DashboardShell from '@/components/DashboardShell';

import {
  Avatar,
  Heading,
  Box,
  Button,
  Flex,
  Text,
  Badge,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { createCheckoutSession, getToBillingPortal } from '@/lib/db';

function FeedbackUsage() {
  return (
    <StatGroup>
      <Stat>
        <StatLabel color="gray.700">Feedback</StatLabel>
        <StatNumber fontWeight="medium">∞</StatNumber>
        <StatHelpText>10,000 limit</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel color="gray.700">Sites</StatLabel>
        <StatNumber fontWeight="bold">1/∞</StatNumber>
        <StatHelpText>Unlimited Sites</StatHelpText>
      </Stat>
    </StatGroup>
  );
}

function SettingsTable({ stripeRole, children }) {
  return (
    <Box
      backgroundColor="white"
      mt={8}
      borderRadius={[0, 8, 8]}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
    >
      <Flex
        backgroundColor="gray.50"
        borderTopLeftRadius={[0, 8, 8]}
        borderTopRightRadius={[0, 8, 8]}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        px={6}
        py={4}
      >
        <Flex justify="space-between" align="center" w="full">
          <Text
            textTransform="uppercase"
            fontSize="xs"
            color="gray.500"
            fontWeight="bold"
            mt={1}
          >
            Settings
          </Text>
          <Badge
            h="1rem"
            colorScheme={stripeRole === 'premium' ? 'purple' : 'blue'}
          >
            {stripeRole || 'FREE'}
          </Badge>
        </Flex>
      </Flex>
      <Flex direction="column" p={6}>
        {children}
      </Flex>
    </Box>
  );
}

export default function Account() {
  const { user, signout } = useAuth();
  const [isBillingLoading, setBillingLoading] = React.useState(false);

  return (
    <DashboardShell>
      <Flex
        direction="column"
        maxW="600px"
        align={['left', 'center']}
        margin="0 auto"
      >
        <Flex direction="column" align={['left', 'center']} ml={4}>
          <Avatar
            w={['3rem', '6rem']}
            h={['3rem', '6rem']}
            mb={4}
            src={user?.photoUrl}
          />
          <Heading letterSpacing="-1px">{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </Flex>
        <SettingsTable stripeRole={user?.stripeRole}>
          <FeedbackUsage />
          <Text my={4}>
            Fast Feedback uses Stripe to update, change, or cancel your
            subscription. You can also update card information and billing
            addresses through the secure portal.
          </Text>
          <Flex justify="flex-end">
            <Button variant="ghost" ml={4} onClick={() => signout()}>
              Log Out
            </Button>
            {user?.stripeRole === null ? null : (
              <Button
                onClick={() => {
                  setBillingLoading(true);
                  getToBillingPortal();
                }}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                ml={4}
                isLoading={isBillingLoading}
                _hover={{ bg: 'gray.700' }}
                _active={{
                  bg: 'gray.800',
                  transform: 'scale(0.95)',
                }}
              >
                Manage Billing
              </Button>
            )}
          </Flex>
        </SettingsTable>
      </Flex>
    </DashboardShell>
  );
}
