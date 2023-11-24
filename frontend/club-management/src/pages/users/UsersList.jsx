import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
  } from '@chakra-ui/react'
import UserRow from '../../components/UserTable';

const usersData = [
  {"fullname":"Abdulwahid husssen",
  "email":"abdi@gmail.com",
  "department":"CSE"
},
{"fullname":"Abdulwahid husssen",
"email":"abdi@gmail.com",
"department":"CSE"
},
{"fullname":"Abdulwahid husssen",
"email":"abdi@gmail.com",
"department":"CSE"
}
]
function UsersList(){
    return (
<>
<TableContainer data-type='TableContainer'>
  <Table data-type='Table' variant='simple'>
    <Thead data-type='Thead'>
      <Tr data-type='Tr'>
        <Th data-type="th">Action</Th>
        <Th data-type='Th'>Full Name</Th>
        <Th data-type='Th'>Email</Th>
        <Th data-type='Th'>Department</Th>
      </Tr>
    </Thead>
    <Tbody data-type='Tbody'>
     {usersData.map(
      (data) =>{
        return (
          <UserRow ud={data} />
        )
      }
     )
     }
    </Tbody>
  </Table>
</TableContainer>
<Button colorScheme='blue'>Approve Selected Members</Button>
</>   

    )
}

export default UsersList;