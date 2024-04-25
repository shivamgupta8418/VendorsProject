import React, { useContext, useState } from "react";
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
import { AuthContext } from "../Context/AuthContext";
import { fetchFunction } from "../Components/fetchQueries";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const signUpRedirect = () => {
    navigate("/signup");
  };

  const handleLogin = (e) => {
    let formData = {
      email,
      password,
    };
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return;
    }
    fetchFunction("http://localhost:8000/login", formData)
      .then((res) => {
        if (res.success) {
          login(res.token);
          toast({
            title: "LOG IN SUCCESSFUL",
            status: "success",
            duration: 1000,
            position: "top",
            isClosable: true,
          });
          navigate("/");
        } else {
          toast({
            title: "Invalid Credentials",
            status: "error",
            duration: 1000,
            position: "top",
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
    setEmail("");
    setPassword("");
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
        User Login
      </Heading>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
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
          onClick={handleLogin}
          colorScheme="orange"
          size="lg"
          w="full"
          mb="4"
        >
          Log In
        </Button>
        <Button onClick={signUpRedirect} colorScheme="orange" size="lg" w="full">
          Don't have an account? Sign Up
        </Button>
      </FormControl>
    </Box>
  );
};

export default Login;
