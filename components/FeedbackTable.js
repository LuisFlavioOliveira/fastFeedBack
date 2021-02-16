/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Table, Thead, Tbody, Tr, Th } from '@chakra-ui/react';
import FeedbackRow from './FeedbackRow';

function FeedbackTable({ feedbacks }) {
  return (
    <Table variant="simple" backgroundColor="white">
      <Thead>
        <Tr backgroundColor="teal.200">
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th width="50px" />
        </Tr>
      </Thead>
      <Tbody>
        {feedbacks.map((feedback) => (
          <FeedbackRow key={feedback.id} {...feedback} />
        ))}
      </Tbody>
    </Table>
  );
}

export default FeedbackTable;
