import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { title_products } from "../service/product";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { FormProduct } from "./Modal/FormProduct";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Alert from "./Alert";

export const Tables = ({ data, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const cancelRef = React.useRef();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleEditClick = (product) => {
    console.log("PRODUCTO SELECT : ", product);
    setSelectedProduct(product);
    onOpen();
  };
  const handleCloseModal = () => {
    onClose();
    setSelectedProduct(null);
  };
  return (
    <TableContainer>
      <Table variant="striped">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            {title_products.map((title, index) => (
              <Th key={index}>{title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((product, index) => {
            return (
              <Tr key={index}>
                <Td>{product.id}</Td>
                <Td>{product.name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.stock}</Td>
                <Td>{product.category.name}</Td>
                <Td>
                  <IconButton
                    aria-label="Add to friends"
                    icon={<EditIcon />}
                    margin="1%"
                    onClick={() => handleEditClick(product)}
                  />

                  <IconButton
                    aria-label="Add to friends"
                    icon={<DeleteIcon />}
                    margin="1%"
                    onClick={onOpenAlert}
                  />
                  <Alert
                    isOpen={isOpenAlert}
                    onClose={onCloseAlert}
                    cancelRef={cancelRef}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {selectedProduct && (
        <FormProduct
          isOpen={isOpen}
          onClose={handleCloseModal}
          data={selectedProduct}
        />
      )}
    </TableContainer>
  );
};
Tables.propTypes = {
  data: PropTypes.array,
};
