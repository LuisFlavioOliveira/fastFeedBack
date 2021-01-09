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
  const { register, handleSubmit } = useForm();

  // Use mutation to auto-fetch new data
  const mutation = useMutation((newSite) => createSite(newSite), {
    onSuccess: () => queryClient.invalidateQueries('sites'),
  });

  const onCreateSite = ({ name, url }) => {
    mutation.mutate({
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
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My Site"
                name="name"
                ref={register({ required: 'Required' })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({ required: 'Required' })}
              />
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
