import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
};

function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onRegisterUser = async ({ email }: FormData) => {};

  return (
    <Center h="100vh">
      <Box p={20} border="1px" rounded="lg">
        <form>
          <Flex flexDir="column" gap={5} alignItems="center">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input id="email" type="text" />
            </FormControl>

            <Button
              colorScheme="blue"
              type="submit"
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Registrarme
            </Button>
          </Flex>
        </form>
      </Box>
    </Center>
  );
}

export default AuthPage;
