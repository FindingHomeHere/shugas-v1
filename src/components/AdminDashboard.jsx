import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Flex,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import UserInfo from './UserInfo';
import MenuDrop from './MenuDrop';
import ApplicationView from './ApplicationView';

const AdminDashboard = (user) => {
  const userInfo = user.user;

  const token = user.token;
  const Backdrop = styled(Flex)`
    backdrop-filter: blur(20px);
  `;

  return (
    <Backdrop p={20} bg='brandAlpha.700'>
      <Tabs p={4} isFitted variant='solid-rounded' colorScheme='brandAlpha'>
        <Flex>
          <Heading>Heya, {userInfo.name.split(' ')[0]}</Heading>
        </Flex>
        <TabList mt={12}>
          <Tab>Applications</Tab>
          <Tab>Update Menu</Tab>
          <Tab>My Info</Tab>
        </TabList>
        <TabPanels mt={8}>
          <TabPanel>
            <ApplicationView token={token} />
          </TabPanel>
          <TabPanel>
            <MenuDrop token={token} />
          </TabPanel>
          <TabPanel>
            <UserInfo user={userInfo} token={token} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Backdrop>
  );
};

export default AdminDashboard;
