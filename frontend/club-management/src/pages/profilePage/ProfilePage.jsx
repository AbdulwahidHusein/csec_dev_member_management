'use client'

import {  keyframes } from '@chakra-ui/react'


'use client'

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'


function AvatarWithRipple() {
    const size = '96px'
    const color = 'teal'
  
    const pulseRing = keyframes`
      0% {
      transform: scale(0.33);
    }
    40%,
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
      `
  
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        h="216px"
        w="full"
        overflow="hidden">
        {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
        <Box
          as="div"
          position="relative"
          w={size}
          h={size}
          _before={{
            content: "''",
            position: 'relative',
            display: 'block',
            width: '300%',
            height: '300%',
            boxSizing: 'border-box',
            marginLeft: '-100%',
            marginTop: '-100%',
            borderRadius: '50%',
            bgColor: color,
            animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
          }}>
          <Avatar src="https://i.pravatar.cc/300" size="full" position="absolute" top={0} />
        </Box>
      </Flex>
    )
  }


function SocialProfileWithImage() {
  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <AvatarWithRipple />

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              Abdulwahid Hussen
            </Heading>
            <Text color={'gray.500'}>Software Engeenering </Text>
          </Stack>

          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>DEV</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Member
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={600}>CPD</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Member
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
            Update Profile
          </Button>
        </Box>
      </Box>
    </Center>
  )
}






 
 
 
 
 function Profile (){
  return (<>
      <SocialProfileWithImage />
  </>

  )
}

export default Profile;