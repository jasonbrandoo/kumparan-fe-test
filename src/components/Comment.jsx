import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../features/post/postSlice";
import ModalEdit from "./EditModal";

const Comment = (props) => {
  const { name, email, body, id } = props;
  const dispatch = useDispatch();
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="base">
      <Heading fontSize="md">{name}</Heading>
      <Text fontSize="sm">{email}</Text>
      <Text>{body}</Text>
      <HStack justifyContent="end">
        <ModalEdit id={id} title={name} body={body} type="comment" />
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => {
            dispatch(deleteComment(id));
          }}
        >
          <DeleteIcon />
        </Button>
      </HStack>
    </Box>
  );
};

export default Comment;
