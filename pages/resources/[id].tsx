import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import PageLayout from "../../components/layouts/PageLayout";
import useRepositories from "../../hooks/useRepositories";

function ResourcePage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { repositoriesQuery, page, nextPage, prevPage } = useRepositories({
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
