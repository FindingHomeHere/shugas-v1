import React from 'react';
import { Flex, Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';

import LoginForm from '../../components/LoginForm';

const FormContainer = styled(Box)`
  backdrop-filter: blur(12px);
`;
// props: any
const Login = () => {
  return (
    <Flex py={4} align='center' justify='center' minH='80vh'>
      <FormContainer p={40} bg='brandAlpha.700' direction='column'>
        <LoginForm />
      </FormContainer>
    </Flex>
  );
};

export default Login;
