import { Center, Heading } from "@chakra-ui/react";
import PageLayout from "../components/layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <Center>
        <Heading p={20}>App info</Heading>
      </Center>
    </PageLayout>
  );
}
