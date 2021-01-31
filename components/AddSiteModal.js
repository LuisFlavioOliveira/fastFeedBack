/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useMutation, useQueryClient } from 'react-query';

import { useForm } from 'react-hook-form';

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const AddSiteModal = ({ children }) => {
  // Hooks
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const initialRef = React.useRef();
  const toast = useToast();
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();

  // Use mutation to auto-fetch new data
  const addNewSite = useMutation((newSite) => createSite(newSite), {
    // When mutate is called:
    onMutate: async (newData) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('sites');

      // Snapshot the previous value
      const previousSites = queryClient.getQueryData('sites');

      // Optimistically update to the new value
      queryClient.setQueryData('sites', (old) => [old, newData]);

      // Return a context object with the snapshotted value
      return { previousSites };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newData, context) => {
      queryClient.setQueryData('sites', context.previousSites);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries('sites');
    },
  });

  const onCreateSite = ({ name, url }) => {
    addNewSite.mutate({
      authorId: auth.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      name,
      url,
    });

    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={errors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My Site"
                name="name"
                ref={register({ required: true })}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={errors.url}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({ required: true })}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button fontWeight="medium" m={4} onClick={onClose}>
              Cancel
            </Button>
            <Button fontWeight="medium" colorScheme="teal" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
