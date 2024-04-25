import React, { useState, useEffect } from "react";
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
  Input,
  Checkbox,
  Button,
  FormControl,
  Select,useToast
} from "@chakra-ui/react";
import TableRow from "./TableRow";
import { fetchFunctionAuth } from "./fetchQueries";

const TableComponent = ({ data,fetchData }) => {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  

  const handleCheckboxChange = (index) => {
    const updatedSelection = [...selectedCheckboxes, index];
    setSelectedCheckboxes(updatedSelection);
  };
  const toast = useToast();
  const handleDelete = () => {
    if(selectedCheckboxes.length==0){
      toast({
        title: "Please Select Some Data To Delete",
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    fetchFunctionAuth("http://localhost:8000/getVendors/delete", {
      _ids: selectedCheckboxes,
    })
      .then((res) => {
        toast({
          title: "Delete  SUCCESSFUL",
          status: "error",
          duration: 1000,
          position: "top",
          isClosable: true,
        })
        fetchData();
      })
      .catch((err) => console.log(err));
  };
 

  return (
    <div>
      <TableContainer>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>
                <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
              </Th>
              <Th>S.No.</Th>
              <Th>Vendor name</Th>
              <Th>Payment date</Th>
              <Th>Order ID</Th>
              <Th>Location</Th>
              <Th>Status</Th>
              <Th>Payment</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((elem, i) => {
              return (
                <TableRow
                  key={elem._id}
                  index={i}
                  elem={elem}
                  selectedCheckboxes={selectedCheckboxes}
                  handleCheckboxChange={handleCheckboxChange}
                  fetchData = {fetchData}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
