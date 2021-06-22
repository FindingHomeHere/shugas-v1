import { Flex } from '@chakra-ui/react';
import React from 'react';

const Reservations = () => {
  return (
    <Flex align='center' justify='center' maxW='100vw' overflowX='hidden'>
      <Flex
        minH='100vh'
        justify='center'
        width={{ base: 350, lg: '1683px' }}
        h='contain'
      >
        <iframe
          width='100%'
          src='https://getseat.net/?channel=merchant_web#/public/online/reservation/7B2EGAE7'
        />
      </Flex>
    </Flex>
  );
};

export default Reservations;
