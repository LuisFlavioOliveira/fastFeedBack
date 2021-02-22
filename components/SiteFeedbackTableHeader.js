/* eslint-disable react/prop-types */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';

export function SiteFeedbackTableHeader({ siteName }) {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href="/feedback" passHref>
            <BreadcrumbLink>Feedback</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{siteName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{siteName}</Heading>
      </Flex>
    </>
  );
}
