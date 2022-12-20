import { Box } from "@chakra-ui/react";
import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <Box className="home-bg" minH="100vh">
      <Navbar />
      <Sidebar />
      {children}
    </Box>
  );
};

export default PageLayout;
