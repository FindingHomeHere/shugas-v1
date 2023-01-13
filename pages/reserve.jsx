import { Flex } from '@chakra-ui/react';
import React from 'react';
import Reserve from '../components/Reserve';

const Reservations = () => {
  return (
    <Flex align='center' justify='center' maxW='100vw' overflowX='hidden'>
      <Reserve />
    </Flex>
  );
};

export default Reservations;
