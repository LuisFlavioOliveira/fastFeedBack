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

import { useMutation, useQueryClient } from 'react-query';

import Feedback from '@/components/Feedback';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const feedback = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: JSON.parse(JSON.stringify(feedback)),
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const sites = await getAllSites();
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

export default function SiteFeedBack({ initialFeedback }) {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = React.useRef(null);
  const [allFeedback, setAllFeedback] = React.useState(initialFeedback);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      provider: auth.user.provider,
      status: 'pending',
    };
    setAllFeedback([newFeedback, ...allFeedback]);
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
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input
            ref={inputEl}
            type="comment"
            id="comment"
            placeholder="Leave a comment"
          />
          <Button mt={2} type="submit" fontWeight="bold">
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
}
