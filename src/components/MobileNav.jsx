import { IconButton, Flex, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';

import NavLink from './NavLink';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AiOutlineInstagram } from 'react-icons/ai';

const navItems = [
  { link: '/', text: 'Home', isExternal: false },
  { link: '/menu', text: 'Menu', isExternal: false },
  { link: '/reserve', text: 'Reservations', isExternal: false },
  {
    link: 'https://direct.chownow.com/order/18908/locations/27115',
    text: 'Order Online',
    isExternal: true,
  },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const NavFloat = styled(Flex)`
    position: fixed;
    width: 100vw;
    top: 1px;
    margin-top: -1px;
    justify-content: center;
    background-color: #183130cc;
    z-index: 11;
    backdrop-filter: blur(20px);
    text-align: center;
  `;
  return (
    <>
      <NavFloat>
        <IconButton
          isRound
          fontSize='1.3rem'
          fontWeight='bold'
          aria-label='Open the menu'
          colorScheme='brand'
          position='fixed'
          right='1.5rem'
          top='1.5rem'
          onClick={handleClick}
          display={{ base: 'block', md: 'none' }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        />
        {isOpen && (
          <Flex>
            <Flex
              direction='column'
              h='80vh'
              justify='space-around'
              align='center'
              zIndex={10}
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
              <NavLink
                link='https://www.instagram.com/shugasrestaurant/'
                isExternal={true}
                text={<AiOutlineInstagram fontSize='1.5rem' />}
              />
            </Flex>
          </Flex>
        )}
        <Flex
          // direction={['column', 'column', 'row', 'row']}
          w='100vw'
          mx='auto'
          align='center'
          justify='center'
          p={4}
          display={{ base: 'none', md: 'flex' }}
        >
          <Flex maxW='1000px' w='100%' align='center' justify='space-between'>
            {navItems.map((el, i) => {
              return (
                <NavLink
                  key={`${el}:${i}`}
                  link={el.link}
                  text={el.text}
                  isExternal={el.isExternal}
                />
              );
            })}

            <NavLink
              fontSize='1.5rem'
              link='https://www.instagram.com/shugasrestaurant/'
              isExternal={true}
              text={<AiOutlineInstagram fontSize='1.4rem' />}
            />
          </Flex>
        </Flex>
      </NavFloat>
      {isOpen && (
        <Box
          position='fixed'
          bg='brandAlpha.700'
          onClick={handleClick}
          zIndex={9}
          cursor='pointer'
          w='100%'
          h='100%'
        />
      )}
    </>
  );
};

export default MobileNav;
