import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Box, Button, Center, Heading, Tag, Text, Tooltip } from "@chakra-ui/react";
import { CellContext, ColumnDef } from "@tanstack/react-table";

import PageLayout from "../../components/layouts/PageLayout";
import RepositoriesTable from "../../components/RepositoriesTable";
import Loading from "../../components/ui/Loading";
import useCourseRepositories from "../../hooks/useCourseRepositories";
import { IRepository } from "../../types/repository";
import { getCleanDomain } from "../../utils/url";
import { IUser } from "../../types/user";


function CourseResourcePage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { repositoriesQuery } = useCourseRepositories({
    course: id,
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
      {
        header: "Propietario",
        accessorKey: "user.name",
        footer: (props) => props.column.id,
        cell: ({
          row: {
            original: { user },
          },
        }) => (
          <Tooltip label={(user as IUser).email}>
            <Tag p={2}>{(user as IUser).name}</Tag>
          </Tooltip>
        ),
      },
    ],
    []
  );

  return (
    <PageLayout>
      <Heading>
        Recursos de 
      </Heading>
      {repositoriesQuery.isLoading ? (
        <Center mt={20}>
          <Loading />
        </Center>
      ) : !repositoriesQuery.data?.data ? (
        <Text>No se encuentran repositorios en esta materia</Text>
      ) : (
        <RepositoriesTable
          data={Array.from(repositoriesQuery.data?.data || [])}
          columns={columns}
        />
      )}
    </PageLayout>
  );
}

// TODO: SSP check query id and get course

export default CourseResourcePage;
