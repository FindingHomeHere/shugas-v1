import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import axios from 'axios';
import React from 'react';
import useSWR from 'swr';
import { SimpleGrid } from '@chakra-ui/react';
import ApplyCard from './ApplyCard';

const ApplicationView = (props) => {
  const { token } = props;
  let apps = { data: {} };
  const fetcher = (url) =>
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data.data);
  const { data, error, isValidating } = useSWR(`/api/v1/apps`, fetcher);

  if (!!data) {
    apps = data;
  }

  if (apps.data.length < 1 || !apps.data.length) {
    return (
      <>
        <Text variant='typewriter'>
          Looks like no one has applied yet... try again soon!
        </Text>
      </>
    );
  }
  if (apps.data.length > 0) {
    return (
      <>
        {isValidating && <Spinner colorScheme='brand' />}
        <VStack spacing={4} w='100%' mx='auto'>
          {error && (
            <Text key={`${error}`} variant='typewriter' color='red.200'>
              error fetching new applications,
              <br /> try again!
            </Text>
          )}
          {!isValidating && <Heading>New applications</Heading>}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
            {!!apps.data &&
              apps.data.map((el, i) => {
                if (!el.isViewed) {
                  return (
                    <ApplyCard user={el} i={i} token={token} isViewed={false} />
                  );
                }
              })}
          </SimpleGrid>
          {!isValidating && <Heading>Older applications</Heading>}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
            {!isValidating &&
              apps.data.map((el, i) => {
                if (el.isViewed) {
                  return (
                    <ApplyCard user={el} i={i} token={token} isViewed={true} />
                  );
                }
              })}
          </SimpleGrid>
        </VStack>
      </>
    );
  }
};

export default ApplicationView;
