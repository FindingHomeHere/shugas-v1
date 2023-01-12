import { Text } from '@chakra-ui/layout';
import Link from 'next/link';
import React from 'react';

const NavLink = (props) => {
  return props.isExternal ? (
    <>
      <Link
        href={props.link}
        target='_blank'
        rel='noopener noreferrer'
        passHref
      >
        <Text cursor='pointer' variant='typewriterNav'>
          {props.text}
        </Text>
      </Link>
    </>
  ) : (
    <>
      <Link href={props.link} passHref>
        <Text cursor='pointer' variant='typewriterNav'>
          {props.text}
        </Text>
      </Link>
    </>
  );
};

export default NavLink;
