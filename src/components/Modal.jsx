import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  Textarea,
  UnorderedList,
  useDisclosure,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/layout";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  commentSelector,
  deletePost,
  getComments,
} from "../features/post/postSlice";
import Comment from "./Comment";
import { menuSelector } from "../features/menu/menuSlice";
import { getPhotos, photoSelector } from "../features/album/albumSlice";
import ModalEdit from "./EditModal";
import DetailModal from "./DetailModal";

const ModalPost = (props) => {
  const { users, posts, albums } = props;
  const dispatch = useDispatch();
  const active = useSelector(menuSelector);
  const comments = useSelector(commentSelector);
  const photos = useSelector(photoSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState({});
  const [postTitle, setPostTitle] = React.useState("");
  const [postBody, setPostBody] = React.useState("");

  React.useEffect(() => {
    if (active === "users") {
      setData(users);
    } else if (active === "posts") {
      setData(posts);
    } else if (active === "albums") {
      setData(albums);
    }
  }, [active, albums, posts, users]);

  React.useEffect(() => {
    if (active === "posts" && isOpen) {
      dispatch(getComments(data.post.id));
    }
  }, [active, dispatch, isOpen]);

  React.useEffect(() => {
    if (active === "albums" && isOpen) {
      dispatch(getPhotos(data.album.id));
    }
  }, [active, dispatch, isOpen]);

  let content = null;

  if (active === "users") {
    content = (
      <>
        <Box
          as="button"
          bg="gray.200"
          color="gray.900"
          width="80%"
          borderRadius="base"
          p="1rem"
          _hover={{
            bg: "gray.400",
          }}
          onClick={onOpen}
        >
          <Heading fontSize="md" textAlign="left">
            {data?.name}
          </Heading>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{data?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UnorderedList>
                <ListItem>{data?.name}</ListItem>
                <ListItem>{data?.email}</ListItem>
                <ListItem>{data?.phone}</ListItem>
                <ListItem>{data?.username}</ListItem>
                <ListItem>{data?.website}</ListItem>
                <UnorderedList>
                  <ListItem>{data?.address?.city}</ListItem>
                  <ListItem>{data?.address?.street}</ListItem>
                  <ListItem>{data?.address?.suite}</ListItem>
                  <ListItem>{data?.address?.zipcode}</ListItem>
                </UnorderedList>
              </UnorderedList>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  } else if (active === "posts") {
    content = (
      <>
        <Box
          bg="gray.200"
          color="gray.900"
          width="80%"
          borderRadius="base"
          p="1rem"
          _hover={{
            bg: "gray.300",
          }}
        >
          <HStack>
            <Stack>
              <Heading fontSize="md" textAlign="left">
                {data?.user?.username}
              </Heading>
              <Box
                as="button"
                color="gray.500"
                textAlign="left"
                onClick={onOpen}
              >
                {data?.post?.title}
              </Box>
            </Stack>
            <Spacer />
            <ModalEdit
              id={data?.post?.id}
              title={data?.post?.title}
              body={data?.post?.body}
            />
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => {
                dispatch(deletePost(data?.post?.id));
              }}
            >
              <DeleteIcon />
            </Button>
          </HStack>
          <Text textAlign="left">{data?.post?.body}</Text>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{data?.user?.username}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading fontSize="md">{data?.post?.title}</Heading>
              <Box mb={5}>{data?.post?.body}</Box>
              <Stack spacing={5}>
                {comments.map((v) => (
                  <Comment
                    key={v.id}
                    id={v.id}
                    name={v.name}
                    email={v.email}
                    body={v.body}
                  />
                ))}
              </Stack>
              <Box padding={5}>
                <Heading fontSize="lg">Add Comment</Heading>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const commentData = comments.find(
                      (v) => v.id === data?.post?.id
                    );
                    const payload = {
                      ...commentData,
                      name: postTitle,
                      body: postBody,
                    };
                    dispatch(addComment(payload));
                    setPostTitle("");
                    setPostBody("");
                  }}
                >
                  <Stack>
                    <FormControl id="title">
                      <FormLabel>Title</FormLabel>
                      <Input
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="body">
                      <FormLabel>Body</FormLabel>
                      <Textarea
                        value={postBody}
                        onChange={(e) => setPostBody(e.target.value)}
                      />
                    </FormControl>
                  </Stack>
                  <HStack justifyContent="end" marginTop={2}>
                    <Button colorScheme="red" mr={2} onClick={onClose}>
                      Batal
                    </Button>
                    <Button colorScheme="blue" type="submit">
                      Simpan
                    </Button>
                  </HStack>
                </form>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  } else if (active === "albums") {
    content = content = (
      <>
        <Box
          as="button"
          bg="gray.200"
          color="gray.900"
          width="80%"
          borderRadius="base"
          p="1rem"
          _hover={{
            bg: "gray.400",
          }}
          onClick={onOpen}
        >
          <Heading fontSize="md" textAlign="left">
            {data?.user?.name}
          </Heading>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{data?.user?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Heading fontSize="md" mb={4}>
                {data?.album?.title}
              </Heading>
              <Flex flexWrap="wrap" justifyContent="center">
                {photos.map((v) => (
                  <DetailModal
                    key={v.id}
                    thumbnailUrl={v.thumbnailUrl}
                    title={v.title}
                    url={v.url}
                  />
                ))}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return <>{content}</>;
};

export default ModalPost;
