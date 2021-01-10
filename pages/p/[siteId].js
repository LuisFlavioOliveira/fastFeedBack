/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
import React from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Feedback from '@/components/Feedback';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: JSON.parse(JSON.stringify(feedback)),
    }, // will be passed to the page component as props
    revalidate: 1, // In seconds
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default function FeedbackPage({ initialFeedback }) {
  const auth = useAuth();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();

  const onCreateFeedback = (data) => {
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: data.comment,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      provider: auth.user.provider,
      status: 'pending',
    };

    createFeedback(newFeedback);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={handleSubmit(onCreateFeedback)}>
        <FormControl isInvalid={errors.comment} my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input
            name="comment"
            ref={register({ required: true })}
            type="comment"
            id="comment"
            placeholder="Leave a comment"
          />
          <Button mt={2} type="submit" fontWeight="bold">
            Add Comment
          </Button>
          <FormErrorMessage>This field is required</FormErrorMessage>
        </FormControl>
      </Box>
      {initialFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
}
