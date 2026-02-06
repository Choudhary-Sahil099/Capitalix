import { Outlet } from "react-router-dom";
import SideBar from "../../components/layouts/SideBar";

const DashboardLayout = () => {
  return (
    <div className="bg-black flex min-h-screen">
      <SideBar />
      <div className="flex-1 pl-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
