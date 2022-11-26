import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Text } from "@chakra-ui/react";
import PageLayout from "../components/layouts/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <Text p={5} fontSize="2xl">Autenticado</Text>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Text p={5} fontSize="2xl">Inicia sesión!</Text>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
}
