import { useContext } from "react";
import { AuthenticatedTemplate, useIsAuthenticated } from "@azure/msal-react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import { AuthContext } from "../../context/auth/AuthContext";
import { UIContext } from "../../context/ui/UIContext";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";

const Sidebar = () => {
  const { accounts } = useContext(AuthContext);
  const isAuthenticated = useIsAuthenticated();
  const {
    drawer: { isOpen, onClose },
  } = useContext(UIContext);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {isAuthenticated ? accounts[0].name : "Inicia sesión"}
        </DrawerHeader>

        <DrawerBody>{!isAuthenticated ? <SignInButton /> : "Bien"}</DrawerBody>

        <DrawerFooter>{isAuthenticated && <SignOutButton />}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
