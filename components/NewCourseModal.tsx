import { useContext, useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { UIContext } from "../context/ui/UIContext";
import useRepositoryForm from "../hooks/useRepositoryForm";
import { useCourses } from "../hooks/useCourses";
import { useDepartments } from "../hooks/useDepartments";
import { IDeparment } from "../types/department";
import { ICourse } from "../types/course";
import { isUrl } from "../utils/validations";
import { UseMutationResult } from "@tanstack/react-query";
import { IRepository } from "../types/repository";


const NewCourseModal = () => {
  // TODO: refactor
  const {
    newCourseModal: { isOpen, onClose },
  } = useContext(UIContext);
  const [selectedDepartment, setSelectedDepartment] =
    useState<IDeparment | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);

  const {
    register,
    handleSubmitForm,
    success,
    reset,
    formState: { errors, isSubmitting },
  } = useRepositoryForm({
    course: selectedCourse?._id!,
  });

  useEffect(() => {
    if (success) {
      onClose();
      reset();
      handleSelectDepartment(null);
    }
  }, [success, onClose, reset]);

  const handleSelectDepartment = (department: IDeparment | null) => {
    setSelectedDepartment(department);
    setSelectedCourse(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent py={4}>
        <ModalHeader>Nuevo Repositorio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmitForm} noValidate>
            <Flex flexDir="column" gap={4}>
              <FormControl isInvalid={!!errors.url} isRequired>
                <FormLabel>Link</FormLabel>
                <Input
                  id="url"
                  type="text"
                  {...register("url", {
                    required: true,
                    validate: isUrl,
                    maxLength: {
                      value: 2048,
                      message: "El link debe ser de menos de 500 caracteres",
                    },
                  })}
                />
                {errors.url && (
                  <FormErrorMessage>{errors.url.message}</FormErrorMessage>
                )}
              </FormControl>

              <Text>Departamento</Text>
              <MenuDepartments
                department={selectedDepartment}
                onChange={handleSelectDepartment}
              />

              <Text>Materia</Text>
              <MenuCourses
                department={selectedDepartment}
                course={selectedCourse}
                onChange={setSelectedCourse}
              />

              <Flex flexDir="row" mt={3} justifyContent="end" gap={2}>
                <Button
                  onClick={onClose}
                  variant="outline"
                  colorScheme="blackAlpha"
                >
                  Cancelar
                </Button>
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  disabled={isSubmitting || !selectedCourse}
                  colorScheme="teal"
                >
                  Crear
                </Button>
              </Flex>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

type MenuDepartmentsProps = {
  department: IDeparment | null;
  onChange: (department: IDeparment) => void;
};

const MenuDepartments = ({ department, onChange }: MenuDepartmentsProps) => {
  const { departmentsQuery } = useDepartments();

  return (
    <Menu closeOnSelect={true} placement="auto">
      <MenuButton
        as={Button}
        colorScheme={`${department ? "green" : "red"}`}
        variant="outline"
      >
        {department ? department.name : "Seleccione un departamento"}
      </MenuButton>

      {departmentsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <MenuList maxH="200px">
          <MenuOptionGroup title="Departamentos" type="radio">
            {departmentsQuery.data?.data.map((department) => (
              <MenuItemOption
                key={department._id}
                value={department.name}
                onClick={() => onChange(department)}
              >
                {department.name}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      )}
    </Menu>
  );
};

type MenuCoursesProps = {
  department: IDeparment | null;
  course: ICourse | null;
  onChange: (course: ICourse) => void;
};

const MenuCourses = ({ department, course, onChange }: MenuCoursesProps) => {
  const { coursesQuery } = useCourses({ department: department?.name || "" });

  return (
    <Menu closeOnSelect={true} placement="auto">
      <MenuButton
        disabled={!department}
        as={Button}
        colorScheme={`${course ? "green" : department ? "red" : "blackAlpha"}`}
        variant="outline"
      >
        {course ? course.name : "Seleccione una materia"}
      </MenuButton>

      <MenuList maxH="calc(100vh - 300px)" overflowY="scroll">
        <MenuOptionGroup title={`Materias de ${department?.name}`} type="radio">
          {coursesQuery.data?.data.map((course) => (
            <MenuItemOption
              key={course._id}
              value={course.name}
              onClick={() => onChange(course)}
            >
              {course.name}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default NewCourseModal;
