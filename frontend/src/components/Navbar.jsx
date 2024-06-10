import { Link } from "react-router-dom";
import { MenuData } from "../service/menu";
import { Box, Flex, Image, Link as ChakraLink, Button } from "@chakra-ui/react";
import logo from "../assets/react.svg";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      bg="white"
      color="white"
      h="4em"
      my={5}
    >
      <Flex align="center" mr={5}>
        {/* Logo */}
        <Link to="/">
          <Image src={logo} alt="Logo_DF" boxSize="3em" />
        </Link>
      </Flex>

      <Box>
        {/* Menu Items */}
        <Flex align="center">
          {MenuData.map((item, index) => (
            <ChakraLink
              as={Link}
              to={item.link}
              key={index}
              fontSize="lg"
              fontWeight="bold"
              color="gray.500"
              ml={index > 0 ? 4 : 0}
              _hover={{ color: "gray.300" }}
            >
              {item.title}
            </ChakraLink>
          ))}

          <ChakraLink as={Link} to="/login" ml={4}>
            <Button
              fontSize="lg"
              fontWeight="bold"
              colorScheme="blue"
              variant="outline"
              _hover={{ bg: "blue.500", color: "white" }}
            >
              Login
            </Button>
          </ChakraLink>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
