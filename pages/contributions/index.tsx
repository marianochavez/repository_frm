import { useContext, useMemo } from "react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { Box, Button, Flex, Heading, IconButton } from "@chakra-ui/react";
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

type Props = {
  repositories: IRepository[];
};

function ContributionsPage({ repositories }: Props) {
  const { data: session } = useSession();
  const {
    newCourseModal: { onOpen },
  } = useContext(UIContext);

  // TODO: add mutation
  const { repositoriesQuery } = useUserRepositories({
    user: session?.user._id,
    initialData: repositories,
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
            onClick={() => handleDeleteRepository(info.row.original)}
          />
        ),
      },
    ],
    []
  );

  async function handleDeleteRepository(repo: IRepository) {
    try {
      const { data } = await repositoryApi.delete(`/repositories/${repo._id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

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

        <ContrubutionsTable data={repositories} columns={columns} />
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
