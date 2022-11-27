import { useQuery } from "@tanstack/react-query";
import repositoryApi from "../api/repositoryApi";
import { ICourse } from "../types/course";

import { IDeparment } from "../types/department";

interface GetCoursesProps extends Props {}

const getCourses = async ({ department }: GetCoursesProps) => {
  const params = new URLSearchParams();

  if (department) params.append("department", department);

  const { data } = await repositoryApi.get<{data:ICourse[]}>("/courses", { params });

  return data;
};

type Props = {
  department: IDeparment["name"];
};

export const useCourses = ({ department }: Props) => {
  const coursesQuery = useQuery(["courses", { department }], () =>
    getCourses({ department })
  );

  return {
    coursesQuery,
  };
};
