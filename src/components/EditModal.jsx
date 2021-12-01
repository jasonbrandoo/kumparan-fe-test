import React from "react";
import {
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
import { EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  commentSelector,
  postSelector,
  setComments,
  setPosts,
} from "../features/post/postSlice";

const ModalEdit = (props) => {
  const { id, title, body, type } = props;
  const dispatch = useDispatch();
  const posts = useSelector(postSelector);
  const comments = useSelector(commentSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postTitle, setPostTitle] = React.useState("");
  const [postBody, setPostBody] = React.useState("");

  React.useEffect(() => {
    setPostTitle(title);
    setPostBody(body);
  }, [body, title]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "comment") {
      dispatch(
        setComments(
          comments.map((v) => {
            if (v.id === id) {
              return {
                ...v,
                name: postTitle,
                body: postBody,
              };
            }
            return v;
          })
        )
      );
    } else {
      dispatch(
        setPosts(
          posts.map((v) => {
            if (v.post.id === id) {
              return {
                user: { ...v.user },
                post: {
                  ...v.post,
                  title: postTitle,
                  body: postBody,
                },
              };
            }
            return v;
          })
        )
      );
    }

    onClose();
  };

  return (
    <>
      <Button colorScheme="green" size="sm" onClick={onOpen}>
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
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
    </>
  );
};

export default ModalEdit;
