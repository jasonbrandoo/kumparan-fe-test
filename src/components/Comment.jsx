import { Box, Heading, Text } from "@chakra-ui/layout";
import React from "react";

const Comment = (props) => {
  const { name, email, body } = props;
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="base">
      <Heading fontSize="md">{name}</Heading>
      <Text fontSize="sm">{email}</Text>
      <Text>{body}</Text>
    </Box>
  );
};

export default Comment;
