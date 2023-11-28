import React, { useState } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function UserRow(props) {
  const [isChecked, setIsChecked] = useState(props.ud.approved);
  const userId = props.ud.id;

  const handleCheckboxChange = () => {
    const updatedChecked = !isChecked;
    setIsChecked(updatedChecked);
    props.onCheckboxChange(userId, updatedChecked);
  };

  return (
    <Tr data-type='Tr' boxShadow={'2xl'}
    rounded={'md'}>
      <Td>
        <Checkbox
          defaultChecked={isChecked}
          onChange={handleCheckboxChange}
        >
          {isChecked ? 'Approved' : 'Approve'}
        </Checkbox>
      </Td>
      <Td data-type='Td'><Link to="/user-profile">{props.ud.full_name}</Link></Td>
      <Td data-type='Td'><Link to="/user-profile">{props.ud.phone_number}</Link></Td>
      <Td data-type='Td' isNumeric>
        {props.ud.department}
      </Td>
    </Tr>
  );
}

export default UserRow;