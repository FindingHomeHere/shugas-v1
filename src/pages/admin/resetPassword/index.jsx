import React, { useState } from 'react';
import axios from 'axios';
import {
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(email);
    try {
      const res = await axios({
        method: 'POST',
        url: '/api/v1/users/forgotPassword',
        data: {
          email: email,
        },
      });
      alert(res.data.message);
      setIsLoading(false);
    } catch (err) {
      console.log('PasswordResetError', err);
      alert(err.message);
    }
  };
  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      minH='60vh'
      bgColor='brandAlpha.700'
      backdropFilter='blur(5px)'
    >
      <Heading mb={4}>Reset Password</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id='email'>
          <FormLabel>Email</FormLabel>
          <Input
            type='email'
            name='email'
            placeholder='me@somewhere.com'
            onChange={handleChange}
            value={email}
          />
        </FormControl>
        <Button mt={4} colorScheme='brand' isLoading={isLoading} type='submit'>
          Submit
        </Button>
      </form>
    </Flex>
  );
};

export default ForgotPasswordPage;
