import { Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import PageLayout from "../../components/layouts/PageLayout";
import NewCourseModal from "../../components/NewCourseModal";
import { UIContext } from "../../context/ui/UIContext";
import { dbRepositories } from "../../database";

type Props = {
  repositories: {
    url: string;
    course: {
      name: string;
      plan: string;
    };
  }[];
};

function ContributionsPage({ repositories }: Props) {
  const {
    newCourseModal: { onOpen },
  } = useContext(UIContext);

  return (
    <PageLayout>
      <Button colorScheme="whatsapp" onClick={onOpen}>Crear Repositorio</Button>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.url}>
            <Link href={repo.url}>
              {repo.course.name} - {repo.course.plan}
            </Link>
          </li>
        ))}
      </ul>
      <NewCourseModal/>
    </PageLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const {
    user: { _id },
  }: any = await getSession({ req });

  const repositories = await dbRepositories.getRepositoriesByUser(_id);

  return {
    props: {
      repositories,
    },
  };
};

export default ContributionsPage;
