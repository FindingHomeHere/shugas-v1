import { Flex, Text, Box } from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

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
  const IJ = styled.a`
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  `;
  return (
    <>
      <Flex
        bg='brand.800'
        justify='space-between'
        p={12}
        direction={{ base: 'column', md: 'row' }}
        minH='300px'
        w='100%'
      >
        <Box w='300px'>
          <FooterLogo />
          <Text>Shuga's Restaurant | Bar</Text>
          <Text>702 S. Cascade Ave.</Text>
          <Text>Colorado Springs, CO 80903</Text>
          <Text>719.328.1412</Text>
        </Box>
        <Box
          lineHeight={2}
          borderColor='brand.400'
          pt={{ base: 4, md: 0 }}
          mt={{ base: 4, md: 0 }}
          pl={{ base: 0, md: 4 }}
          ml={{ base: 0, md: 4 }}
          borderLeftWidth={{ base: 0, md: 1 }}
          borderTopWidth={{ base: 1, md: 0 }}
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
        <Flex
          borderColor='brand.400'
          pt={{ base: 4, md: 0 }}
          mt={{ base: 4, md: 0 }}
          pl={{ base: 0, md: 4 }}
          ml={{ base: 0, md: 4 }}
          align='center'
          justify='center'
          borderLeftWidth={{ base: 0, md: 1 }}
          borderTopWidth={{ base: 1, md: 0 }}
        >
          <Text fontSize='0.8rem'>
            Copyright &copy; 2021 Shuga's Restaurant, Designed and Built by{' '}
            <Link href='https://www.isaacjohnson.dev' target='_blank' passHref>
              Isaac Johnson
            </Link>
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Footer;
