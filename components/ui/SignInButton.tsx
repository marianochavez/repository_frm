import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

const SignInButton = () => {
  const { signInUser } = useContext(AuthContext);

  return (
    <Button colorScheme="facebook" onClick={signInUser}>
      Iniciar sesión
    </Button>
  );
};

export default SignInButton;
