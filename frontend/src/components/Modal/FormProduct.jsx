import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { SocketContext } from "../../context/socket";
import { useToast } from "@chakra-ui/react";

export const FormProduct = ({ isOpen, onClose, title, data }) => {
  console.log("DATA FORM : ", data);
  const initialRef = React.useRef(null);
  const toast = useToast();
  const finalRef = React.useRef(null);
  const socket = useContext(SocketContext);
  const [categories, setCategories] = useState([]);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: data,
  });
  useEffect(() => {
    socket.emit("getCategories");
    socket.on("getCategories", async (dataCategories) => {
      setCategories(dataCategories);
    });
    return () => socket.off("getCategories");
  }, []);

  function onSubmit(values) {
    return new Promise((resolve) => {
      if (!data) {
        socket.emit("createNewProduct", { ...values });
        socket.off("createNewProduct");
        alertToast(
          "Product registered",
          "success",
          "The product was registered"
        );
        onClose();
        reset();
        resolve();
      } else {
        console.log("VALORES : ", { ...values });
        socket.emit("updateProduct", { ...values, id: data.id });
        socket.off("updateProduct");
        alertToast("Product updated", "success", "The product was updated");
        onClose();
        reset();
        resolve();
      }
    });
  }

  function alertToast(title, status, description) {
    toast({
      title: title,
      status: status,
      description: description,
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack spacing={2} direction={"row"} pb="2">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input ref={initialRef} {...register("name")} />
                </FormControl>
              </Stack>
              <Stack spacing={2} direction={"row"} pb="2">
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input {...register("price")} />
                </FormControl>
                <FormControl>
                  <FormLabel>Stock</FormLabel>
                  <Input {...register("stock")} />
                </FormControl>
              </Stack>

              <FormControl>
                <FormLabel>Categorie</FormLabel>
                <Select
                  placeholder="Select categories"
                  {...register("categoryId")}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
FormProduct.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object,
};
