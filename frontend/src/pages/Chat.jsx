import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("/");
import {
  Input,
  Button,
  Box,
  List,
  ListItem,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
export const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("message", recieveMessage);
    return () => {
      socket.off("message", recieveMessage);
    };
  }, []);

  const recieveMessage = (message) => {
    setMessages((state) => [...state, message]);
  };
  return (
    <Box maxW="400px" m="auto" mt="4">
      <List>
        {messages.map((message, index) => (
          <ListItem key={index} mb="2">
            <strong>{message.from}:</strong> {message.body}
          </ListItem>
        ))}
      </List>
      <form onSubmit={handleSubmit}>
        <FormControl mt="4">
          <FormLabel>Write your message ....</FormLabel>
          <Input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>
        <Button mt="2" colorScheme="teal" type="submit">
          Send
        </Button>
      </form>
    </Box>
  );
};
