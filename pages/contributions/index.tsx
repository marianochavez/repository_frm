import type { ColumnDef } from "@tanstack/react-table";

import { MutableRefObject, useContext, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import RepositoriesTable from "../../components/RepositoriesTable";
import PageLayout from "../../components/layouts/PageLayout";
import NewCourseModal from "../../components/NewCourseModal";
import { UIContext } from "../../context/ui/UIContext";
import { getCleanDomain } from "../../utils/url";
import { IRepository } from "../../types/repository";
import useUserRepositories from "../../hooks/useUserRepositories";
import useDeleteRepositoryMutation from "../../hooks/useDeleteRepositoryMutation";
import AlertDialogConfirmation from "../../components/ui/AlertDialogConfirmation";
import { AuthContext } from "../../context/auth/AuthContext";
import Loading from "../../components/ui/Loading";

function ContributionsPage() {
  const { session } = useContext(AuthContext);

  const { newCourseModal: { onOpen } } = useContext(UIContext);

  const repositoryToDelete: MutableRefObject<IRepository | undefined> = useRef();

  const { repositoriesQuery } = useUserRepositories({ user: session?.user._id });

  const { deleteMutation } = useDeleteRepositoryMutation();

  const {
    isOpen: isOpenAlert,
    onClose: onCloseAlert,
    onOpen: onOpenAlert,
  } = useDisclosure();

  const handleDeleteRepository = () => {
    deleteMutation.mutateAsync(repositoryToDelete.current!);
  };

  const columns = useMemo<ColumnDef<IRepository>[]>(
    () => [
      {
        header: "Link",
        accessorKey: "url",
        enableSorting: false,
        footer: (props) => props.column.id,
        cell: (info) => (
          <Button
            w="full"
            href={info.getValue() as string}
            target="_blank"
            as={Link}
            colorScheme="telegram"
            size="sm"
          >
            {getCleanDomain(info.getValue() as string)}
          </Button>
        ),
      },
      {
        header: "Materia",
        accessorKey: "course.name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Plan",
        accessorKey: "course.plan",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "Creación",
        accessorKey: "createdAt",
        footer: (props) => props.column.id,
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleString("es-AR", {
            year: "2-digit",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
      },
    ],
    []
  );

  return (
    <PageLayout>
      <Flex flexDir="column">
        <Flex mt={2} mx={4} textAlign="center">
          <Heading fontSize="3xl">Mis Aportes</Heading>
          <Box flex={1} textAlign="end">
            <Button colorScheme="whatsapp" onClick={onOpen}>
              Crear Repositorio
            </Button>
          </Box>
        </Flex>

        {repositoriesQuery.isLoading ? (
          <Center mt={20}>
            <Loading />
          </Center>
        ) : (
          <RepositoriesTable
            data={Array.from(repositoriesQuery.data || [])}
            columns={columns}
            onDeleteRow={(repository) => {
              repositoryToDelete.current = repository;
              onOpenAlert();
            }}
          />
        )}
      </Flex>
      <AlertDialogConfirmation
        header="Eliminar Repositorio"
        body="Está seguro que quiere eliminar el repositorio?"
        button={{ title: "Eliminar", colorSchema: "red" }}
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        onConfirm={handleDeleteRepository}
      />
      <NewCourseModal />
    </PageLayout>
  );
}

export default ContributionsPage;
