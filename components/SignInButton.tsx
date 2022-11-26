import { useContext } from "react";
import { AuthContext } from "../context/auth/AuthContext";

const SignInButton = () => {
  const { signIn } = useContext(AuthContext);

  return <button onClick={signIn}>Sign In</button>;
};

export default SignInButton;
