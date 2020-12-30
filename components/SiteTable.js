/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Link,
  Skeleton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

import { parseISO, format } from 'date-fns';

const SiteTable = ({ sites }) => (
  <Table variant="simple" backgroundColor="white">
    <Thead>
      <Tr backgroundColor="teal.200">
        <Th>Name</Th>
        <Th>Site Link</Th>
        <Th>Feedback Link</Th>
        <Th>Date Added</Th>
      </Tr>
    </Thead>
    <Tbody>
      {sites.map((site) => (
        <Tr key={site.id}>
          <Td fontWeight="bold">{site.name}</Td>
          <Td>{site.url}</Td>
          <Td>
            <Link>View FeedBack</Link>
          </Td>
          <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default SiteTable;
