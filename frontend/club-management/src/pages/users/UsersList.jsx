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
} from '@chakra-ui/react';
import UserRow from '../../components/UserTable';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UsersList() {
  const [memberData, setMemberData] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get('http://127.0.0.1:8000/members', { headers })
      .then(response => {
        setMemberData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching member data:', error);
      });
  }, []);

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
            {memberData.map(data => {
              return <UserRow ud={data} />;
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button colorScheme='blue'>Approve Selected Members</Button>
    </>
  );
}

export default UsersList;