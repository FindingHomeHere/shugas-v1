import React from 'react';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';

import Logo from '../../public/images/shugasTitleLogoTeal.svg';
import MobileNav from './MobileNav';

const Navbar = () => {
  const NavContainer = styled(Flex)`
    height: 280px;
    width: 100vw;
  `;

  const LogoBack = styled(Logo)`
    height: 200px;
    fill: #b0f2f0;
    overflow-x: hidden;
  `;

  const LogoBackInv = styled(Logo)`
    height: 200px;
    fill: #18313061;
    z-index: -1;
    transform: scale(1, -1.8);
    transform-origin: bottom;
    overflow-x: hidden;
  `;

  return (
    <>
      <NavContainer
        // direction='column'
        mx={{ base: '0', md: 'auto' }}
        bgGradient='linear(to-b, brand.800, 95%, brandAlpha.800)'
      >
        <MobileNav />
        <Flex
          w='100vw'
          h='contain'
          position='absolute'
          align='flex-end'
          justify='center'
          marginTop='80px'
        >
          <LogoBack />
        </Flex>
        <Flex
          w='100vw'
          h='contain'
          position='absolute'
          align='flex-end'
          justify='center'
          marginTop='80px'
        >
          <LogoBackInv position='absolute' top='280px' />
        </Flex>
      </NavContainer>
    </>
  );
};

export default Navbar;
