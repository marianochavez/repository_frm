import { useQuery } from "@tanstack/react-query";

import repositoryApi from "../api/repositoryApi";
import { IRepository } from "../types/repository";

interface GetRepositoriesProps extends Props {}

const getRepositories = async ({ course }: GetRepositoriesProps) => {
  const params = new URLSearchParams();

  if (course) params.append("course", course);

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
  const repositoriesQuery = useQuery(
    ["repositories", { course }],
    () => getRepositories({ course }),
    { enabled: !!course, refetchOnWindowFocus: false }
  );

  return {
    repositoriesQuery,
  };
};

export default useCourseRepositories;
