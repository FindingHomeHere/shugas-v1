import { Flex, Heading, Text } from '@chakra-ui/layout';
import React from 'react';
import styled from '@emotion/styled';
import ApplyForm from '../components/ApplyForm';

const Jobs = () => {
  const JobsContainer = styled(Flex)`
    backdrop-filter: blur(12px);
  `;
  return (
    <Flex align='center' justify='center'>
      <JobsContainer
        direction='column'
        my={4}
        p={6}
        bgColor='brandAlpha.700'
        w={{ base: '100vw', sm: '90vw', md: '60vw', lg: '40vw' }}
      >
        <Heading>Want to join our amazing crew?</Heading>
        <Text mt={3}>
          Fill out this form, send us your resume, and we'll be in touch!
        </Text>
        <Flex direction='column' w='100%'>
          <ApplyForm />
        </Flex>
      </JobsContainer>
    </Flex>
  );
};

export default Jobs;
