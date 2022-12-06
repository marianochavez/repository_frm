import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import PageLayout from "../../components/layouts/PageLayout";
import useCourseRepositories from "../../hooks/useCourseRepositories";

function ResourcePage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { repositoriesQuery, page, nextPage, prevPage } = useCourseRepositories({
    course: id,
  });
  
  return (
    <PageLayout>
      {repositoriesQuery.isLoading ? "Loading..." : <Box>
        {repositoriesQuery.data?.data.map(repo=>(
            <Text key={repo._id}>{repo.url}</Text>
        ))}
        </Box>}
    </PageLayout>
  );
}

export default ResourcePage;
