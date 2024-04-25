import React, { useState } from "react";
import { Tr, Td, Button, Checkbox } from "@chakra-ui/react";
import { fetchFunctionAuth } from "./fetchQueries";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,Portal
} from '@chakra-ui/react'

const TableRow = ({ handleCheckboxChange, elem, index, fetchData }) => {
  const { location, name, orderId, payment, paymentDate, status } = elem;
  const [isOpen, setIsOpen] = useState(false);

  const handleYesClick = () => {
    handleChange(elem._id);
    setIsOpen(false); 
  };
  const StatusButton = (data) => {
    return <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
    <PopoverTrigger>
      <Button  colorScheme={!!data?"green":"red"} onClick={() => setIsOpen(true)}>{!!data?"ACCEPTED":"CANCELLED"}</Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent bg='orange'>
        <PopoverArrow />
        <PopoverHeader >Change Status<h>&#128512;</h></PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Button  colorScheme="blue" size="sm" onClick={() => handleYesClick() }>Yes</Button>
        </PopoverBody>
      </PopoverContent>
    </Portal>
  </Popover>
  };
  function handleChange(id) {
    fetchFunctionAuth("http://localhost:8000/getVendors/edit", { _id: id })
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((err) => console.log(err));
  }
  return (
    <Tr>
      <Td>
        <Checkbox colorScheme="red" onChange={() => handleCheckboxChange(elem._id)}></Checkbox>
      </Td>
      <Td>{index + 1}</Td>
      <Td>{name}</Td>
      <Td>{paymentDate}</Td>
      <Td>{orderId}</Td>
      <Td>{location}</Td>
      <Td>{StatusButton(!!status ? 1 : 0)}</Td>
      <Td>{payment}</Td>
    </Tr>
  );
};

export default TableRow;
