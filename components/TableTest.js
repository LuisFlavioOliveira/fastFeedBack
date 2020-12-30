/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Link, Skeleton } from '@chakra-ui/react';
import { Table, Tr, Th, Td } from './Table';

const SiteTable = ({ sites }) => (
  <Table>
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Site Link</Th>
        <Th>Feedback Link</Th>
        <Th>Date Added</Th>
        <Th />
      </Tr>
    </thead>
    <tbody>
      {sites.map((site) => (
        <Box as="tr" key={site.id}>
          <Td>{site.name}</Td>
          <Td>{site.url}</Td>
          <Td>
            <Link>View FeedBack</Link>
          </Td>
          <Td>{site.createdAt}</Td>
        </Box>
      ))}
    </tbody>
  </Table>
);

export default SiteTable;
