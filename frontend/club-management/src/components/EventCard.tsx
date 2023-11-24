import React from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from '@chakra-ui/react';

let IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

function ProductSimple(props) {
  if (!props.eventData.image) {
    IMAGE = 'src/assets/csec_astu.jpeg';
  } else {
    IMAGE = props.eventData.image;
  }
  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'430px'}
        minW={'400px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(1px)',
            },
          }}
        ></Box>
        <Stack pt={10} align={'center'}>
          <Heading fontSize={'lg'} isTruncated>
            {props.eventData.title}
          </Heading>
          <Text
            fontSize={'1xl'}
            fontFamily={'body'}
            fontWeight={500}
            noOfLines={4}
          >
            {props.eventData.description}
          </Text>
          <Stack direction={'column'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {props.eventData.start_date}
            </Text>
            <Text fontWeight={800} fontSize={'xl'}>
              {props.eventData.start_time}
            </Text>
          </Stack>
          <Text>CESC DEV</Text>
          {!props.eventData.subscribed && <Button>Subscribe</Button>}
          {props.eventData.subscribed && <Text>Subscribed</Text>}
        </Stack>
      </Box>
    </Center>
  );
}

function EventCard(props) {
  const { eventData } = props;

  return <ProductSimple eventData={eventData} />;
}

export default EventCard;