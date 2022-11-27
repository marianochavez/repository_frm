import { useContext } from "react";
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";

import { AuthContext } from "../../context/auth/AuthContext";
import { UIContext } from "../../context/ui/UIContext";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import Link from "next/link";

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
            <Flex flexDir="column" gap={2}>
              <SidebarButton name="Inicio" href="/" />
              <SidebarButton name="Recursos" href="/resources" />
            </Flex>
          )}
        </DrawerBody>

        <DrawerFooter>{isAuthenticated && <SignOutButton />}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const SidebarButton = ({ href, name }: { href: string; name: string }) => {
  const {
    drawer: { onClose },
  } = useContext(UIContext);
  return (
    <Button onClick={onClose} as={Link} href={href}>
      {name}
    </Button>
  );
};

export default Sidebar;
