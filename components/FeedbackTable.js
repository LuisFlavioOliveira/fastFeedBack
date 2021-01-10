/* eslint-disable react/prop-types */
import React from 'react';
import {
  Code,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
} from '@chakra-ui/react';
import { RemoveButton } from './RemoveButton';

const FeedbackTable = ({ feedbacks }) => (
  <Table variant="simple" backgroundColor="white">
    <Thead>
      <Tr backgroundColor="teal.200">
        <Th>Name</Th>
        <Th>Feedback</Th>
        <Th>Route</Th>
        <Th>Visible</Th>
        <Th>Remove</Th>
        <Th />
      </Tr>
    </Thead>
    <Tbody>
      {feedbacks.map((feedback) => (
        <Tr key={feedback.id}>
          <Td fontWeight="bold">{feedback.author}</Td>
          <Td>{feedback.text}</Td>
          <Td>
            <Code>/</Code>
          </Td>
          <Td>
            <Switch
              colorScheme="green"
              defaultChecked={feedback.status === 'active'}
            />
          </Td>
          <Td>
            <RemoveButton feedbackId={feedback.id} />
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default FeedbackTable;
