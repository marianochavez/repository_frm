import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";

const SignOutButton = () => {
  const { signOut } = useContext(AuthContext);
  return <button onClick={signOut}>Sign Out</button>;
};

export default SignOutButton;
