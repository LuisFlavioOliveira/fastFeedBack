/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */

import { useAuth } from '@/lib/auth';

import fetcher from '@/utils/fetcher';
import { useAbortController } from '@/utils/hooks';

import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import DashboardShell from '@/components/DashboardShell';
import SiteTable from '@/components/SiteTable';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';

export default function Dashboard() {
  // call the custom hook to abort a fetch and store the signal
  const signal = useAbortController();

  const auth = useAuth();

  // Access the client
  const { status, error, data } = useQuery('sites', () =>
    fetcher('/api/sites', signal)
  );
  console.log(data?.sites);

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

  if (status === 'success') {
    return (
      <DashboardShell>
        {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
      </DashboardShell>
    );
  }
}
