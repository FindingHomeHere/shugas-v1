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
        <Heading>Want to join our rockstar crew?</Heading>
        <Text my={3}>
          <strong>You:</strong> working the room, blowing everyone's minds with
          your fabulousness and cool character. <br />
          <br />
          <strong>Us:</strong> "Hieee" <br />
          <br />
          <strong>You:</strong> Looking for that cute, fun spot to strut your
          rockstar skills. <br />
          <br />
          <strong>Us:</strong> Batting our eyelashes across a dimly-lit bar.{' '}
          <br />
          <br />
          <strong>You:</strong> Wondering what it would be like to work in a
          restaurant that celebrates your authentic, amazing personality and
          sense of self and style, while somehow managing to get all the s**t
          done. <br />
          <br />
          <strong>Us:</strong> OMG, are we matching right now? <br />
          <br />
          <strong>You:</strong> Soooo, who are you guys? <br />
          <br />
          <strong>Us:</strong> Hey, we're Shuga's. We have the best restaurant
          team as far as the eye can see, and we have an empty seat right here.{' '}
          <br />
          <br />
          <strong>You:</strong> Smiling as you read the silliest job application
          ever. <br />
          <br />
          <strong>Us:</strong> Smiling as we write it. <br />
          <br />
          <strong>Come vibe with us.</strong>
        </Text>
        <Flex direction='column' w='100%'>
          <ApplyForm />
        </Flex>
      </JobsContainer>
    </Flex>
  );
};

export default Jobs;
