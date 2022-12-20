import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { UIContext } from "../../context/ui/UIContext";

const Navbar = () => {
  return (
    <Box
      position="sticky"
      top={0}
      borderColor="gray.100"
      bg="gray.900"
      zIndex={99}
    >
      <Flex alignItems="center" px={4} py={2}>
        <Text
          as={Link}
          href="/"
          fontSize="2xl"
          fontFamily="Rubik Vinyl"
          color="whiteAlpha.900"
          fontWeight="bold"
          _hover={{color: "gray"}}
        >
          Repositorio FRM
        </Text>

        <Box flex={1} textAlign="end">
          <DrawerButton />
        </Box>
      </Flex>
    </Box>
  );
};

const DrawerButton = () => {
  const {
    drawer: { onOpen },
  } = useContext(UIContext);
  return (
    <IconButton
      aria-label="Abrir lateral"
      icon={<BiMenu />}
      variant="ghost"
      fontSize="2xl"
      onClick={onOpen}
      colorScheme="whiteAlpha"
    />
  );
};
export default Navbar;
