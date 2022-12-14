import Link from "next/link";
import { Box, Button } from "@chakra-ui/react";

import { ICourse } from "../types/course";

type Props = {
  course: ICourse;
};

const CourseItem = ({ course }: Props) => {
  return (
    <Button
      as={Link}
      href={`/resources/${course._id}`}
      colorScheme="orange"
      bg="orange.300"
      p={2}
      rounded="md"
      color="black"
    >
      {course.name}
    </Button>
  );
};

export default CourseItem;
