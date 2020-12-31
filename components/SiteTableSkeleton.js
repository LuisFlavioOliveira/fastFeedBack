/* eslint-disable react/prop-types */
import React from 'react';

import { Table, Thead, Tbody, Tr, Th, Td, Skeleton } from '@chakra-ui/react';

const SkeletonRow = ({ width }) => (
  <Tr>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
    <Td>
      <Skeleton height="10px" w={width} my={4} />
    </Td>
  </Tr>
);

const SiteTableSkeleton = () => (
  <Table variant="simple" backgroundColor="white">
    <Thead>
      <Tr backgroundColor="teal.200">
        <Th>Name</Th>
        <Th>Site Link</Th>
        <Th>Feedback Link</Th>
        <Th>Date Added</Th>
        <Th />
      </Tr>
    </Thead>
    <Tbody>
      <SkeletonRow width="75px" />
      <SkeletonRow width="125px" />
      <SkeletonRow width="50px" />
      <SkeletonRow width="100px" />
      <SkeletonRow width="75px" />
    </Tbody>
  </Table>
);

export default SiteTableSkeleton;
