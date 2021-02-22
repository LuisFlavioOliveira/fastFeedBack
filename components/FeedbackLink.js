/* eslint-disable react/prop-types */
import { Flex, Link } from '@chakra-ui/react';

export default function FeedbackLink({ siteId }) {
  return (
    <Flex justifyContent="space-between" mb={8} w="full" my={1}>
      <Link fontWeight="bold" fontSize="sm" href={`/site/${siteId}`}>
        Leave a comment
      </Link>
      <Link fontSize="xs" color="blackAlpha.500" href="/">
        Powered by Fast Feedback
      </Link>
    </Flex>
  );
}
