/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */

import React from 'react';

import { useAuth } from '@/lib/auth';

import fetcher from '@/utils/fetcher';
import { useAbortController } from '@/utils/hooks';

import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';

import { useQuery } from 'react-query';
import { SiteTableHeader } from '@/components/SiteTableHeader';
import { Box, Button } from '@chakra-ui/react';
import { createCheckoutSession, getToBillingPortal } from '@/lib/db';

export default function Account() {
  // call the custom hook to abort a fetch and store the signal
  const signal = useAbortController();

  const { user } = useAuth();
  // // Get token if there's one, if not, return undefined
  // const token = user?.token;

  // // Access the client
  // const { status, error, data } = useQuery(
  //     ['user', token],
  //     () => fetcher('/api/user', token, signal),
  //     {
  //         enabled: !!token, // only runs the query if user is true
  //     }
  // );

  // if (status === 'error') {
  //     return <span>An error has occurred: {error.message}</span>;
  // }

  // if (status === 'loading') {
  //     return (
  //         <DashboardShell>
  //             <SiteTableHeader />
  //             <SiteTableSkeleton />
  //         </DashboardShell>
  //     );
  // }

  // if (status === 'success') {
  //     return (
  //         <DashboardShell>
  //             <SiteTableHeader />
  //             {data.sites.length > 0 ? (
  //                 <SiteTable sites={data.sites} />
  //             ) : (
  //                     <EmptyState />
  //                 )}
  //         </DashboardShell>
  //     );
  // }

  /* this is one solution I found because if user is false (undefined), the component
    should return something, so it will return the 'loading' component */
  return (
    <DashboardShell>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button
          onClick={() => createCheckoutSession(user.uid)}
          backgroundColor="gray.900"
          colorScheme="white"
          fontWeight="bold"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)',
          }}
        >
          Upgrade to Starter
        </Button>
        <Button
          onClick={() => getToBillingPortal()}
          backgroundColor="gray.900"
          colorScheme="white"
          fontWeight="bold"
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)',
          }}
        >
          View Billing Portal
        </Button>
      </Box>
    </DashboardShell>
  );
}
