import { Tables } from "../components/Tables";
import {
  Flex,
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import { FormProduct } from "../components/Modal/FormProduct";
import { useDisclosure } from "@chakra-ui/react";

import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/socket";

export const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socket = useContext(SocketContext);
  const [data, setData] = useState([]);
  const recieveProducts = async (product) => {
    console.log("DATA DESDE HOME ", product);
    await setData(product);
  };

  useEffect(() => {
    socket.emit("getProducts");
    socket.on("getProducts", recieveProducts);
    return () => {
      socket.off("getProducts", recieveProducts);
    };
  }, []);

  const handleDelete = (id) => {
    console.log("handleDelete: ", id);
    socket.emit("deleteProduct", id);
  };
  return (
    <Box>
      <Flex direction="row" justifyContent="space-between">
        <InputGroup w="25%">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="tel" placeholder="Search..." />
        </InputGroup>
        <Button
          rightIcon={<AddIcon />}
          colorScheme="blue"
          variant="outline"
          onClick={onOpen}
        >
          Add
        </Button>
      </Flex>
      <Tables data={data} onDelete={handleDelete} />
      <FormProduct
        isOpen={isOpen}
        onClose={async () => {
          onClose();
          console.log("ONCLOSE");
          await socket.on("getProducts", recieveProducts);
        }}
      />
    </Box>
  );
};
