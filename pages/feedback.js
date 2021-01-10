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
import FeedbackTable from '@/components/FeedbackTable';

import { useQuery } from 'react-query';
import { FeedbackTableHeader } from '@/components/FeedbackTableHeader';

export default function MyFeedback() {
  // call the custom hook to abort a fetch and store the signal
  const signal = useAbortController();

  const { user } = useAuth();
  // Get token if there's one, if not, return undefined
  const token = user?.token;

  // Access the client
  const { status, error, data } = useQuery(
    ['feedback', token],
    () => fetcher('/api/feedback', token, signal),
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
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (status === 'success') {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        {data.feedback.length > 0 ? (
          <FeedbackTable feedbacks={data.feedback} />
        ) : (
          <EmptyState />
        )}
      </DashboardShell>
    );
  }

  /* this is one solution I found because if user is false (undefined), the component
    should return something, so it will return the 'loading' component */
  return (
    <DashboardShell>
      <FeedbackTableHeader />
      <SiteTableSkeleton />
    </DashboardShell>
  );
}
