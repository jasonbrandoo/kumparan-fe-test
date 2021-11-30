import React from "react";
import {
  Box,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Image,
  Text,
  UnorderedList,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { commentSelector, getComments } from "../features/post/postSlice";
import Comment from "./Comment";
import { menuSelector } from "../features/menu/menuSlice";
import {
  getAlbums,
  getPhotos,
  photoSelector,
} from "../features/album/albumSlice";

const ModalPost = (props) => {
  const { users, posts, albums } = props;
  const dispatch = useDispatch();
  const active = useSelector(menuSelector);
  const comments = useSelector(commentSelector);
  const photos = useSelector(photoSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState({});

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
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  } else if (active === "posts") {
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
            {data?.user?.username}
          </Heading>
          <Heading fontSize="md" textAlign="left">
            {data?.post?.title}
          </Heading>
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
                    name={v.name}
                    email={v.email}
                    body={v.body}
                  />
                ))}
              </Stack>
            </ModalBody>
            <ModalFooter></ModalFooter>
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
              <Stack
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
              >
                {photos.map((v) => (
                  <Image
                    key={v.id}
                    borderRadius="full"
                    boxSize="150px"
                    src={v.thumbnailUrl}
                    alt={v.title}
                  />
                ))}
              </Stack>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return <>{content}</>;
};

export default ModalPost;
