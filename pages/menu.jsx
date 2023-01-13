import { Flex, Spinner, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useSWR from 'swr';

import MenuView from '../components/MenuView';

const Menu = () => {
  const [file, setFile] = useState(null);
  const fetcher = (url) => axios.get(url).then((res) => res.data.data);
  const { data, isValidating } = useSWR('/api/v1/menus/current', fetcher);

  useEffect(() => {
    if (data) setFile(data);
  }, [data]);

  return (
    <Flex align='center' justify='center' minH='80vh' width='100%'>
      {isValidating && (
        <Flex
          align='center'
          justify='center'
          direction='column'
          padding={8}
          bgColor='brandAlpha.700'
          backdropBlur='20px'
        >
          <Heading>grabbing the current Menu...</Heading>
          <Spinner colorScheme='brand' />
        </Flex>
      )}

      {file !== null && !isValidating && <MenuView data={file} />}
    </Flex>
  );
};

export default Menu;
