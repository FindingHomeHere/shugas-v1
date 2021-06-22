import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { BsTrash, BsEyeFill, BsEye } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/button';

const ApplicationView = (props) => {
  const { token } = props;
  let apps = {};
  const fetcher = (url) =>
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.data.data);
  const { data, error, isValidating } = useSWR(`/api/v1/apps`, fetcher);

  if (!!data) {
    apps = data;
  }

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
    <>
      {isValidating && <Spinner colorScheme='brand' />}
      <VStack spacing={4} w='100%'>
        {error && (
          <Text variant='typewriter' color='red.200'>
            error fetching new applications,
            <br /> try again!
          </Text>
        )}
        {!isValidating && <Heading>New applications</Heading>}
        {!isValidating &&
          apps.data.map((el) => {
            const firstName = el.name.split(' ')[0];
            if (!el.isViewed) {
              return (
                <>
                  <Flex
                    key={el._id}
                    w='100%'
                    p={4}
                    borderWidth={1}
                    borderColor='brandAlpha.100'
                    borderRadius='md'
                  >
                    <Box key={`${el._id}-container`} w='100%'>
                      <Heading key={`${el._id}-${el.firstName}`}>
                        {el.name}
                      </Heading>
                      <Text key={`${el._id}-${el.email}`}>{el.email}</Text>
                      <Text key={`${el._id}-${el.phone}`}>{el.phone}</Text>
                      <Text key={`${el._id}-${el.position}`}>
                        <strong>Desired Position: </strong>
                        {el.position}
                      </Text>
                      <Text key={`${el._id}-${el.question1}-1`}>
                        {el.question1}
                      </Text>
                      <Text key={`${el._id}-${el.question2}-2`}>
                        {el.question2}
                      </Text>
                      <Text key={`${el._id}-${el.question3}-3`}>
                        {el.question3}
                      </Text>
                      <Link
                        key={`${el._id}-${el.resume}`}
                        href={`/uploads/resumes/${el.resume}`}
                        passHref
                      >
                        <Text as='a' variant='typewriterNav' target='_blank'>
                          View {firstName}'s resume!
                        </Text>
                      </Link>
                    </Box>

                    <VStack key={`${el._id}-ButtonGroup`} spacing={1}>
                      <IconButton
                        key={`${el._id}-deleteBtn`}
                        aria-label='Delete this Application'
                        tooltip='Delete this Application'
                        name='delete'
                        colorScheme='red'
                        value={el._id}
                        onClick={handleDelete}
                        icon={<BsTrash />}
                      />
                      <IconButton
                        key={`${el._id}-readBtn`}
                        aria-label='Mark as Read/unread'
                        name='isViewed'
                        colorScheme='brand'
                        value={el._id}
                        onClick={!el.isViewed ? handleRead : handleUnread}
                        icon={el.isViewed ? <BsEyeFill /> : <BsEye />}
                      />
                    </VStack>
                  </Flex>
                </>
              );
            }
          })}
        {!isValidating && <Heading>Older applications</Heading>}
        {!isValidating &&
          apps.data.map((el) => {
            const firstName = el.name.split(' ')[0];
            if (el.isViewed) {
              return (
                <>
                  <Flex
                    key={el._id}
                    w='100%'
                    p={4}
                    borderWidth={1}
                    borderColor='brandAlpha.100'
                    borderRadius='md'
                  >
                    <Box key={`${el._id}-container-viewed`} w='100%'>
                      <Heading key={`${el._id}-${el.firstName}-viewed`}>
                        {el.name}
                      </Heading>
                      <Text key={`${el._id}-${el.email}-viewed`}>
                        {el.email}
                      </Text>
                      <Text key={`${el._id}-${el.phone}-viewed`}>
                        {el.phone}
                      </Text>
                      <Text key={`${el._id}-${el.position}-viewed`}>
                        <strong>Desired Position: </strong>
                        {el.position}
                      </Text>
                      <Text key={`${el._id}-${el.question1}-viewed`}>
                        {el.question1}
                      </Text>
                      <Text key={`${el._id}-${el.question2}-viewed`}>
                        {el.question2}
                      </Text>
                      <Text key={`${el._id}-${el.question3}-viewed`}>
                        {el.question3}
                      </Text>
                      <Link
                        key={`${el._id}-${el.resume}-viewed`}
                        href={`/uploads/resumes/${el.resume}`}
                        passHref
                      >
                        <Text as='a' variant='typewriterNav' target='_blank'>
                          View {firstName}'s resume!
                        </Text>
                      </Link>
                    </Box>

                    <VStack key={`${el._id}-ButtonGroupRead`} spacing={1}>
                      <IconButton
                        key={`${el._id}-deleteBtnRead`}
                        aria-label='Delete this Application'
                        name='delete'
                        colorScheme='red'
                        value={el._id}
                        onClick={handleDelete}
                        icon={<BsTrash />}
                      />
                      <IconButton
                        key={`${el._id}-unreadBtn`}
                        aria-label='Mark as Read/unread'
                        name='isViewed'
                        colorScheme='brand'
                        value={el._id}
                        onClick={!el.isViewed ? handleRead : handleUnread}
                        icon={el.isViewed ? <BsEyeFill /> : <BsEye />}
                      />
                    </VStack>
                  </Flex>
                </>
              );
            }
          })}
      </VStack>
    </>
  );
};

export default ApplicationView;
