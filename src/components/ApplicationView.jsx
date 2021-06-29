import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import { BsTrash, BsEyeFill, BsEye } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/button';
import { SimpleGrid } from '@chakra-ui/react';

const ApplicationView = (props) => {
  const { token } = props;
  let apps = {data: {}};
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

  if (apps.data.length < 1 || !apps.data.length) {
    return (
      <>
        <Text variant='typewriter'>Looks like no one has applied yet... try again soon!</Text>
      </>
    )
  }
  if (apps.data.length > 0) {

    return (
      <>
      {isValidating && <Spinner colorScheme='brand' />}
      <VStack spacing={4} w='100%' mx='auto'>
        {error && (
          <Text key={`${error}`} variant='typewriter' color='red.200'>
            error fetching new applications,
            <br /> try again!
          </Text>
        )}
        {!isValidating && <Heading>New applications</Heading>}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>

        {!!apps.data &&
          apps.data.map((el, i) => {
            const firstName = el.name.split(' ')[0];
            if (!el.isViewed) {
              return (
                <>
                  <Flex
                    key={`${el._id}${i}`}
                    w='100%'
                    p={4}
                    borderWidth={1}
                    borderColor='brandAlpha.100'
                    borderRadius='md'
                    >
                    <Box key={`${el._id}${i}-container`} w='100%'>
                      <Heading key={`${el._id}${i}-${el.firstName}`}>
                        {el.name}
                      </Heading>
                      <Text key={`${el._id}${i}-${el.email}`}>{el.email}</Text>
                      <Text key={`${el._id}${i}-${el.phone}`}>{el.phone}</Text>
                      <Text key={`${el._id}${i}-${el.position}`}>
                        <strong>Desired Position: </strong>
                        {el.position}
                      </Text>
                      <Text key={`${el._id}${i}-${el.question1}-1`}>
                        {el.question1}
                      </Text>
                      <Text key={`${el._id}${i}-${el.question2}-2`}>
                        {el.question2}
                      </Text>
                      <Text key={`${el._id}${i}-${el.question3}-3`}>
                        {el.question3}
                      </Text>
                      <Link
                        key={`${el._id}${i}-${el.resume}`}
                        href={el.resume}
                        passHref
                        >
                        <Text as='a' variant='typewriterNav' target='_blank'>
                          open {firstName}'s resume!
                        </Text>
                      </Link>
                    </Box>

                    <VStack ml={2} key={`${el._id}${i}-ButtonGroup`} spacing={1}>
                      <IconButton
                        key={`${el._id}${i}-deleteBtn`}
                        aria-label='Delete this Application'
                        tooltip='Delete this Application'
                        name='delete'
                        colorScheme='red'
                        value={el._id}
                        onClick={handleDelete}
                        icon={<BsTrash />}
                        />
                      <IconButton
                        key={`${el._id}${i}-readBtn`}
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
          </SimpleGrid>
        {!isValidating && <Heading>Older applications</Heading>}
                <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={4}>
{!isValidating &&
          apps.data.map((el, i) => {
            const firstName = el.name.split(' ')[0];
            if (el.isViewed) {
              return (
                <>
                  <Flex
                    key={`${el._id}${i}`}
                    w='100%'
                    p={4}
                    borderWidth={1}
                    borderColor='brandAlpha.100'
                    borderRadius='md'
                    >
                    <Box key={`${el._id}${i}-container-viewed`} w='100%'>
                      <Heading key={`${el._id}${i}-${el.firstName}-viewed`}>
                        {el.name}
                      </Heading>
                      <Text key={`${el._id}${i}-${el.email}-viewed`}>
                        {el.email}
                      </Text>
                      <Text key={`${el._id}${i}-${el.phone}-viewed`}>
                        {el.phone}
                      </Text>
                      <Text key={`${el._id}${i}-${el.position}-viewed`}>
                        <strong>Desired Position: </strong>
                        {el.position}
                      </Text>
                      <Text key={`${el._id}${i}-${el.question1}1-viewed`}>
                        {el.question1}
                      </Text>
                      <Text key={`${el._id}${i}-${el.question2}2-viewed`}>
                        {el.question2}
                      </Text>
                      <Text key={`${el._id}${i}-${el.question3}3-viewed`}>
                        {el.question3}
                      </Text>
                      <Link
                        key={`${el._id}${i}-${el.resume}-viewed`}
                        href={`/uploads/resumes/${el.resume}`}
                        passHref
                        >
                        <Text as='a' variant='typewriterNav' target='_blank'>
                          View {firstName}'s resume!
                        </Text>
                      </Link>
                    </Box>

                    <VStack ml={2} key={`${el._id}${i}-ButtonGroupRead`} spacing={1}>
                      <IconButton
                        key={`${el._id}${i}-deleteBtnRead`}
                        aria-label='Delete this Application'
                        name='delete'
                        colorScheme='red'
                        value={el._id}
                        onClick={handleDelete}
                        icon={<BsTrash />}
                        />
                      <IconButton
                        key={`${el._id}${i}-unreadBtn`}
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
          </SimpleGrid>
      </VStack>
    </>
  );
}
};

export default ApplicationView;
