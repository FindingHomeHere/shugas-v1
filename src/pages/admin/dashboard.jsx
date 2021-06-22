import React from 'react';
import { setCookie } from 'nookies';
import { parseCookies } from '../../lib';
import { useRouter } from 'next/router';
import axios from 'axios';
import AdminDashboard from '../../components/AdminDashboard';
import { Flex, Button } from '@chakra-ui/react';
import cookie from 'cookie-cutter';

const Dashboard = (props) => {
  const router = useRouter();
  const { user } = props;
  let token = props.token.jwt;

  const onLogout = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `/api/v1/users/logout`,
      });
      token = '';
      if (res.data.status === 'success') {
        router.push('/admin');
        cookie.set('jwt', token, {
          expires: Date.now() - 1000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex minH='85vh' align='center' justify='center'>
      <Flex
        my={4}
        h='contain'
        minH='600px'
        direction='column'
        align='center'
        justify='center'
      >
        <Button
          colorScheme='brand'
          position='relative'
          top='8.5rem'
          p={4}
          right='-9rem'
          zIndex={10}
          onClick={() => onLogout()}
        >
          Log out
        </Button>
        <AdminDashboard user={user} token={token} />
      </Flex>
    </Flex>
  );
};

export const getServerSideProps = async ({ req }) => {
  try {
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 86400000
      ), // 86400000 ms in a day
    };

    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    const token = parseCookies(req);
    if (token.jwt) {
      setCookie(req, 'jwt', token.jwt, cookieOptions);
    }

    const method = req.protocol ? req.protocol : 'http';

    const res = await axios({
      method: 'GET',
      url: `${method}://${req.headers.host}/api/v1/users/me`,
      headers:
        token.jwt === undefined ? '' : { Authorization: `Bearer ${token.jwt}` },
    });

    const user = res.data.data.data;
    if (!user || !token || !token.jwt || !token.jwt.length) {
      return new Error('Unauthorized');
    }

    return {
      props: {
        user,
        token,
      },
    };
  } catch (err) {
    const errorTex = JSON.stringify(err);
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: '/admin',
      },
    };
  }
};

export default Dashboard;
