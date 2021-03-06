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
import UpgradeEmptyState from '@/components/UpgradeEmptyState';

export default function Dashboard() {
  // call the custom hook to abort a fetch and store the signal
  const signal = useAbortController();

  const { user } = useAuth();
  // Get token if there's one, if not, return undefined
  const token = user?.token;

  // Access the client
  const { status, error, data } = useQuery(
    ['sites', token],
    () => fetcher('/api/sites', token, signal),
    {
      enabled: !!token, // only runs the query if user is true
    }
  );

  const isPaidAccount = user?.stripeRole;

  if (status === 'error') {
    return <span>An error has occurred: {error.message}</span>;
  }

  if (status === 'loading') {
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={isPaidAccount} />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (status === 'success') {
    if (data.sites.length > 0) {
      return (
        <DashboardShell>
          <SiteTableHeader isPaidAccount={isPaidAccount} />
          <SiteTable sites={data.sites} />
        </DashboardShell>
      );
    }
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={isPaidAccount} />
        {isPaidAccount ? <EmptyState /> : <UpgradeEmptyState />}
      </DashboardShell>
    );
  }

  /* this is one solution I found because if user is false (undefined), the component
  should return something, so it will return the 'loading' component */
  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount} />
      <SiteTableSkeleton />
    </DashboardShell>
  );
}
