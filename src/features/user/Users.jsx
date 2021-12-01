import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { menuSelector } from "../menu/menuSlice";
import { getUsers, userSelector } from "./userSlice";

const Users = () => {
  const users = useSelector(userSelector);
  const active = useSelector(menuSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (active === "users") {
      dispatch(getUsers());
    }
  }, [active, dispatch]);

  console.log(users);

  return (
    <Box overflowX="hidden" height="100vh">
      <Heading my={4} textAlign="center">
        List Of All User
      </Heading>
      <VStack overflowX="hidden" height="100vh" padding={5}>
        {users.map((v) => (
          <Modal key={v.id} users={v} />
        ))}
      </VStack>
    </Box>
  );
};

export default Users;
