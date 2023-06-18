import React from 'react';
import { Stack } from '@chakra-ui/react';
import Image from 'next/image';

const Reserve = () => {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      p={{ base: 2, md: 'sm', lg: 'lg' }}
      my={{ base: 4, md: 'lg' }}
      justify='center'
      h='contain'
    >
      <iframe
        id='yelp-reservations-widget'
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
        src='/images/twentyone.jpg'
        alt="Shuga's 21st anniversary"
        width={900}
        height={440}
      />
    </Stack>
  );
};

export default Reserve;
