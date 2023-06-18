import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { BsTrash, BsEyeFill, BsEye } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

const ApplyCard = ({ user, token }) => {
  const firstName = user.name.split(' ')[0];
  const router = useRouter();

  const handleDelete = async (e) => {
    const id = e.target.closest('button').value;
    const answer = confirm(
      'Are you sure you want to delete this application? This cannot be undone.'
    );
    try {
      if (answer) {
        await axios({
          method: 'DELETE',
          url: `/api/v1/apps/${id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            doc: {
              id: id,
            },
          },
        });
        alert('Successfully deleted application');
        router.reload();
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRead = async (e) => {
    const id = e.target.closest('button').value;
    try {
      await axios({
        method: 'PATCH',
        url: `/api/v1/apps/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          doc: {
            id: id,
            isViewed: true,
          },
        },
      });
      router.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnread = async (e) => {
    const id = e.target.closest('button').value;
    try {
      await axios({
        method: 'PATCH',
        url: `/api/v1/apps/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          doc: {
            id: id,
            isViewed: false,
          },
        },
      });
      router.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex
      w='100%'
      p={4}
      borderWidth={1}
      borderColor='brandAlpha.100'
      borderRadius='md'
    >
      <Box w='100%'>
        <Heading>{user.name}</Heading>
        <Text>
          Applied on: {new Date(user.created_at).toLocaleDateString('en-US')}
        </Text>
        <Text>{user.email}</Text>
        <Text>{user.phone}</Text>
        <Text>
          <strong>Desired Position: </strong>
          {user.position}
        </Text>
        <strong>-- </strong>
        <Text>{user.question1}</Text>
        <strong>-- </strong>
        <Text>{user.question2}</Text>
        <strong>-- </strong>
        <Text>{user.question3}</Text>
        <Link href={user.resume} target='_blank' passHref>
          <Text variant='typewriterNav'>View {firstName}'s resume!</Text>
        </Link>
      </Box>

      <VStack ml={2} spacing={1}>
        <IconButton
          aria-label='Delete this Application'
          name='delete'
          colorScheme='red'
          value={user._id}
          onClick={handleDelete}
          icon={<BsTrash />}
        />
        <IconButton
          aria-label='Mark as Read/unread'
          name='isViewed'
          colorScheme='brand'
          value={user._id}
          onClick={!user.isViewed ? handleRead : handleUnread}
          icon={user.isViewed ? <BsEyeFill /> : <BsEye />}
        />
      </VStack>
    </Flex>
  );
};

export default ApplyCard;
