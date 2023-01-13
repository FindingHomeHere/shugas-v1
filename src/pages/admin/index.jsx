import React from 'react';
import { Flex, Box } from '@chakra-ui/layout';

import LoginForm from '../../components/LoginForm';

// props: any
const Login = () => {
  return (
    <Flex py={4} align='center' justify='center' minH='60vh'>
      <Box
        w={{ base: '100%', sm: '650px' }}
        p={12}
        bg='brandAlpha.700'
        direction='column'
        backdropFilter='blur(12px)'
      >
        <LoginForm />
      </Box>
    </Flex>
  );
};

export default Login;
