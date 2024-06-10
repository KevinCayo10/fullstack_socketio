import React from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Link,
  Button,
} from "@chakra-ui/react";

function Login() {
  return (
    <Flex align="center" justify="center" h="70vh">
      <Box maxW="md" p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Box textAlign="center">
          <Box fontSize="xl" fontWeight="semibold">
            Login
          </Box>
        </Box>
        <Box mt="4">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              size="lg"
              borderRadius="md"
            />
          </FormControl>
          <FormControl mt="4" id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              size="lg"
              borderRadius="md"
            />
          </FormControl>
          <Flex mt="4" align="center">
            <Checkbox colorScheme="blue" defaultChecked>
              Remember Me
            </Checkbox>
            <Box ml="auto">
              <Link color="blue.500" href="#">
                Forgot Password?
              </Link>
            </Box>
          </Flex>
          <Button
            colorScheme="blue"
            mt="4"
            size="lg"
            isFullWidth
            borderRadius="md"
          >
            Login
          </Button>
          <Flex mt="4" justify="center">
            <Link color="blue.500" href="#">
              Sign up Here
            </Link>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
