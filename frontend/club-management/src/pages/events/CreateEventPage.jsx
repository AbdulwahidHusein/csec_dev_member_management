import { useState } from 'react';
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
  useClipboard,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { BsCalendar, BsClock } from 'react-icons/bs';

function EventCreationForm() {
  const { hasCopied, onCopy } = useClipboard('example@example.com');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sendNotification, setSendNotification] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
                      name="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      width="100%"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Time</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <BsClock />
                    </InputLeftElement>
                    <Input
                      type="time"
                      name="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      width="100%"
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <Checkbox
                    isChecked={sendNotification}
                    onChange={(e) => setSendNotification(e.target.checked)}
                  >
                    Send Notification Email
                  </Checkbox>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  width="full"
                >
                  Create Event
                </Button>
              </Stack>
            </form>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}

function CreateEventPage() {
  return <EventCreationForm />;
}

export default CreateEventPage;