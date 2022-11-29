import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { ICourse } from "../types/course";

type Props = {
  course: ICourse;
};

const CourseItem = ({ course }: Props) => {
  return (
    <Box bg="orange.100" p={2} rounded="md">
      <Link href={`/resources/${course._id}`}>{course.name}</Link>
    </Box>
  );
};

export default CourseItem;
