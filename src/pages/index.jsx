import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

import HomeMap from '../components/HomeMap';
import SpyGirl from '../../public/images/spyGirl.svg';

const Index = () => {
  const AddressBox = styled(Flex)`
    backdrop-filter: blur(8px);
  `;
  const AddressText = styled(Text)`
    font-size: 1.1rem;
    text-transfrom: lowercase;
  `;
  const CoverImg = styled(Box)`
    filter: blur(1.5px);
    opacity: 0.97;
  `;
  return (
    <>
      <CoverImg
        bgImage='/images/boat.jpg'
        bgSize='cover'
        bgPosition='center'
        width='100%'
        maxW='1200px'
        px={10}
        mx='auto'
        mt={4}
        height={{ base: '200px', md: '300px', xl: '400px', '2xl': '600px' }}
      />
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='center'
        p={{ base: 2, md: 12 }}
      >
        <AddressBox
          m={4}
          p={4}
          minWidth='250px'
          direction='column'
          bg='brandAlpha.700'
        >
          <Box mb={4} mr={4} minW='250px'>
            <Heading>Shuga's</Heading>
            <AddressText>Restaurant | Bar</AddressText>
            <AddressText>702 s cascade ave</AddressText>
            <AddressText>colorado springs, co 80903</AddressText>
            <Heading mt={4}>contact</Heading>
            <Link href='tel:719-328-1412'>
              <Text variant='typewriterNav' cursor='pointer'>
                719-328-1412
              </Text>
            </Link>
            <Link href='mailto:hello@shugas.com'>
              <Text variant='typewriterNav' cursor='pointer'>
                hello@shugas.com
              </Text>
            </Link>
            <Heading mt={4}>hours</Heading>
            <Text style={{ fontSize: '0.8rem' }} variant='typewriter'>
              mon thru fri:
            </Text>
            <Text style={{ fontSize: '0.8rem' }} variant='typewriter'>
              11am - midnight
            </Text>
            <Text mt={4} style={{ fontSize: '0.8rem' }} variant='typewriter'>
              sat & sun:
            </Text>
            <Text style={{ fontSize: '0.8rem' }} variant='typewriter'>
              10am - midnight
            </Text>
          </Box>
          <Box
            w='100%'
            maxW='380px'
            minW='60px'
            mx='auto'
            my='auto'
            bg='brand.100'
            p={2}
          >
            <SpyGirl />
          </Box>
        </AddressBox>
        <AddressBox align='center' justify='center' m={4} bg='brandAlpha.700'>
          <Box
            width='640px'
            height='720px'
            bgImage='/images/shugas.jpg'
            bgSize='cover'
            bgPosition='bottom'
          />
        </AddressBox>
      </Flex>
      <Box width='100%' p={{ base: 2, md: 12 }} align='center' justify='center'>
        <AddressBox
          align='center'
          justify='center'
          maxW='1200px'
          mx='auto'
          m={4}
          bg='brandAlpha.700'
        >
          <HomeMap />
        </AddressBox>
      </Box>
    </>
  );
};

export default Index;
