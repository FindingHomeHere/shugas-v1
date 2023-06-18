import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

const ResetPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios({
        method: 'PATCH',
        url: '/api/v1/users/forgotPassword',
        data: {
          ...data,
          token: router.query.token,
        },
      });
      if (res.status === 200) {
        router.push('/admin');
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert(
        'looks like there was a problem resetting your password... Contact your developer.'
      );
      setIsLoading(false);
    }
  };

  return (
    <>
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
          <FormControl id='password'>
            <FormLabel>New Password</FormLabel>
            <Input
              type='password'
              name='password'
              placeholder='Something super secret'
              onChange={handleChange}
              value={data.password}
            />
          </FormControl>
          <FormControl id='passwordConfirm'>
            <FormLabel>Confirm New Password</FormLabel>
            <Input
              type='password'
              name='passwordConfirm'
              placeholder='The same secret'
              onChange={handleChange}
              value={data.passwordConfirm}
            />
          </FormControl>
          <Button mt={4} isLoading={isLoading} type='submit'>
            Submit
          </Button>
        </form>
      </Flex>
    </>
  );
};

export default ResetPassword;
