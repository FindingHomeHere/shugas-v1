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

const LabelText = styled(Text)`
  font-weight: bold;
`;

export default class ApplyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      position: '',
      question1: '',
      question2: '',
      question3: '',
      resume: null,
      error: {
        resume: '',
      },
    };
    this.onChange = this.onChange.bind(this);
    this.onResumeChange = this.onResumeChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  isDisabled() {
    if (this.state.error.resume) {
      return true;
    } else {
      return false;
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  }

  onResumeChange(e) {
    if (!e.target.files) {
      return;
    }
    if (e.target.files) {
      if (e.target.files[0].type === 'application/pdf') {
        console.log(e.target.files[0]);
        this.setState({ resume: e.target.files[0], error: { resume: '' } });
      } else {
        this.setState({
          error: { resume: 'Your resume needs to be a pdf...' },
        });
      }
    }
  }

  phoneFormat(e) {
    // if (!e.currentTarget.value) {
    //   return;
    // }
    if (e.currentTarget.value !== null) {
      const x = e.currentTarget.value
        .replace(/\D/g, '')
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.currentTarget.value = !x[2]
        ? x[1]
        : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }
  }

  async onFormSubmit(e) {
    try {
      e.preventDefault();
      let formData = new FormData();
      formData.append('resume', this.state.resume);
      formData.append('name', this.state.name);
      formData.append('email', this.state.email);
      formData.append('phone', this.state.phone);
      formData.append('position', this.state.position);
      formData.append('question1', this.state.question1);
      formData.append('question2', this.state.question2);
      formData.append('question3', this.state.question3);

      await axios({
        method: 'POST',
        url: `/api/v1/apps`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });

      alert('Your application has been sent!');
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <form method='post' onSubmit={this.onFormSubmit}>
        <Stack spacing={3} my={4} w='100%'>
          <FormControl id='name' isRequired>
            <LabelText>Name</LabelText>
            <Input
              onChange={this.onChange}
              name='name'
              type='text'
              value={this.state.name}
            />
          </FormControl>
          <FormControl isRequired>
            <LabelText>Email</LabelText>
            <Input
              onChange={this.onChange}
              name='email'
              type='email'
              value={this.state.email}
            />
          </FormControl>
          <FormControl isRequired>
            <LabelText>Phone Number</LabelText>
            <Input
              onChange={this.onChange}
              onKeyDown={this.phoneFormat}
              name='phone'
              type='tel'
              value={this.state.phone}
            />
          </FormControl>
          <FormControl isRequired>
            <LabelText>Position</LabelText>
            <Select
              onChange={this.onChange}
              value={this.state.position}
              name='position'
            >
              <option value='foh'>Front of House</option>
              <option value='boh'>Back of House</option>
              <option value='prep'>Prep</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <LabelText>Why do you want to work at Shuga's?</LabelText>
            <Input
              as={Textarea}
              onChange={this.onChange}
              name='question1'
              value={this.state.question1}
            />
          </FormControl>
          <FormControl isRequired>
            <LabelText>What is your favorite film made before 1969?</LabelText>
            <Input
              as={Textarea}
              onChange={this.onChange}
              name='question2'
              value={this.state.question2}
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
              onChange={this.onChange}
              name='question3'
              value={this.state.question3}
            />
          </FormControl>
          <h1>Resumé (We can currently only accept PDF format)</h1>
          <input
            type='file'
            accept='application/pdf'
            name='resume'
            onChange={this.onResumeChange}
          />
          {!!this.state.error.resume && (
            <Text color='red.300'>{this.state.error.resume}</Text>
          )}
          <Button
            type='submit'
            isDisabled={this.isDisabled()}
            colorScheme='brand'
          >
            Submit
          </Button>
        </Stack>
      </form>
    );
  }
}
