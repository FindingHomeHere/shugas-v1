import React from 'react';
import { VStack, Button } from '@chakra-ui/react';
import Image from 'next/image';

import Link from 'next/link';

const Reserve = () => {
  return (
    <VStack
      direction={{ base: 'column', md: 'row' }}
      p={{ base: 2, md: 'sm', lg: 'lg' }}
      my={{ base: 4, md: 'lg' }}
      justify='center'
      h='contain'
    >
      <Link
        href='https://reserve.spoton.com/web/restaurant.html?restaurantId=66741'
        target='_blank'
        rel='noopener noreferrer'
        passHref
      >
        <Button colorScheme='brand'>click to reserve</Button>
      </Link>
      <Image
        src='/images/twentyone.jpg'
        alt="Shuga's 21st anniversary"
        width={900}
        height={440}
      />
    </VStack>
  );
};

export default Reserve;
