/* eslint-disable react/prop-types */
import React from 'react';
import { Link, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

import NextLink from 'next/link';
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
            <NextLink href={`/p/${encodeURIComponent(site.id)}`} passHref>
              <Link color="blue.500" fontWeight="bold">
                View FeedBack
              </Link>
            </NextLink>
          </Td>
          <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default SiteTable;
