import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import Head from "next/head";
import PageLayout from "../components/layouts/PageLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Repositorio FRM</title>
      </Head>
      <PageLayout>
        <Grid>
          <GridItem>
            Info
          </GridItem>
        </Grid>
      </PageLayout>
    </>
  );
}
