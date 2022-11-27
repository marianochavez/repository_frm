import { Box, Button } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

function LoginPage() {
  const { data, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onLoginUser() {
    await signIn("azure-ad");
  }

  return (
    <Box>
      {status === "authenticated" ? (
        <p>{JSON.stringify(data)}</p>
      ) : (
        "Unauthenticated"
      )}
      <Button onClick={onLoginUser}>Ingresar</Button>
      <Button onClick={() => signOut()}>Salir</Button>
    </Box>
  );
}

export default LoginPage;
