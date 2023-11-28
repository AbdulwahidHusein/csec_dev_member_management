import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import UserRow from '../../components/UserTable';
import { Navigate } from 'react-router-dom';
import { CheckCircleIcon } from '@chakra-ui/icons';

function Success({ onClose }) {
  return (
    <AlertDialog isOpen={true} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Users was Updated
        </AlertDialogHeader>
        <AlertDialogBody>
          <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
          <Text color={'gray.500'}>
            selected userswas secsussfully approved and notification email will be sent!
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
function UsersList() {
  const [success, setSuccess] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handleCloseSuccess = () => {
    setSuccess(false);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get('http://127.0.0.1:8000/members', { headers })
      .then(response => {
        setMemberData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching member data:', error);
      });
  }, []);

  const handleApproveSelectedMembers = () => {
    const selectedMemberIds = selectedMembers.map(member => member.id);
    console.log('Selected Member IDs:', selectedMemberIds);
    const accessToken = localStorage.getItem('accessToken');
    axios
      .put('http://127.0.0.1:8000/members/aprrove_member/', { memberIds: selectedMemberIds },  {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      } )
      .then(response => {
        // Handle successful response
        console.log('Members approved:', response.data);
        setSuccess(true)
      })
      .catch(error => {
        // Handle error
        console.error('Error approving members:', error);
      });
  };

  const handleCheckboxChange = (memberId, checked) => {
    if (checked) {
      setSelectedMembers(prevSelectedMembers =>
        prevSelectedMembers.concat(memberData.find(member => member.id === memberId))
      );
    } else {
      setSelectedMembers(prevSelectedMembers =>
        prevSelectedMembers.filter(member => member.id !== memberId)
      );
    }
  };

  return (
    <>
      <TableContainer data-type='TableContainer'>
        <Table data-type='Table' variant='simple'>
          <Thead data-type='Thead'>
            <Tr data-type='Tr'>
              <Th data-type='th'>Action</Th>
              <Th data-type='Th'>Full Name</Th>
              <Th data-type='Th'>Email</Th>
              <Th data-type='Th'>Department</Th>
            </Tr>
          </Thead>
          <Tbody data-type='Tbody'>
            {memberData.map(data => (
                <UserRow
                key={data.id}
                ud={data}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Button colorScheme='blue' onClick={handleApproveSelectedMembers}>
        Approve Selected Members
      </Button>
      {success && <Success onClose={handleCloseSuccess} />}
    </>
  );
}

export default UsersList;