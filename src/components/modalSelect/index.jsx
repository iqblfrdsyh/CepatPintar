import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

const ModalSelect = ({ isOpen, onClose, children }) => {
  return (
    <div>
      <Modal isOpen={isOpen} size={"sm"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 dark:text-white">
                Select AI Model
              </ModalHeader>
              <ModalBody className="dark:text-white">{children}</ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="solid"
                  radius="sm"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalSelect;
