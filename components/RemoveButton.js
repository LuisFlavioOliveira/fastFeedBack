/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import React from 'react';

import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  IconButton,
} from '@chakra-ui/react';

import { useMutation, useQueryClient } from 'react-query';

import { DeleteIcon } from '@chakra-ui/icons';
import { deleteFeedback } from '@/lib/db';

export function RemoveButton({ feedbackId }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const cancelRef = React.useRef();

  const mutation = useMutation((feedbackId) => deleteFeedback(feedbackId), {
    onSuccess: () => queryClient.invalidateQueries('feedback'),
  });

  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    mutation.mutate(feedbackId);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete Feedback"
        icon={<DeleteIcon />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
