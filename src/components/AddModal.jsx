import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Stack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { addPost, postSelector } from "../features/post/postSlice";

const AddModal = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postTitle, setPostTitle] = React.useState("");
  const [postBody, setPostBody] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstPost = posts[0];
    const id = posts[posts.length - 1].post.id;

    dispatch(
      addPost({
        user: firstPost.user,
        post: {
          ...firstPost.post,
          id: id + 1,
          title: postTitle,
          body: postBody,
        },
      })
    );
    setPostTitle("");
    setPostBody("");
    onClose();
  };

  return (
    <Box width="80%" mx="auto" my={5}>
      <Button colorScheme="green" onClick={onOpen} ml="auto" display="block">
        <AddIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Post</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={2} onClick={onClose}>
                Batal
              </Button>
              <Button colorScheme="blue" type="submit">
                Simpan
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddModal;
