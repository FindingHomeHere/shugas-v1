import { Text } from '@chakra-ui/layout';
import Link from 'next/link';
import React from 'react';

const NavLink = (props) => {
  return (
    <>
      {props.isExternal ? (
        <>
          <Link href={props.link} passHref>
            <a target='_blank' rel='noopener noreferrer'>
              <Text cursor='pointer' variant='typewriterNav'>
                {props.text}
              </Text>
            </a>
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
      )}
    </>
  );
};

export default NavLink;
