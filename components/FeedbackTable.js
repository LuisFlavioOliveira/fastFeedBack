/* eslint-disable react/prop-types */
import React from 'react';
import { Code, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const FeedbackTable = ({ feedbacks }) => (
  <Table variant="simple" backgroundColor="white">
    <Thead>
      <Tr backgroundColor="teal.200">
        <Th>Name</Th>
        <Th>Feedback</Th>
        <Th>Route</Th>
        <Th>Visible</Th>
        <Th />
      </Tr>
    </Thead>
    <Tbody>
      {feedbacks.map((feedback) => (
        <Tr key={feedback.id}>
          <Td fontWeight="bold">{feedback.name}</Td>
          <Td>{feedback.text}</Td>
          <Td>
            <Code>/</Code>
          </Td>
          <Td>Remove</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default FeedbackTable;
