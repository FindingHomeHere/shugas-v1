import { Flex, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

const Reservations = () => {
  return (
    <Flex align='center' justify='center' maxW='100vw' overflowX='hidden'>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        p={{ base: 2, md: 'sm', lg: 'lg' }}
        justify='center'
        h='contain'
      >
        <iframe
          id='yelp-reservations-widget'
          frameborder='0'
          width='100%'
          height='440'
          src='//www.yelp.com/reservations/shugas-colorado-springs/widget?orientation=vertical&color-scheme=light'
          title='Make a reservation'
        >
          {' '}
          <a href='https://www.yelp.com/reservations/shugas-colorado-springs'>
            Reserve at Shuga's on Yelp
          </a>{' '}
        </iframe>
        <Image
          src='/images/21st.jpg'
          alt="Shuga's 21st anniversary"
          width={880}
          height={440}
        />
      </Stack>
    </Flex>
  );
};

export default Reservations;
