import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/account/Sidebar";
import Copyright from "@/components/Copyright";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

function AccountLayout() {
  return (
    <Fragment>
      <Header />
      <main>
        <div className="container grid gap-4 py-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Sidebar />
          </div>
          <div className="lg:col-span-9">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
      <Copyright />
    </Fragment>
  );
}

export default AccountLayout;
