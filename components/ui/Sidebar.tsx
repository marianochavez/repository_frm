import { useContext } from "react";
import { AuthenticatedTemplate } from "@azure/msal-react";
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

const Sidebar = () => {
  const { accounts } = useContext(AuthContext);
  const {
    drawer: { isOpen, onClose },
  } = useContext(UIContext);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{accounts[0].name}</DrawerHeader>

        <DrawerBody>
          <AuthenticatedTemplate>
            <h1>Estamos logeados</h1>
          </AuthenticatedTemplate>
        </DrawerBody>

        <DrawerFooter>
          <SignOutButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
