import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "./Toast";
import { useApp } from "../context/AppContext";

function Layout({ children, showSearch = true }) {
  const { toast } = useApp();

  return (
    <>
      <Navbar showSearch={showSearch} />
      <Toast message={toast.message} visible={toast.visible} />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
