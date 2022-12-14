import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";

import CourseList from "../../components/CourseList";
import PageLayout from "../../components/layouts/PageLayout";
import { useCourses } from "../../hooks/useCourses";
import { useDepartments } from "../../hooks/useDepartments";
import Loading from "../../components/ui/Loading";

function ResourcesPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { departmentsQuery } = useDepartments();
  const { coursesQuery } = useCourses({ department: selectedDepartment });

  return (
    <PageLayout>
      {departmentsQuery.isLoading ? (
        <Loading />
      ) : (
        <Flex flexDir="column" gap={5} px={20} py={2} alignItems="center">
          {departmentsQuery.data?.data.map((department) => (
            <Box key={department.name} w="container.sm">
              <Button
                w="full"
                onClick={() =>
                  setSelectedDepartment(
                    selectedDepartment === department.name
                      ? ""
                      : department.name
                  )
                }
              >
                {department.name}
              </Button>
              {selectedDepartment === department.name &&
                coursesQuery.isSuccess && (
                  <CourseList courses={coursesQuery.data.data || []} />
                )}
            </Box>
          ))}
        </Flex>
      )}
    </PageLayout>
  );
}

export default ResourcesPage;
