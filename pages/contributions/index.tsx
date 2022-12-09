import type { ColumnDef } from "@tanstack/react-table";

import { MutableRefObject, useContext, useMemo, useRef } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";

import ContrubutionsTable from "../../components/ContrubutionsTable";
import PageLayout from "../../components/layouts/PageLayout";
import NewCourseModal from "../../components/NewCourseModal";
import { UIContext } from "../../context/ui/UIContext";
import { dbRepositories } from "../../database";
import { getCleanDomain } from "../../utils/url";
import { IRepository } from "../../types/repository";
import useUserRepositories from "../../hooks/useUserRepositories";
import useDeleteRepositoryMutation from "../../hooks/useDeleteRepositoryMutation";
import AlertDialogConfirmation from "../../components/ui/AlertDialogConfirmation";
import { AuthContext } from "../../context/auth/AuthContext";

type Props = {
  repositories: IRepository[];
};

function ContributionsPage({ repositories }: Props) {
  const { session } = useContext(AuthContext);
  const {
    newCourseModal: { onOpen, isOpen },
  } = useContext(UIContext);
  const { repositoriesQuery } = useUserRepositories({
    user: session?.user._id,
    initialData: repositories,
  });
  const { deleteMutation } = useDeleteRepositoryMutation();
  const repositoryToDelete: MutableRefObject<IRepository | undefined> =
    useRef();

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
        header: "Creado",
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
      {
        header: "Eliminar",
        cell: (info) => (
          <IconButton
            variant="ghost"
            icon={<BiTrash />}
            aria-label="opciones"
            colorScheme="red"
            onClick={() => {
              repositoryToDelete.current = info.row.original;
              onOpenAlert();
            }}
          />
        ),
      },
    ],
    [onOpenAlert]
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

        {/* Only for re-render table when repository is created */}
        <ContrubutionsTable data={Array.from(repositoriesQuery.data!)} columns={columns} />
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // TODO: change to client
  const {
    user: { _id },
  }: any = await getSession({ req });

  const repositories: IRepository[] =
    await dbRepositories.getRepositoriesByUser(_id);

  return {
    props: {
      repositories,
    },
  };
};

export default ContributionsPage;
