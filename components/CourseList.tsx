import { Box, Flex } from "@chakra-ui/react";

import { ICourse } from "../types/course";
import CourseItem from "./CourseItem";

type Props = {
  courses: ICourse[];
};

const CourseList = ({ courses }: Props) => {
  return (
    <Flex flexDir="column" ml={10} p={2} gap={2}>
      {courses.map((course) => (
        <CourseItem key={course.name} course={course} />
      ))}
    </Flex>
  );
};

export default CourseList;
