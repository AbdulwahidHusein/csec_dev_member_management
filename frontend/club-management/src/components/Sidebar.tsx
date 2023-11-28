'use client'
import React from 'react';
import { BrowserRouter as Router, Route,Link, NavLink, Routes, useNavigate, Navigate } from 'react-router-dom'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiFlag,
  FiMessageSquare,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons'
import { UserContext } from "../UserContext";
import  { useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface LinkItemProps {
  name: string
  icon: IconType
  To: string
}
import Profile from '../pages/profilePage/ProfilePage'; 
import Community from '../pages/community/Community';
import Event from '../pages/events/Event';
import Team from '../pages/team/Team';
import HomePage from '../pages/home/HomePage';
import AnnouncementPage from '../pages/announcement/AnnouncementPage';
import CreateEventPage from '../pages/events/CreateEventPage';
import UsersList from '../pages/users/UsersList';
import SignUP from '../pages/auth/registration';
import LoginPage from '../pages/auth/login';
import DivisionPage from '../pages/divisions/DivisionsPage';
import BasicStatistics from './Stat';
import SignOut from './SignOut';

interface NavItemProps extends FlexProps {
  icon: IconType
  children: React.ReactNode
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}

interface SidebarProps extends BoxProps {
  admin: boolean,
  onClose: () => void
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'divisions', icon: FiHome, To:"/divisions" },
  { name: 'Events', icon: FiCalendar, To:"/events" },
  { name: 'Community', icon: FiFlag , To:"/community"},
  { name: 'Announcements', icon: FiMessageSquare,To:"/announcemets" },
  { name: 'My Teams', icon: FiUsers, To:"/my-teams" },
  
  
]
const AuthItems : Array <LinkItemProps> = [
  {name: "Dashboard", icon: FiUsers, To:"/"}
]

const AdminLinkItems : Array<LinkItemProps> = [

 
 {name: "Announce Events", icon: FiUsers, To:"/create-event"},
 {name: "Members", icon: FiUsers, To:"/members"},

]

const SidebarContent = ({auth, admin, onClose, ...rest }: SidebarProps) => {

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('#060c14', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('#030c19', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" color={"white"} fontWeight="bold">
          CSEC ASTU
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      { auth && AuthItems.map((link) => (
        <NavItem color={"white"} key={link.name} icon={link.icon}>
          <Link color={"white"} to={link.To} >
          {link.name}
         </Link>
        </NavItem>
      ))}
      {LinkItems.map((link) => (
        <NavItem color={"white"} key={link.name} icon={link.icon}>
          <Link color={"white"} to={link.To} >
          {link.name}
         </Link>
        </NavItem>
      ))}

      {admin  && AdminLinkItems.map(
        (link)=>(
          <NavItem color={"white"} key={link.name} icon={link.icon}>
          <Link to={link.To} >
          {link.name}
         </Link>
        </NavItem>
        )
      )
      }
     
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { userData } = useContext(UserContext);
  console.log(userData)
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        backgroundColor={"white"}
        icon={<FiMenu />}
      />

      <Text color={"white"}
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        CSEC ASTU
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton size="lg" variant="ghost"color={"white"} aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    userData?`127.0.0.1:8000${userData.member_data.profile_picture}`:""
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text color={"white"}
                fontSize="sm">{userData && userData.member_data.full_name}</Text>
                  
                    {userData && userData.member_data.is_admin && <Text fontSize="xs" color="white">Admin</Text> }
                    {userData && !userData.member_data.is_admin && <Text fontSize="xs" color="white">Member</Text> }
                    {!userData && <Text fontSize="xs" color="white">Guest</Text>  }
                  
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem><Link to="profile">profile</Link></MenuItem>
              <MenuDivider />
              {userData ? <MenuItem><Link to="/sign-out">Sign out</Link></MenuItem> : <MenuItem><Link to="/login">Login</Link></MenuItem> }
              <MenuDivider />
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = () => {
  const { userData } = useContext(UserContext);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUserData } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        //console.log(accessToken)
        if (accessToken) {
          const response = await axios.get('http://127.0.0.1:8000/members/get_details/', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUserData(response.data);
          if (response.data.member_data.is_admin){
            setIsAdmin(true);
          }
          console.log(userData)
          
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
      } finally {
        setLoading(false);   
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>

     <SidebarContent  onClose={() => onClose} display={{ base: 'none', md: 'block' }} admin={isAdmin} auth={isAuthenticated}/>
   <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent admin={isAdmin} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
     <MobileNav background={"#060c14"} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} background={"white"} p="4">
    <Routes>
      {isAdmin && <Route path="/create-event" element={<CreateEventPage />} />}
      {isAdmin  && <Route path="/members"  element={<UsersList />} />}
      
      <Route path="/profile" element={<Profile />} />
      <Route path="/Community" element={<Community />} />
      <Route path="/events" element={<Event />} />
      <Route path="/my-teams" element={<Team />} />
      <Route path="/announcemets" element={<AnnouncementPage />} />
      <Route path="/members" element={<UsersList />} />
      <Route path="/register" element={<SignUP />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/divisions" element={<DivisionPage />} />
      <Route path="/sign-out" element={<SignOut />} />
      {isAuthenticated && <Route path="/" element={<BasicStatistics />} /> }
      
    </Routes>
</Box>
    </Box>
  )
}

export default SidebarWithHeader

