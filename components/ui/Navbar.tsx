import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { UIContext } from "../../context/ui/UIContext";


const Navbar = () => {
  return (
    <Box
      position="sticky"
      top={0}
      h="70px"
      borderBottom="1px"
      borderColor="gray.100"
    >
      <Flex alignItems="center" p={4}>
        <Text fontSize="2xl">Repositorio FRM</Text>

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
    />
  );
};
export default Navbar;
