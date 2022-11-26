import Navbar from "../ui/Navbar";
import Sidebar from "../ui/Sidebar";

type Props = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
    </>
  );
};

export default PageLayout;
