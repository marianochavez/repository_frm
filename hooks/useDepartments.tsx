import { useQuery } from "@tanstack/react-query";

import repositoryApi from "../api/repositoryApi";
import { IDeparment } from "../types/department";

const getDepartments = async () => {
  const { data } = await repositoryApi.get<{ data: IDeparment[] }>(
    "/departments"
  );

  return data;
};

export const useDepartments = () => {
  const departmentsQuery = useQuery(["departments"], () => getDepartments());

  return {
    departmentsQuery,
  };
};
