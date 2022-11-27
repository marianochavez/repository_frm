import { useContext } from "react";
import {
  Box,
  Center,
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
  const { session, isAuthenticated } = useContext(AuthContext);
  const {
    drawer: { isOpen, onClose },
  } = useContext(UIContext);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {isAuthenticated ? session?.user?.name : "Bienvenido!"}
        </DrawerHeader>

        <DrawerBody>
          {!isAuthenticated ? (
            <Center h="100%">
              <SignInButton />
            </Center>
          ) : (
            "Bien"
          )}
        </DrawerBody>

        <DrawerFooter>{isAuthenticated && <SignOutButton />}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
