import { Box, Heading, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <VStack overflowX="hidden" height="100vh" padding={5}>
      {posts.map((v) => (
        <ModalPost
          key={v.post.id}
          posts={v}
          // username={v.user.username}
          // title={v.post.title}
          // body={v.post.body}
          // postId={v.post.id}
        />
      ))}
    </VStack>
  );
};

export default Posts;
