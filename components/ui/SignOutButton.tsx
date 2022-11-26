import { Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

const SignOutButton = () => {
  const { signOut } = useContext(AuthContext);
  return (
    <Button colorScheme="purple" variant="outline" onClick={signOut}>
      Cerrar sesión
    </Button>
  );
};

export default SignOutButton;
