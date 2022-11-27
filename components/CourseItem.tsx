import { Box } from "@chakra-ui/react";
import { ICourse } from "../types/course"

type Props = {
    course: ICourse;
}

const CourseItem = ({course}:Props) => {
  return (
    <Box bg="orange.100" p={2} rounded="md">{course.name}</Box>
  )
}

export default CourseItem