import Join from "@illustrations/join.svg";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/business/register/Header";
import Copyright from "@/components/Copyright";
import { useAuthContext } from "@/hooks/context";

export function BecomeSeller() {
  const { isAuthenticated } = useAuthContext();

  const to = isAuthenticated
    ? "/business/register/business-request"
    : "/business/register/landing";

  return (
    <Fragment>
      <Header />
      <main>
        <section className="container grid gap-16 py-8 md:grid-cols-2 md:py-16">
          <div className="grid gap-16">
            <h1 className="text-2xl font-bold md:text-4xl">
              Ready to sell?
              <br />
              Here’s what you need to do:
            </h1>
            <div className="grid gap-16">
              <div className="grid gap-8">
                <div className="grid gap-4">
                  <h2 className="text-lg font-bold md:text-2xl md:font-medium">
                    Create or sign in to your account.
                  </h2>
                  <p>
                    Having your e-mail and account set up is a great starting
                    point.
                  </p>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-lg font-bold md:text-2xl md:font-medium">
                    Make us dream
                  </h2>
                  <p>
                    Tell us about your business and how can we work together.
                  </p>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-lg font-bold md:text-2xl md:font-medium">
                    We’ll validate your submission
                  </h2>
                  <p>
                    In order to ensure a secure and reliable environment we’ll
                    get back to you to establish trust between us.
                  </p>
                </div>
                <div className="grid gap-4">
                  <h2 className="text-lg font-bold md:text-2xl md:font-medium">
                    Get ready to sell!
                  </h2>
                  <p>
                    Step into the marketplace and watch your business soar as
                    you start selling on our platform.
                  </p>
                </div>
              </div>
            </div>
            <Link
              className="w-full justify-self-center rounded-md border border-primary bg-primary px-4 py-3 text-center text-sm font-medium uppercase text-white transition hover:bg-transparent hover:text-primary md:max-w-md"
              to={to}
            >
              Begin
            </Link>
          </div>
          <Join className="hidden self-center md:block md:h-96 md:w-96" />
        </section>
      </main>
      <Copyright />
    </Fragment>
  );
}

export default BecomeSeller;
