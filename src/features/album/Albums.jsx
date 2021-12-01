import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/layout";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/Modal";
import { menuSelector } from "../menu/menuSlice";
import { albumSelector, getAlbums } from "./albumSlice";

const Albums = () => {
  const albums = useSelector(albumSelector);
  const active = useSelector(menuSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (active === "albums") {
      dispatch(getAlbums());
    }
  }, [active, dispatch]);

  return (
    <Box overflowX="hidden" height="100vh">
      <Heading my={4} textAlign="center">
        List Of All Album Each User
      </Heading>
      <VStack overflowX="hidden" height="100vh" padding={5}>
        {albums.map((v) => (
          <Modal key={v.id} albums={v} />
        ))}
      </VStack>
    </Box>
  );
};

export default Albums;
