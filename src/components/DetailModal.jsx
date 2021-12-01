import React from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
  ModalHeader,
} from "@chakra-ui/react";

const DetailModal = (props) => {
  const { thumbnailUrl, title, url } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box as="button" onClick={onOpen}>
        <Image
          margin={1}
          borderRadius="full"
          boxSize="100px"
          src={thumbnailUrl}
          alt={title}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <Image boxSize="100%" src={url} alt={title} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailModal;
