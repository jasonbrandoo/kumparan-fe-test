import { Box, Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
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
    <VStack overflowX="hidden" height="100vh" padding={5}>
      {albums.map((v) => (
        <Modal key={v.id} albums={v} />
      ))}
    </VStack>
  );
};

export default Albums;
