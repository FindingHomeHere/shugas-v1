import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Heading,
  FormLabel,
  FormControl,
  Spinner,
  Input,
  Button,
  VStack,
  Text,
} from '@chakra-ui/react';
import cookie from 'cookie-cutter';
import axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  let userData = {};

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    setIsLoading(true);

    await axios({
      method: 'POST',
      url: `/api/v1/users/login`,
      headers: { 'Content-Type': 'application/json' },
      data: { ...user },
    })
      .then((user) => {
        userData = user.data;
        const token = userData.token;
        cookie.set('jwt', token, {
          maxAge: process.env.JWT_COOKIE_EXPIRES_IN * 86400000, // 86400000 ms in a day
        });
        router.push('/admin/dashboard');
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        const errorText = err.message;
        if (errorText.includes('401')) {
          setError('incorrect email or password, try again');
        } else {
          setError('Looks like something went wrong, try again soon');
        }
        console.log(`LOGIN ERROR ${errorText}`);
        setIsLoading(false);
      });
  };
  return (
    <>
      <Heading mb={2}>login</Heading>
      <VStack>
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <FormControl id='email'>
            <FormLabel>email</FormLabel>
            <Input
              w='100%'
              onChange={handleEmailChange}
              placeholder='me@example.com'
              value={email}
              type='email'
            />
          </FormControl>
          <FormControl>
            <FormLabel id='password'>password</FormLabel>
            <Input
              w='100%'
              name='password'
              onChange={handlePasswordChange}
              value={password}
              placeholder='keep it super secret'
              type='password'
            />
          </FormControl>
          {!!error && <Text color='red.300'>{error}</Text>}
          <Button
            colorScheme='brand'
            isLoading={isLoading}
            spinner={<Spinner />}
            mt={2}
            type='submit'
          >
            log in
          </Button>
        </form>
      </VStack>
    </>
  );
};

export default LoginForm;
