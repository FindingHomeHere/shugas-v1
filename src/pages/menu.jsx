import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import styled from '@emotion/styled'

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

  const BgBox = styled(Flex)`
    backdrop-filter: blur(20px);
  `;
  return (
    <Flex align='center' justify='center' minH='80vh' width='100%'>
      {isValidating && <BgBox align='center' justify='center' bgColor='brandAlpha.700'><Spinner colorScheme='brand' /></BgBox>}
      {file && !isValidating && <MenuView data={file} />}
    </Flex>
  );
};

export default Menu;
