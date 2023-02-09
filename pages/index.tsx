import Head from "next/head";
import { Grid, GridItem, Text } from "@chakra-ui/react";

import PageLayout from "../components/layouts/PageLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Repositorio FRM</title>
      </Head>
      <PageLayout>
        <Grid
          mt="10%"
          mx="5%"
          h="200px"
          templateRows={{ base: "repeat(2, 1fr)" }}
          templateColumns={{ sm: "repeat(1, 1fr)", lg: "repeat(5, 1fr)" }}
          gap={4}
          fontFamily="mono"
        >
          <GridItem
            rowSpan={2}
            colSpan={1}
            p={2}
            display="flex"
            alignItems="center"
            border="1px solid black"
            borderRadius={10}
            shadow="2xl"
          >
            <Text fontSize="2rem" textAlign="center">
              ¡Aporta a la comunidad!
            </Text>
          </GridItem>
          <GridItem
            border="1px solid black"
            borderRadius={10}
            colSpan={2}
            p={2}
            display="flex"
            alignItems="center"
            shadow="lg"
          >
            <Text textAlign="center">
              Encuentra carpetas, parciales, finales, clases; de todas las
              materias.
            </Text>
          </GridItem>
          <GridItem
            colSpan={2}
            p={2}
            display="flex"
            alignItems="center"
            border="1px solid black"
            borderRadius={10}
            shadow="lg"
          >
            <Text textAlign="center">
              Todos los recursos son públicos y aportados por cada alumno de la
              facultad.
            </Text>
          </GridItem>
          <GridItem
            colSpan={4}
            p={2}
            display="flex"
            alignItems="center"
            border="1px solid black"
            borderRadius={10}
            shadow="2xl"
          >
            <Text textAlign="center">
              <span style={{ fontWeight: "bold" }}>Cómo? </span>
              Fácil, solo tienes que subir el link de tu carpeta. Te
              recomendamos usar la nube OneDrive que proporciona la facultad,
              ahí tendrás mucho espacio para subir tus archivos.
            </Text>
          </GridItem>
        </Grid>
      </PageLayout>
    </>
  );
}
