import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import repositoryApi from "../api/repositoryApi";
import { ICourse } from "../types/course";
import { IRepository } from "../types/repository";
import { IUser } from "../types/user";

interface GetRepositoriesProps extends Props {}

const getRepositories = async ({ user }: GetRepositoriesProps) => {
  const params = new URLSearchParams();

  if (user) params.append("user", user);

  const { data } = await repositoryApi.get<{ data: IRepository[] }>(
    "/repositories",
    { params }
  );

  return data.data;
};

type Props = {
  user: IUser["_id"];
  initialData?: IRepository[];
};

const useUserRepositories = ({ user, initialData }: Props) => {
  const repositoriesQuery = useQuery(
    ["repositories", { user }],
    () => getRepositories({ user }),
    {
      initialData,
      staleTime: 1000 * 60 * 60,
    }
  );

  return {
    repositoriesQuery,
  };
};

export default useUserRepositories;