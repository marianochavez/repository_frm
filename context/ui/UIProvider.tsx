import { useDisclosure } from "@chakra-ui/react";
import { UIContext } from "./UIContext";

interface Props {
  children: React.ReactNode;
}

export const UIProvider: React.FC<Props> = ({ children }) => {
  const drawer = useDisclosure();
  const newCourseModal = useDisclosure();

  return (
    <UIContext.Provider
      value={{
        drawer,
        newCourseModal
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
