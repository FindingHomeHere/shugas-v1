import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import moment from 'moment';
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

  // const handleDelete = async (e) => {
  //   const id = e.target.closest('button').value;
  //   const answer = confirm('Are you sure you want to delete this application?');
  //   try {
  //     if (answer) {
  //       await axios({
  //         method: 'DELETE',
  //         url: `/api/v1/apps/${id}`,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       alert('Successfully deleted application');
  //       location.reload();
  //     } else {
  //       return null;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleRead = async (e) => {
  //   const id = e.target.closest('button').value;
  //   try {
  //     await axios({
  //       method: 'PATCH',
  //       url: `/api/v1/apps/${id}`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       data: {
  //         isViewed: true,
  //       },
  //     });
  //     location.reload();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleUnread = async (e) => {
  //   const id = e.target.closest('button').value;
  //   try {
  //     await axios({
  //       method: 'PATCH',
  //       url: `/api/v1/apps/${id}`,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       data: {
  //         isViewed: false,
  //       },
  //     });
  //     location.reload();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
        {!isValidating && apps.data.length === 0 && (
          <Text variant='typewriter'>
            Looks Like there are no applications yet...
            <br />
            Check back soon!
          </Text>
        )}
        {!isValidating && apps.data.length !== 0 && (
          <Heading>New applications</Heading>
        )}
        {!isValidating &&
          apps.data.map((el) => {
            const firstName = el.name.split(' ')[0];
            console.log(el);
            if (!el.isViewed) {
              return (
                <>
                  <Flex
                    key={el._id + '-' + firstName}
                    w='100%'
                    p={4}
                    borderWidth={1}
                    borderColor='brandAlpha.100'
                    borderRadius='md'
                  >
                    <Box w='100%'>
                      <Heading>{el.name}</Heading>
                      <Text>{el.email}</Text>
                      <Text>{el.phone}</Text>
                      <Text>
                        {moment(el.created_at).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                      <Text>
                        <strong>Desired Position: </strong>
                        {el.position}
                      </Text>
                      <Link href={`/uploads/resumes/${el.resume}`} passHref>
                        <Text as='a' variant='typewriterNav' target='_blank'>
                          View {firstName}'s resume!
                        </Text>
                      </Link>
                    </Box>
                  </Flex>
                </>
              );
            } else {
              <Text key={el._id}>
                Looks like there are no new applications
              </Text>;
            }
          })}
        {!isValidating && apps.data.length !== 0 && (
          <Heading>Older applications</Heading>
        )}
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
                    <Box w='100%'>
                      <Heading>{el.name}</Heading>
                      <Text>{el.email}</Text>
                      <Text>{el.phone}</Text>
                      <Text>
                        {moment(el.created_at).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </Text>
                      <Text>
                        <strong>Desired Position: </strong>
                        {el.position}
                      </Text>
                      <Link href={`/uploads/resumes/${el.resume}`} passHref>
                        <Text as='a' variant='typewriterNav' target='_blank'>
                          View {firstName}'s resume!
                        </Text>
                      </Link>
                    </Box>

                    {/* <VStack
                      key={el._id}
                      spacing={1}
                      // value={el._id}
                    >
                      <IconButton
                        aria-label='Delete this Application'
                        name='delete'
                        colorScheme='red'
                        value={el._id}
                        onClick={handleDelete}
                        icon={<BsTrash />}
                      />
                      <IconButton
                        aria-label='Mark as Read/unread'
                        name='isViewed'
                        colorScheme='brand'
                        value={el._id}
                        onClick={!el.isViewed ? handleRead : handleUnread}
                        icon={el.isViewed ? <BsEyeFill /> : <BsEye />}
                      />
                    </VStack> */}
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
