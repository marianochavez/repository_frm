import { useContext } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { UIContext } from "../context/ui/UIContext";
import useRepositoryForm from "../hooks/useRepositoryForm";

const NewCourseModal = () => {
  const {
    newCourseModal: { isOpen, onClose },
  } = useContext(UIContext);

  const {
    register,
    handleSubmitForm,
    formState: { errors, isSubmitting },
  } = useRepositoryForm();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader>Nuevo Repositorio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmitForm} noValidate>
            <Flex flexDir="column">
              <FormControl isInvalid={!!errors.url}>
                <FormLabel>Link</FormLabel>
                <Input
                  id="url"
                  type="text"
                  {...register("url", {
                    required: true,
                    maxLength: {
                      value: 500,
                      message: "El link debe ser de menos de 500 caracteres",
                    },
                    // TODO: agregar validacion de link
                  })}
                />
                {errors.url && (
                  <FormErrorMessage>{errors.url.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.course}>
                <FormLabel>Materia:</FormLabel>
                <Input
                  {...register("course", {
                    required: true,
                    value: "Nombre de la materia",
                  })}
                />
                {errors.course && (
                  <FormErrorMessage>{errors.course.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.user}>
                <FormLabel>Usuario:</FormLabel>
                <Input
                  {...register("user", {
                    required: true,
                    value: "Nombre del usuario",
                  })}
                />
                {errors.user && (
                  <FormErrorMessage>{errors.user.message}</FormErrorMessage>
                )}
              </FormControl>
            </Flex>

            <Button
            isLoading={isSubmitting}
            type="submit"
            disabled={isSubmitting}
          >
            Crear
          </Button>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewCourseModal;
