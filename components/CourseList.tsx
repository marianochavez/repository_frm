import { Box, Flex } from "@chakra-ui/react";

import { ICourse } from "../types/course";
import CourseItem from "./CourseItem";

type Props = {
  courses: ICourse[];
};

const CourseList = ({ courses }: Props) => {
  return (
    <Flex flexDir="column" mx={14} p={2} ml={20} gap={2}>
      {courses.map((course) => (
        <CourseItem key={course.name} course={course} />
      ))}
    </Flex>
  );
};

export default CourseList;
