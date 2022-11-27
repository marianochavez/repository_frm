import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

const SignOutButton = () => {
  const { signOutUser } = useContext(AuthContext);

  return (
    <Button colorScheme="purple" variant="outline" onClick={signOutUser}>
      Cerrar sesión
    </Button>
  );
};

export default SignOutButton;
