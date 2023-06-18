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
import EventDrop from './EventDrop';
import ApplicationView from './ApplicationView';

const AdminDashboard = (user) => {
  const userInfo = user.user;

  const token = user.token;
  const Backdrop = styled(Flex)`
    backdrop-filter: blur(14px);
  `;

  return (
    <Backdrop py={20} w='100vw' px='auto' bg='brandAlpha.700'>
      <Tabs px={{ base: 0, md: 4 }} py={4} isFitted colorScheme='brand'>
        <Flex>
          <Heading>Hey, {userInfo.name.split(' ')[0]}</Heading>
        </Flex>
        <TabList mt={10}>
          <Tab>Applications</Tab>
          <Tab>Update Menu</Tab>
          <Tab>Update Events</Tab>
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
            <EventDrop token={token} />
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
