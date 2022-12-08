import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import repositoryApi from "../api/repositoryApi";
import { IRepository } from "../types/repository";

interface GetRepositoriesProps extends Props {
  page: number;
}

const getRepositories = async ({ course, page = 1 }: GetRepositoriesProps) => {
  const params = new URLSearchParams();

  if (course) params.append("course", course);

  params.append("page", page.toString());
  params.append("per_page", "10");

  const { data } = await repositoryApi.get<{ data: IRepository[] }>(
    "/repositories",
    { params }
  );

  return data;
};

type Props = {
  course: IRepository["_id"];
};

const useCourseRepositories = ({ course }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [course]);

  const repositoriesQuery = useQuery(["repositories", { course }], () =>
    getRepositories({ course, page })
  );

  const nextPage = () => {
    if (repositoriesQuery.data?.data?.length === 0) return;

    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return {
    repositoriesQuery,
    page: repositoriesQuery.isFetching ? "Cargando" : page,
    nextPage,
    prevPage,
  };
};

export default useCourseRepositories;
