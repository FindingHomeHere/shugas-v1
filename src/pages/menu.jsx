import { Flex } from '@chakra-ui/react';
import React from 'react';
import axios from 'axios';

import MenuView from '../components/MenuView';

const Menu = ({ data }) => {
  return (
    <Flex align='center' justify='center' width='100%'>
      <MenuView data={data} />
    </Flex>
  );
};

export const getServerSideProps = async () => {
  const res = await axios({
    method: 'GET',
    url: `${process.env.BASE_URL}/api/v1/menus/current`,
  });
  const data = await res.data.data.data;

  const fileName = data.fileName;

  return {
    props: {
      data: fileName,
    },
  };
};

export default Menu;
