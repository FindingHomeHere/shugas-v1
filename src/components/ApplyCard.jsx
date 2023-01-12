import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { BsTrash, BsEyeFill, BsEye } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/button';
import Link from 'next/link';
import axios from 'axios';

const ApplyCard = ({ user, i, token, isViewed }) => {
  const firstName = user.name.split(' ')[0];

  console.log(user);

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
        location.reload();
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
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnread = async (e) => {
    const id = e.target.closest('button').value;
    try {
      // console.log(id);
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
      location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex
      key={isViewed ? `${user._id}${i}-viewed` : `${user._id}${i}`}
      w='100%'
      p={4}
      borderWidth={1}
      borderColor='brandAlpha.100'
      borderRadius='md'
    >
      <Box key={`${user._id}${i}-container`} w='100%'>
        <Heading key={`${user._id}${i}-${user.firstName}`}>{user.name}</Heading>
        <Text key={`${user._id}${i}-${user.email}`}>{user.email}</Text>
        <Text key={`${user._id}${i}-${user.phone}`}>{user.phone}</Text>
        <Text key={`${user._id}${i}-${user.position}`}>
          <strong>Desired Position: </strong>
          {user.position}
        </Text>
        <strong>-- </strong>
        <Text key={`${user._id}${i}-${user.question1}1`}>{user.question1}</Text>
        <strong>-- </strong>
        <Text key={`${user._id}${i}-${user.question2}2`}>{user.question2}</Text>
        <strong>-- </strong>
        <Text key={`${user._id}${i}-${user.question3}3`}>{user.question3}</Text>
        <Link
          key={`${user._id}${i}-${user.resume}`}
          href={user.resume}
          passHref
        >
          <Text as='a' variant='typewriterNav' target='_blank'>
            View {firstName}'s resume!
          </Text>
        </Link>
      </Box>

      <VStack ml={2} key={`${user._id}${i}-ButtonGroupRead`} spacing={1}>
        <IconButton
          key={`${user._id}${i}-deleteBtnRead`}
          aria-label='Delete this Application'
          name='delete'
          colorScheme='red'
          value={user._id}
          onClick={handleDelete}
          icon={<BsTrash />}
        />
        <IconButton
          key={`${user._id}${i}-unreadBtn`}
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
