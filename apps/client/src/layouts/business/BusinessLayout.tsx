import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/business/register/Header";
import Copyright from "@/components/Copyright";

function BusinessLayout() {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className="h-10">
        <Copyright />
      </footer>
    </Fragment>
  );
}

export default BusinessLayout;
