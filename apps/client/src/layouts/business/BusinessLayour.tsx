import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/business/register/Header";
import Steps from "@/components/business/register/Steps";
import Copyright from "@/components/Copyright";
import RegisterProvider from "@/providers/business/RegisterContext";

function BusinessLayout() {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <Copyright />
      </footer>
    </Fragment>
  );
}

export default BusinessLayout;
