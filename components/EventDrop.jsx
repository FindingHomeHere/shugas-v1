import React, { Component } from 'react';
import axios from 'axios';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Heading, Text } from '@chakra-ui/react';

export default class EventDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      error: null,
    };
    this.token = this.props.token;
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isDisabled() {
    if (this.state.error) {
      return true;
    } else {
      return false;
    }
  }

  async onFormSubmit(e) {
    try {
      e.preventDefault();
      let formData = new FormData();
      formData.append('event', this.state.file);

      const res = await axios({
        method: 'PATCH',
        url: `/api/v1/events`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      });

      alert('Your event menu has been uploaded!');
    } catch (err) {
      console.error(err);
    }
  }

  onChange(e) {
    if (!e.target.files) {
      return;
    }
    if (e.target.files) {
      if (e.target.files[0].type === 'application/pdf') {
        this.setState({ file: e.target.files[0], error: null });
      } else {
        this.setState({
          error: 'Your event needs to be a pdf...',
        });
      }
    }
  }

  render() {
    return (
      <form method='post' onSubmit={this.onFormSubmit}>
        <Heading>Upload a new event menu</Heading>
        <p>Drag and drop, or click choose file</p>
        <Input
          padding={16}
          borderWidth={1}
          cursor='pointer'
          accept='application/pdf'
          borderStyle='dashed'
          type='file'
          name='event'
          onChange={this.onChange}
        />
        {!!this.state.error && <Text color='red.300'>{this.state.error}</Text>}
        <Button
          mt={2}
          colorScheme='brand'
          isDisabled={this.isDisabled()}
          type='submit'
        >
          Upload
        </Button>
      </form>
    );
  }
}
