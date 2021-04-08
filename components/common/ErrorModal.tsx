import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { ModalOverlay } from "@chakra-ui/modal";
import { ModalHeader } from "@chakra-ui/modal";
import { ModalFooter } from "@chakra-ui/modal";
import { ModalBody } from "@chakra-ui/modal";
import { ModalCloseButton } from "@chakra-ui/modal";
import { ModalContent } from "@chakra-ui/modal";
import { Modal } from "@chakra-ui/modal";
import { forwardRef } from "@chakra-ui/system";
import { useImperativeHandle, useRef, useState } from "react";

const BlogModal = ({}, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState();
  const [title, setTitle] = useState();

  const _open = ({ content, title }) => {
    setTitle(title);
    setContent(content);
    onOpen();
  };
  const _close = () => {
    setTitle(null);
    setContent(null);
    onClose();
  };

  useImperativeHandle(ref, () => ({
    open: _open,
  }));

  return (
    <Modal isOpen={isOpen} onClose={_close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default forwardRef(BlogModal);
