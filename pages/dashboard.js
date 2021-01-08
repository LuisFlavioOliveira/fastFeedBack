/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */

import React from 'react';

import { useAuth } from '@/lib/auth';

import fetcherGetUser from '@/utils/fetcher';
import { useAbortController } from '@/utils/hooks';

import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';

import { useQuery } from 'react-query';

export default function Dashboard() {
  // call the custom hook to abort a fetch and store the signal
  const signal = useAbortController();

  const { user } = useAuth();
  // Get token if there's one, if not, return undefined
  const token = user?.token;

  // Access the client
  const { status, error, data } = useQuery(
    ['sites', token],
    () => fetcherGetUser('/api/sites', token, signal),
    {
      enabled: !!token, // only runs the query if user is true
    }
  );

  if (status === 'error') {
    return <span>An error has occurred: {error.message}</span>;
  }

  if (status === 'loading') {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }
  console.log(data);

  if (status === 'success') {
    return (
      <DashboardShell>
        {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
      </DashboardShell>
    );
  }

  /* this is one solution I found because if user is false (undefined), the component
  should return something, so it will return the 'loading' component */
  return (
    <DashboardShell>
      <SiteTableSkeleton />
    </DashboardShell>
  );
}
