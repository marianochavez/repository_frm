import { useMemo } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  Box,
  Button,
  Center,
  Heading,
  Tag,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";

import PageLayout from "../../components/layouts/PageLayout";
import RepositoriesTable from "../../components/RepositoriesTable";
import Loading from "../../components/ui/Loading";
import useCourseRepositories from "../../hooks/useCourseRepositories";
import { IRepository } from "../../types/repository";
import { getCleanDomain } from "../../utils/url";
import { IUser } from "../../types/user";
import { dbCourses } from "../../database";
import { ICourse } from "../../types/course";
import Head from "next/head";

type Props = {
  course: ICourse;
};

function CourseResourcePage({ course }: Props) {
  const { repositoriesQuery } = useCourseRepositories({
    course: course._id,
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
    <>
      <Head>
        <title>{course.name}</title>
      </Head>
      <PageLayout>
        <Text mt={7} fontSize="2xl" textAlign="center">
          Recursos de {course.name}
        </Text>
        <Box bg="white" m={10} p={3} borderRadius="20px">
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
        </Box>
      </PageLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query as { id: string };
  const course = await dbCourses.getCourseById(id);

  if (!course) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      course,
    },
  };
};

export default CourseResourcePage;
