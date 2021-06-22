import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';
import useSWR from 'swr';

import MenuView from '../components/MenuView';

const Menu = () => {
  let file;
  const fetcher = (url) => axios.get(url).then((res) => res.data.data);
  const { data, error, isValidating } = useSWR(
    '/api/v1/menus/current',
    fetcher
  );
  if (!!data) {
    file = data;
  }
  return (
    <Flex align='center' justify='center' width='100%'>
      {isValidating && <Spinner colorScheme='brand' />}
      {file && !isValidating && <MenuView data={file} />}
    </Flex>
  );
};

export default Menu;
