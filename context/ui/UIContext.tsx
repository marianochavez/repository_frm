import { useDisclosure } from '@chakra-ui/react';
import { createContext } from 'react';

interface ContextProps {
  drawer: ReturnType<typeof useDisclosure>;
  newCourseModal: ReturnType<typeof useDisclosure>;
}

export const UIContext = createContext({} as ContextProps)