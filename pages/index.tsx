import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { useContext, useEffect, useState } from "react";
import SignInButton from "../components/SignInButton";
import SignOutButton from "../components/SignOutButton";
import { AuthContext } from "../context/auth/AuthContext";
import { callMsGraph } from "../utils/graph";

export default function Home() {
  // ! --------- TEST AUTH ------------
  const { accessToken, accounts } = useContext(AuthContext);
  const isAuthenticated = useIsAuthenticated();
  const [graphData, setGraphData] = useState<any>();

  useEffect(() => {
    if (isAuthenticated) {
      callMsGraph(accessToken).then((res) => setGraphData(res));
    }
  }, [accessToken, isAuthenticated]);

  return (
    <div>
      {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      <AuthenticatedTemplate>
        <h1>Logged! {accounts[0]?.name}</h1>
        <p>
          <strong>First Name: </strong> {graphData?.givenName}
        </p>
        <p>
          <strong>Last Name: </strong> {graphData?.surname}
        </p>
        <p>
          <strong>Email: </strong> {graphData?.userPrincipalName}
        </p>
        <p>
          <strong>Id: </strong> {graphData?.id}
        </p>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <h1>OUT!</h1>
      </UnauthenticatedTemplate>
    </div>
  );
}
