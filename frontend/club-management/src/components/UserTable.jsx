import React, { useState } from 'react';
import { Tr, Td } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';

function UserRow(props) {
  const [isChecked, setIsChecked] = useState(props.ud.approved);
  const userId = props.ud.id
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Tr data-type='Tr'>
      <Td>
        <Checkbox
          defaultChecked={isChecked}
          onChange={handleCheckboxChange}
        >
          {isChecked ? 'Approved' : 'Approve'}
        </Checkbox>
      </Td>
      <Td data-type='Td'>{props.ud.fullname}</Td>
      <Td data-type='Td'>{props.ud.email}</Td>
      <Td data-type='Td' isNumeric>
        {props.ud.department}
      </Td>
    </Tr>
  );
}

export default UserRow;