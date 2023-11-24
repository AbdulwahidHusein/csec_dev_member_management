import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  useColorModeValue,
  VStack,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  CloseButton
} from '@chakra-ui/react';
import { BsCalendar, BsClock } from 'react-icons/bs';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { CheckCircleIcon } from '@chakra-ui/icons';

function Success({ onClose }) {
  return (
    <AlertDialog isOpen={true} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Event was Created
        </AlertDialogHeader>
        <AlertDialogBody>
          <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
          <Text color={'gray.500'}>
            The event was successfully created, and an email notification will be sent!
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EventCreationForm() {
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start_date, setDate] = useState('');
  const [start_time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [sendNotification, setSendNotification] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      description: description,
      start_date: start_date,
      start_time: start_time,
      duration: duration
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/events/', formData);
      console.log(formData);
      setSuccess(true);
    } catch (error) {
      setError('');
      console.error(error);
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  return (
    <Flex
      bg={useColorModeValue('gray.100', 'gray.900')}
      align="center"
      justify="center"
      css={{
        backgroundAttachment: 'fixed',
      }}
      id="contact"
    >
      <Box
        borderRadius="lg"
        m={{ base: 5, md: 16, lg: 10 }}
        p={{ base: 5, lg: 16 }}
        boxShadow="xl"
        bg={useColorModeValue('white', 'gray.800')}
        width={{ base: 'full', md: 'auto' }}
        maxW="900px"
        minW="500px"
      >
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              fontSize={{
                base: '4xl',
                md: '5xl',
              }}
            >
              Create Event
            </Heading>
            <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
              <Stack spacing={{ base: 4, md: 8 }}>
                <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <BsCalendar />
                    </InputLeftElement>
                    <Input
                      type="text"
                      name="title"
                      placeholder="Event Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      width="100%"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    size="lg"
                    resize="vertical"
                    minH="100px"
                    width="100%"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <BsCalendar />
                    </InputLeftElement>
                    <Input
                      type="date"
                      name="start_date"
                      value={start_date}
                      onChange={(e) => setDate(e.target.value)}
                      width="100%"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Time</FormLabel>
                  <InputGroup>
```jsx
                    <InputLeftElement>
                      <BsClock />
                    </InputLeftElement>
                    <Input
                      type="time"
                      name="start_time"
                      value={start_time}
                      onChange={(e) => setTime(e.target.value)}
                      width="100%"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Duration (in minutes)</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <BsClock />
                    </InputLeftElement>
                    <Input
                      type="number"
                      name="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      width="100%"
                    />
                  </InputGroup>
                </FormControl>

                <Checkbox
                  colorScheme="blue"
                  isChecked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                >
                  Send Notification
                </Checkbox>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  fontWeight="bold"
                  width="100%"
                >
                  Create Event
                </Button>
              </Stack>
            </form>
          </VStack>
        </Box>
      </Box>
      {success && <Success onClose={handleCloseSuccess} />}
    </Flex>
  );
}

export default EventCreationForm;