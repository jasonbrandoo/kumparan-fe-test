import { Box, Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddModal from "../../components/AddModal";
import ModalPost from "../../components/Modal";
import { menuSelector } from "../menu/menuSlice";
import { getPosts, postSelector } from "./postSlice";

const Posts = () => {
  const posts = useSelector(postSelector);
  const active = useSelector(menuSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (active === "posts") {
      dispatch(getPosts());
    }
  }, [active, dispatch]);

  return (
    <Box overflowX="hidden" height="100vh" padding={5}>
      <AddModal />
      <VStack>
        {posts.map((v) => (
          <ModalPost key={v.post.id} posts={v} />
        ))}
      </VStack>
    </Box>
  );
};

export default Posts;
