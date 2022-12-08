import { RefObject, useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
} from "@chakra-ui/react";

type Props = {
  header: string;
  body: string;
  button: {
    title: ButtonProps["title"];
    colorSchema: ButtonProps["colorScheme"];
  };
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: any;
};

const AlertDialogConfirmation = ({
  header,
  body,
  button,
  isOpen,
  onClose,
  onConfirm,
}: Props) => {
  const cancelRef: any = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              ml={3}
              colorScheme={button.colorSchema}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {button.title}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertDialogConfirmation;
