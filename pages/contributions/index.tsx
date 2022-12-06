import { useContext, useMemo } from "react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { BiTrash } from "react-icons/bi";

import ContrubutionsTable from "../../components/ContrubutionsTable";
import PageLayout from "../../components/layouts/PageLayout";
import NewCourseModal from "../../components/NewCourseModal";
import { UIContext } from "../../context/ui/UIContext";
import { dbRepositories } from "../../database";
import { getCleanDomain } from "../../utils/url";
import { IRepository } from "../../types/repository";
import repositoryApi from "../../api/repositoryApi";
import useUserRepositories from "../../hooks/useUserRepositories";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  repositories: IRepository[];
};

function ContributionsPage({ repositories }: Props) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const {
    newCourseModal: { onOpen },
  } = useContext(UIContext);

  const { repositoriesQuery } = useUserRepositories({
    user: session?.user._id,
    initialData: repositories,
  });

  // TODO: REFACTOR - ADD CONFIRMATION for delete
  const deleteMutation = useMutation({
    mutationFn: async (repo: IRepository) => {
      const { data } = await repositoryApi.delete(`/repositories/${repo._id}`);

      return data;
    },
    onSuccess: (data: { data: IRepository }) =>
      queryClient.setQueryData(
        ["repositories", { user: session!.user._id }],
        (oldData: IRepository[] | undefined) => {
          return oldData!.filter(
            (repo: IRepository) => repo._id !== data.data._id
          );
        }
      ),
    onMutate: () => {
      toast({
        title: "Repositorio eliminado",
        status: "info",
        duration: 5000,
        position: "top-right",
      });
    },
    onError: () =>
      toast({
        title: "Error",
        description: "No se pudo eliminar el repositorio",
        status: "error",
        duration: 5000,
        position: "top-right",
      }),
  });

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
            onClick={() => deleteMutation.mutateAsync(info.row.original)}
          />
        ),
      },
    ],
    [deleteMutation]
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

        <ContrubutionsTable data={repositoriesQuery.data!} columns={columns} />
      </Flex>
      <NewCourseModal />
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
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
