import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState, useContext } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { UserContext } from '../../UserContext';
import axios from 'axios';
import { Form, Navigate } from 'react-router-dom';

  export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const { setUserData } = useContext(UserContext);
    const [sucess, setSucess] = useState(false);
    const [formData, setFormData] = useState({
      full_name: '',
      phone_number: '',
      profile_picture: null,
      departement: '',
      study_year: null,
      github_link: '',
      portfolio_link: '',
      linkedin_link: '',
      bio: '',
      leetcode_link: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email' || name === 'password') {
          setFormData((prevData) => ({
            ...prevData,
            user: {
              ...prevData.user,
              [name]: value,
            },
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        }
      };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      delete formData.email;
      delete formData.password;
      delete formData.confirmPassword;
      
      console.log(formData);
    
      try {
        const response = await axios.post('http://127.0.0.1:8000/members/register/', formData);
 
        console.log('Registration successful');
        console.log(response.data);
        const { access } = response.data;
        const { refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setSucess(true)
      } catch (error) {
        // Handle the error
        console.error('Registration failed:', error);
      }
      console.log(formData);
    };
  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} minW={'500px'}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Member Registration Form
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              CSEC ASTU
            </Text>
          </Stack>
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="full_name" isRequired>
                      <FormLabel>Full Name</FormLabel>
                      <Input type="text" name="full_name" onChange={handleChange} />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="phone_number" isRequired>
                      <FormLabel>Phone Number</FormLabel>
                      <Input type="text" name="phone_number" onChange={handleChange} />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="profile_picture">
                  <FormLabel>Profile Picture</FormLabel>
                  <Input type="file" name="profile_picture" onChange={handleChange} />
                </FormControl>
                <FormControl id="departement" isRequired>
                  <FormLabel>Department</FormLabel>
                  <Input type="text" name="departement" onChange={handleChange} />
                </FormControl>
                <FormControl id="study_year">
                  <FormLabel>Study Year</FormLabel>
                  <Input type="number" name="study_year" onChange={handleChange} />
                </FormControl>
                <FormControl id="github_link">
                  <FormLabel>Github Link</FormLabel>
                  <Input type="text" name="github_link" onChange={handleChange} />
                </FormControl>
                <FormControl id="portfolio_link">
                  <FormLabel>Portfolio Link</FormLabel>
                  <Input type="text" name="portfolio_link" onChange={handleChange} />
                </FormControl>
                <FormControl id="linkedin_link">
                  <FormLabel>LinkedIn Link</FormLabel>
                  <Input type="text" name="linkedin_link" onChange={handleChange} />
                </FormControl>
                <FormControl id="bio">
                  <FormLabel>Bio</FormLabel>
                  <Input type="text" name="bio" onChange={handleChange} />
                </FormControl>
                <FormControl id="leetcode_link">
                  <FormLabel>Leetcode Link</FormLabel>
                  <Input type="text" name="leetcode_link" onChange={handleChange} />
                </FormControl>
                <FormControl id="code_forces_link">
                  <FormLabel>Code Forces Link</FormLabel>
                  <Input type="text" name="code_forces_link" onChange={handleChange} />
                </FormControl>
                <FormControl id="hacker_rank_link">
                  <FormLabel>HackerRank Link</FormLabel>
                  <Input type="text" name="hacker_rank_link" onChange={handleChange} />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" onChange={handleChange} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} name="password" onChange={handleChange} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="confirmPassword" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input type="password" name="confirmPassword" onChange={handleChange} />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </form>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <a href="/login" color={'blue.400'}>Login</a>
              </Text>
            </Stack>
          </Box>
        </Stack>
        {sucess && <Navigate to="/" />}
      </Flex>
    );
  }