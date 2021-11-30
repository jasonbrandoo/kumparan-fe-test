import { Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { setActice } from "../features/menu/menuSlice";

const Sidebar = () => {
  const dispatch = useDispatch();

  const toggleMenu = (menu) => {
    dispatch(setActice(menu));
  };

  return (
    <Stack
      h="100vh"
      borderRight="1px"
      borderRightColor="gray"
      width="25%"
      p={5}
    >
      <Button
        colorScheme="blue"
        variant="ghost"
        onClick={() => toggleMenu("users")}
      >
        Users
      </Button>
      <Button
        colorScheme="blue"
        variant="ghost"
        onClick={() => toggleMenu("posts")}
      >
        Posts
      </Button>
      <Button
        colorScheme="blue"
        variant="ghost"
        onClick={() => toggleMenu("albums")}
      >
        Albums
      </Button>
    </Stack>
  );
};

export default Sidebar;
