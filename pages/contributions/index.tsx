import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import PageLayout from "../../components/layouts/PageLayout";
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
  return (
    <PageLayout>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.url}>
            <Link href={repo.url}>
              {repo.course.name} - {repo.course.plan}
            </Link>
          </li>
        ))}
      </ul>
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
