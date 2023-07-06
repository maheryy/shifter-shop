import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/business/Sidebar";

function DashboardLayout() {
  return (
    <Fragment>
      <div className="3xl:container grid h-[calc(100vh-7.5rem)] gap-4 overflow-hidden md:grid-cols-12">
        <div className="md:col-span-2">
          <Sidebar />
        </div>
        <div className="md:col-span-10">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
}

export default DashboardLayout;
