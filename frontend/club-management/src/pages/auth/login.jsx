import React, { useState, useContext } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react';
import { Link, Navigate } from 'react-router-dom';


import axios from 'axios';
import { UserContext } from '../../UserContext';

export default function LoginPage() {
  const [error, setError] = useState('');
  const { setUserData } = useContext(UserContext);
  const [success, setSucess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = Object.fromEntries(data.entries());

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/members/auth/login/',
        formData
      );

      console.log('Login successful');
      setUserData(response.data);
      //console.log(response.data.access);
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setSucess(true);
      
    } catch (error) {
      setError('Invalid credentials');
      console.error('Login failed:', error);
    }
  
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <form onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Stack direction={{base:"row"}} justify={'space-between'} >
                <Text color={'blue.500'}>Forgot password?</Text>
                <Link to="/register" color={'blue.500'}>or Sign up</Link>
                </Stack>
                
              </Stack>
              <Button type="submit" colorScheme={'blue'} variant={'solid'}>
                Sign in
              </Button>
            </Stack>
            {error && (
              <Text color={'red.500'} fontSize={'sm'}>
                {error}
              </Text>
            )}
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
      {success && <Navigate to="/" />}
    </Stack>
  );
}