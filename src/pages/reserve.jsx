import { Box, Flex, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const Reservations = () => {
  return (
    <Flex align='center' justify='center' maxW='100vw' overflowX='hidden'>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        p={{ base: 2, md: 'sm', lg: 'lg' }}
        my={{ base: 4, md: 'lg' }}
        justify='center'
        h='contain'
      >
        <iframe
          id='yelp-reservations-widget'
          width='250'
          height='440'
          src='//www.yelp.com/reservations/shugas-colorado-springs/widget?orientation=vertical&color-scheme=light'
          title='Make a reservation'
        >
          {' '}
          <a href='https://www.yelp.com/reservations/shugas-colorado-springs'>
            Reserve at Shuga's on Yelp
          </a>{' '}
        </iframe>
        <Box
          bgImage='/images/21st.jpg'
          bgSize='contain'
          bgRepeat='no-repeat'
          bgPosition='center'
          width='880px'
          height='440px'
        />
      </Stack>
    </Flex>
  );
};

export default Reservations;
