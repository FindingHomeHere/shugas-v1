import {
  Button,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useRouter } from 'next/router';

const LabelText = styled(Text)`
  font-weight: bold;
`;

export default function ApplyForm() {
  const router = useRouter();
  const [resume, setResume] = React.useState(null);
  const [info, setInfo] = React.useState({
    name: '',
    email: '',
    phone: '',
    position: 'foh',
    question1: '',
    question2: '',
    question3: '',
  });
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const isDisabled = () => {
    if (!!error) {
      return true;
    } else {
      return false;
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const onResumeChange = (e) => {
    if (!e.target.files) {
      return;
    }
    if (e.target.files) {
      if (e.target.files[0].type === 'application/pdf') {
        setResume(e.target.files[0]);
        setError(null);
      } else {
        setError('Your resume needs to be a pdf...');
      }
    }
  };

  const phoneFormat = (e) => {
    if (e.currentTarget.value !== null) {
      const x = e.currentTarget.value
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.currentTarget.value = !x[2]
        ? x[1]
        : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let formData = new FormData();
      formData.append('resume', resume);
      formData.append('name', info.name);
      formData.append('email', info.email);
      formData.append('phone', info.phone);
      formData.append('position', info.position);
      formData.append('question1', info.question1);
      formData.append('question2', info.question2);
      formData.append('question3', info.question3);

      const res = await axios({
        method: 'POST',
        url: `/api/v1/apps`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });

      if (res.data.status === 'success') {
        alert('Your application has been sent!');
        setIsLoading(false);
        router.push('/');
      }
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
    setIsLoading(false);
  };
  return (
    <form method='post' onSubmit={onFormSubmit}>
      <Stack spacing={3} my={4} w='100%'>
        <FormControl id='name' isRequired>
          <LabelText>Name</LabelText>
          <Input
            onChange={onChange}
            name='name'
            type='text'
            value={info.name}
          />
        </FormControl>
        <FormControl isRequired>
          <LabelText>Email</LabelText>
          <Input
            onChange={onChange}
            name='email'
            type='email'
            value={info.email}
          />
        </FormControl>
        <FormControl isRequired>
          <LabelText>Phone Number</LabelText>
          <Input
            onChange={onChange}
            onKeyDown={phoneFormat}
            onPaste={phoneFormat}
            name='phone'
            type='tel'
            value={info.phone}
          />
        </FormControl>
        <FormControl isRequired>
          <LabelText>Position</LabelText>
          <Select onChange={onChange} value={info.position} name='position'>
            <option value='foh'>Front of House</option>
            <option value='boh'>Back of House</option>
            <option value='prep'>Prep</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <LabelText>Why do you want to work at Shuga's?</LabelText>
          <Input
            as={Textarea}
            onChange={onChange}
            name='question1'
            value={info.question1}
          />
        </FormControl>
        <FormControl isRequired>
          <LabelText>What is your favorite film made before 1969?</LabelText>
          <Input
            as={Textarea}
            onChange={onChange}
            name='question2'
            value={info.question2}
          />
        </FormControl>
        <FormControl isRequired>
          <LabelText>
            At Shuga's we have cultivated a diverse and inclusive culture with
            respect to our staff and guests. We don't just accept our
            differences - we support them, we celebrate them, and we thrive on
            them. In what ways will you thrive in this culture?
          </LabelText>
          <Input
            as={Textarea}
            onChange={onChange}
            name='question3'
            value={info.question3}
          />
        </FormControl>
        <FormControl isRequired>
          <LabelText>
            Resumé (We can currently only accept PDF format)
          </LabelText>
          <Input
            type='file'
            my={2}
            variant='unstyled'
            accept='application/pdf'
            name='resume'
            onChange={onResumeChange}
          />
        </FormControl>
        {!!error && <Text color='red.300'>{error}</Text>}
        <Button
          type='submit'
          isDisabled={isDisabled()}
          colorScheme='brand'
          isLoading={isLoading}
        >
          Submit
        </Button>
      </Stack>
    </form>
  );
}
