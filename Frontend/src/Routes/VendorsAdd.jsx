import React, { useState } from "react";
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Heading,
  Button,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const VendorsAdd = () => {
  const [name, setName] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [orderId, setOrderId] = useState("");
  const [location, setLocation] = useState("");
  const [payment, setPayment] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate("");

  const toast = useToast();
 

  const handleSubmit = () => {
    const formData = {
      name,
      paymentDate,
      orderId,
      location,
      status,
      payment,
    };
    if (!formData.name || !formData.paymentDate || !formData.orderId || !formData.location || !formData.status || !formData.payment) {
      toast({
        title: "Fill All Details Please",
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
      return;
    }
   
    fetch("http://localhost:8000/getVendors/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!!res.success) navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box bg="gray.100" minH="100vh" py="8">
      <Box
        maxW="md"
        mx="auto"
        p="6"
        bg="white"
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading as="h2" mb="6" textAlign="center" color="orange.500">
          Add Vendor
        </Heading>
        <FormControl>
          <Input
            mb="4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            variant="filled"
          />
          <Input
            mb="4"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            placeholder="Payment Date"
            type="datetime-local"
            variant="filled"
          />
          <Input
            mb="4"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID"
            variant="filled"
          />
          <Select
            mb="4"
            placeholder="Select Status"
            onChange={(e) => setStatus(e.target.value)}
            variant="filled"
          >
            <option value="1">Approved</option>
            <option value="0">Cancelled</option>
          </Select>
          <Input
            mb="4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            variant="filled"
          />
          <InputGroup mb="4">
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
            >
              $
            </InputLeftElement>
            <Input
              type="number"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              placeholder="Enter amount"
              variant="filled"
            />
          </InputGroup>
          <Button onClick={handleSubmit} colorScheme="orange" size="lg" w="full">
            SUBMIT
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default VendorsAdd;
