import { Box, Button, Flex } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useState } from "react";
import repositoryApi from "../../api/repositoryApi";
import CourseList from "../../components/CourseList";
import PageLayout from "../../components/layouts/PageLayout";
import { dbDepartments } from "../../database";
import { useCourses } from "../../hooks/useCourses";
import { IDeparment } from "../../types/department";

type Props = {
  departments: IDeparment[];
};

function ResourcesPage({ departments }: Props) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const { coursesQuery } = useCourses({ department: selectedDepartment });

  return (
    <PageLayout>
      <Flex flexDir="column" gap={5} px={20} py={2}>
        {departments.map((department) => (
          <Box key={department.name}>
            <Button
              onClick={() =>
                setSelectedDepartment(
                  selectedDepartment === department.name ? "" : department.name
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
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const departments = await dbDepartments.getAllDepartments();

  return {
    props: {
      departments,
    },
  };
};

export default ResourcesPage;
