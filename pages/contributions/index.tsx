import { Box, Button, Flex } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useMemo } from "react";
import ContrubutionsTable, {
  RepositoryColumn,
} from "../../components/ContrubutionsTable";
import PageLayout from "../../components/layouts/PageLayout";
import NewCourseModal from "../../components/NewCourseModal";
import { UIContext } from "../../context/ui/UIContext";
import { dbRepositories } from "../../database";
import { getCleanDomain } from "../../utils/url";

type Props = {
  repositories: {
    url: string;
    course: {
      name: string;
      plan: string;
    };
    createdAt: string;
  }[];
};

function ContributionsPage({ repositories }: Props) {
  const {
    newCourseModal: { onOpen },
  } = useContext(UIContext);

  const columns = useMemo<ColumnDef<RepositoryColumn>[]>(
    () => [
      {
        header: "Link",
        accessorKey: "url",
        footer: (props) => props.column.id,
        cell: (info) => (
          <Button
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
            year: "numeric",
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
        <Box flex={1} textAlign="end">
          <Button colorScheme="whatsapp" onClick={onOpen} mt={2} mr={2}>
            Crear Repositorio
          </Button>
        </Box>

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

  const repositories = await dbRepositories.getRepositoriesByUser(_id);

  return {
    props: {
      repositories,
    },
  };
};

export default ContributionsPage;
