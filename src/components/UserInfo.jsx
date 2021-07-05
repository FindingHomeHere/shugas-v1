import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Heading,
  VStack,
  Button,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';

const UserInfo = ({ user, token }) => {
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handlePasswordCurrentChange = (e) => {
    setPasswordCurrent(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfrimChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'PATCH',
        url: `/api/v1/users/updatePassword`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          passwordCurrent,
          password,
          passwordConfirm,
        },
      });
      if (res.status === 200) {
        alert('Password Updated Successfully');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Flex direction='column'>
        <Heading>{user.name}</Heading>
        <Text variant='typewriter'>{user.email}</Text>
      </Flex>
      <VStack>
        <form style={{ width: '100%' }} onSubmit={handlePasswordSubmit}>
          <FormControl id='passwordCurrent'>
            <FormLabel>Current Password</FormLabel>
            <Input onChange={handlePasswordCurrentChange} type='password' />
          </FormControl>
          <FormControl id='password'>
            <FormLabel>New Password</FormLabel>
            <Input onChange={handlePasswordChange} type='password' />
          </FormControl>
          <FormControl id='passwordConfirm'>
            <FormLabel>Confirm New Password</FormLabel>
            <Input onChange={handlePasswordConfrimChange} type='password' />
          </FormControl>
          <Button type='submit' mt={2} colorScheme='brand'>
            Update Password
          </Button>
        </form>
      </VStack>
    </>
  );
};

export default UserInfo;
