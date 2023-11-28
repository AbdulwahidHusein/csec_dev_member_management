import React from 'react';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

function DivisionData(props) {
  return (
    <Center py={6}>
      <Box
        minW={['100%', '200px', '400px']}
        w={['100%', '50%', '33.33%']}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
            <Image
            src={props.divdata.logo} 
            />
        <Box p={6}>
          <Stack spacing={3} align={'center'} mb={5}>
            <Heading fontSize={['xl', '2xl']} fontWeight={500} fontFamily={'body'}>
              {props.divdata.name}
            </Heading>
            <Text color={'gray.500'}>{props.divdata.description}</Text>
            <Text color={'gray.500'}>{props.divdata.totalcount} Members</Text>
          </Stack>
          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                {props.divdata.femalecount}
              </Text>
            </Stack>
          </Stack>

          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}>
            View More
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

const divdata = [
  {
    divname: 'CSEC CPD',
    totalcount: '70',
    malecount: '50',
    femalecount: '20',
    preisdent : "Mr x",
    preisdentAvatar : "image"
  },
  {
    divname: 'CSEC CPD',
    preisdent : "Mr x",
    totalcount: '70',
    malecount: '50',
    femalecount: '20',
    preisdentAvatar : "image"
  },
  {
    divname: 'CSEC CPD',
    totalcount: '70',
    malecount: '50',
    femalecount: '20',
    preisdent : "Mr x",
    preisdentAvatar : "image"
  },
  {
    divname: 'CSEC CPD',
    totalcount: '70',
    malecount: '50',
    femalecount: '20',
    preisdent : "Mr x",
    preisdentAvatar : "image"
  },
];
import axios from 'axios';
import { useState, useEffect } from 'react';
function DivisionPage() {
    const [divisionData, setDivisionData] = useState([]);

    useEffect(
        ()=>{
            const response = axios.get("http://127.0.0.1:8000/divisions").then(
                (res)=>{
                    console.log(res.data)
                    setDivisionData(res.data)
                }
            ).catch(
                (err)=>{
                    console,log(err)
                }
            )
        },[]
    )
  return (
    <Box
      display={'flex'}
      flexWrap={'wrap'}
      justifyContent={'space-between'}
      overflowY={'scroll'}
      mx={-4}
      mt={2}>
      {divisionData.map((div, index) => (
        <Box key={index} p={4} flex={['100%', '50%']}>
          <DivisionData divdata={div} />
        </Box>
      ))}
    </Box>
  );
}

export default DivisionPage;