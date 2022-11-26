import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

const SignInButton = () => {
  const { signIn } = useContext(AuthContext);

  return (
    <Button colorScheme="facebook" onClick={signIn}>
      Iniciar sesión
    </Button>
  );
};

export default SignInButton;
