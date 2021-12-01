import { Box, Stack } from "@chakra-ui/layout";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { setActice } from "../features/menu/menuSlice";

const SidebarContent = (props) => {
  const { toggleMenu, variant } = props;
  return (
    <Stack
      height={variant === "sidebar" ? "100vh" : "initial"}
      width={variant === "sidebar" ? "25%" : "100%"}
      padding={5}
      backgroundColor={variant === "sidebar" && "gray.200"}
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

const Sidebar = (props) => {
  const { variant } = props;
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleMenu = (menu) => {
    dispatch(setActice(menu));
  };

  return (
    <>
      {variant === "sidebar" ? (
        <SidebarContent toggleMenu={toggleMenu} variant={variant} />
      ) : (
        <>
          <Button colorScheme="blue" onClick={onOpen} p={5} m={5}>
            <HamburgerIcon />
          </Button>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
              <DrawerBody p="0">
                <SidebarContent toggleMenu={toggleMenu} variant={variant} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  );
};

export default Sidebar;
