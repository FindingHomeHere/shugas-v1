import { Flex, Text, Box } from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled';

import Logo from '../../public/images/shugasTitleLogoTeal.svg';
import NavLink from './NavLink';

const navItems = [
  { link: '/', text: 'Home', isExternal: false },
  { link: '/menu', text: 'Menu', isExternal: false },
  {
    link: 'https://direct.chownow.com/order/18908/locations/27115',
    text: 'Order Online',
    isExternal: true,
  },
  { link: '/reserve', text: 'Reservations', isExternal: false },
  { link: '/jobs', text: 'Join the Crew', isExternal: false },
  { link: '/admin', text: 'Admin Login', isExternal: false },
];

const Footer = () => {
  const FooterLogo = styled(Logo)`
    fill: #5aaba8;
    padding-bottom: 20px;
  `;
  return (
    <>
      <Flex bg='brand.800' p={{ base: 2, md: 12 }} h='300px'>
        <Box w={{ base: '40%', md: '15%' }} p={{ base: '5px', md: '20px' }}>
          <FooterLogo />
          <Text>702 S. Cascade Ave.</Text>
          <Text>Colorado Springs, CO 80903</Text>
          <Text>719.328.1412</Text>
        </Box>
        <Box
          lineHeight={1.8}
          mx={{ base: 'auto', md: 12 }}
          paddingLeft={{ base: '5px', md: '20px' }}
          borderLeftColor='brand.400'
          borderLeftWidth={1}
          fontSize={{ base: '0.8 rem', md: '1 rem' }}
        >
          {navItems.map((el, i) => {
            return (
              <NavLink
                key={`${el}:${i}`}
                link={el.link}
                isExternal={el.isExternal}
                text={el.text}
              />
            );
          })}
        </Box>
      </Flex>
    </>
  );
};

export default Footer;
