/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Code, Tr, Td, Switch } from '@chakra-ui/react';
import { updateFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { RemoveButton } from './RemoveButton';

function FeedbackRow({ id, author, text, route, status }) {
  const [checked, setCheck] = React.useState(status === 'active');
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => updateFeedback(id, { status: !checked ? 'active' : 'pending' }),
    {
      onSuccess: () => queryClient.invalidateQueries('feedback'),
      //   onSuccess: (data) => queryClient.setQueryData('feedback', () => data),
    }
  );
  const toggleFeedback = (e) => {
    setCheck(!checked);
    mutation.mutate();
  };
  return (
    <Tr key={id}>
      <Td fontWeight="bold">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch
          onChange={toggleFeedback}
          colorScheme="green"
          isChecked={checked}
        />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Tr>
  );
}

export default FeedbackRow;
