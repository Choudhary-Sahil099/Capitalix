import { Outlet } from "react-router-dom";
import SideBar from "../components/dashboard/SideBar";
import TopSearch from "../components/dashboard/TopSearch";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-[#0e0d0d]">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <TopSearch />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};