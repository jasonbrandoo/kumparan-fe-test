import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import AddModal from "../../components/AddModal";
import ModalPost from "../../components/Modal";
import { getPosts, pageSelector, postSelector, setPage } from "./postSlice";

const Posts = () => {
  const posts = useSelector(postSelector);
  const page = useSelector(pageSelector);
  const [currentPage, setCurrentPage] = React.useState(page);
  const dispatch = useDispatch();
  const loadMore = React.useRef();

  React.useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  React.useEffect(() => {
    if (currentPage !== page) {
      dispatch(getPosts(page));
    }
  }, [currentPage, dispatch, page]);

  React.useEffect(() => {
    const element = loadMore.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          dispatch(setPage());
        }
      },
      { root: null, threshold: 1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [dispatch]);

  return (
    <Box overflowX="hidden" height="100vh">
      <Heading my={4} textAlign="center">
        All Post
      </Heading>
      <AddModal />
      <VStack>
        {posts.map((v) => (
          <ModalPost key={v.post.id} posts={v} />
        ))}
      </VStack>
      <Box width="100%">
        <Spinner ref={loadMore} mx="auto" display="block" />
      </Box>
    </Box>
  );
};

export default Posts;
