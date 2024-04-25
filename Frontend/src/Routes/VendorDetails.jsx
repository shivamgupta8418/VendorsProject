import React, { useEffect, useState } from "react";
import TableComponent from "../Components/TableComponent";
import {
  Box,
  Button,
  Input,
  FormControl,
  Select,
  Flex,
  Heading,
  useToast,
  Center,
  useColorMode,Switch
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const VendorDetails = () => {
  const [vendorData, setVendorData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterByLocation, setFilterByLocation] = useState("");
  const [filterByStatus, setFilterByStatus] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  let url = `http://localhost:8000/getVendors?sortBy=${sortBy}&sortOrder=${sortOrder}&filterByLocation=${filterByLocation}&filterByStatus=${filterByStatus}`;

  const fetchData = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        sortBy,
        sortOrder,
        filterByLocation,
        filterByStatus,
      }),
    })
      .then((res) => res.json())
      .then((res) => setVendorData(res.vendorDetails))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box p="4" width="90%" margin="auto">
      <Flex align="center" justify="space-between" mb="4">
        <Heading size="lg" color="orange.500">Vendor Details</Heading>
      <Flex gap="2vh">
      <Switch isChecked={colorMode === "dark"} mt="1vh"
      onChange={toggleColorMode} size='lg'colorScheme="orange"/>
      <Button colorScheme="orange" onClick={() => navigate("/vendorsAdd")}>
          Add New
        </Button>
      </Flex>
        
      </Flex>
      
      <FormControl mb="4">
        <Flex justify="space-between" align="center">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            placeholder="Sort By"
            mr="2"
          >
            <option value="date">Date</option>
            <option value="status">Status</option>
            <option value="payment">Payment</option>
          </Select>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            placeholder="Sort Order"
            mr="2"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
          <Input
            value={filterByLocation}
            onChange={(e) => setFilterByLocation(e.target.value)}
            placeholder="Filter by Location"
            mr="2"
          />
          <Select
            value={filterByStatus}
            onChange={(e) => setFilterByStatus(e.target.value)}
            placeholder="Filter by Status"
            mr="3"
          >
            <option value="1">ACCEPTED</option>
            <option value="0">CANCELLED</option>
          </Select>
          </Flex>
         <Center>
         <Button colorScheme="orange"   onClick={fetchData} w="20%"  mt="3vh">
            Apply Filter
          </Button>
         </Center>
        
      </FormControl>
      <TableComponent data={vendorData} fetchData={fetchData} />
    </Box>
  );
};

export default VendorDetails;
