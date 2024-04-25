import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { fetchFunction } from "../Components/fetchQueries";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LoginRedirect = () => {
    navigate("/login");
  };
  const toast = useToast();
  const signupUser = () => {
    const data = {
      email,
      password,
    };
    if (!data.email || !data.password) {
      toast({
        title: "Please Fill Data",
        status: "error",
        duration: 1000,
        position: "top",
        isClosable: true,
      });
      return;
    }
    fetchFunction("http://localhost:8000/signup", data)
      .then((res) => {
        if (!!res.success) {
          toast({
            title: "SIGN UP SUCCESSFUL",
            status: "success",
            duration: 1000,
            position: "top",
            isClosable: true,
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        toast({
          title: "ERROR",
          status: "error",
          duration: 1000,
          position: "top",
          isClosable: true,
        });
        console.log(err);
      });
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt="5%"
      p="4"
      bg="white"
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading as="h2" mb="6" textAlign="center" color="orange">
        User Sign Up
      </Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          colorScheme="orange"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="4"
          variant="filled"
        />
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="6"
          variant="filled"
        />
        <Button
          onClick={signupUser}
          colorScheme="orange"
          size="lg"
          w="full"
          mb="4"
        >
          Sign Up
        </Button>
        <Button onClick={LoginRedirect} colorScheme="orange" size="lg" w="full">
          Already have an account? Log In
        </Button>
      </FormControl>
    </Box>
  );
};

export default SignUp;
